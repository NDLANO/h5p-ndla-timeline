/* TimelineJS uses dangling underscore */

import type { TimelineSlide } from '@knight-lab/timelinejs';
import { Timeline } from '@knight-lab/timelinejs';
import {
  EventDispatcher,
  H5PContentId,
  IH5PContentType,
  H5PMedia,
} from 'h5p-types';
import { H5P } from 'h5p-utils';
import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { buildH5PMediaInstance } from '../../H5P/H5P.util';
import { H5PContext } from '../../contexts/H5PContext';
import { L10nContext } from '../../contexts/LocalizationContext';
import { Params } from '../../types/Params';
import {
  addTabIndexToScrollableElements,
  createTimelineDefinition,
  getClosestLocaleCode,
} from '../../utils/timeline.utils';

/** @constant {number} SLIDE_PADDING_BLOCK_PX Padding for each slide in timeline in px. */
export const SLIDE_PADDING_BLOCK_PX = 16;

/** @constant {number} RESIZE_TRIGGER_COOLDOWN_MS Cooldown to prevent resize-trigger loops. */
export const RESIZE_TRIGGER_COOLDOWN_MS = 200;

/** @constant {number} SLIDE_TRANSITION_DURATION_MS Duration of slide transition in ms. */
const SLIDE_TRANSITION_DURATION_MS = 750;

type TimeLineProps = {
  data: Params;
  timelineTitle: string;
  contentId: H5PContentId;
  onMediaInstanceBuilt: (instance: EventDispatcher) => void;
};

declare module '@knight-lab/timelinejs' {
  interface Timeline {
    current_id: string;
  }
}

/**
 * Override BCE text in media instances
 * TimelineJS uses BCE and doesn't provide proper support for localization as needed.
 * @see https://github.com/NUKnightLab/TimelineJS3/issues/836
 * @param {string} bceText The text to use instead of BCE
 */
const overrideBCE = (bceText: string): void => {
  const bceSpan = '<span>BCE</span>';

  const markers = document.querySelectorAll('.tl-timemarker');
  markers.forEach((marker) => {
    if (!marker.hasAttribute('aria-label')) {
      const ariaLabel = marker.getAttribute('aria-label');
      if (ariaLabel) {
        marker.setAttribute('aria-label', ariaLabel.replace(bceSpan, `<span>${bceText}</span>`));
      }
    }
  });

  const tickTexts = document.querySelectorAll('.tl-timeaxis-tick-text');
  tickTexts.forEach((tickText) => {
    tickText.innerHTML = tickText.innerHTML.replace(bceSpan, `<span>${bceText}</span>`);
  });
};

