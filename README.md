# Lightyear Frontier Mech Upgrade Planner

Static tool (`index.html` + `data.js`, vanilla JS, no backend) for a Lightyear Frontier player
standing at the Upgrade Depot: search/filter the full upgrade list, click any upgrade to see its
prerequisite chain and the summed raw-material shopping list for the whole chain.

## Data

33 mech upgrades, parsed programmatically from a Wayback-archived snapshot (2025-12-05) of
TechRaptor's "Lightyear Frontier Mech Upgrades Guide" (`techraptor_mech_upgrades_wayback.html` in
the worker folder this build came from). The source section ends with its own "We've reached the
end of our Lightyear Frontier Mech Upgrades Guide" line, so 33 is the full list, not a truncated
read.

4 rows (`Sprint Speed I/II`, `Thruster Boost I/II`) are independently confirmed by GameSkinny's
movement article (also Wayback-archived) and marked `cross_source: true`. The other 29 are
single-source (TechRaptor only).

`category` (Farming / Gathering / Traversal) is **our grouping by mech tool/system**, not a
label the source itself prints — TechRaptor's list is flat, with no category headers.

Known source typos are kept verbatim in `source_text` and in `cost[].item` (used for chain-sum
matching) — e.g. "Blue Lends" (likely "Blue Lens"), "Hydro Spash" (likely "Hydro Splash"). Display
names are cleaned only where the fix is unambiguous; raw item-name strings used for summing are
never altered or merged across spelling variants, per the brief: sum identical item names only,
never convert or invent.

Two prerequisite oddities are shipped as written in the source (not an error in this build):
`Water Tank Capacity II` requires `Irrigation Hose Range I`, and `Inventory Capacity II` requires
`Vacuum Harvester Range I`.

## Caveat

This is a 2025 archive snapshot of an Early Access game. Costs and prerequisites may have
changed. This is not an official or wiki source — it reflects one guide writer's playthrough.

## Files

- `index.html` — UI: filterable/searchable table, click-to-see chain + shopping list
- `data.js` — the 33-row dataset + chain-walk/cost-sum helpers (also `require`-able from Node)
- `test.js` — headless tests (`node test.js`), 11 assertions
- `README.md` — this file

## Tests

```
node test.js
```
