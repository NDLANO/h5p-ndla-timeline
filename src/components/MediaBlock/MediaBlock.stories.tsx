import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MediaBlock } from './MediaBlock';

type MediaBlockProps = React.ComponentPropsWithoutRef<typeof MediaBlock>;

export default {
  title: 'Atoms/Media block',
  component: MediaBlock,
} as ComponentMeta<typeof MediaBlock>;

const imageArgs: MediaBlockProps = {
  type: 'image',
  media: {
    path: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    alt: 'Giraffe head',
    copyright: {
      author: 'Sian Cooper',
      license: 'Unsplash License',
      source: 'https://unsplash.com/photos/NEJcmvLFcws',
      title: 'Brown and beige giraffe',
      version: '1',
      year: '2019',
    },
  },
};

export const WithImage: ComponentStory<typeof MediaBlock> = () => {
  const args: MediaBlockProps = { ...imageArgs };
  return <MediaBlock {...args} />;
};

const videoArgs: MediaBlockProps = {
  type: 'video',
  media: {
    path: 'https://vod-progressive.akamaized.net/exp=1644842841~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2248%2F25%2F636240088%2F2916081355.mp4~hmac=0f7a3785a048a565ded7a673ae85252d203b06a5c3ed8544d5cd2c1af20f1007/vimeo-prod-skyfire-std-us/01/2248/25/636240088/2916081355.mp4?filename=pexels-cottonbro-9953348.mp4',
    copyright: {
      author: 'Anna Nekrashevich',
      license: 'Pexels License',
      source:
        'https://www.pexels.com/video/person-holding-a-anthurium-flower-7814423/',
      title: 'Person Holding a Anthurium Flower',
      version: '1',
      year: '2021',
    },
  },
};

export const WithVideo: ComponentStory<typeof MediaBlock> = () => {
  const args: MediaBlockProps = { ...videoArgs };
  return <MediaBlock {...args} />;
};
