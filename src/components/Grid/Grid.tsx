/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { EventItemType } from "../../types/EventItemType";
import { TextContentBlock } from "../TextContentBlock/TextContentBlock";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import styles from "./Grid.module.scss";

type GridProps = {
  eventItem: EventItemType;
};

export const Grid: React.FC<GridProps> = ({ eventItem }) => {
  const items = React.useMemo(
    () => eventItem.eventContent?.items ?? [],
    [eventItem.eventContent?.items],
  );

  const children = React.useMemo(
    () =>
      items.map(gridItem => {
        return (
          <foreignObject
            key={gridItem.id}
            x={gridItem.x}
            y={gridItem.y}
            width={gridItem.width}
            height={gridItem.height}
          >
            {gridItem.type === "title" && (
              <TitleBlock title={eventItem.title} />
            )}

            {gridItem.type === "textContent" && (
              <TextContentBlock textContent={eventItem.description ?? ""} />
            )}
          </foreignObject>
        );
      }),
    [eventItem.description, eventItem.title, items],
  );

  return (
    <div className={styles.gridWrapper}>
      <svg viewBox="0 0 100 100" className={styles.grid} width={20} height={12}>
        {children}
      </svg>
    </div>
  );
};
