import { EventContent } from "./EventContent";
import { Image } from "./H5P/Image";
import { Video } from "./H5P/Video";

export type EventItemType = {
  id: string;

  title: string;
  description?: string;

  mediaType: "image" | "video";
  image?: Image;
  video?: Video;

  startDate?: string;
  endDate?: string;
  categories?: Array<string>;
  eventContent?: EventContent;
};
