import * as React from 'react';
import { EventItemType } from '../../types/EventItemType';
import { SlideType } from '../../types/SlideType';
import { MediaBlock } from '../MediaBlock/MediaBlock';
import { TextContentBlock } from '../TextContentBlock/TextContentBlock';
import { TitleBlock } from '../TitleBlock/TitleBlock';
import * as styles from './Grid.module.scss';

type GridProps = {
  eventItem: EventItemType<SlideType>;
};

export const Grid: React.FC<GridProps> = ({ eventItem }) => {
  const items = React.useMemo(
    () => eventItem.eventContent?.items ?? [],
    [eventItem.eventContent?.items],
  );

  const media = React.useMemo(() => {
    switch (eventItem.mediaType) {
      case 'image':
        return eventItem.image;

      case 'video':
        return eventItem.video;

      case 'audio':
        return eventItem.audio;

      case 'custom':
        return eventItem.customMedia;

      case 'none':
        return null;
    }
  }, [eventItem]);

  const children = React.useMemo(
    () =>
      items.map((gridItem) => {
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
            {gridItem.type === 'title' && (
              <TitleBlock title={eventItem.title ?? ''} />
            )}

            {gridItem.type === 'textContent' && (
              <TextContentBlock textContent={eventItem.description?.params?.text ?? ''} />
            )}

            {gridItem.type === 'media' && media && (
              // @ts-expect-error `media` gets its type depending on `eventItem.mediaType`
              <MediaBlock type={eventItem.mediaType} media={media} />
            )}
          </div>
        );
      }),
    [eventItem.description, eventItem.mediaType, eventItem.title, items, media],
  );

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>{children}</div>
    </div>
  );
};
