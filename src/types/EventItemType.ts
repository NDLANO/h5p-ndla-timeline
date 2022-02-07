import { EventContent } from "./EventContent";
import { Image } from "./H5P/Image";
import { LayoutOption } from "./LayoutOption";

export type EventItemType = {
  id: string;

  title: string;
  image?: Image | undefined;

  startDate?: string;
  endDate?: string;
} & (
  | {
      layout: "custom";
      eventContent?: EventContent;
    }
  | {
      layout: Exclude<LayoutOption, "custom">;
    }
);
