/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLineItem, TimeLineItemProps} from "./TimeLine";

export default {
    title: "Atoms/TimeLine",
    component: TimeLineItem,
  } as ComponentMeta<typeof TimeLineItem>;
  
  const defaultArgs: TimelineItemProps = {
    events: [],
  };


  export const Empty: ComponentStory<typeof TimeLineItem> = () => {
    const args: TimeLineItemProps = { ...defaultArgs };
    return <TimeLineItem {...args} />;
  };

  export const WithTitleAndEvent: ComponentStory<typeof TimeLineItem> = () => {
    const titleSlide:TitleSlide = {
        text: {headline: "TITLE", text: "title",},
    };
    const event:Slide ={
        start_date: {year: 2021,},
    };
    const args: TimeLineItemProps = { ...defaultArgs, title: titleSlide, events: [event], };
    return <TimeLineItem {...args} />;
  };
