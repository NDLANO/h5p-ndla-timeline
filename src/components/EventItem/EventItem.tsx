import * as React from "react";
import { FC } from "react";
import { EventItemType } from "../../types/EventItemType";
import { LayoutOption } from "../../types/LayoutOption";
import { Grid } from "../Grid/Grid";
import styles from "./EventItem.module.scss";

type EventItemProps = {
  item: EventItemType;
};

const layoutClassName: Record<Exclude<LayoutOption, "custom">, string> = {
  center: styles.center,
  left: styles.left,
  right: styles.right,
};

export const EventItem: FC<EventItemProps> = ({ item }) => {
  const isCustomLayout = item.layout === "custom";

  if (isCustomLayout) {
    return <Grid items={item.eventContent?.items ?? []} />;
  }

  const layoutClass = layoutClassName[item.layout];

  return <div className={layoutClass} />;
};
