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
        backgroundImage: {
          path: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
          alt: "",
        },
        label: "Sheep in the distance",
        links: [],
        widthPercentage: 50,
        heightPercentage: 25,
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
      {
        id: "3",
        backgroundImage: {
          path: "",
          alt: "",
        },
        label: "",
        links: [],
        widthPercentage: 10,
        heightPercentage: 10,
        xPercentagePosition: 20,
        yPercentagePosition: 40,
      },
    ],
  };
  return <Grid {...args} />;
};
export const WithoutItems: ComponentStory<typeof Grid> = () => {
  const args: React.ComponentPropsWithoutRef<typeof Grid> = { ...defaultArgs };
  return <Grid {...args} />;
};
