import type { TimelineDate } from "@knight-lab/timelinejs";
import { DateString } from "../types/DateString";
import {
  fallbackLocale,
  getClosestLocaleCode,
  isDateString,
  parseDateString,
} from "./timeline.utils";

describe("Timeline utils", () => {
  describe(isDateString.name, () => {
    it("should return true if year, month, day is provided", () => {
      const dateString = "2000-01-01";

      const expected = true;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });

    it("should return true if short year, short month, short day is provided", () => {
      const dateString = "1-1-1";

      const expected = true;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });

    it("should return true if only year and month is provided", () => {
      const dateString = "2000-1";

      const expected = true;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });

    it("should return true if only year is provided", () => {
      const dateString = "2000";

      const expected = true;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });

    it("should return false if the provided month has too many digits", () => {
      const dateString = "2000-123";

      const expected = false;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });

    it("should return false if the provided day has too many digits", () => {
      const dateString = "2000-12-123";

      const expected = false;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });

    it("should return false if the provided date string is of a different format", () => {
      const dateString =
        "Wed Feb 16 2022 12:11:39 GMT+0100 (Central European Standard Time)";

      const expected = false;
      const actual = isDateString(dateString);

      expect(actual).toBe(expected);
    });
  });

  describe(parseDateString.name, () => {
    it("should return only year if only year is provided", () => {
      const dateString: DateString = "2000";

      const expected: TimelineDate = { year: 2000 };
      const actual = parseDateString(dateString);

      expect(actual).toStrictEqual(expected);
    });

    it("should return only year and month if only year and month is provided", () => {
      const dateString: DateString = "2000-1";

      const expected: TimelineDate = { year: 2000, month: 1 };
      const actual = parseDateString(dateString);

      expect(actual).toStrictEqual(expected);
    });

    it("should return year, month and date if all are provided", () => {
      const dateString: DateString = "2000-1-1";

      const expected: TimelineDate = { year: 2000, month: 1, day: 1 };
      const actual = parseDateString(dateString);

      expect(actual).toStrictEqual(expected);
    });

    it("should support negative years", () => {
      const dateString: DateString = "-2000-1-1";

      const expected: TimelineDate = { year: -2000, month: 1, day: 1 };
      const actual = parseDateString(dateString);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe(getClosestLocaleCode.name, () => {
    let containerElement: HTMLDivElement;
    let testingElement: HTMLDivElement;

    beforeEach(() => {
      containerElement = document.createElement("div");
      testingElement = document.createElement("div");
    });

    it("should return locale code of the closest element with a locale code", () => {
      const locale = "nb";

      containerElement.lang = locale;
      containerElement.appendChild(testingElement);

      const expected = locale;
      const actual = getClosestLocaleCode(testingElement);

      expect(actual).toBe(expected);
    });

    it("should return locale code of the closest element with a locale code, if the language is set on the element itself", () => {
      const locale1 = "en";
      const locale2 = "nb";

      containerElement.lang = locale1;
      testingElement.lang = locale2;
      containerElement.appendChild(testingElement);

      const expected = locale2;
      const actual = getClosestLocaleCode(testingElement);

      expect(actual).toBe(expected);
    });

    it("should work with xml:lang", () => {
      const locale = "en";

      containerElement.setAttribute("xml:lang", locale);
      containerElement.appendChild(testingElement);

      const expected = locale;
      const actual = getClosestLocaleCode(testingElement);

      expect(actual).toBe(expected);
    });

    it("should return the fallback language if no lang attribute is set in the element's branch", () => {
      containerElement.appendChild(testingElement);

      const expected = fallbackLocale;
      const actual = getClosestLocaleCode(testingElement);

      expect(actual).toBe(expected);
    });
  });
});
