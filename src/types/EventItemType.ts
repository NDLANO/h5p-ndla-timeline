import { EventContent } from "./EventContent";
import { Image } from "./H5P/Image";

export type EventItemType = {
  id: string;

  title: string;
  image?: Image | undefined;

  startDate?: string;
  endDate?: string;

  eventContent?: EventContent;
};
