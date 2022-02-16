import type { TimelineDate } from "@knight-lab/timelinejs";
import { DateString } from "../types/DateString";
import { isDateString, parseDateString } from "./timeline.utils";

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
});
