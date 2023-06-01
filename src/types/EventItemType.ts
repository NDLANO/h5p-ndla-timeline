import { H5PCopyright, H5PImage } from 'h5p-types';
import { EventContent } from './EventContent';
import { LayoutOption } from './LayoutOption';
import { MediaType } from './MediaType';
import { SlideType } from './SlideType';
import { Tag } from './Tag';

export type EventItemType<S extends SlideType> = {
  id: string;

  slideType: S;

  description?: string;
  descriptionCopyright?: H5PCopyright;

  endDate?: string;

  layout: LayoutOption;
  eventContent?: EventContent;

  appearance:
    | {
        backgroundType: 'none';
      }
    | {
        backgroundType: 'color';
        backgroundColor?: string;
      }
    | {
        backgroundType: 'image';
        backgroundImage?: H5PImage;
      };
} & MediaType &
  (
    | {
        title?: string;
        slideType: 'title';
        startDate?: string;
      }
    | {
        title: string;
        slideType: 'regular';
        startDate: string;
        tags?: Array<Tag>;
      }
  );
