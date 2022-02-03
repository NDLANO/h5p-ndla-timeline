import { DraggableType } from "../DraggableType";
import { EventItemType } from "../EventItemType";
import { Translations } from "../Translations";

export type Params = {
  behaviour?: unknown;

  ndlaTimeline?: {
    draggableItems: Array<DraggableType>;
    eventItems: Array<EventItemType>;
  };

  l10n?: Translations;
};
