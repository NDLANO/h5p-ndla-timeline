import { Timeline } from "@knight-lab/timelinejs";
import * as React from "react";
import { ParamsData } from "../../types/ParamsData";
import { createTimelineDefinition } from "../../utils/timeline.utils";

export type TimeLineProps = {
  data: ParamsData;
  timelineTitle: string;
};

export const TimeLine: React.FC<TimeLineProps> = ({
  timelineTitle,
  data,
}: TimeLineProps) => {
  // const titleSlide = React.useMemo(
  //   () => (data.titleSlide ? <Grid eventItem={data.titleSlide} /> : null),
  //   [data.titleSlide],
  // );

  const timelineDefinition = React.useMemo(
    () => createTimelineDefinition(timelineTitle, data),
    [data, timelineTitle],
  );

  const containerId = "timeline-embed";

  React.useEffect(() => {
    timelineDefinition.then(definition => {
      // Update the document title using the browser API
      // eslint-disable-next-line no-new
      new Timeline(containerId, definition, {
        height: "100%",
        width: "100%",
        source: definition,
      });
    });

    // if (titleSlide) {
    //   requestAnimationFrame(() => {
    //     ReactDOM.render(
    //       titleSlide,
    //       document.getElementById("timeline_title_slide"),
    //     );
    //   });
    // }
  }, [timelineDefinition]);

  return <div id={containerId} />;
};
