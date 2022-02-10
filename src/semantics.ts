import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PFieldGroup } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";
import { layoutOptions } from "./utils/layout.utils";

export const semantics: Readonly<[H5PFieldGroup, H5PBehaviour, H5PL10n]> = [
  {
    label: "NDLA Timeline editor",
    name: "ndlaTimeline",
    type: H5PFieldType.Group,
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
              label: "Event content",
              name: "eventContent",
              type: H5PFieldType.Group,
              importance: "low",
              widget: "NDLATimelineEventLayout",
              fields: [
                {
                  label: "Items",
                  name: "items",
                  type: H5PFieldType.Group,
                  fields: [
                    {
                      label: "Id",
                      name: "id",
                      type: H5PFieldType.Text,
                      widget: "none",
                    },
                    {
                      label: "X position",
                      name: "x",
                      type: H5PFieldType.Text,
                      widget: "none",
                    },
                    {
                      label: "Y position",
                      name: "y",
                      type: H5PFieldType.Text,
                      widget: "none",
                    },
                    {
                      label: "Width",
                      name: "width",
                      type: H5PFieldType.Text,
                      widget: "none",
                    },
                    {
                      label: "Height",
                      name: "height",
                      type: H5PFieldType.Text,
                      widget: "none",
                    },
                    {
                      label: "Type",
                      name: "type",
                      type: H5PFieldType.Text,
                      widget: "none",
                    },
                  ],
                },
              ],
            },
            {
              label: "Image",
              name: "image",
              type: H5PFieldType.Image,
            },
            {
              label: "Start date",
              description:
                "YYYY-MM-DD — only year is required. Years can be negative.",
              name: "startDate",
              type: H5PFieldType.Text,
            },
            {
              label: "End date",
              description:
                "YYYY-MM-DD — only year is required. Years can be negative.",
              name: "endDate",
              type: H5PFieldType.Text,
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
