import {
  throwError,
  resolveValue,
  throwCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'value';
    const resolved = await resolveValue(value);
    expect(resolved).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'An error has occurred';
    expect(() => {
      throwError(message);
    }).toThrow(new Error(message));
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => {
      throwError();
    }).toThrow(new Error(defaultMessage));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(Promise.reject(() => throwCustomError())).rejects.toThrow(
      new MyAwesomeError(),
    );
  });
});
