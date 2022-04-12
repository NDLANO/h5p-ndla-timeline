import { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";
import {
  createL10nField,
  createTagEditorField,
  createTimelineItemFields,
  dateDescription,
  scaleValues,
} from "./utils/semantics.utils";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Show title slide",
    name: "showTitleSlide",
    type: "boolean",
    default: false,
  },
  {
    label: "Title slide",
    name: "titleSlide",
    importance: "low",
    type: "group",
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
    type: "list",
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
      type: "group",
      fields: [...createTimelineItemFields("regular")],
    },
  },
  createTagEditorField(),
  {
    label: "Eras",
    name: "eras",
    type: "group",
    expanded: false,
    importance: "low",
    fields: [
      {
        label: "Eras",
        name: "eras",
        type: "list",
        entity: "Era",
        importance: "low",
        optional: true,
        min: 0,
        field: {
          label: "Era",
          name: "era",
          importance: "low",
          type: "group",

          fields: [
            {
              label: "Name",
              name: "name",
              type: "text",
            },
            // {
            //   label: "Color",
            //   name: "color",
            //   type: "text",
            //   widget: "colorSelector",
            // },
            {
              label: "Start date",
              description: dateDescription,
              name: "startDate",
              type: "text",
            },
            {
              label: "End date",
              description: dateDescription,
              name: "endDate",
              type: "text",
            },
          ],
        },
      },
    ],
  },
  {
    name: "behaviour",
    type: "group",
    label: "Behavioral settings",
    importance: "low",
    fields: [
      {
        // Unused field, therefore no label. It is only here because behavioral settings needs at least two items.
        label: "",
        name: "unused",
        type: "select",
        options: [],
        default: "",
        widget: "none",
      },
      {
        label: "Scaling mode",
        description: `Choose between scaling modes. "Human time" shows date in years before and after the Common Era using regular notation, while "Cosmological time" shows dates using scientific notation. "Indexed" is useful when you want to skew timeframes and make all events seem equally far apart.`,
        type: "select",
        name: "scalingMode",
        options: Object.values(scaleValues),
        default: scaleValues.human.value,
      },
    ],
  },
  {
    name: "l10n",
    type: "group",
    common: true,
    label: "Localize",
    fields: [
      createL10nField("Copyright", "copyright", "Copyright"),
      createL10nField("Copyright - Title", "copyrightTitle", "Title"),
      createL10nField("Copyright - Author", "copyrightAuthor", "Author"),
      createL10nField("Copyright - Year", "copyrightYear", "Year"),
      createL10nField("Copyright - Source", "copyrightSource", "Source"),
      createL10nField("Copyright - License", "copyrightLicense", "License"),
      createL10nField("Copyright - Version", "copyrightVersion", "Version"),
    ],
  },
];
