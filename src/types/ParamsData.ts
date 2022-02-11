import { Category } from "./Category";
import { Era } from "./Era";
import { EventItemType } from "./EventItemType";

export type ParamsData = {
  showTitleSlide: boolean;
  titleSlide?: EventItemType;
  timelineItems?: Array<EventItemType>;
  categories?: Array<Category>;
  eras?: Array<Era>;
};
