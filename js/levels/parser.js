const TILE_CHARS = '0123456789abcde';
const levels = [];
const challengeLevels = [];
const _levelRawData = {};

function _registerLevelData(key, raw) {
  _levelRawData[key] = raw.split('\n').filter(line => line.length > 0);
}

function _parseLevel(name, cols, rows, reqOrbs, data, extras = {}) {
  const tiles = [];
  const orbs = [];
  let start = { x: 2, y: 2 };
  let portal = { x: 10, y: 10 };
  const lasers = extras.lasers || [];
  const stars = extras.stars || [
    { time: 30, flips: 4 }, { time: 50, flips: 8 },
    { time: 75, flips: 14 }, { time: 120, flips: 22 }
  ];

  for (let r = 0; r < rows; r++) {
    const row = data[r] || '';
    for (let c = 0; c < cols; c++) {
      const ch = row[c] || '0';
      const id = TILE_CHARS.indexOf(ch);
      tiles[r * cols + c] = id >= 0 ? id : 0;
      if (ch === '6') { orbs.push({ x: c * C.TILE + C.TILE / 2, y: r * C.TILE + C.TILE / 2, collected: false, bob: Math.random() * Math.PI * 2 }); tiles[r * cols + c] = 0; }
      if (ch === '7') { start = { x: c * C.TILE + 6, y: r * C.TILE + 2 }; tiles[r * cols + c] = 0; }
      if (ch === '8') { portal = { x: c * C.TILE + C.TILE / 2, y: r * C.TILE + C.TILE / 2 }; tiles[r * cols + c] = 0; }
    }
  }

  return { name, cols, rows, reqOrbs, tiles, orbs, start, portal, lasers, stars, w: cols * C.TILE, h: rows * C.TILE };
}

function loadAllLevels() {
  for (const m of _levelMeta) {
    const data = _levelRawData[m.dataKey];
    levels.push(_parseLevel(m.name, m.cols, m.rows, m.reqOrbs, data, { stars: m.stars, lasers: m.lasers }));
  }
  for (const m of _challengeMeta) {
    const data = _levelRawData[m.dataKey];
    challengeLevels.push(_parseLevel(m.name, m.cols, m.rows, m.reqOrbs, data, { stars: m.stars, lasers: m.lasers }));
  }
}
