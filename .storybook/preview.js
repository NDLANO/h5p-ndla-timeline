import * as React from "react";
import { LocalizationContext } from "../src/contexts/LocalizationContext";
import { semantics } from "../src/semantics";
import "!style-loader!css-loader!sass-loader!../src/styles.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
    },
  },
};

const translations = Object.fromEntries(
  semantics[2].fields.map(field => {
    const defaultValue = field["default"] ?? field.name;
    return [field.name, defaultValue];
  }),
);

export const decorators = [
  Story => (
    <LocalizationContext.Provider value={translations}>
      <Story />
    </LocalizationContext.Provider>
  ),
];
