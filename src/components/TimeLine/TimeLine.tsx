/* eslint-disable @typescript-eslint/no-var-requires, no-new */
import * as React from "react";
/// <reference types="timelinejs3" />
const TL = require("@knight-lab/timelinejs");

export type TimeLineProps = {
  timelineDefinition: TL.ITimelineConfig;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  timelineDefinition,
}: TimeLineProps) => {
  React.useEffect(() => {
    // Update the document title using the browser API
    new TL.Timeline("timeline-embed", timelineDefinition);
  });

  return (
    <div id="timeline-embed">
      <span>hello</span>
    </div>
  );
};
