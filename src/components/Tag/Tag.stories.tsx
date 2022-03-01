/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tag } from "./Tag";

type TagProps = React.ComponentPropsWithoutRef<typeof Tag>;

export default {
  title: "Atoms/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const DarkBackground: ComponentStory<typeof Tag> = () => {
  const args: TagProps = {
    tag: {
      id: "tag-1",
      color: "darkgreen",
      name: "Dark green tag",
    },
  };
  return <Tag {...args} />;
};

export const LightBackground: ComponentStory<typeof Tag> = () => {
  const args: TagProps = {
    tag: {
      id: "tag-1",
      color: "lightgreen",
      name: "Light green tag",
    },
  };
  return <Tag {...args} />;
};
