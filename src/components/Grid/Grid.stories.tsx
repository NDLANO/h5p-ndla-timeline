import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Grid } from './Grid';
import { EventItemType } from '../../types/EventItemType';

export default {
  title: 'Organisms/Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>;

const eventItem: EventItemType<'regular'> = {
  id: '1',
  title: 'Dainty green tree frog',
  description: {
    params: {
      text: 'The dainty green tree frog (Ranoidea gracilenta), also known as the graceful tree frog, is a tree frog native to eastern Queensland, and north-eastern New South Wales, Australia. (Wikipedia)',
    }
  },
  mediaType: 'image',
  slideType: 'regular',
  image: {
    path: 'https://images.unsplash.com/photo-1502403421222-2ae1f0a65fe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1779&q=80',
    alt: 'Dainty tree frog hiding in a waterlily flower',
    copyright: {
      author: 'David Clode',
      source: 'https://unsplash.com/photos/IY9bfJAM2zM',
      license: 'Unsplash License',
      title: 'Dainty tree frog hiding in a watelily flower',
      version: '1',
      year: '2017',
    },
    height: 1583,
    width: 2400,
    mime: 'image/jpg',
  },
  layout: 'custom',
  eventContent: {
    items: [],
  },
  startDate: '2010',
  tags: [
    {
      id: 'tag-1',
      color: '#93c0a4',
      name: 'Eton blue tag',
    },
    {
      id: 'tag-2',
      color: '#eabda8',
      name: 'Desert sand tag',
    },
  ],
  appearance: { backgroundType: 'none' },
};

const defaultArgs: React.ComponentPropsWithoutRef<typeof Grid> = {
  eventItem,
};

export const WithItems: ComponentStory<typeof Grid> = () => {
  const args: React.ComponentPropsWithoutRef<typeof Grid> = {
    ...defaultArgs,
    eventItem: {
      ...eventItem,
      eventContent: {
        ...(eventItem.eventContent ?? {}),
        items: [
          {
            id: '1',
            width: 50,
            height: 25,
            x: 3,
            y: 5,
            type: 'media',
          },
          {
            id: '2',
            type: 'title',
            width: 30,
            height: 10,
            x: 50,
            y: 20,
          },
          {
            id: '3',
            type: 'textContent',
            width: 50,
            height: 10,
            x: 50,
            y: 30,
          },
        ],
      },
    },
  };
  return <Grid {...args} />;
};
export const WithoutItems: ComponentStory<typeof Grid> = () => {
  const args: React.ComponentPropsWithoutRef<typeof Grid> = { ...defaultArgs };
  return <Grid {...args} />;
};
