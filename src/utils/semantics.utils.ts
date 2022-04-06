import { H5PField, H5PFieldGroup, H5PFieldList } from "h5p-types";
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

export const tagPaletteValues = [
  ["#1d5cff", "#981b1e", "seagreen", "gold"],
  ["#02bfe7", "#e31c3d", "#94bfa2", "#fad980"],
  ["lightblue", "pink", "#e7f4e4", "lightsalmon"],
  ["saddlebrown", "peru", "tan", "linen"],
  ["black", "gray", "#e4e2e0", "white"],
];

export const backgroundPaletteValues = [
  [
    "#757575",
    "#cd2026",
    "#B45918",
    "#3D854D",
    "#1d5cff",
    "#2869B8",
    "#057CB3",
    "#674ea7",
    "#a64d79",
  ],
  [
    "#5c5c5c",
    "#B01C21",
    "#8b4513",
    "#337040",
    "#003ACC",
    "#205493",
    "#04608B",
    "#56418B",
    "#8C4066",
  ],
  [
    "#2e2e2e",
    "#8D161A",
    "#6C350F",
    "#275430",
    "#002EA3",
    "#1A4375",
    "#034563",
    "#351c75",
    "#741b47",
  ],
  [
    "#000000",
    "#6A1114",
    "#48240A",
    "#1A3820",
    "#00237A",
    "#123054",
    "#02293B",
    "#20124d",
    "#4c1130",
  ],
];

export const createTagEditorField = (): H5PFieldGroup => ({
  label: "Tags",
  name: "tags",
  type: "group",
  expanded: false,
  importance: "low",
  fields: [
    {
      label: "Tags",
      name: "tags",
      type: "list",
      min: 0,
      entity: "Tag",
      importance: "low",
      optional: true,
      field: {
        label: "Tag",
        name: "tag",
        importance: "low",
        type: "group",
        fields: [
          {
            label: "Id",
            name: "id",
            type: "text",
            widget: "uuid",
          },
          {
            label: "Name",
            name: "name",
            type: "text",
          },
          {
            label: "Color",
            name: "color",
            type: "text",
            widget: "colorSelector",
            default: "#1d5cff",
            spectrum: {
              showPalette: true,
              palette: tagPaletteValues,
            },
          },
        ],
      },
    },
  ],
});

export const createTagPickerField = (): H5PFieldList => ({
  label: "Tags",
  name: "tags",
  type: "list",
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
    type: "group",
    fields: [
      {
        label: "Id",
        name: "id",
        type: "text",
        widget: "uuid",
      },
      {
        label: "Name",
        name: "name",
        type: "text",
      },
      {
        label: "Color",
        name: "color",
        type: "text",
      },
      {
        label: "Is active",
        name: "isActive",
        type: "text",
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
    type: "text",
    widget: "uuid",
  },
  {
    label: "Slide type",
    name: "slideType",
    type: "text",
    default: slideType,
    widget: "none",
  },
  {
    label: "Title",
    name: "title",
    type: "text",
  },
  {
    label: "Start date",
    description: dateDescription,
    name: "startDate",
    type: "text",
    optional: slideType === "title",
  },
  {
    label: "End date",
    description: dateDescription,
    name: "endDate",
    type: "text",
    optional: true,
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    widget: "html",
    tags: ["p", "br", "strong", "em", "a"],
  },
  {
    label: "Layout",
    name: "layout",
    type: "select",
    default: layoutOptions.textOnRight.value,
    options: Object.values(layoutOptions),
  },
  // {
  //   label: "Event content",
  //   name: "eventContent",
  //   type: "group",
  //   importance: "low",
  //   widget: "NDLATimelineEventLayout",
  //   fields: [
  //     {
  //       label: "Items",
  //       name: "items",
  //       type: "group",
  //       fields: [
  //         {
  //           label: "Id",
  //           name: "id",
  //           type: "text",
  //           widget: "uuid",
  //         },
  //         {
  //           label: "X position",
  //           name: "x",
  //           type: "text",dET
  //           widget: "none",
  //         },
  //         {
  //           label: "Y position",
  //           name: "y",
  //           type: "text",
  //           widget: "none",
  //         },
  //         {
  //           label: "Width",
  //           name: "width",
  //           type: "text",
  //           widget: "none",
  //         },
  //         {
  //           label: "Height",
  //           name: "height",
  //           type: "text",
  //           widget: "none",
  //         },
  //         {
  //           label: "Type",
  //           name: "type",
  //           type: "text",
  //           widget: "none",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Media type",
    name: "mediaType",
    type: "select",
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
        label: "Audio",
        value: "audio",
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
    type: "image",
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
    type: "video",
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
    label: "Audio",
    name: "audio",
    type: "audio",
    widget: "NDLAShowWhen",
    showWhen: {
      rules: [
        {
          field: "mediaType",
          equals: "audio",
        },
      ],
    },
  },
  {
    label: "External link",
    description:
      'Insert a link to external resources. Certain websites will be rendered as specialized embeds, such as Twitter, YouTube, Wikipedia, and Google Maps. See full list in the <a href="https://timeline.knightlab.com/docs/media-types.html" target="_blank" rel="noopener noreferrer">Knightlab docs</a>',
    name: "customMedia",
    type: "text",
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
  {
    label: "Appearance",
    name: "appearance",
    type: "group",
    importance: "low",
    fields: [
      {
        label: "Background",
        name: "backgroundType",
        type: "select",
        default: "none",
        options: [
          {
            label: "Color",
            value: "color",
          },
          {
            label: "Image",
            value: "image",
          },
          {
            label: "None",
            value: "none",
          },
        ],
      },
      {
        // Only used to keep the number of fields within this group to more than 1
        label: "",
        name: "unused_field",
        type: "text",
        widget: "none",
      },
      {
        label: "Background color",
        name: "backgroundColor",
        type: "text",
        widget: "NDLAShowWhen",
        showWhen: {
          rules: [
            {
              field: "backgroundType",
              equals: "color",
            },
          ],
          widget: "colorSelector",
        },
        default: "#757575",
        spectrum: {
          showPalette: true,
          // @ts-expect-error `h5p-types` is missing `showPaletteOnly`, which is used with the `colorSelector` widget
          showPaletteOnly: true,
          palette: backgroundPaletteValues,
        },
      },
      {
        label: "Background image",
        name: "backgroundImage",
        type: "image",
        widget: "NDLAShowWhen",
        showWhen: {
          rules: [
            {
              field: "backgroundType",
              equals: "image",
            },
          ],
        },
      },
    ],
  },
];
