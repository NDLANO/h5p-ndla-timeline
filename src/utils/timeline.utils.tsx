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
import { Media } from "../types/H5P/Media";
import { ParamsData } from "../types/ParamsData";
import { isDefined } from "./is-defined.utils";
import { renderMediaBlock } from "./media.utils";

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

const getMedia = (eventItem: EventItemType): string | Media | undefined => {
  let media;

  switch (eventItem.mediaType) {
    case "image":
      media = eventItem.image;
      break;
    case "video":
      media = eventItem.video;
      break;
    case "custom":
      media = eventItem.customMedia;
      break;
  }

  return media;
};

export const mapEventToTimelineSlide = async (
  event: EventItemType,
): Promise<TimelineSlide | null> => {
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

  const mediaContainer = document.createElement("div");
  const media = getMedia(event);
  if (media) {
    await renderMediaBlock(
      // @ts-expect-error Sophisticated destructuring will work in TypeScript 4.6
      {
        type: event.mediaType,
        media,
        containerElement: mediaContainer,
      },
    );
  }

  const mediaHtml = media ? mediaContainer.innerHTML : undefined;
  const text = renderToStaticMarkup(
    <Grid eventItem={event} mediaHtml={mediaHtml} />,
  );

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

export const createTimelineDefinition = async (
  title: string,
  data: ParamsData,
): Promise<TimelineDefinition> => {
  const items = data.timelineItems ?? [];

  const events = (await Promise.all(items.map(mapEventToTimelineSlide))).filter(
    isDefined,
  );

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
