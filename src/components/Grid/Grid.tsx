import * as React from "react";
import { EventItemType } from "../../types/EventItemType";
// import { MediaBlock } from "../MediaBlock/MediaBlock";
import { TextContentBlock } from "../TextContentBlock/TextContentBlock";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import styles from "./Grid.module.scss";

type GridProps = {
  eventItem: EventItemType;
  mediaHtml?: string;
};

export const Grid: React.FC<GridProps> = ({ eventItem, mediaHtml }) => {
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

            {/* {gridItem.type === "media" && media && (
              // // @ts-expect-error Sophisticated destructuring will work in TypeScript 4.6
              // <MediaBlock type={eventItem.mediaType} media={media} />

            )} */}

            {gridItem.type === "media" && mediaHtml && (
              // eslint-disable-next-line react/no-danger
              <div dangerouslySetInnerHTML={{ __html: mediaHtml }} />
            )}
          </div>
        );
      }),
    [eventItem.description, eventItem.title, items, mediaHtml],
  );

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>{children}</div>
    </div>
  );
};
