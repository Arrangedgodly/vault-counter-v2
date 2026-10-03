export const MAX_COUNT = 1_000_000;
export const defaultBundleSizes = { bill: 100, billFive: 100, billTen: 10 };

// Values are integer cents. Bundle sizes preserve the original workplace rules.
export const denominations = [
  { id: 'penny', name: 'Pennies', group: 'coins', fields: [{ id: 'pennyS', label: 'Rolls', cents: 50 }, { id: 'pennyB', label: 'Boxes', cents: 2500 }] },
  { id: 'nickel', name: 'Nickels', group: 'coins', fields: [{ id: 'nickelS', label: 'Rolls', cents: 200 }, { id: 'nickelB', label: 'Boxes', cents: 10000 }] },
  { id: 'dime', name: 'Dimes', group: 'coins', fields: [{ id: 'dimeS', label: 'Rolls', cents: 500 }, { id: 'dimeB', label: 'Boxes', cents: 25000 }] },
  { id: 'quarter', name: 'Quarters', group: 'coins', fields: [{ id: 'quarterS', label: 'Rolls', cents: 1000 }, { id: 'quarterB', label: 'Boxes', cents: 50000 }] },
  { id: 'bill', name: '$1 bills', group: 'small', fields: [{ id: 'billS', label: 'Bills', cents: 100 }, { id: 'billB', label: 'Bundles', cents: 10000 }] },
  { id: 'billFive', name: '$5 bills', group: 'small', fields: [{ id: 'billFiveS', label: 'Bills', cents: 500 }, { id: 'billFiveB', label: 'Bundles', cents: 50000 }] },
  { id: 'billTen', name: '$10 bills', group: 'small', fields: [{ id: 'billTenS', label: 'Bills', cents: 1000 }, { id: 'billTenB', label: 'Bundles', cents: 10000 }] },
  { id: 'billTwenty', name: '$20 bills', group: 'large', fields: [{ id: 'billTwentyS', label: 'Bills', cents: 2000 }] },
  { id: 'billFifty', name: '$50 bills', group: 'large', fields: [{ id: 'billFiftyS', label: 'Bills', cents: 5000 }] },
  { id: 'billHundred', name: '$100 bills', group: 'large', fields: [{ id: 'billHundredS', label: 'Bills', cents: 10000 }] },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export const formatMoney = cents => currency.format(cents / 100);

export function parseCount(value) {
  if (value === '' || value === undefined) return 0;
  if (!/^(0|[1-9]\d*)$/.test(String(value))) throw new Error('Enter a whole number of 0 or more.');
  const count = Number(value);
  if (!Number.isSafeInteger(count) || count > MAX_COUNT) throw new Error('Enter a count of 1,000,000 or less.');
  return count;
}

export function fieldCents(row, field, bundleSizes = defaultBundleSizes) {
  if (field.label !== 'Bundles') return field.cents;
  const size = parseCount(bundleSizes[row.id] ?? defaultBundleSizes[row.id]);
  if (size === 0) throw new Error('A bundle must contain at least one bill.');
  return row.fields[0].cents * size;
}

export function calculate(counts, bundleSizes = defaultBundleSizes) {
  const rows = {};
  const groups = { coins: 0, small: 0, large: 0 };
  let total = 0;
  for (const row of denominations) {
    const cents = row.fields.reduce((sum, field) => sum + parseCount(counts[field.id]) * fieldCents(row, field, bundleSizes), 0);
    rows[row.id] = cents;
    groups[row.group] += cents;
    total += cents;
  }
  return { rows, groups, total };
}

export function parseTarget(value) {
  if (value === '') return null;
  if (!/^\d+(\.\d{1,2})?$/.test(String(value))) throw new Error('Enter a dollar amount with up to two decimal places.');
  const [dollars, fraction = ''] = String(value).split('.');
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(cents) || cents > 1_000_000_000_000) throw new Error('Enter a target of $10,000,000,000 or less.');
  return cents;
}
