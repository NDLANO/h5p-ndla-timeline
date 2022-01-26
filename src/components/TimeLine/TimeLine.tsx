/* eslint-disable @typescript-eslint/no-var-requires, no-new */
import * as React from "react";
import * as ReactDOM from "react-dom";
import TL from "@knight-lab/timelinejs";

export type TimeLineProps = {
  timelineDefinition: any;
  title: JSX.Element;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  timelineDefinition,
  title,
}: TimeLineProps) => {
  React.useEffect(() => {
    // Update the document title using the browser API
    new TL.Timeline("timeline-embed", timelineDefinition, { height: "100%" });
    requestAnimationFrame(() => {
      ReactDOM.render(title, document.getElementById("timeline_title_slide"));
    });
  }, [timelineDefinition]);

  return <div id="timeline-embed" />;
};
