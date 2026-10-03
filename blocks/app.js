import { denominations, defaultBundleSizes, fieldCents, calculate, formatMoney, parseCount, parseTarget, MAX_COUNT } from './money.js';

const STORAGE_KEY = 'vault-counter.v2';
const form = document.querySelector('#safe');
const target = document.querySelector('#target');
const exportButton = document.querySelector('#export');
const status = document.querySelector('#action-status');
const storageStatus = document.querySelector('#storage-status');
let bundleSizes = { ...defaultBundleSizes };
let undoState = null;
let result = calculate({});
let isValid = true;
let sampleMode = false;

const groups = [
  { id: 'coins', name: 'Coins', note: 'Sealed rolls & boxes' },
  { id: 'small', name: 'Small bills', note: 'Loose bills & bundles' },
  { id: 'large', name: 'Large bills', note: 'Loose bills' },
];

// Only fixed denomination metadata enters this template. Saved user data is assigned as values.
document.querySelector('#denominations').innerHTML = groups.map(group => `
  <section class="group group--${group.id}" aria-labelledby="${group.id}-heading">
    <div class="group__heading"><h3 id="${group.id}-heading">${group.name}</h3><span>${group.note}</span></div>
    ${denominations.filter(row => row.group === group.id).map(row => `
      <div class="denomination">
        <h4 class="denomination__name">${row.name}</h4>
        ${row.fields.map(field => `
          <div class="quantity">
            <label for="${field.id}">${field.label}<span id="${field.id}-value">${formatMoney(fieldCents(row, field))} each</span></label>
            <input id="${field.id}" name="${field.id}" type="number" min="0" max="${MAX_COUNT}" step="1" inputmode="numeric" value="0" aria-label="${row.name} ${field.label.toLowerCase()}" aria-describedby="${field.id}-value ${field.id}-error">
            <p id="${field.id}-error" class="field-error" hidden></p>
          </div>`).join('')}
        <output class="denomination__total" id="${row.id}T" aria-label="${row.name} total">$0.00</output>
      </div>`).join('')}
  </section>`).join('');

const bundleRows = denominations.filter(row => row.group === 'small');
document.querySelector('#bundle-settings').innerHTML = bundleRows.map(row => `
  <div class="quantity"><label for="${row.id}-size">${row.name}<span>Bills per bundle</span></label>
    <input id="${row.id}-size" type="number" min="1" max="${MAX_COUNT}" step="1" inputmode="numeric" value="${bundleSizes[row.id]}" aria-describedby="${row.id}-size-error">
    <p id="${row.id}-size-error" class="field-error" hidden></p>
  </div>`).join('');

const inputs = denominations.flatMap(row => row.fields.map(field => document.getElementById(field.id)));
const getCounts = () => Object.fromEntries(inputs.map(input => [input.id, input.value]));
const getState = () => ({ version: 1, counts: getCounts(), target: target.value, bundleSizes, sampleMode });

function markError(input, message) {
  input.setCustomValidity(message);
  input.setAttribute('aria-invalid', String(Boolean(message)));
  const error = document.getElementById(`${input.id}-error`);
  error.textContent = message;
  error.hidden = !message;
}

function validate(input, parser) {
  try {
    // A number input with a partially entered number may expose an empty value.
    if (input.validity.badInput) throw new Error('Enter a valid number.');
    const value = parser(input.value);
    markError(input, '');
    return value;
  } catch (error) {
    markError(input, error.message);
    return undefined;
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState()));
    storageStatus.textContent = sampleMode ? 'Sample count · saved in this browser.' : 'Saved in this browser. No account needed.';
  } catch {
    storageStatus.textContent = 'Browser storage is unavailable. Export your count to keep a copy.';
  }
}

function update({ persist = true } = {}) {
  const values = inputs.map(input => validate(input, parseCount));
  const targetCents = validate(target, parseTarget);
  isValid = values.every(value => value !== undefined) && targetCents !== undefined;
  exportButton.disabled = !isValid;
  const balance = document.querySelector('#balance');
  balance.className = 'balance';
  if (values.some(value => value === undefined)) {
    document.querySelector('#totalCount').textContent = 'Check counts';
    document.querySelector('#mobile-total').textContent = 'Check counts';
    for (const group of groups) document.getElementById(`${group.id}Total`).textContent = '—';
    for (const row of denominations) document.getElementById(`${row.id}T`).textContent = '—';
    balance.textContent = 'Fix the marked quantities to calculate a complete total.';
    return;
  }
  result = calculate(getCounts(), bundleSizes);
  document.querySelector('#totalCount').textContent = formatMoney(result.total);
  document.querySelector('#mobile-total').textContent = formatMoney(result.total);
  for (const row of denominations) document.getElementById(`${row.id}T`).textContent = formatMoney(result.rows[row.id]);
  for (const group of groups) document.getElementById(`${group.id}Total`).textContent = formatMoney(result.groups[group.id]);
  if (targetCents === undefined) balance.textContent = 'Fix the expected cash amount to compare your count.';
  else if (targetCents === null) balance.textContent = 'Add a target to check your balance.';
  else {
    const difference = result.total - targetCents;
    balance.textContent = difference === 0 ? 'Balanced. Your count matches the target.' : `${formatMoney(Math.abs(difference))} ${difference < 0 ? 'short of' : 'over'} the target.`;
    balance.classList.add(difference === 0 ? 'balance--match' : 'balance--difference');
  }
  if (persist && isValid) save();
}

