// Source: TechRaptor "Lightyear Frontier Mech Upgrades Guide" (Robert N Adams),
// Wayback snapshot 2025-12-05 (https://web.archive.org/web/2025/https://techraptor.net/gaming/guides/lightyear-frontier-mech-upgrades-guide).
// Parsed programmatically from the saved snapshot's "Mech Upgrades List" section, which ends
// with the source's own "We've reached the end of our Lightyear Frontier Mech Upgrades Guide"
// line -- the list below is the full section, not a truncated read.
//
// Cross-checked rows (cross_source: true) independently match GameSkinny's movement article
// (Wayback snapshot) on name, cost items, and quantities.
//
// Fields:
//   name        cleaned display name (typo-fixed only where the fix is unambiguous)
//   source_text verbatim h3 text from the source -- never altered
//   category    Farming | Gathering | Traversal -- inferred from which mech tool/system the
//               upgrade belongs to (the source does not label categories; this is our grouping,
//               not a sourced fact)
//   prereq      exact source_text name of the prerequisite row, or null for none
//   cost        [{ item, qty }] -- item is verbatim as printed in the source, including typos
//               (e.g. "Blue Lends"); quantities are summed by exact string match only, never
//               merged across spelling variants
//   desc        verbatim effect text from the source
//   cross_source boolean, true only for the 4 rows independently confirmed by GameSkinny

