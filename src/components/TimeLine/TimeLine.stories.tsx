/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLine, TimeLineProps } from "./TimeLine";
import { Grid, GridProps } from "../Grid/Grid";

export default {
  title: "Atoms/TimeLine",
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

const gridArgs: GridProps = {
  items: [
    {
      id: "1",
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
        alt: "",
      },
      label: "Sheep in the distance",
      links: [],
      widthPercentage: 50,
      heightPercentage: 75,
      xPercentagePosition: 3,
      yPercentagePosition: 5,
    },
    {
      id: "2",
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1533415648777-407b626eb0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
        alt: "",
      },
      label: "Sheep close up",
      links: [],
      widthPercentage: 30,
      heightPercentage: 60,
      xPercentagePosition: 50,
      yPercentagePosition: 30,
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
