import * as React from 'react';
import './TimelineSlideItem.scss';

export type TimelineSlideItemProps = {
  title: string;
  editAction: React.MouseEventHandler;
};

export const TimelineSlideItem: React.FC<TimelineSlideItemProps> = ({
  title,
  editAction,
}) => {
  return (
    <button type="button" className='slideMapItem' onClick={editAction}>
      {title}
    </button>
  );
};
