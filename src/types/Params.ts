import { TimelineData } from "./TimelineData";
import { Translations } from "./Translations";

export type Params = TimelineData & {
  behaviour?: {
    scalingMode: "human" | "cosmological" | "index";
  };

  l10n?: Translations;
};
