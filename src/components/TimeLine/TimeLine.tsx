import { Timeline } from "@knight-lab/timelinejs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { H5P } from "../../H5P/H5P.util";
import { useH5PFullscreenChange } from "../../hooks/useH5PFullscreenChange";
import { Params } from "../../types/Params";
import {
  createTimelineDefinition,
  getClosestLocaleCode,
} from "../../utils/timeline.utils";
import "./TimeLine.scss";

type TimeLineProps = {
  data: Params;
  timelineTitle: string;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  data,
  timelineTitle,
}: TimeLineProps) => {
  const [timelineDefinition, classNames] = React.useMemo(
    () => createTimelineDefinition(timelineTitle, data),
    [data, timelineTitle],
  );
  const [height, setHeight] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const [timelineIsRendered, setTimelineIsRendered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `timeline-embed-${H5P.createUUID()}`;

  const aspectRatio = 16 / 9;

  useEffectOnce(() => {
    // eslint-disable-next-line no-new
    new Timeline(containerId, timelineDefinition, {
      language: getClosestLocaleCode(containerRef.current),
    });

    const timelineContainer = containerRef.current?.querySelector(
      `#${containerId}`,
    );

    if (timelineContainer) {
      const mutationObserver = new MutationObserver(changes => {
        changes.forEach(() => {
          if (!timelineContainer) {
            return;
          }

          const nodeNowHasElements = timelineContainer.childElementCount > 0;
          if (nodeNowHasElements) {
            setTimelineIsRendered(true);
            mutationObserver.disconnect();
          }
        });
      });

      mutationObserver.observe(timelineContainer, {
        childList: true,
      });
    }
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

    const slideContainer =
      containerRef.current.querySelector<HTMLDivElement>(".tl-storyslider");

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
      observer.disconnect();
    };
  }, [timelineIsRendered]);

  const style: React.CSSProperties = {
    height,
  };

  if (slideHeight > 0) {
    // @ts-expect-error CSS custom properties should be allowed
    style["--h5p-timeline-slide-height"] = `${slideHeight}px`;
  }

  return (
    <div
      ref={containerRef}
      className={`h5p-timeline-wrapper ${classNames ?? ""} ${
        slideWidth > 800 ? `timeline-large-text` : ""
      }`}
      style={style}
    >
      <div id={containerId} />
    </div>
  );
};
