import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";

export const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "NDLA Timeline editor",
    name: "ndlaTimeline",
    type: H5PFieldType.Group,
    widget: "ndlaTimeline",
    importance: "high",
    fields: [
      {
        label: "Timeline items",
        name: "timelineItems",
        type: H5PFieldType.List,
        entity: "Timeline item",
        importance: "low",
        field: {
          label: "Item",
          name: "timelineItem",
          importance: "low",
          type: H5PFieldType.Group,

          fields: [
            {
              label: "Title",
              description: "The title shown on in the content.",
              name: "label",
              type: H5PFieldType.Text,
            },
            {
              name: "eventContent",
              type: H5PFieldType.Group,
              label: "Event content",
              importance: "low",
              fields: [
                {
                  label: "Id",
                  name: "id",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
                {
                  label: "X-position in percentages",
                  name: "xPercentagePosition",
                  type: H5PFieldType.Number,
                  widget: "none",
                },
                {
                  label: "Y-position in percentages",
                  name: "yPercentagePosition",
                  type: H5PFieldType.Number,
                  widget: "none",
                },
                {
                  label: "Width as a percentage of container width",
                  name: "widthPercentage",
                  type: H5PFieldType.Number,
                  widget: "none",
                },
                {
                  label: "Height as a percentage of container height",
                  name: "heightPercentage",
                  type: H5PFieldType.Number,
                  widget: "none",
                },
              ],
            },
            {
              label: "Layout",
              name: "layout",
              type: H5PFieldType.Select,
              importance: "low",
              default: "right",
              options: [
                {
                  label: "Text on right (standard)",
                  value: "right",
                },
                {
                  label: "Text on left",
                  value: "left",
                },
                {
                  label: "Centered (Text only)",
                  value: "center",
                },
                {
                  label: "Custom",
                  value: "custom",
                },
              ],
            },
            {
              label: "Image",
              name: "backgroundImage",
              type: H5PFieldType.Image,
            },
          ],
        },
      },
      {
        label: "Categories",
        name: "categories",
        type: H5PFieldType.List,
        entity: "Category",
        importance: "low",
        field: {
          label: "Category",
          name: "category",
          importance: "low",
          type: H5PFieldType.Group,

          fields: [
            {
              label: "Name",
              name: "name",
              type: H5PFieldType.Text,
            },
            {
              label: "Color",
              name: "color",
              type: H5PFieldType.Text,
              widget: "colorSelector",
            },
          ],
        },
      },
      {
        label: "Eras",
        name: "eras",
        type: H5PFieldType.List,
        entity: "Era",
        importance: "low",
        field: {
          label: "Era",
          name: "era",
          importance: "low",
          type: H5PFieldType.Group,

          fields: [
            {
              label: "Name",
              name: "name",
              type: H5PFieldType.Text,
            },
            {
              label: "Color",
              name: "color",
              type: H5PFieldType.Text,
              widget: "colorSelector",
            },
            {
              label: "Start date",
              name: "startDate",
              type: H5PFieldType.Text,
            },
            {
              label: "End date",
              name: "endDate",
              type: H5PFieldType.Text,
            },
          ],
        },
      },
    ],
  },
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
