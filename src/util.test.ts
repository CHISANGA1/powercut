import { createTimeFromDate, remainingTime, removeProvince, toTitleCase } from '@/utils';

describe('Utility Functions', () => {
  describe('createTimeFromDate', () => {
    it('creates the correct date and time from strings', () => {
      const result = createTimeFromDate('14:30', '2023-03-15');
      const expected = new Date(2023, 2, 15, 14, 30);
      expect(result).toEqual(expected);
    });

    it('handles invalid time string by returning a date object', () => {
      const result = createTimeFromDate('', '2023-03-15');
      expect(result).toBeInstanceOf(Date);
    });

    it('correctly handles edge case times (e.g., 00:00)', () => {
      const result = createTimeFromDate('00:00', '2023-03-15');
      const expected = new Date(2023, 2, 15, 0, 0);
      expect(result).toEqual(expected);
    });
  });

  describe('remainingTime', () => {
    const baseDate = new Date('2023-03-15T12:00:00Z');

    it.each([
      {
        futureDate: new Date('2023-03-16T12:00:00Z'),
        expected: { text: 'Starts in approximately 1 day(s)', color: 'teal' },
      },
      {
        futureDate: new Date('2023-03-15T15:00:00Z'),
        expected: { text: 'Starts in approximately 3 hour(s)', color: 'teal' },
      },
      {
        futureDate: new Date('2023-03-14T12:00:00Z'),
        expected: { text: 'No more outages today', color: 'teal' },
      },
    ])('calculates remaining time for $futureDate', ({ futureDate, expected }) => {
      expect(remainingTime(futureDate, baseDate)).toEqual(expected);
    });
  });

  describe('removeProvince', () => {
    it('removes "Province" from the end of a string', () => {
      const input = 'Northern Province';
      const expected = 'Northern';
      expect(removeProvince(input)).toBe(expected);
    });

    it('does nothing if "Province" is not at the end', () => {
      const input = 'Province Northern';
      expect(removeProvince(input)).toBe(input);
    });

    it('correctly handles strings without "Province"', () => {
      const input = 'Eastern';
      expect(removeProvince(input)).toBe('Eastern');
    });
  });

  describe('toTitleCase', () => {
    it.each([
      { input: 'hello world', expected: 'Hello World' },
      { input: 'HELLO WORLD', expected: 'Hello World' },
      { input: 'hElLo WoRlD', expected: 'Hello World' },
      { input: '', expected: '' },
      { input: '2023 new year', expected: '2023 New Year' },
    ])('converts "$input" to title case', ({ input, expected }) => {
      expect(toTitleCase(input)).toBe(expected);
    });
  });
});
