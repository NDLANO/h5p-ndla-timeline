/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TitleBlock } from "./TitleBlock";

type TitleBlockProps = React.ComponentPropsWithoutRef<typeof TitleBlock>;

export default {
  title: "Atoms/Title block",
  component: TitleBlock,
} as ComponentMeta<typeof TitleBlock>;

const defaultArgs: TitleBlockProps = {
  title: "Title",
};

export const Default: ComponentStory<typeof TitleBlock> = () => {
  const args: TitleBlockProps = {
    ...defaultArgs,
  };
  return <TitleBlock {...args} />;
};
