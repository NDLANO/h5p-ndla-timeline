/* TimelineJS uses dangling underscore */
/* eslint-disable no-underscore-dangle */
import { H5PContentId, Copyright, IH5PContentType, Media } from "h5p-types";
import { Timeline } from "@knight-lab/timelinejs";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { hydrate } from "react-dom";
import { useEffectOnce } from "react-use";
import { L10nContext } from "../../contexts/LocalizationContext";
import { H5P, buildH5PMediaInstance } from "../../H5P/H5P.util";
import { useH5PFullscreenChange } from "../../hooks/useH5PFullscreenChange";
import { Params } from "../../types/Params";
import {
  addTabIndexToScrollableElements,
  createTimelineDefinition,
  getClosestLocaleCode,
} from "../../utils/timeline.utils";
import { CopyrightInformation } from "../CopyrightInformation/CopyrightInformation";
import "./TimeLine.scss";

type TimeLineProps = {
  data: Params;
  timelineTitle: string;
  contentId: H5PContentId;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  data,
  timelineTitle,
  contentId,
}: TimeLineProps) => {
  const [timelineDefinition, classNames] = React.useMemo(
    () => createTimelineDefinition(timelineTitle, data),
    [data, timelineTitle],
  );
  const [height, setHeight] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [timelineIsRendered, setTimelineIsRendered] = useState(false);
  const translations = useContext(L10nContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `timeline-embed-${H5P.createUUID()}`;

  const aspectRatio = 16 / 9;

  const h5pMediaInstances: { [index: string]: IH5PContentType | null } = {};

  useEffectOnce(() => {
    // Build lookup table for slide id => H5P media instance
    [data?.titleSlide, ...(data.timelineItems || [])].forEach(item => {
      if (!item) {
        return;
      }

      const medium: Array<Media> | null =
        item.mediaType === "video" && item.video?.[0].path ? item.video : null;

      h5pMediaInstances[item.id] = buildH5PMediaInstance(
        contentId,
        medium,
        "H5P.Video",
      );
    });
  });

  useEffectOnce(() => {
    // eslint-disable-next-line no-new
    const timeline = new Timeline(containerId, timelineDefinition, {
      language: getClosestLocaleCode(containerRef.current),
    });

    const timelineContainer = containerRef.current?.querySelector(
      `#${containerId}`,
    );

    // Timeline sends out events. No need for Mutation observers.
    timeline.on("loaded", () => {
      if (!timelineContainer) {
        return;
      }

      /*
       * Wait for each slide to be loaded to replace original medium
       * with H5P media instance
       */
      timeline._storyslider._slides.forEach(slide => {
        if (!slide._media || !h5pMediaInstances[slide.data.unique_id]) {
          return; // No medium or no H5P override, skip
        }

        slide._media.on("loaded", () => {
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
    });
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const { width } = container.getBoundingClientRect();
    setHeight(width / aspectRatio);

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const borderBoxSize: ResizeObserverSize = Array.isArray(
          entry.borderBoxSize,
        )
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize;

        const newWidth = borderBoxSize.inlineSize;
        setHeight(newWidth / aspectRatio);
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [aspectRatio]);

  useH5PFullscreenChange(isFullscreen => {
    if (isFullscreen) {
      return;
    }

    // When fullscreen is turned off, we need to trigger Timeline.js'
    // `_updateDisplay` method (https://github.com/NUKnightLab/TimelineJS3/blob/3.8.20/src/js/timeline/Timeline.js#L549).
    // It needs to be updated twice, with a whole frame inbetween, therefore the
    // two double rAFs.

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });
  });

  useEffect(() => {
    if (!containerRef.current || !timelineIsRendered) {
      return;
    }

    const container = containerRef.current;

    Array.from(
      container.querySelectorAll<HTMLElement>(".h5p-tl-copyright-information"),
    ).forEach(element => {
      let copyright: Copyright = {};

      try {
        copyright = JSON.parse(element.dataset.copyright ?? "{}");

        if (copyright.source) {
          // See `CopyrightInformation.tsx`
          copyright.source = copyright.source.replace("h_t_t_p", "http");
        }
      } catch (error) {
        console.error(error);
      }

      hydrate(
        <L10nContext.Provider value={translations}>
          <CopyrightInformation copyright={copyright} />
        </L10nContext.Provider>,
        element.parentElement,
      );
    });

    /*
     * TimelineJS replaces strings that hold a URL with everything but the
     * protocol and wraps it into an anchor tag. That behavior is not desired
     * here. When TimelineJS is done, the DOM elements are replaced.
     */
    Array.from(
      container.querySelectorAll<HTMLAnchorElement>(
        ".h5p-tl-slide-description p a.tl-makelink",
      ),
    ).forEach(element => {
      const parent: HTMLElement | null = element.parentElement;
      if (parent) {
        parent.innerHTML = parent.innerHTML.replace(
          element.outerHTML,
          element.href,
        );
      }
    });

    const startClass = "h5p-tl-slide-is-start";
    const endClass = "h5p-tl-slide-is-end";

    const timelineElement =
      container.querySelector<HTMLElement>(".tl-timeline");

    const timeMarkers = Array.from(
      container.querySelectorAll<HTMLDivElement>(".tl-timemarker"),
    );

    const timeMarkerObservers = timeMarkers.map(
      (timeMarker, index): MutationObserver => {
        const observer = new MutationObserver(changes => {
          for (const change of changes) {
            const classListWasChanged = change.attributeName === "class";
            if (!classListWasChanged) {
              continue;
            }

            const isStartTimeMarker = index === 0;
            if (isStartTimeMarker) {
              const timelineIsAtStart = timeMarker.classList.contains(
                "tl-timemarker-active",
              );

              if (timelineIsAtStart) {
                timelineElement?.classList.add(startClass);
              } else {
                timelineElement?.classList.remove(startClass);
              }
            }

            const isEndTimeMarker = index === timeMarkers.length - 1;
            if (isEndTimeMarker) {
              const timelineIsAtEnd = timeMarker.classList.contains(
                "tl-timemarker-active",
              );

              if (timelineIsAtEnd) {
                timelineElement?.classList.add(endClass);
              } else {
                timelineElement?.classList.remove(endClass);
              }
            }
          }
        });

        observer.observe(timeMarker, {
          attributes: true,
        });

        return observer;
      },
    );

    const slideTextElements =
      container.querySelectorAll<HTMLDivElement>(".tl-text");
    addTabIndexToScrollableElements(slideTextElements);

    const slideContainer =
      container.querySelector<HTMLDivElement>(".tl-storyslider");

    if (!slideContainer) {
      return;
    }

    const setSlideContainerHeight = (): void => {
      const { height: newSlideHeight, width: newSlideWidth } =
        slideContainer.getBoundingClientRect();
      setSlideHeight(newSlideHeight);
      setSlideWidth(newSlideWidth);
    };

    setSlideContainerHeight();

    const observer = new ResizeObserver(() => {
      setSlideContainerHeight();
    });

    observer.observe(slideContainer);

    return () => {
      timeMarkerObservers.forEach(obs => obs.disconnect());
      observer.disconnect();
    };
  }, [timelineIsRendered, translations]);

  const style: React.CSSProperties = {
    height,
  };

  if (slideHeight > 0) {
    // @ts-expect-error CSS custom properties should be allowed
    style["--h5p-timeline-slide-height"] = `${slideHeight}px`;
  }

  const className = [
    "h5p-timeline-wrapper",
    classNames,
    slideWidth > 1180 ? `timeline-large-text` : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={className} style={style}>
      <div id={containerId} />
    </div>
  );
};
