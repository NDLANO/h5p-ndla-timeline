/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLine, TimeLineProps } from "./TimeLine";
import { Grid } from "../Grid/Grid";

export default {
  title: "Organisms/TimeLine",
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

const gridArgs: React.ComponentPropsWithoutRef<typeof Grid> = {
  items: [
    {
      id: "1",
      width: 50,
      height: 75,
      x: 3,
      y: 5,
      type: "title",
    },
  ],
};

const defaultArgs: TimeLineProps = {
  timelineDefinition: {
    events: [
      {
        start_date: { year: 2021 },
      },
    ],
    title: { text: { text: "<div id='timeline_title_slide'/>" } },
  },
  title: <Grid {...gridArgs} />,
  items: [
    {
      startDate: "2021",
      id: "event-1",
      layout: "center",
      title: "2021",
    },
  ],
};

export const Empty: ComponentStory<typeof TimeLine> = () => {
  const args: TimeLineProps = { ...defaultArgs };
  return <TimeLine {...args} />;
};

//   export const WithTitleAndEvent: ComponentStory<typeof TimeLineItem> = () => {
//     const titleSlide:TitleSlide = {
//         text: {headline: "TITLE", text: "title",},
//     };
//     const event:Slide ={
//         start_date: {year: 2021,},
//     };
//     const args: TimeLineItemProps = { ...defaultArgs, title: titleSlide, events: [event], };
//     return <TimeLineItem {...args} />;
//   };
