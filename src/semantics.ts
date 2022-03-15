import { H5PBehaviour } from "./types/H5P/H5PBehaviour";
import { H5PField } from "./types/H5P/H5PField";
import { H5PFieldType } from "./types/H5P/H5PFieldType";
import { H5PL10n } from "./types/H5P/H5PL10n";
import {
  createTagEditorField,
  createTimelineItemFields,
  scaleValues,
} from "./utils/semantics.utils";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Show title slide",
    name: "showTitleSlide",
    type: H5PFieldType.Boolean,
    default: false,
  },
  {
    label: "Title slide",
    name: "titleSlide",
    importance: "low",
    type: H5PFieldType.Group,
    fields: [...createTimelineItemFields("title")],
    widget: "NDLAShowWhen",
    showWhen: {
      rules: [
        {
          field: "showTitleSlide",
          equals: true,
        },
      ],
    },
  },
  {
    label: "Timeline items",
    name: "timelineItems",
    type: H5PFieldType.List,
    entity: "Timeline item",
    importance: "low",
    widgets: [
      {
        name: "VerticalTabs",
        label: "Default",
      },
    ],
    field: {
      label: "Item",
      name: "timelineItem",
      importance: "low",
      type: H5PFieldType.Group,
      fields: [...createTimelineItemFields("regular")],
    },
  },
  createTagEditorField(),
  {
    label: "Eras",
    name: "eras",
    type: H5PFieldType.List,
    entity: "Era",
    importance: "low",
    optional: true,
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

  {
    name: "behaviour",
    type: H5PFieldType.Group,
    label: "Behavioral settings",
    importance: "low",
    fields: [
      {
        // Unused field, therefore no label. It is only here because behavioral settings needs at least two items.
        label: "",
        name: "unused",
        type: H5PFieldType.Select,
        options: [],
        default: "",
        widget: "none",
      },
      {
        label: "Scaling mode",
        description: `Choose between scaling modes. "Human time" shows date in years before and after the Common Era using regular notation, while "Cosmological time" shows dates using scientific notation. "Indexed" is useful when you want to skew timeframes and make all events seem equally far apart.`,
        type: H5PFieldType.Select,
        name: "scalingMode",
        options: Object.values(scaleValues),
        default: scaleValues.human.value,
      },
    ],
  },
  {
    name: "l10n",
    type: H5PFieldType.Group,
    common: true,
    label: "Localize",
    fields: [],
  },
];