const UPGRADES = [
  { name: "Seed Shooter Lock-on", source_text: "Seed Shooter Lock-on", category: "Farming", prereq: null,
    cost: [{ item: "Aluminum Rod", qty: 5 }, { item: "Plant Oil", qty: 5 }],
    desc: "The Seed Shooter can Lock On to and automatically hit up to 9 Mounds.", cross_source: false },

  { name: "Irrigation Hose Hydro Splash", source_text: "Irrigation Hose Hydro Splash", category: "Farming", prereq: null,
    cost: [{ item: "Aluminum Parts", qty: 5 }],
    desc: "The Irrigation Hose can fire big blogs of liquid that can splash on multiple Mounds at the same time.", cross_source: false },

  { name: "Water Tank Capacity I", source_text: "Water Tank Capacity I", category: "Farming", prereq: null,
    cost: [{ item: "Polyberry Oil", qty: 18 }],
    desc: "Increase Water Tank Capacity. The Mech can store more water in its Water Tank.", cross_source: false },

  { name: "Irrigation Hose Power I", source_text: "Irrigation Hose Power I", category: "Farming", prereq: null,
    cost: [{ item: "Red Crystal Dust", qty: 10 }, { item: "Rabbage Oil", qty: 9 }],
    desc: "Increase the Power of the Irrigation Hose, allowing it to wash away strong Slime.", cross_source: false },

  { name: "Spike Saw Power I", source_text: "Spike Saw Power I", category: "Gathering", prereq: null,
    cost: [{ item: "Aluminum Parts", qty: 5 }],
    desc: "Increase the Power of the Spike Saw, allowing it to break strong materials.", cross_source: false },

  { name: "Inventory Capacity I", source_text: "Inventory Capacity I", category: "Gathering", prereq: null,
    cost: [{ item: "Aluminum Electronics", qty: 5 }],
    desc: "Increase Inventory Capacity. The Mech can store more items before becoming Overencumbered.", cross_source: false },

  { name: "Vacuum Harvester Power I", source_text: "Vacuum Harvester Power I", category: "Gathering", prereq: null,
    cost: [{ item: "Copper Wire", qty: 5 }, { item: "Caroot Oil", qty: 9 }],
    desc: "Increase the Power of the Vacuum Harvester, allowing it to suck up strong Weeds.", cross_source: false },

  { name: "Pathmaker", source_text: "Pathmaker", category: "Traversal", prereq: null,
    cost: [{ item: "Aluminum Electronics", qty: 5 }, { item: "Aluminum Frame", qty: 4 }, { item: "Polyberry Oil", qty: 9 }],
    desc: "Pathmaker Mode allows the Mech to freely create Paths on the ground.", cross_source: false },

  { name: "Thruster Boost I", source_text: "Thruster Boost I", category: "Traversal", prereq: null,
    cost: [{ item: "Rabbage Oil", qty: 50 }, { item: "Power Core", qty: 1 }],
    desc: "Increase Thruster Boost, allowing the Mech to jump higher and stay in the air for longer.", cross_source: true },

  { name: "Sprint Speed I", source_text: "Sprint Speed I", category: "Traversal", prereq: null,
    cost: [{ item: "Caroot Oil", qty: 36 }, { item: "Copper Wire", qty: 5 }],
    desc: "Increase Sprint speed, allowing the Mech to move faster.", cross_source: true },

  { name: "Lock-On Targets I", source_text: "Lock-on Targets I", category: "Farming", prereq: "Seed Shooter Lock-on",
    cost: [{ item: "Clear Lens", qty: 2 }, { item: "Aluminum Electronics", qty: 2 }, { item: "Power Core", qty: 1 }],
    desc: "The Seed Shooter can LOck On to up to 18 Mounds.", cross_source: false },

  { name: "Hydro Splash Size I", source_text: "Hydro Spash Size I", category: "Farming", prereq: "Irrigation Hose Hydro Splash",
    cost: [{ item: "Blue Crystal Dust", qty: 6 }, { item: "Iron Parts", qty: 5 }],
    desc: "The Irrigation Hose's Hydro Splash splashes Liquids in a larger area.", cross_source: false },

  { name: "Irrigation Hose Range I", source_text: "Irrigation Hose Range I", category: "Farming", prereq: "Water Tank Capacity I",
    cost: [{ item: "Red Lens", qty: 3 }],
    desc: "Increase the range of the Irrigation Hose. Liquids can be sprayed farther.", cross_source: false },

  { name: "Irrigation Hose Power II", source_text: "Irrigation Hose Power II", category: "Farming", prereq: "Irrigation Hose Power I",
    cost: [{ item: "Iron Parts", qty: 5 }, { item: "Red Lens", qty: 2 }],
    desc: "The Irrigation Hose can wash away stronger Slime.", cross_source: false },

  { name: "Spike Saw Power II", source_text: "Spike Saw Power II", category: "Gathering", prereq: "Spike Saw Power I",
    cost: [{ item: "Aluminum Electronics", qty: 5 }, { item: "Caroot Oil", qty: 18 }],
    desc: "The Spike Saw can break stronger materials.", cross_source: false },

  { name: "Spike Saw Damage I", source_text: "Spike Saw Damage I", category: "Gathering", prereq: "Spike Saw Power I",
    cost: [{ item: "Aluminum Rod", qty: 3 }, { item: "Rabbage Oil", qty: 5 }, { item: "Power Core", qty: 1 }],
    desc: "Increase the Damage of the Spike Saw, allowing it to break materials in fewer hits.", cross_source: false },

  { name: "Vacuum Harvester Range I", source_text: "Vacuum Harvester Range I", category: "Gathering", prereq: "Inventory Capacity I",
    cost: [{ item: "Red Lens", qty: 3 }],
    desc: "Increase the range of the Vacuum Harvester, allowing it to reach resources from farther away.", cross_source: false },

  { name: "Vacuum Harvester Power II", source_text: "Vacuum Harvester Power II", category: "Gathering", prereq: "Vacuum Harvester Power I",
    cost: [{ item: "Blue Lends", qty: 2 }, { item: "Steel Electronics", qty: 2 }, { item: "Battery", qty: 2 }],
    desc: "The Vacuum Harvester can suck up stronger Weeds.", cross_source: false },

  { name: "Field Plow", source_text: "Field Plow", category: "Farming", prereq: "Pathmaker",
    cost: [{ item: "Aluminum Rod", qty: 10 }, { item: "Iron Frame", qty: 5 }, { item: "Chromaize Oil", qty: 6 }],
    desc: "Field Plow Mode allows the Mech to freely create fields of Mounds on the ground.", cross_source: false },

  { name: "Thruster Boost II", source_text: "Thruster Boost II", category: "Traversal", prereq: "Thruster Boost I",
    cost: [{ item: "Lumbloom Oil", qty: 25 }, { item: "Spring", qty: 5 }, { item: "Power Core", qty: 1 }],
    desc: "The Mech can jump even higher and stay in the air for even longer.", cross_source: true },

  { name: "Sprint Speed II", source_text: "Sprint Speed II", category: "Traversal", prereq: "Sprint Speed I",
    cost: [{ item: "Coilvine Oil", qty: 36 }, { item: "Spring", qty: 5 }],
    desc: "The Mech can move even faster.", cross_source: true },

  { name: "Lock-On Targets II", source_text: "Lock on Targets II", category: "Farming", prereq: "Lock-on Targets I",
    cost: [{ item: "Blue Lens", qty: 2 }, { item: "Iron Electronics", qty: 2 }, { item: "Power Core", qty: 1 }],
    desc: "The Seed Shooter can Lock On to up to 32 Mounds.", cross_source: false },

  { name: "Hydro Splash Size II", source_text: "Hydro Spash Size II", category: "Farming", prereq: "Hydro Spash Size I",
    cost: [{ item: "Yellow Crystal Dust", qty: 6 }, { item: "Steel Parts", qty: 5 }],
    desc: "The Irrigation Hose's Hydro Splash splashes Liquids in an even larger area.", cross_source: false },

  { name: "Water Tank Capacity II", source_text: "Water Tank Capacity II", category: "Farming", prereq: "Irrigation Hose Range I",
    cost: [{ item: "Blue Crystal", qty: 6 }, { item: "Zappertwig Oil", qty: 3 }],
    desc: "The Mech can store more water in its Water Tank.", cross_source: false },

  { name: "Spike Saw Power III", source_text: "Spike Saw Power III", category: "Gathering", prereq: "Spike Saw Power II",
    cost: [{ item: "Iron Parts", qty: 5 }, { item: "Iron Electronics", qty: 2 }],
    desc: "The Spike Saw can break even stronger materials.", cross_source: false },

  { name: "Spike Saw Damage II", source_text: "Spike Saw Damage II", category: "Gathering", prereq: "Spike Saw Damage I",
    cost: [{ item: "Iron Bar", qty: 3 }, { item: "Chromaize Oil", qty: 5 }, { item: "Power Core", qty: 1 }],
    desc: "The Spike Saw can break materials in fewer hits.", cross_source: false },

  { name: "Vacuum Harvester Width I", source_text: "Vacuum Harvester Width I", category: "Gathering", prereq: "Vacuum Harvester Range I",
    cost: [{ item: "Iron Frame", qty: 1 }, { item: "Zappertwig Oil", qty: 9 }],
    desc: "Increase the width of the Vacuum Harvester, allowing it to gather resources in a wide area.", cross_source: false },

  { name: "Inventory Capacity II", source_text: "Inventory Capacity II", category: "Gathering", prereq: "Vacuum Harvester Range I",
    cost: [{ item: "Battery", qty: 5 }],
    desc: "The Mech can store more items before becoming Overencumbered.", cross_source: false },

  { name: "Lock-On Targets III", source_text: "Lock On Targets III", category: "Farming", prereq: "Lock on Targets II",
    cost: [{ item: "Yellow Lens", qty: 2 }, { item: "Steel Electronics", qty: 2 }, { item: "Power Core", qty: 1 }],
    desc: "The Seed Shooter can Lock On to up to 64 Mounds.", cross_source: false },

  { name: "Water Tank Capacity III", source_text: "Water Tank Capacity III", category: "Farming", prereq: "Water Tank Capacity II",
    cost: [{ item: "Yellow Crystal", qty: 6 }, { item: "Honeybottle Oil", qty: 18 }],
    desc: "The Mech can store even more water in its Water Tank.", cross_source: false },

  { name: "Spike Saw Damage III", source_text: "Spike Saw Damage III", category: "Gathering", prereq: "Spike Saw Damage II",
    cost: [{ item: "Fractalite Bar", qty: 3 }, { item: "Lumbloom Oil", qty: 5 }, { item: "Power Core", qty: 1 }],
    desc: "The Spike Saw can break materials in even fewer hits.", cross_source: false },

  { name: "Vacuum Harvester Width II", source_text: "Vacuum Harvester Width II", category: "Gathering", prereq: "Vacuum Harvester Width I",
    cost: [{ item: "Steel Frame", qty: 1 }, { item: "Wax", qty: 9 }],
    desc: "The Vacuum Harvester can gather resources in a wider area.", cross_source: false },

  { name: "Inventory Capacity III", source_text: "Inventory Capacity III", category: "Gathering", prereq: "Inventory Capacity II",
    cost: [{ item: "Fractalite Bar", qty: 5 }, { item: "Battery", qty: 5 }],
    desc: "The Mech can store even more items before becoming Overencumbered.", cross_source: false },
];

// Prereq chain uses source_text as the link key (that's the exact string the source prints
// in each row's "Prerequisites:" field).
function findBySourceText(sourceText) {
  return UPGRADES.find(u => u.source_text === sourceText) || null;
}

// Returns the ordered chain [root, ..., target] by walking source_text prereq links.
function getChain(upgrade) {
  const chain = [upgrade];
  let current = upgrade;
  const seen = new Set([current.source_text]);
  while (current.prereq) {
    const next = findBySourceText(current.prereq);
    if (!next || seen.has(next.source_text)) break; // guards against a cyclic/missing link
    chain.unshift(next);
    seen.add(next.source_text);
    current = next;
  }
  return chain;
}

// Sums cost items across a chain by exact item-name string match only.
function sumChainCost(chain) {
  const totals = new Map();
  for (const step of chain) {
    for (const { item, qty } of step.cost) {
      totals.set(item, (totals.get(item) || 0) + qty);
    }
  }
  return Array.from(totals.entries()).map(([item, qty]) => ({ item, qty }));
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { UPGRADES, findBySourceText, getChain, sumChainCost };
}
