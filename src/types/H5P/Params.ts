import { DraggableType } from "../DraggableType";
import { EventItemType } from "../EventItemType";

export type Params = {
  behaviour?: unknown;

  ndlaTimeline?: {
    draggableItems: Array<DraggableType>;
    eventItems: Array<EventItemType>;
  };
};
