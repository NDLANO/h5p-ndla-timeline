import * as React from "react";
/// <reference types="timelinejs3" />

export type TimeLineProps = {
  timelineDefinition: TL.ITimelineConfig;
};

export const TimeLine = (timelineProps: TimeLineProps): JSX.Element => {
  React.useEffect(() => {
    const TL = require("@knight-lab/timelinejs");
    // Update the document title using the browser API
    console.log(TL);
    new TL.Timeline("timeline-embed", timelineProps.timelineDefinition);
  });

  return (
    <div id="timeline-embed">
      <span>hello</span>
    </div>
  );
};
