/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLine, TimeLineProps} from "./TimeLine";

export default {
    title: "Atoms/TimeLine",
    component: TimeLine,
  } as ComponentMeta<typeof TimeLine>;
  
  const defaultArgs: TimeLineProps = {
    timelineDefinition: {
        events: [{start_date:{year:2021}, text:{text: "test",},},],
        title: {text:{text: "hei"}}
    }
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
