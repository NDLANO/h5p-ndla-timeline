import { findDuplicates } from './array.utils';

describe('Array utils', () => {
  describe(findDuplicates.name, () => {
    it('should return an array of duplicates', () => {
      const array = [1, 1, 2, 3, 4, 5, 5];

      const expected = [1, 5];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });

    it('should return an empty array if there are no duplicates', () => {
      const array = [1, 2, 3, 4, 5];

      const expected: ReturnType<typeof findDuplicates> = [];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });

    it('should return an empty array if the array is empty', () => {
      const array: number[] = [];

      const expected: ReturnType<typeof findDuplicates> = [];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });

    it('should only return one instance of a duplicate', () => {
      const array = [1, 1, 1, 1, 1, 1];

      const expected = [1];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });
  });
});
