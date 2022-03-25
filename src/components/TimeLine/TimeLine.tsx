import { Timeline } from "@knight-lab/timelinejs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { Params } from "../../types/Params";
import { createTimelineDefinition } from "../../utils/timeline.utils";
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

  const containerId = "timeline-embed";

  const aspectRatio = 16 / 9;

  useEffectOnce(() => {
    // Update the document title using the browser API
    // eslint-disable-next-line no-new
    new Timeline(containerId, timelineDefinition, {});
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const { width } = container.getBoundingClientRect();
    setHeight(width / aspectRatio);

    const observer = new ResizeObserver(entries => {
      // eslint-disable-next-line no-restricted-syntax
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
