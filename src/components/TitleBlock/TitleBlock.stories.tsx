/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TitleBlock } from "./TitleBlock";

export default {
  title: "Molecules/Title block",
  component: TitleBlock,
} as ComponentMeta<typeof TitleBlock>;

const defaultArgs: React.ComponentPropsWithoutRef<typeof TitleBlock> = {
  title: "Title",
};

export const Default: ComponentStory<typeof TitleBlock> = () => {
  const args: React.ComponentPropsWithoutRef<typeof TitleBlock> = {
    ...defaultArgs,
  };
  return <TitleBlock {...args} />;
};
