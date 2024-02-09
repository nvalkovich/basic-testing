import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 10, b: 1, action: Action.Divide, expected: 10 },
  { a: 2, b: 1, action: Action.Multiply, expected: 2 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 9, b: 3, action: Action.Exponentiate, expected: 729 },
  { a: 4, b: 4, action: Action.Exponentiate, expected: 256 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should $a $action $b to be $expected',
    ({ a, b, action, expected }) => {
      expect(
        simpleCalculator({
          a,
          b,
          action,
        }),
      ).toBe(expected);
    },
  );
});
