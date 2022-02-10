import type {
  TimelineDate,
  TimelineDefinition,
  TimelineSlide,
} from "@knight-lab/timelinejs";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Grid } from "../components/Grid/Grid";
import { EventItemType } from "../types/EventItemType";
import { ParamsData } from "../types/ParamsData";

export const parseDate = (dateString: string): TimelineDate | null => {
  const dateMillis = Date.parse(dateString);
  const isValid = !Number.isNaN(dateMillis);
  if (!isValid) {
    return null;
  }

  const date = new Date(dateMillis);

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
};

export const mapEventToTimelineSlide = (
  event: EventItemType,
): TimelineSlide | null => {
  const startDate = event.startDate ? parseDate(event.startDate) : null;
  const invalidEndDate = (event.endDate && parseDate(event.endDate)) === null;

  if (!startDate) {
    console.error("Invalid start date", event.startDate);

    return null;
  }

  if (invalidEndDate) {
    console.error("Invalid end date", event.endDate);

    return null;
  }

  return {
    start_date: startDate,
    end_date:
      (event.endDate ? parseDate(event.endDate) : undefined) ?? undefined,
    text: {
      text: renderToStaticMarkup(<Grid eventItem={event} />),
    },
  };
};

export const createTimelineDefinition = (
  title: string,
  data: ParamsData,
): TimelineDefinition => {
  const events = data.timelineItems
    .map(mapEventToTimelineSlide)
    .filter(Boolean) as Array<TimelineSlide>;

  return {
    title: {
      text: {
        text: title,
      },
    },
    eras: [],
    events,
  };
};
