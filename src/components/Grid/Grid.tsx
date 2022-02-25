/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { EventItemType } from "../../types/EventItemType";
import { MediaBlock } from "../MediaBlock/MediaBlock";
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
          <div
            key={gridItem.id}
            className={styles.itemWrapper}
            style={{
              left: `${gridItem.x}%`,
              top: `${gridItem.y}%`,
              height: `${gridItem.height}%`,
              width: `${gridItem.width}%`,
            }}
          >
            {gridItem.type === "title" && (
              <TitleBlock title={eventItem.title} />
            )}

            {gridItem.type === "textContent" && (
              <TextContentBlock textContent={eventItem.description ?? ""} />
            )}

            {gridItem.type === "media" && (
              <MediaBlock
                type={eventItem.mediaType}
                media={
                  eventItem.mediaType === "image"
                    ? eventItem.image
                    : eventItem.video
                }
              />
            )}
          </div>
        );
      }),
    [
     eventItem.description, 
     eventItem.image, 
     eventItem.mediaType, 
     eventItem.title, 
     eventItem.video, 
     items
    ],
  );
  
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        {children}

      </div>
    </div>
  );
};
