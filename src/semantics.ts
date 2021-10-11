import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";

const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "Timeline editor",
    name: "timeline",
    type: H5PFieldType.Group,
    widget: "timeline",
    importance: "high",
    fields: [],
  } as H5PFieldGroup,
  {
    name: "behaviour",
    type: H5PFieldType.Group,
    label: "Behavioral settings",
    importance: "low",
    fields: [],
  },
  {
    name: "l10n",
    type: H5PFieldType.Group,
    common: true,
    label: "Localize",
    fields: [],
  },
];

console.info(JSON.stringify(semantics));
export default semantics;
