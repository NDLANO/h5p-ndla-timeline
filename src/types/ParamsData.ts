import { Tag } from "./Tag";
import { Era } from "./Era";
import { EventItemType } from "./EventItemType";

export type ParamsData = {
  showTitleSlide: boolean;
  titleSlide?: EventItemType<"title">;
  timelineItems?: Array<EventItemType<"regular">>;
  categories?: Array<Tag>;
  eras?: Array<Era>;
};
