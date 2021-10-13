/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimelineSlideItem, TimelineSlideItemProps } from "./TimelineSlideItem";

export default {
  title: "Molecules/TopicMapItem",
  component: TimelineSlideItem,
} as ComponentMeta<typeof TimelineSlideItem>;

const defaultArgs: TimelineSlideItemProps = {
  backgroundImage: "",
  title: "Title",
  editAction: console.info,
};

export const NoContainer: ComponentStory<typeof TimelineSlideItem> = () => {
  const args: TimelineSlideItemProps = { ...defaultArgs };
  return <TimelineSlideItem {...args} />;
};
