import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";

const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "Topic map editor",
    name: "topicMap",
    type: H5PFieldType.Group,
    widget: "topicMap",
    importance: "high",
    fields: [
      {
        label: "Topic map items",
        name: "topicMapItems",
        type: H5PFieldType.List,
        entity: "Topic map item",
        field: {
          name: "topicMapItem",
          type: H5PFieldType.Group,
          fields: [
            {
              label: "Label",
              description: "The label is shown on top of the background image",
              name: "label",
              type: H5PFieldType.Text,
            },
            {
              label: "Background image",
              name: "backgroundImage",
              type: H5PFieldType.Image,
            },
            {
              label: "Links",
              name: "links",
              description:
                "These links are as auxiliary links for the user in the element's modal window",
              type: H5PFieldType.List,
              field: {
                label: "Link",
                name: "link",
                type: H5PFieldType.Text,
              },
            },
          ],
        },
      },
      {
        label: "Arrows",
        name: "arrows",
        type: H5PFieldType.List,
        entity: "Arrow",
        field: {
          name: "arrow",
          type: H5PFieldType.Group,
          fields: [
            {
              name: "showStartHead",
              type: H5PFieldType.Boolean,
              widget: "none",
            },
            {
              name: "showEndHead",
              type: H5PFieldType.Boolean,
              widget: "none",
            },
          ],
        },
      },
    ],
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
