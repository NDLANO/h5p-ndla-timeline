import * as React from "react";
import Timeline from 'timelinejs-react';

export type TimeLineItemProps = {
    events: Slide[],
    title: TitleSlide | undefined,
    options: TimelineOptions | undefined,
};

export const TimeLineItem = (timelineProps:TimeLineItemProps): JSX.Element => {
    return (
        <Timeline
            target={<div className="timeline"/>}
            events={timelineProps.events}
            title={timelineProps.title} // optional
            options={timelineProps.options} // optional
        />
    );
};