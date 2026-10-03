import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, denominations, formatMoney, parseCount, parseTarget } from '../blocks/money.js';

test('empty counts start at zero', () => {
  assert.equal(calculate({}).total, 0);
  assert.equal(formatMoney(0), '$0.00');
});

test('every denomination and packaging rule produces its stated value', () => {
  const expected = [50, 2500, 200, 10000, 500, 25000, 1000, 50000, 100, 10000, 500, 50000, 1000, 10000, 2000, 5000, 10000];
  denominations.flatMap(row => row.fields).forEach((field, index) => {
    assert.equal(calculate({ [field.id]: 1 }).total, expected[index], field.id);
  });
});

test('mixed count aggregates row, group, and grand totals exactly', () => {
  const result = calculate({ pennyS: 3, quarterB: 1, billFiveB: 2, billTenS: 7, billTwentyS: 4, billHundredS: 3 });
  assert.deepEqual(result.groups, { coins: 50150, small: 107000, large: 38000 });
  assert.equal(result.total, 195150);
  assert.equal(formatMoney(result.total), '$1,951.50');
});

test('invalid counts cannot silently round up or make a partial total', () => {
  for (const value of [-1, 0.5, '1e3', 'abc', Infinity, null, 1_000_001]) {
    assert.throws(() => calculate({ pennyS: value }));
  }
  assert.equal(parseCount(''), 0);
  assert.equal(parseCount(1_000_000), 1_000_000);
});

test('target amounts parse without floating point rounding', () => {
  assert.equal(parseTarget('6500'), 650000);
  assert.equal(parseTarget('0.29'), 29);
  assert.equal(parseTarget('12.5'), 1250);
  assert.equal(parseTarget(''), null);
  for (const value of ['-1', '1.001', 'NaN', '1e3', '10000000001']) assert.throws(() => parseTarget(value));
});

test('store bundle settings change each denomination independently', () => {
  const result = calculate({ billB: 2, billFiveB: 3, billTenB: 4 }, { bill: 25, billFive: 20, billTen: 5 });
  assert.equal(result.rows.bill, 5000);
  assert.equal(result.rows.billFive, 30000);
  assert.equal(result.rows.billTen, 20000);
  assert.equal(result.total, 55000);
  for (const size of [0, -1, 1.5, 'abc', 1000001]) assert.throws(() => calculate({}, { bill: size }));
});
