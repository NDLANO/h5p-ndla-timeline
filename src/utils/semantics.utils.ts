import { H5PField, H5PFieldGroup, H5PFieldList } from "../types/H5P/H5PField";
import { H5PFieldType } from "../types/H5P/H5PFieldType";
import { layoutOptions } from "./layout.utils";

export const dateDescription =
  "YYYY-MM-DD — only year is required. Years can be negative.";

export const scaleValues = {
  human: {
    label: "Human time",
    value: "human",
  },
  cosmological: {
    label: "Cosmological time",
    value: "cosmological",
  },
  indexed: {
    label: "Indexed",
    value: "index",
  },
};

export const createTagEditorField = (): H5PFieldGroup => ({
  label: "Tags",
  name: "tags",
  type: H5PFieldType.Group,
  expanded: false,
  importance: "low",
  fields: [
    {
      label: "Tags",
      name: "tags",
      type: H5PFieldType.List,
      min: 0,
      entity: "Tag",
      importance: "low",
      optional: true,
      field: {
        label: "Tag",
        name: "tag",
        importance: "low",
        type: H5PFieldType.Group,
        fields: [
          {
            label: "Id",
            name: "id",
            type: H5PFieldType.Text,
            widget: "uuid",
          },
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
  ],
});

export const createTagPickerField = (): H5PFieldList => ({
  label: "Tags",
  name: "tags",
  type: H5PFieldType.List,
  entity: "Tag",
  importance: "low",
  optional: true,
  min: 0,
  widget: "NDLATagsPicker",
  fieldNameToWatch: "tags",
  field: {
    label: "Tag",
    name: "tag",
    importance: "low",
    type: H5PFieldType.Group,
    fields: [
      {
        label: "Id",
        name: "id",
        type: H5PFieldType.Text,
        widget: "uuid",
      },
      {
        label: "Name",
        name: "name",
        type: H5PFieldType.Text,
      },
      {
        label: "Color",
        name: "color",
        type: H5PFieldType.Text,
      },
      {
        label: "Is active",
        name: "isActive",
        type: H5PFieldType.Text,
      },
    ],
  },
});

export const createTimelineItemFields = (
  slideType: "title" | "regular",
): Array<H5PField> => [
  {
    label: "Id",
    name: "id",
    type: H5PFieldType.Text,
    widget: "uuid",
  },
  {
    label: "Slide type",
    name: "slideType",
    type: H5PFieldType.Text,
    default: slideType,
    widget: "none",
  },
  {
    label: "Title",
    name: "title",
    type: H5PFieldType.Text,
  },
  {
    label: "Start date",
    description: dateDescription,
    name: "startDate",
    type: H5PFieldType.Text,
    optional: slideType === "title",
  },
  {
    label: "End date",
    description: dateDescription,
    name: "endDate",
    type: H5PFieldType.Text,
    optional: true,
  },
  {
    label: "Description",
    name: "description",
    type: H5PFieldType.Text,
    widget: "html",
    tags: ["p", "br", "strong", "em", "a"],
  },
  {
    label: "Layout",
    name: "layout",
    type: H5PFieldType.Select,
    default: layoutOptions.textOnRight.value,
    options: Object.values(layoutOptions),
  },
  // {
  //   label: "Event content",
  //   name: "eventContent",
  //   type: H5PFieldType.Group,
  //   importance: "low",
  //   widget: "NDLATimelineEventLayout",
  //   fields: [
  //     {
  //       label: "Items",
  //       name: "items",
  //       type: H5PFieldType.Group,
  //       fields: [
  //         {
  //           label: "Id",
  //           name: "id",
  //           type: H5PFieldType.Text,
  //           widget: "uuid",
  //         },
  //         {
  //           label: "X position",
  //           name: "x",
  //           type: H5PFieldType.Text,dET
  //           widget: "none",
  //         },
  //         {
  //           label: "Y position",
  //           name: "y",
  //           type: H5PFieldType.Text,
  //           widget: "none",
  //         },
  //         {
  //           label: "Width",
  //           name: "width",
  //           type: H5PFieldType.Text,
  //           widget: "none",
  //         },
  //         {
  //           label: "Height",
  //           name: "height",
  //           type: H5PFieldType.Text,
  //           widget: "none",
  //         },
  //         {
  //           label: "Type",
  //           name: "type",
  //           type: H5PFieldType.Text,
  //           widget: "none",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Media type",
    name: "mediaType",
    type: H5PFieldType.Select,
    options: [
      {
        label: "Image",
        value: "image",
      },
      {
        label: "Video",
        value: "video",
      },
      {
        label: "External link",
        value: "custom",
      },
      {
        label: "None",
        value: "none",
      },
    ],
    default: "image",
  },
  {
    label: "Image",
    name: "image",
    type: H5PFieldType.Image,
    widget: "NDLAShowWhen",
    showWhen: {
      rules: [
        {
          field: "mediaType",
          equals: "image",
        },
      ],
    },
  },
  {
    label: "Video",
    name: "video",
    type: H5PFieldType.Video,
    widget: "NDLAShowWhen",
    showWhen: {
      rules: [
        {
          field: "mediaType",
          equals: "video",
        },
      ],
    },
  },
  {
    label: "External link",
    description:
      'Insert a link to external resources. Certain websites will be rendered as specialized embeds, such as Twitter, YouTube, Wikipedia, and Google Maps. See full list in the <a href="https://timeline.knightlab.com/docs/media-types.html" target="_blank" rel="noopener noreferrer">Knightlab docs</a>',
    name: "customMedia",
    type: H5PFieldType.Text,
    widget: "NDLAShowWhen",
    showWhen: {
      rules: [
        {
          field: "mediaType",
          equals: "custom",
        },
      ],
    },
  },
  ...(slideType === "regular" ? [createTagPickerField()] : []),
];
