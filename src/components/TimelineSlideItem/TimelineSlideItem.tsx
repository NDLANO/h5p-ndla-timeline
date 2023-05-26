import * as React from 'react';
import styles from './TimelineSlideItem.module.scss';

export type TimelineSlideItemProps = {
  title: string;
  editAction: React.MouseEventHandler;
};

export const TimelineSlideItem: React.FC<TimelineSlideItemProps> = ({
  title,
  editAction,
}) => {
  return (
    <button type="button" className={styles.topicMapItem} onClick={editAction}>
      {title}
    </button>
  );
};
