import type {
  TimelineDate,
  TimelineDefinition,
  TimelineSlide,
} from "@knight-lab/timelinejs";
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
  const endDate = event.endDate ? parseDate(event.endDate) : null;

  if (!startDate) {
    console.error("Invalid start date", event.startDate);

    return null;
  }

  if (!endDate) {
    console.error("Invalid end date", event.endDate);

    return null;
  }

  return {
    start_date: startDate,
    end_date: endDate,
  };
};

export const createTimelineDefinition = (
  data: ParamsData,
): TimelineDefinition => {
  const events = data.timelineItems
    .map(mapEventToTimelineSlide)
    .filter(Boolean) as Array<TimelineSlide>;

  return {
    title: {
      text: {
        // @ts-expect-error Will sooon exist
        text: data.title,
      },
    },
    eras: [],
    events,
  };
};
