import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TimelineSlideItem, TimelineSlideItemProps } from './TimelineSlideItem';

export default {
  title: 'Molecules/Timeline Slide Item',
  component: TimelineSlideItem,
} as ComponentMeta<typeof TimelineSlideItem>;

const defaultArgs: TimelineSlideItemProps = {
  title: 'Title',
  // eslint-disable-next-line no-console
  editAction: console.info,
};

export const NoContainer: ComponentStory<typeof TimelineSlideItem> = () => {
  const args: TimelineSlideItemProps = { ...defaultArgs };
  return <TimelineSlideItem {...args} />;
};
