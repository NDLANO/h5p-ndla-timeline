import { EventContent } from "./EventContent";
import { LayoutOption } from "./LayoutOption";
import { MediaType } from "./MediaType";

export type EventItemType = {
  id: string;

  title: string;
  description?: string;

  startDate?: string;
  endDate?: string;

  layout: LayoutOption;
  eventContent?: EventContent;
} & MediaType;
