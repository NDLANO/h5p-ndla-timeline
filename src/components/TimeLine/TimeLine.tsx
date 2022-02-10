import { Timeline } from "@knight-lab/timelinejs";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ParamsData } from "../../types/ParamsData";
import { createTimelineDefinition } from "../../utils/timeline.utils";

export type TimeLineProps = {
  data: ParamsData;
  title: JSX.Element;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  title,
  data,
}: TimeLineProps) => {
  const timelineDefinition = React.useMemo(
    () => createTimelineDefinition(data),
    [data],
  );

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
