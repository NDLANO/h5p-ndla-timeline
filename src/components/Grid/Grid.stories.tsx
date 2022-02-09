/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid } from "./Grid";

export default {
  title: "Organisms/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const defaultArgs: React.ComponentPropsWithoutRef<typeof Grid> = {
  items: [],
};

export const WithItems: ComponentStory<typeof Grid> = () => {
  const args: React.ComponentPropsWithoutRef<typeof Grid> = {
    ...defaultArgs,
    items: [
      {
        id: "1",
        width: 50,
        height: 25,
        x: 3,
        y: 5,
        type: "image",
      },
      {
        id: "2",
        type: "title",
        width: 30,
        height: 60,
        x: 50,
        y: 30,
      },
      {
        id: "3",
        type: "textContent",
        width: 10,
        height: 10,
        x: 20,
        y: 40,
      },
    ],
  };
  return <Grid {...args} />;
};
export const WithoutItems: ComponentStory<typeof Grid> = () => {
  const args: React.ComponentPropsWithoutRef<typeof Grid> = { ...defaultArgs };
  return <Grid {...args} />;
};
