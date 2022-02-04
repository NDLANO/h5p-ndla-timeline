import * as React from "react";
import { FC } from "react";
import { LayoutOption } from "../../types/LayoutOption";
import { Grid } from "../Grid/Grid";
import styles from "./EventItem.module.scss";

type EventItemProps =
  | {
      layout: Exclude<LayoutOption, "custom">;
    }
  | {
      layout: "custom";
      gridProps: React.ComponentPropsWithoutRef<typeof Grid>;
    };

const layoutClassName: Record<Exclude<LayoutOption, "custom">, string> = {
  center: styles.center,
  left: styles.left,
  right: styles.right,
};

// @ts-expect-error Destructuring of properties that only _sometimes_ exist comes with TypeScript 4.6 (currently in beta)
export const EventItem: FC<EventItemProps> = ({ layout, gridProps }) => {
  const isCustomLayout = layout === "custom";

  if (isCustomLayout) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Grid {...gridProps} />;
  }

  const layoutClass = layoutClassName[layout];

  return <div className={layoutClass} />;
};
