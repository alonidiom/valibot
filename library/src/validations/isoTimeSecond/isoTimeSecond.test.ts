import { describe, expect, test } from 'vitest';
import { isoTimeSecond } from './isoTimeSecond.ts';

describe('isoTimeSecond', () => {
  test('should pass only ISO time seconds', () => {
    const validate = isoTimeSecond();
    const value1 = '19:34:12';
    expect(validate(value1).output).toBe(value1);
    const value2 = '00:00:00';
    expect(validate(value2).output).toBe(value2);
    const value3 = '23:59:59';
    expect(validate(value3).output).toBe(value3);

    expect(validate('').issues).toBeTruthy();
    expect(validate('1:34:12').issues).toBeTruthy();
    expect(validate('0:00:00').issues).toBeTruthy();
    expect(validate('00:0:00').issues).toBeTruthy();
    expect(validate('00:00:0').issues).toBeTruthy();
    expect(validate('000:00:00').issues).toBeTruthy();
    expect(validate('00:000:00').issues).toBeTruthy();
    expect(validate('00:00:000').issues).toBeTruthy();
    expect(validate('24:00:00').issues).toBeTruthy();
    expect(validate('01:60:00').issues).toBeTruthy();
    expect(validate('01:00:60').issues).toBeTruthy();
    expect(validate('99:99:99').issues).toBeTruthy();
  });

  test('should return custom error message', () => {
    const error = 'Value is not an ISO time second!';
    const validate = isoTimeSecond(error);
    expect(validate('test').issues?.[0].message).toBe(error);
  });
});