function applyState(state) {
  for (const input of inputs) input.value = state.counts[input.id] ?? '0';
  target.value = state.target ?? '';
  bundleSizes = { ...defaultBundleSizes, ...state.bundleSizes };
  sampleMode = Boolean(state.sampleMode);
  refreshBundleLabels();
  update();
}

function refreshBundleLabels() {
  for (const row of bundleRows) {
    document.getElementById(`${row.id}-size`).value = bundleSizes[row.id];
    markError(document.getElementById(`${row.id}-size`), '');
    for (const field of row.fields) document.getElementById(`${field.id}-value`).textContent = `${formatMoney(fieldCents(row, field, bundleSizes))} each`;
  }
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    if (state.version !== 1 || !state.counts || typeof state.counts !== 'object' || typeof state.target !== 'string') throw new Error('Invalid saved count');
    calculate(state.counts, state.bundleSizes);
    parseTarget(state.target);
    applyState(state);
    status.textContent = sampleMode ? 'Restored your sample count.' : 'Restored your previous count.';
  } catch {
    storageStatus.textContent = 'Could not restore a saved count. You can start a new count below.';
  }
}

form.addEventListener('submit', event => event.preventDefault());
for (const input of [...inputs, target]) input.addEventListener('input', () => {
  undoState = null;
  document.querySelector('#undo').hidden = true;
  status.textContent = '';
  update();
});

document.querySelector('#apply-settings').addEventListener('click', () => {
  const next = {};
  let firstInvalid;
  for (const row of bundleRows) {
    const input = document.getElementById(`${row.id}-size`);
    const size = validate(input, value => {
      const count = parseCount(value);
      if (count === 0) throw new Error('Enter at least 1 bill per bundle.');
      return count;
    });
    if (size === undefined) firstInvalid ??= input;
    else next[row.id] = size;
  }
  if (firstInvalid) { firstInvalid.focus(); return; }
  bundleSizes = next;
  undoState = null;
  document.querySelector('#undo').hidden = true;
  refreshBundleLabels();
  update();
  document.querySelector('#settings-status').textContent = 'Bundle sizes applied. The current count has been recalculated.';
});

document.querySelector('#clear').addEventListener('click', () => {
  if (inputs.every(input => !input.value || input.value === '0') && !target.value) return;
  undoState = structuredClone(getState());
  for (const input of inputs) input.value = '0';
  target.value = '';
  sampleMode = false;
  update();
  document.querySelector('#undo').hidden = false;
  status.textContent = 'Count cleared. You can undo until you start editing.';
});
document.querySelector('#undo').addEventListener('click', () => {
  if (!undoState) return;
  applyState(undoState);
  undoState = null;
  document.querySelector('#undo').hidden = true;
  status.textContent = 'Your count has been restored.';
});

document.querySelector('#sample').addEventListener('click', () => {
  if (inputs.some(input => Number(input.value) > 0) || target.value) {
    status.textContent = 'Clear the current count before loading a sample. Clear can be undone.';
    return;
  }
  const counts = { pennyS: 3, nickelS: 5, dimeS: 4, quarterS: 8, billS: 42, billB: 2, billFiveS: 12, billFiveB: 1, billTenS: 8, billTenB: 2, billTwentyS: 20, billFiftyS: 4, billHundredS: 5 };
  applyState({ counts, target: String(calculate(counts, bundleSizes).total / 100), bundleSizes, sampleMode: true });
  status.textContent = 'Sample count loaded. These are demonstration quantities.';
});

exportButton.addEventListener('click', () => {
  update();
  if (!isValid) return;
  const csv = [['Denomination', 'Packaging', 'Quantity', 'Value per package (USD)', 'Subtotal (USD)']];
  for (const row of denominations) for (const field of row.fields) {
    const quantity = parseCount(document.getElementById(field.id).value);
    const cents = fieldCents(row, field, bundleSizes);
    csv.push([row.name, field.label, quantity, (cents / 100).toFixed(2), (quantity * cents / 100).toFixed(2)]);
  }
  csv.push(['Total', '', '', '', (result.total / 100).toFixed(2)]);
  const targetCents = parseTarget(target.value);
  if (targetCents !== null) {
    csv.push(['Expected cash', '', '', '', (targetCents / 100).toFixed(2)]);
    csv.push(['Difference', '', '', '', ((result.total - targetCents) / 100).toFixed(2)]);
  }
  if (sampleMode) csv.push(['Demonstration count', '', '', '', '']);
  const blob = new Blob([csv.map(row => row.join(',')).join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `vault-count-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'CSV export downloaded.';
});

update({ persist: false });
restore();
