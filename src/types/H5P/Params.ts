import { TimelineData } from "../TimelineData";
import { Translations } from "../Translations";

export type Params = TimelineData & {
  behaviour?: unknown;
  l10n?: Translations;
};
