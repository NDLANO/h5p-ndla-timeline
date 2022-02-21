import { EventContent } from "./EventContent";
import { MediaType } from "./MediaType";

export type EventItemType = {
  id: string;

  title: string;
  description?: string;

  startDate?: string;
  endDate?: string;

  eventContent?: EventContent;
} & MediaType;
