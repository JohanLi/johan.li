import { classNames, unixTimestampToMonthYear } from './utils';

test('classNames', () => {
  expect(classNames('')).toEqual('');

  expect(classNames('a', '', 'b')).toEqual('a b');
});

test('unixTimestampToMonthYear', () => {
  expect(unixTimestampToMonthYear(0)).toEqual('January, 1970');
  expect(unixTimestampToMonthYear(1640991599)).toEqual('December, 2021');
  expect(unixTimestampToMonthYear(1645392706)).toEqual('February, 2022');
});
