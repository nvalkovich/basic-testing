import { generateLinkedList } from './index';

describe('generateLinkedList', () => {

  const linkedList = generateLinkedList([1, 2, 3, 4]);

  const shapshot = {
    next: {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 4,
        },
        value: 3,
      },
      value: 2,
    },
    value: 1,
  };

  test('should generate linked list from values 1', () => {
    expect(linkedList).toStrictEqual(shapshot);
  });

  test('should generate linked list from values 2', () => {
    expect(linkedList).toMatchSnapshot(shapshot);
  });
});
