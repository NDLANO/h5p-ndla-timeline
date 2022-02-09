import { Category } from "./Category";
import { Era } from "./Era";
import { EventItemType } from "./EventItemType";

export type ParamsData = {
  timelineItems: Array<EventItemType>;
  categories: Array<Category>;
  eras: Array<Era>;
};
