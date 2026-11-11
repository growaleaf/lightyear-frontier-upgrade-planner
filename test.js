// Headless tests. Run with: node test.js
const assert = require("assert");
const { UPGRADES, findBySourceText, getChain, sumChainCost } = require("./data.js");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log("PASS -", name);
  } catch (e) {
    console.error("FAIL -", name, "-", e.message);
    process.exitCode = 1;
  }
}

// 1. Row count matches the full, non-truncated parse of the source section.
test("row count is 33", () => {
  assert.strictEqual(UPGRADES.length, 33);
});

// 2-5. The four GameSkinny-confirmed rows match exactly on name/cost/qty.
test("cross-source: Sprint Speed I matches GameSkinny", () => {
  const u = findBySourceText("Sprint Speed I");
  assert.ok(u.cross_source);
  assert.deepStrictEqual(u.cost, [{ item: "Caroot Oil", qty: 36 }, { item: "Copper Wire", qty: 5 }]);
});

test("cross-source: Sprint Speed II matches GameSkinny", () => {
  const u = findBySourceText("Sprint Speed II");
  assert.ok(u.cross_source);
  assert.deepStrictEqual(u.cost, [{ item: "Coilvine Oil", qty: 36 }, { item: "Spring", qty: 5 }]);
});

test("cross-source: Thruster Boost I matches GameSkinny", () => {
  const u = findBySourceText("Thruster Boost I");
  assert.ok(u.cross_source);
  assert.deepStrictEqual(u.cost, [{ item: "Rabbage Oil", qty: 50 }, { item: "Power Core", qty: 1 }]);
});

test("cross-source: Thruster Boost II matches GameSkinny", () => {
  const u = findBySourceText("Thruster Boost II");
  assert.ok(u.cross_source);
  assert.deepStrictEqual(u.cost, [{ item: "Lumbloom Oil", qty: 25 }, { item: "Spring", qty: 5 }, { item: "Power Core", qty: 1 }]);
});

// 6. Exactly 4 rows are marked cross_source - no more, no less.
test("exactly 4 rows marked cross_source", () => {
  const n = UPGRADES.filter(u => u.cross_source).length;
  assert.strictEqual(n, 4);
});

// 7. Prereq chain, 3-deep: Inventory Capacity III -> II -> I (via Vacuum Harvester Range I/Inventory Capacity I).
test("3-deep chain: Inventory Capacity III", () => {
  const target = findBySourceText("Inventory Capacity III");
  const chain = getChain(target);
  const names = chain.map(u => u.source_text);
  assert.deepStrictEqual(names, ["Inventory Capacity I", "Vacuum Harvester Range I", "Inventory Capacity II", "Inventory Capacity III"]);
});

// 8. Summed shopping list for that chain (sum identical item names only, no conversion).
test("3-deep chain shopping list sums correctly", () => {
  const target = findBySourceText("Inventory Capacity III");
  const chain = getChain(target);
  const totals = sumChainCost(chain);
  const asMap = Object.fromEntries(totals.map(t => [t.item, t.qty]));
  // Inventory Capacity I: 5 Aluminum Electronics
  // Vacuum Harvester Range I: 3 Red Lens
  // Inventory Capacity II: 5 Battery
  // Inventory Capacity III: 5 Fractalite Bar, 5 Battery
  assert.strictEqual(asMap["Aluminum Electronics"], 5);
  assert.strictEqual(asMap["Red Lens"], 3);
  assert.strictEqual(asMap["Battery"], 10);
  assert.strictEqual(asMap["Fractalite Bar"], 5);
});

// 9. Every non-null prereq resolves to a row that exists (no dangling links).
test("every prereq link resolves to an existing row", () => {
  for (const u of UPGRADES) {
    if (u.prereq !== null) {
      assert.ok(findBySourceText(u.prereq), `missing prereq target for ${u.source_text}: ${u.prereq}`);
    }
  }
});

// 10. Filter-equivalent: category membership totals account for every row exactly once.
test("category filter partitions all rows exactly once", () => {
  const cats = ["Farming", "Gathering", "Traversal"];
  const counts = cats.map(c => UPGRADES.filter(u => u.category === c).length);
  assert.strictEqual(counts.reduce((a, b) => a + b, 0), UPGRADES.length);
  for (const u of UPGRADES) assert.ok(cats.includes(u.category));
});

// 11. Root rows (no prereq) have single-step chains equal to themselves.
test("a root row's chain is itself", () => {
  const root = findBySourceText("Seed Shooter Lock-on");
  const chain = getChain(root);
  assert.strictEqual(chain.length, 1);
  assert.strictEqual(chain[0].source_text, "Seed Shooter Lock-on");
});

console.log(`\n${passed}/${UPGRADES.length ? 11 : 0} tests reported (see PASS/FAIL lines above)`);
if (process.exitCode) {
  console.error("\nSOME TESTS FAILED");
} else {
  console.log("\nALL TESTS PASSED");
}
