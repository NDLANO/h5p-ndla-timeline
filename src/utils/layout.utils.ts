import { LayoutOption } from "../types/LayoutOption";

export const layoutOptions: Record<
  string,
  { label: string; value: LayoutOption }
> = {
  textOnRight: {
    label: "Text on right (standard)",
    value: "right",
  },
  textOnLeft: {
    label: "Text on left",
    value: "left",
  },
  centered: {
    label: "Centered (Text only)",
    value: "center",
  },
  custom: {
    label: "Custom",
    value: "custom",
  },
} as const;
