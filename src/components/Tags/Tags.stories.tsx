/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tags } from "./Tags";

type TagsProps = React.ComponentPropsWithoutRef<typeof Tags>;

export default {
  title: "Molecules/Tags",
  component: Tags,
} as ComponentMeta<typeof Tags>;

export const Default: ComponentStory<typeof Tags> = () => {
  const args: TagsProps = {
    tags: [
      {
        color: "darkgreen",
        name: "Dark green tag",
      },
      {
        color: "lightgreen",
        name: "Light green tag",
      },
    ],
  };
  return <Tags {...args} />;
};
