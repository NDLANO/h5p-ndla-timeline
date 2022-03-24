import { EventContent } from "./EventContent";
import { Image } from "./H5P/Image";
import { LayoutOption } from "./LayoutOption";
import { MediaType } from "./MediaType";
import { SlideType } from "./SlideType";
import { Tag } from "./Tag";

export type EventItemType<S extends SlideType> = {
  id: string;

  slideType: S;

  description?: string;

  endDate?: string;

  layout: LayoutOption;
  eventContent?: EventContent;

  appearance:
    | {
        backgroundType: "none";
      }
    | {
        backgroundType: "color";
        backgroundColor?: string;
      }
    | {
        backgroundType: "image";
        backgroundImage?: Image;
      };
} & MediaType &
  (
    | {
        title?: string;
        slideType: "title";
        startDate?: string;
      }
    | {
        title: string;
        slideType: "regular";
        startDate: string;
        tags?: Array<Tag>;
      }
  );
