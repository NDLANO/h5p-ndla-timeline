import { Era } from "./Era";
import { EventItemType } from "./EventItemType";
import { Tag } from "./Tag";

export type TimelineData = {
  showTitleSlide: boolean;
  titleSlide?: EventItemType<"title">;
  timelineItems?: Array<EventItemType<"regular">>;
  categories?: Array<Tag>;
  eras?: Array<Era>;
};
