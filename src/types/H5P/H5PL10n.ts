import { H5PFieldGroup, H5PFieldText } from "h5p-types";

export type H5PL10n =
  | H5PFieldGroup & {
      name: "l10n";
      fields: Array<H5PFieldText | { default: string }>;
      common: boolean;
    };
