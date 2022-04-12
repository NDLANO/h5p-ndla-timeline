import type {
  TimelineDate,
  TimelineDefinition,
  TimelineEra,
  TimelineSlide,
} from "@knight-lab/timelinejs";
import { Copyright, Media } from "h5p-types";
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { CopyrightInformation } from "../components/CopyrightInformation/CopyrightInformation";
import { Grid } from "../components/Grid/Grid";
import { Tags } from "../components/Tags/Tags";
import { DateString } from "../types/DateString";
import { Era } from "../types/Era";
import { EventItemType } from "../types/EventItemType";
import { Params } from "../types/Params";
import { SlideType } from "../types/SlideType";
import { isDefined } from "./is-defined.utils";

const html = String.raw;

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

const getMedia = (
  eventItem: EventItemType<SlideType>,
): string | Media | undefined => {
  let media;

  switch (eventItem.mediaType) {
    case "image":
      media = eventItem.image;
      break;

    case "video":
      media = eventItem.video?.[0];
      break;

    case "audio":
      media = eventItem.audio?.[0];
      break;

    case "custom":
      media = eventItem.customMedia;
      break;

    case "none":
      media = undefined;
      break;
  }

  return media;
};

const copyrightIsDefined = (copyright: Copyright | undefined): boolean => {
  return !!copyright && !!copyright.license;
};

export const mapEventToTimelineSlide = (
  event: EventItemType<SlideType>,
): TimelineSlide => {
  const startDate = event.startDate ? parseDate(event.startDate) : null;

  let text;
  const eventHasCustomLayout = event.layout === "custom";
  if (eventHasCustomLayout) {
    text = renderToStaticMarkup(<Grid eventItem={event} />);
  } else {
    let tagsMarkup = "";

    // TODO: Make a variable `hasTags` for this ugly if when TypeScript supports it
    if ("tags" in event && event.tags && event.tags.length > 0) {
      // Has tags
      tagsMarkup = renderToStaticMarkup(
        <div className="h5p-tl-tags-container">
          <Tags tags={event.tags} />
        </div>,
      );
    }
    text = tagsMarkup;

    if (event.description) {
      const showCopyright = copyrightIsDefined(event.descriptionCopyright);
      if (event.descriptionCopyright && showCopyright) {
        const copyrightInformation = renderToString(
          <CopyrightInformation copyright={event.descriptionCopyright} />,
        );
        text += html`<div class="h5p-tl-slide-description">
          ${event.description}
          <div>${copyrightInformation}</div>
        </div>`;
      } else {
        text += html`<div class="h5p-tl-slide-description">
          ${event.description}
        </div>`;
      }
    }
  }

  // The `layout-x` part of this ID is used for styling and must not be removed
  // before we find another way to change slide layouts
  const id = `${event.id}_layout-${event.layout}`;

  const slide: TimelineSlide = {
    unique_id: id,
    start_date: startDate ?? undefined,
    text: {
      headline: event.title,
      text,
    },
  };

  const endDate = event.endDate && parseDate(event.endDate);
  if (endDate) {
    slide.end_date = endDate;
  }

  const media = getMedia(event);
  if (media) {
    slide.media = {
      url: typeof media === "string" ? media : media.path,
    };
  }

  if (event.appearance.backgroundType === "color") {
    slide.background = {
      color: event.appearance.backgroundColor,
    };
  } else if (event.appearance.backgroundType === "image") {
    slide.background = {
      url: event.appearance.backgroundImage?.path,
    };
  }

  return slide;
};

export const mapEraToTimelineEra = (era: Era): TimelineEra | null => {
  const startDate = parseDate(era.startDate);
  const endDate = parseDate(era.endDate);

  if (!startDate || !endDate) {
    return null;
  }

  return {
    start_date: startDate,
    end_date: endDate,
    text: {
      headline: era.name,
    },
  };
};

export const createTimelineDefinition = (
  title: string,
  data: Params,
): [TimelineDefinition, string | undefined] => {
  const items = data.timelineItems ?? [];
  const events = items.map(mapEventToTimelineSlide).filter(isDefined);
  const eras = (data.eras ?? []).map(mapEraToTimelineEra).filter(isDefined);

  const timeline: TimelineDefinition = {
    eras,
    events,
  };

  if (data.showTitleSlide && data.titleSlide) {
    // eslint-disable-next-line no-param-reassign
    data.titleSlide.title = data.titleSlide.title ?? title;
    timeline.title =
      data.titleSlide && mapEventToTimelineSlide(data.titleSlide);
  }

  let classNames: string | undefined;

  const scalingMode = data.behaviour?.scalingMode ?? "human";
  const eventsAreIndexed = scalingMode === "index";

  if (eventsAreIndexed) {
    classNames = "h5p-timeline--indexed";
  } else {
    timeline.scale = scalingMode;
  }

  return [timeline, classNames];
};

export const fallbackLocale = "en";

export const getClosestLocaleCode = (element: Element | null): string => {
  const closestElementWithLanguageAttribute = element?.closest(
    "[lang], [xml\\:lang]",
  );

  const activeLocaleCode =
    closestElementWithLanguageAttribute?.getAttribute("lang") ??
    closestElementWithLanguageAttribute?.getAttribute("xml:lang") ??
    fallbackLocale;

  return activeLocaleCode;
};

export const addTabIndexToScrollableElements = (
  elements: ArrayLike<HTMLElement>,
): void => {
  Array.from(elements).forEach(element => {
    const existingTabindex = element.getAttribute("tabindex");
    element.setAttribute("tabindex", existingTabindex || "0");
  });
};
