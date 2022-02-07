import type { TimelineDefinition } from "@knight-lab/timelinejs";
import { Timeline } from "@knight-lab/timelinejs";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { EventItemType } from "../../types/EventItemType";

export type TimeLineProps = {
  timelineDefinition: TimelineDefinition;
  title: JSX.Element;
  items: Array<EventItemType>;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  timelineDefinition,
  title,
}: TimeLineProps) => {
  const containerId = "timeline-embed";

  React.useEffect(() => {
    // Update the document title using the browser API
    const timeline = new Timeline(containerId, timelineDefinition, {
      height: "100%",
      width: "100%",
      source: timelineDefinition,
    });
    requestAnimationFrame(() => {
      ReactDOM.render(title, document.getElementById("timeline_title_slide"));
    });
  }, [timelineDefinition, title]);

  return <div id={containerId} />;
};
