import { unixTimestampToMonthYear } from './utils';

test('Converts a unix timestamp to month and year', async () => {
  expect(
    unixTimestampToMonthYear(new Date(2019, 11, 1).getTime() / 1000),
  ).toEqual('December, 2019');
  expect(
    unixTimestampToMonthYear(new Date(2020, 0, 31).getTime() / 1000),
  ).toEqual('January, 2020');
});