export const TimeLine: React.FC<TimeLineProps> = ({
  data,
  timelineTitle,
  contentId,
  onMediaInstanceBuilt,
}: TimeLineProps) => {
  const [timelineDefinition, classNames] = React.useMemo(
    () => createTimelineDefinition(timelineTitle, data),
    [data, timelineTitle],
  );

  const [timelineIsRendered, setTimelineIsRendered] = useState(false);
  const h5pInstance = useContext(H5PContext);
  const translations = useContext(L10nContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `timeline-embed-${H5P.createUUID()}`;

  // const aspectRatio = 16 / 9;

  const h5pMediaInstances: { [index: string]: IH5PContentType | null } = {};

  useEffectOnce(() => {
    if (typeof timelineDefinition === 'string') {
      return; // Edge case
    }

    /*
     * Retrieve modified IDs - hack of a hack that should have been cleaned up
     * cmp. mapEventToTimelineSlide in timeline.utils.tsx
     */
    const modifiedIds: Array<string> = [
      timelineDefinition?.title?.unique_id ?? '',
      ...timelineDefinition.events.map(
        (event: TimelineSlide) => event.unique_id ?? '',
      ),
    ];

    // Build lookup table for slide id => H5P media instance
    [data?.titleSlide, ...(data.timelineItems || [])].forEach((item, index) => {
      if (!item) {
        return;
      }

      const medium: Array<H5PMedia> | null =
        item.mediaType === 'video' && item.video?.[0].path ? item.video : null;

      const h5pMediaInstance: IH5PContentType | null = buildH5PMediaInstance(
        contentId,
        medium,
        'H5P.Video',
      );

      if (h5pMediaInstance !== null) {
        h5pMediaInstances[modifiedIds[index]] = h5pMediaInstance;
        onMediaInstanceBuilt(h5pMediaInstance);
      }
    });
  });

  useEffectOnce(() => {
    const timeline = new Timeline(containerId, timelineDefinition, {
      language: getClosestLocaleCode(containerRef.current),
      font: undefined,
    });

    let lastResizeTriggerAt = 0;

    const timelineContainer = containerRef.current?.querySelector(
      `#${containerId}`,
    );

    h5pInstance?.on('resize', () => {
      const now = Date.now();
      if (now - lastResizeTriggerAt < RESIZE_TRIGGER_COOLDOWN_MS) {
        return;
      }

      const currentSlideDOM = containerRef.current?.querySelector(`[id="${timeline.current_id}"]`);
      if (!currentSlideDOM) {
        return;
      }

      const currentSlideContentDOM = currentSlideDOM?.querySelector('.tl-slide-content');
      if (!currentSlideContentDOM) {
        return;
      }

      const storySliderDOM = containerRef.current?.querySelector('.tl-storyslider');
      if (!storySliderDOM) {
        return;
      }

      const isFullscreen = containerRef.current?.closest('.h5p-fullscreen') !== null;

      let sliderHeight: number;
      if (!isFullscreen) {
        const currentSlideHeight = currentSlideContentDOM.getBoundingClientRect().height;
        sliderHeight = currentSlideHeight + 2 * SLIDE_PADDING_BLOCK_PX;
      }
      else {
        const timenavSliderDOM = containerRef.current?.querySelector('.tl-timenav-slider');
        const timenavSliderHeight = timenavSliderDOM?.getBoundingClientRect().height ?? 0;
        sliderHeight = window.innerHeight - timenavSliderHeight - 2 * SLIDE_PADDING_BLOCK_PX;
      }

      (storySliderDOM as HTMLElement).style.setProperty('--tl-slide-height', `${sliderHeight}px`);

      const menuBarDOM = containerRef.current?.querySelector('.tl-menubar');
      (menuBarDOM as HTMLElement).style.setProperty('--tl-menubar-top', `calc(${sliderHeight}px + 0.25rem)`);

      window.setTimeout(() => {
        lastResizeTriggerAt = now;
        h5pInstance?.trigger('resize');
      }, 0);
    });

    ['nav_left', 'nav_right', 'nav_next', 'nav_previous'].forEach((eventName) => {
      timeline.on(eventName, () => {
        window.setTimeout(() => {
          h5pInstance?.trigger('resize');
        }, SLIDE_TRANSITION_DURATION_MS); // Without timeout, we lose animation.
      });
    });

    // Timeline sends out events. No need for Mutation observers.
    timeline.on('loaded', () => {
      if (!timelineContainer) {
        return;
      }

      /* Hack to override BCE in timeline footer */
      overrideBCE(translations.bce);

      // Timeline needs one extra resize after some(TM) time.
      const waitToResize = (quitInMS = 5000, timeout = 50) => {
        if (quitInMS < 0) {
          return; // Tried long enough
        }

        const timelineMenuBar: HTMLElement|null =
          timelineContainer.querySelector('.tl-menubar');

        const menuBarTop = parseFloat(timelineMenuBar?.style.top ?? '');
        if (Number.isNaN(menuBarTop) || menuBarTop < 0) {
          h5pInstance?.trigger('resize');
          window.setTimeout(() => {
            waitToResize(quitInMS - timeout);
          }, timeout);
        }
      };
      waitToResize();

      /*
       * Workaround for TimelineJS using the "years ago" format for positive
       * years as well if the scale is set to "cosmological"
       */
      if (
        typeof timelineDefinition !== 'string' &&
        timelineDefinition.scale === 'cosmological'
      ) {

        const headlineContainers = [...document.querySelectorAll('.tl-text-headline-container')];
        if (timelineDefinition?.title) {
          headlineContainers.shift(); // Exclude title slide headline, has no year shown
        }

        headlineContainers.forEach((headlineContainer, index) => {
          const startYear = timelineDefinition.events[index].start_date?.getFullYear?.();
          if (!startYear || startYear < 0) {
            return;
          }

          let endYear = timelineDefinition.events[index].end_date?.getFullYear?.();
          if (endYear && endYear < startYear) {
            endYear = undefined;
          }

          const headlineDate = headlineContainer.querySelector('.tl-headline-date');
          if (!headlineDate) {
            return;
          }

          headlineDate.textContent = `${startYear}${endYear ? ` - ${endYear}` : ''}`;
        });
      }

      /*
       * Wait for each slide to be loaded to replace original medium
       * with H5P media instance
       */
      timeline._storyslider._slides.forEach((slide) => {
        if (!slide._media || !h5pMediaInstances[slide.data.unique_id]) {
          return; // No medium or no H5P override, skip
        }

        slide._media.on('loaded', () => {
          const mediaContentDOM = slide._media?._el?.content;
          if (!mediaContentDOM) {
            return;
          }

          while (mediaContentDOM.firstChild) {
            mediaContentDOM.removeChild(mediaContentDOM.firstChild);
          }

          h5pMediaInstances[slide.data.unique_id]?.attach(
            H5P.jQuery(mediaContentDOM),
          );
        });
      });

      setTimelineIsRendered(true);

      window.requestAnimationFrame(() => {
        h5pInstance?.trigger('resize');
      });
    });
  });

  useEffect(() => {
    if (!containerRef.current || !timelineIsRendered) {
      return;
    }

    const container = containerRef.current;

    /*
     * TimelineJS replaces strings that hold a URL with everything but the
     * protocol and wraps it into an anchor tag. That behavior is not desired
     * here. When TimelineJS is done, the DOM elements are replaced.
     */
    Array.from(
      container.querySelectorAll<HTMLAnchorElement>(
        '.h5p-tl-slide-description p a.tl-makelink',
      ),
    ).forEach((element) => {
      const parent: HTMLElement | null = element.parentElement;
      if (parent) {
        parent.innerHTML = parent.innerHTML.replace(
          element.outerHTML,
          element.href,
        );
      }
    });

    // TODO: What do all these timeMarkerObservers actually do? They seem obsolete
    const startClass = 'h5p-tl-slide-is-start';
    const endClass = 'h5p-tl-slide-is-end';

    const timelineElement =
      container.querySelector<HTMLElement>('.tl-timeline');

    const timeMarkers = Array.from(
      container.querySelectorAll<HTMLDivElement>('.tl-timemarker'),
    );

    const timeMarkerObservers = timeMarkers.map(
      (timeMarker, index): MutationObserver => {
        const observer = new MutationObserver((changes) => {
          for (const change of changes) {
            const classListWasChanged = change.attributeName === 'class';
            if (!classListWasChanged) {
              continue;
            }

            const isStartTimeMarker = index === 0;
            if (isStartTimeMarker) {
              const timelineIsAtStart = timeMarker.classList.contains(
                'tl-timemarker-active',
              );

              if (timelineIsAtStart) {
                timelineElement?.classList.add(startClass);
              }
              else {
                timelineElement?.classList.remove(startClass);
              }
            }

            const isEndTimeMarker = index === timeMarkers.length - 1;
            if (isEndTimeMarker) {
              const timelineIsAtEnd = timeMarker.classList.contains(
                'tl-timemarker-active',
              );

              if (timelineIsAtEnd) {
                timelineElement?.classList.add(endClass);
              }
              else {
                timelineElement?.classList.remove(endClass);
              }
            }
          }
        });

        observer.observe(timeMarker, {
          attributes: true,
        });

        return observer;
      }
    );

    const slideTextElements =
      container.querySelectorAll<HTMLDivElement>('.tl-text');
    addTabIndexToScrollableElements(slideTextElements);

    const slideContainer =
      container.querySelector<HTMLDivElement>('.tl-storyslider');

    if (!slideContainer) {
      return;
    }

    return () => {
      timeMarkerObservers.forEach((obs) => obs.disconnect());
    };
  }, [timelineIsRendered, translations]);

  const className = [
    'h5p-timeline-wrapper',
    classNames,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={className}>
      <div id={containerId} />
    </div>
  );
};
