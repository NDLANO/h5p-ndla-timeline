/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeLine, TimeLineProps } from "./TimeLine";
import { Grid } from "../Grid/Grid";
import { EventItemType } from "../../types/EventItemType";
import { GridItem } from "../../types/GridItem";

export default {
  title: "Organisms/TimeLine",
  component: TimeLine,
} as ComponentMeta<typeof TimeLine>;

const items: Array<GridItem> = [
  {
    id: "1",
    width: 50,
    height: 25,
    x: 3,
    y: 5,
    type: "title",
  },
  {
    id: "2",
    width: 50,
    height: 25,
    x: 3,
    y: 5,
    type: "textContent",
  },
];

const eventItem: EventItemType = {
  id: "1",
  title: "This is the title",
  eventContent: {
    items,
  },
};

const gridArgs: React.ComponentPropsWithoutRef<typeof Grid> = {
  eventItem,
};

const defaultArgs: TimeLineProps = {
  data: {
    // @ts-expect-error On its way
    titleSlide: <Grid {...gridArgs} />,
    timelineItems: [
      {
        startDate: "2021",
        id: "event-1",
        title: "2021",
      },
    ],
    categories: [],
    eras: [],
  },
};

export const Empty: ComponentStory<typeof TimeLine> = () => {
  const args: React.ComponentPropsWithoutRef<typeof TimeLine> = {
    ...defaultArgs,
  };
  return <TimeLine {...args} />;
};
