import { H5PContentId, EventDispatcher } from 'h5p-types';
import * as React from 'react';
import { TimeLine, SLIDE_PADDING_BLOCK_PX } from './components/TimeLine/TimeLine';
import { Params } from './types/Params';

export { SLIDE_PADDING_BLOCK_PX };

export type AppProps = {
  title: string;
  params: Params;
  contentId: H5PContentId;
  onMediaInstanceBuilt: (instance: EventDispatcher) => void;
};

export const App: React.FC<AppProps> = ({ title, params, contentId, onMediaInstanceBuilt }) => {
  return (
    <TimeLine
      data={params}
      timelineTitle={title}
      contentId={contentId}
      onMediaInstanceBuilt={onMediaInstanceBuilt}
    />
  );
};
