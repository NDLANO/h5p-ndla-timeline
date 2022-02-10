import * as React from "react";
import { FC } from "react";
import { EventItemType } from "../../types/EventItemType";
import { Grid } from "../Grid/Grid";

type EventItemProps = {
  item: EventItemType;
};

export const EventItem: FC<EventItemProps> = ({ item }) => {
  // TODO: Populate items with data from `item` (title item gets title, etc)

  return <Grid items={item.eventContent?.items ?? []} />;
};
