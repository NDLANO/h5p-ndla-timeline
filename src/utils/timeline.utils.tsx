import type {
  TimelineDate,
  TimelineDefinition,
  TimelineSlide,
} from "@knight-lab/timelinejs";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Grid } from "../components/Grid/Grid";
import { DateString } from "../types/DateString";
import { EventItemType } from "../types/EventItemType";
import { ParamsData } from "../types/ParamsData";
import { isDefined } from "./is-defined.utils";

export const isDateString = (str: string): str is DateString => {
  const matches = str.match(/^-?\d{1,}((-\d{1,2})?(-\d{1,2})?)$/gi);

  return !!matches && matches.length > 0;
};

export const parseDateString = (dateString: DateString): TimelineDate => {
  const isNegativeYear = dateString.startsWith("-");
  let year: string;
  let month: string;
  let day: string;

  if (isNegativeYear) {
    [, year, month, day] = dateString.split("-");
  } else {
    [year, month, day] = dateString.split("-");
  }

  const ret: TimelineDate = {
    year: Number.parseInt(year, 10) * (isNegativeYear ? -1 : 1),
  };

  if (month) {
    ret.month = Number.parseInt(month, 10);
  }

  if (day) {
    ret.day = Number.parseInt(day, 10);
  }

  return ret;
};

export const parseDate = (dateString: string): TimelineDate | null => {
  const dateMillis = Date.parse(dateString);
  const isValid = !Number.isNaN(dateMillis);
  if (!isValid) {
    return null;
  }

  const isDateStr = isDateString(dateString);
  if (isDateStr) {
    return parseDateString(dateString);
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

  const text = renderToStaticMarkup(<Grid eventItem={event} />);

  const slide: TimelineSlide = {
    start_date: startDate,
    text: {
      headline: event.title,
      text,
    },
  };

  const endDate = event.endDate && parseDate(event.endDate);
  if (endDate) {
    slide.end_date = endDate;
  }

  return slide;
};

export const createTimelineDefinition = (
  title: string,
  data: ParamsData,
): TimelineDefinition => {
  const items = data.timelineItems ?? [];

  const events = items.map(mapEventToTimelineSlide).filter(isDefined);

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
