import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tags } from './Tags';

type TagsProps = React.ComponentPropsWithoutRef<typeof Tags>;

export default {
  title: 'Molecules/Tags',
  component: Tags,
} as ComponentMeta<typeof Tags>;

export const Default: ComponentStory<typeof Tags> = () => {
  const args: TagsProps = {
    tags: [
      {
        id: 'tag-1',
        color: 'darkgreen',
        name: 'Dark green tag',
      },
      {
        id: 'tag-2',
        color: 'lightgreen',
        name: 'Light green tag',
      },
    ],
  };
  return <Tags {...args} />;
};
