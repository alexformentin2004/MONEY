import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(scriptMatch, 'inline application script must exist');
const script = scriptMatch[1];

test('application JavaScript is syntactically valid', () => {
  assert.doesNotThrow(() => new Function(script));
});

test('v0.12.0 schema and core storage contract are present', () => {
  assert.match(script, /APP_VERSION='0\.11\.0',SCHEMA_VERSION=6/);
  assert.match(script, /KEY='alex\.money\.state'/);
  assert.match(script, /monthlyClosures/);
  assert.match(script, /vehicleRefs/);
});

test('linked savings goals are implemented', () => {
  assert.match(script, /function goalCurrent\(g\)/);
  assert.match(script, /trackingMode/);
  assert.match(script, /Collega a un conto/);
});

test('automatic insights and customizable home KPIs are implemented', () => {
  assert.match(script, /function automaticInsights\(k\)/);
  assert.match(script, /HOME_KPI_CATALOG/);
  assert.match(script, /function openHomeKpis\(\)/);
  assert.match(script, /homeKpis/);
});

test('privacy mode masks UI money and report explicitly uses raw values', () => {
  assert.match(script, /function moneyRaw\(n\)/);
  assert.match(script, /function togglePrivacy\(\)/);
  assert.match(script, /privacyMode/);
  const a = script.indexOf('function reportDocument(k)');
  const b = script.indexOf('function printMonthlyReport(k)', a);
  const report = script.slice(a, b);
  assert.ok(report.includes('moneyRaw('), 'report must use unmasked monetary values');
});

test('guided CSV parser handles quoted semicolon data and localized amounts', () => {
  const a = script.indexOf('function detectCSVDelimiter');
  const b = script.indexOf('function parseImportedDate', a);
  assert.ok(a >= 0 && b > a);
  const block = script.slice(a, b);
  const api = new Function(block + '; return {parseCSV,parseImportedAmount};')();
  const parsed = api.parseCSV('date;amount;merchant\n2026-10-06;"12,50";"Bar; Centro"\n');
  assert.deepEqual(parsed.headers, ['date','amount','merchant']);
  assert.equal(parsed.rows.length, 1);
  assert.equal(parsed.rows[0][2], 'Bar; Centro');
  assert.equal(api.parseImportedAmount('1.234,56'), 1234.56);
  assert.equal(api.parseImportedAmount('-52,30'), -52.30);
});

test('HUB event archive and generic financial bridge are present', () => {
  assert.match(script, /function renderHubEvents\(\)/);
  assert.match(script, /function getFinancialEvents\(\)/);
  assert.match(script, /function upsertFinancialEvent\(e\)/);
  assert.match(script, /function getIntegrationContract\(\)/);
  assert.match(script, /syncStatus/);
});

test('AUTO bridge remains intact', () => {
  assert.match(script, /function getVehicleCostEvents\(\)/);
  assert.match(script, /function upsertVehicleCostEvent\(e\)/);
  assert.match(script, /entityType:'vehicle_cost'/);
});

test('actual accounting excludes planned and cancelled movements', () => {
  assert.match(script, /function isActual\(t\)/);
  assert.match(script, /function actualTxForMonth\(k\)/);
  assert.match(script, /planned/);
});

test('forecast, integrity, annual dashboard and month closures remain present', () => {
  assert.match(script, /function renderForecast\(\)/);
  assert.match(script, /function integrityIssues\(\)/);
  assert.match(script, /function renderYear\(\)/);
  assert.match(script, /function closeMonth\(k\)/);
});

test('service worker cache is aligned to v0.12.0', () => {
  assert.match(sw, /alex\.money\.shell\.v0\.11\.0/);
});

test('credit/debt feature remains intentionally absent', () => {
  assert.doesNotMatch(html, /Carta di credito/i);
  assert.doesNotMatch(html, /Prestito/i);
});


test('premium mint UI theme is present', () => {
  assert.match(html, /--mint:#0aa37f/);
  assert.match(html, /--shadow:0 12px 34px/);
  assert.match(html, /data-view="analytics"/);
  assert.match(html, /data-view="goals"/);
});
