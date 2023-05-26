import { isDefined } from './is-defined.utils';

describe(isDefined.name, () => {
  it('should return true if the value is not nullish', () => {
    expect(isDefined(0)).toBeTruthy();
    expect(isDefined(1)).toBeTruthy();

    expect(isDefined('')).toBeTruthy();
    expect(isDefined('string')).toBeTruthy();

    expect(isDefined(false)).toBeTruthy();
    expect(isDefined(true)).toBeTruthy();

    expect(isDefined([])).toBeTruthy();
    expect(isDefined([1])).toBeTruthy();

    expect(isDefined({})).toBeTruthy();
    expect(isDefined({ a: 1 })).toBeTruthy();

    expect(isDefined(Symbol(''))).toBeTruthy();
  });

  it('should return false if the value is nullish', () => {
    expect(isDefined(undefined)).toBeFalsy();
    expect(isDefined(null)).toBeFalsy();
  });
});
