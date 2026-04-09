## File size limit
JS source files should stay under **250 lines**. When a file approaches this limit, split it into focused sub-files by logical section. This keeps files scannable and diffs clean.

Exception: data-heavy metadata files (like `level-meta.js`) may exceed this if the data is uniform and splitting would add complexity without benefit.

## Level data format
Level grids live in `js/levels/data/` as `.js` files wrapping raw grid data in a `_registerLevelData(key, template_literal)` call. The raw data is just tile characters, one row per line — no quotes or array syntax. Corresponding `.txt` files are kept as raw reference. Level metadata (name, dimensions, stars, lasers) lives in `js/levels/level-meta.js` with `dataKey` linking to the registered data.

**No `fetch()` used** — this ensures the game works when opened directly via `file://` protocol without a server.

## Script loading
All JS loads via `<script>` tags in `index.html` — no bundler. Order matters: config → utils → audio → input → particles → camera → save → animals (data, draw-*, draw) → levels (meta, parser, data/*.js) → shop → player → rendering (utils, world, player, hud, touch, screens-game, screens-menus) → game.

## Animal drawing
Each animal has its own `draw-{name}.js` file with a `drawAnimalName(s, col, acc)` function. The dispatcher in `draw.js` maps icon names to functions via `_animalDrawers` lookup table.

## Game initialization
`game.js` calls `loadAllLevels()` synchronously then starts `requestAnimationFrame(gameLoop)`. Level data is already available from `<script>` tags.

## Language
All user-facing text is in French. Variable names and code comments are in English.
