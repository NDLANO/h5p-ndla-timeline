import { H5PContentId } from "h5p-types";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { TimeLine } from "./components/TimeLine/TimeLine";
import { Params } from "./types/Params";

export type AppProps = {
  title: string;
  params: Params;
  contentId: H5PContentId;
};

export const App: React.FC<AppProps> = hot(({ title, params, contentId }) => {
  return <TimeLine data={params} timelineTitle={title} contentId={contentId} />;
});
