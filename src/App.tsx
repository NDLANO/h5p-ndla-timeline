import * as React from "react";
import { TimeLine } from "./components/TimeLine/TimeLine";
import { ParamsData } from "./types/ParamsData";

export type AppProps = {
  title: string;
  timeline: ParamsData;
};

export const App: React.FC<AppProps> = ({ title, timeline }) => {
  return <TimeLine data={timeline} timelineTitle={title} />;
};
