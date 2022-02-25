import { EventContent } from "./EventContent";
import { LayoutOption } from "./LayoutOption";
import { MediaType } from "./MediaType";
import { SlideType } from "./SlideType";
import { Tag } from "./Tag";

export type EventItemType<S extends SlideType> = {
  id: string;

  slideType: S;

  title: string;
  description?: string;

  endDate?: string;

  layout: LayoutOption;
  eventContent?: EventContent;
} & MediaType &
  (
    | {
        slideType: "title";
        startDate?: string;
      }
    | {
        slideType: "regular";
        startDate: string;
        tags?: Array<Tag>;
      }
  );
