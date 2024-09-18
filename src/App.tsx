import { H5PContentId, EventDispatcher } from 'h5p-types';
import * as React from 'react';
import { TimeLine } from './components/TimeLine/TimeLine';
import { Params } from './types/Params';

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
