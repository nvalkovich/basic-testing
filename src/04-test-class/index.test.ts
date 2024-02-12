import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 0;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 5;
    const withdrawAmount = 10;
    const account = getBankAccount(balance);

    expect(() => {
      account.withdraw(withdrawAmount);
    }).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 5;
    const otherAccountBalance = 6;
    const account = getBankAccount(balance);
    const otherAccount = getBankAccount(otherAccountBalance);
    const withdrawAmount = 10;

    expect(() => {
      account.transfer(withdrawAmount, otherAccount);
    }).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 5;
    const account = getBankAccount(balance);
    const withdrawAmount = 10;

    expect(() => {
      account.transfer(withdrawAmount, account);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    const balance = 5;
    const account = getBankAccount(balance);
    const withdrawAmount = 10;
    account.deposit(withdrawAmount);

    expect(account.getBalance()).toBe(balance + withdrawAmount);
  });

  test('should withdraw money', () => {
    const balance = 5;
    const account = getBankAccount(balance);
    const withdrawAmount = 3;
    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(balance - withdrawAmount);
  });

  test('should transfer money', () => {
    const balance = 5;
    const otherAccountBalance = 6;
    const account = getBankAccount(balance);
    const otherAccount = getBankAccount(otherAccountBalance);
    const withdrawAmount = 3;

    account.transfer(withdrawAmount, otherAccount);
    expect(account.getBalance()).toBe(balance - withdrawAmount);
    expect(otherAccount.getBalance()).toBe(
      otherAccountBalance + withdrawAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const balance = 5;
    const account = getBankAccount(balance);
    const fetchBalance = account.fetchBalance();

    await expect(fetchBalance).resolves.toEqual(
      expect.any(Number),
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(6).mockReturnValueOnce(1);
    const balance = 5;
    const account = getBankAccount(balance);
    await account.synchronizeBalance();

    await expect(account.getBalance()).toEqual(6);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(6).mockReturnValueOnce(0);
    const balance = 5;
    const account = getBankAccount(balance);
    const synchronizeBalance = account.synchronizeBalance();

    await expect(synchronizeBalance).rejects.toThrow(new SynchronizationFailedError());
  });
});
