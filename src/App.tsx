import * as React from "react";
import { TimeLine } from "./components/TimeLine/TimeLine";
import { TimelineData } from "./types/TimelineData";

export type AppProps = {
  title: string;
  params: TimelineData;
};

export const App: React.FC<AppProps> = ({ title, params }) => {
  return <TimeLine data={params} timelineTitle={title} />;
};
