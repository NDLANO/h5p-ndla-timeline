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
  const [height, setHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `timeline-embed-${H5P.createUUID()}`;

  const aspectRatio = 16 / 9;

  useEffectOnce(() => {
    // eslint-disable-next-line no-new
    new Timeline(containerId, timelineDefinition, {
      language: getClosestLocaleCode(containerRef.current),
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
      observer.unobserve(container);
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

  return (
    <div
      ref={containerRef}
      className={`h5p-timeline-wrapper ${classNames ?? ""}`}
      style={{ height }}
    >
      <div id={containerId} />
    </div>
  );
};
