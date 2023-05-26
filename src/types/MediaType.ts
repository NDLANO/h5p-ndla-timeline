import { H5PAudio, H5PImage, H5PVideo } from 'h5p-types';

export type MediaType =
  | {
      mediaType: 'image';
      image?: H5PImage;
      imageAlt?: string;
    }
  | {
      mediaType: 'video';
      video?: Array<H5PVideo>;
    }
  | {
      mediaType: 'audio';
      audio?: Array<H5PAudio>;
    }
  | {
      mediaType: 'custom';
      customMedia?: string;
    }
  | {
      mediaType: 'none';
    };
