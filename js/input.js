// ============================================================
// Input Handling (Keyboard + Touch + Mouse)
// ============================================================

const input = { keys: {}, just: new Set(), taps: [], touchKeys: {} };

// ---- Keyboard ----
window.addEventListener('keydown', e => {
  if (!input.keys[e.code]) input.just.add(e.code);
  input.keys[e.code] = true;
  if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Escape'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', e => { input.keys[e.code] = false; });
window.addEventListener('contextmenu', e => e.preventDefault());

function justPressed(code) { return input.just.has(code); }
function held(code) { return !!input.keys[code] || !!input.touchKeys[code]; }

// ---- Touch / Mouse Virtual Controls ----
const _isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const touchUI = { active: false, show: _isTouchDevice };

// Active touch tracking: touchId -> { x, y }
const _activeTouches = new Map();
let _mouseDown = false;
let _mousePos = null;

function _canvasXY(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * (W / rect.width),
    y: (clientY - rect.top) * (H / rect.height)
  };
}

// Virtual button layout (computed from current screen size)
function getTouchBtns() {
  const s = Math.max(52, Math.min(72, W * 0.09, H * 0.13));
  const as = Math.round(s * 1.25); // arrows bigger
  const gap = 10;
  const pad = 18;
  const by = H - pad - as - pad;       // arrows row (bigger)
  const sby = H - pad - s;       // action row
  const sm = Math.round(s * 0.7);
  return [
    { key: 'ArrowLeft',  x: pad,              y: by,              w: as,         h: as, label: '\u25C0',   color: COL.CYAN },
    { key: 'ArrowRight', x: pad + as + gap,   y: by,              w: as,         h: as, label: '\u25B6',   color: COL.CYAN },
    { key: 'Space',      x: W-pad-s*2-gap,    y: sby,             w: s*2+gap,    h: s, label: 'SAUT',     color: COL.MAGENTA },
    { key: 'KeyE',       x: W-pad-s,          y: sby - s - gap,   w: s,          h: s, label: 'DASH',     color: COL.CYAN,  id: 'dash' },
    { key: 'ShiftLeft',  x: W-pad-s*2-gap,    y: sby - s - gap,   w: s,          h: s, label: 'DIM',      color: COL.DIM_B, id: 'shift' },
    { key: 'Escape',     x: 230,              y: 15,              w: sm,         h: sm, label: '\u2190',   color: '#556' },
    { key: 'KeyR',       x: 230+sm+gap,       y: 15,              w: sm,         h: sm, label: 'R',        color: '#556' },
  ];
}

function _hitBtn(px, py, btn) {
  return px >= btn.x && px <= btn.x + btn.w && py >= btn.y && py <= btn.y + btn.h;
}

function _hitsAnyBtn(px, py) {
  const btns = getTouchBtns();
  for (const btn of btns) {
    if (_hitBtn(px, py, btn)) return true;
  }
  return false;
}

function _rebuildTouchKeys() {
  if (!touchUI.show) { input.touchKeys = {}; return; }
  const btns = getTouchBtns();
  const newKeys = {};

  // Evaluate all active touch points
  for (const pos of _activeTouches.values()) {
    let hitSomething = false;
    for (const btn of btns) {
      if (_hitBtn(pos.x, pos.y, btn)) {
        if (!input.touchKeys[btn.key] && !newKeys[btn.key]) {
          input.just.add(btn.key);
        }
        newKeys[btn.key] = true;
        hitSomething = true;
      }
    }
    // Tap anywhere (not on a button) = jump
    if (!hitSomething && !newKeys['Space']) {
      if (!input.touchKeys['Space'] && !newKeys['Space']) {
        input.just.add('Space');
      }
      newKeys['Space'] = true;
    }
  }

  // Evaluate mouse if held
  if (_mouseDown && _mousePos) {
    let hitSomething = false;
    for (const btn of btns) {
      if (_hitBtn(_mousePos.x, _mousePos.y, btn)) {
        if (!input.touchKeys[btn.key] && !newKeys[btn.key]) {
          input.just.add(btn.key);
        }
        newKeys[btn.key] = true;
        hitSomething = true;
      }
    }
    if (!hitSomething && !newKeys['Space']) {
      if (!input.touchKeys['Space'] && !newKeys['Space']) {
        input.just.add('Space');
      }
      newKeys['Space'] = true;
    }
  }

  input.touchKeys = newKeys;
}

// ---- Touch Events ----
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  touchUI.active = true;

  for (const t of e.changedTouches) {
    const pos = _canvasXY(t.clientX, t.clientY);
    _activeTouches.set(t.identifier, pos);
  }

  if (state === 'PLAYING' || state === 'DEAD') {
    _rebuildTouchKeys();
  } else {
    // Menu tap
    for (const t of e.changedTouches) {
      input.taps.push(_canvasXY(t.clientX, t.clientY));
    }
  }
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    _activeTouches.set(t.identifier, _canvasXY(t.clientX, t.clientY));
  }
  if (state === 'PLAYING' || state === 'DEAD') {
    _rebuildTouchKeys();
  }
}, { passive: false });

canvas.addEventListener('touchend', e => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    _activeTouches.delete(t.identifier);
  }
  if (state === 'PLAYING' || state === 'DEAD') {
    _rebuildTouchKeys();
  }
}, { passive: false });

canvas.addEventListener('touchcancel', e => {
  for (const t of e.changedTouches) {
    _activeTouches.delete(t.identifier);
  }
  _rebuildTouchKeys();
}, { passive: false });

// ---- Mouse Events ----
canvas.addEventListener('mousedown', e => {
  if (e.button !== 0) return;
  touchUI.active = true;
  _mouseDown = true;
  _mousePos = _canvasXY(e.clientX, e.clientY);

  if (state === 'PLAYING' || state === 'DEAD') {
    _rebuildTouchKeys();
  } else {
    input.taps.push(_canvasXY(e.clientX, e.clientY));
  }
});

canvas.addEventListener('mousemove', e => {
  if (!_mouseDown) return;
  _mousePos = _canvasXY(e.clientX, e.clientY);
  if (state === 'PLAYING' || state === 'DEAD') {
    _rebuildTouchKeys();
  }
});

canvas.addEventListener('mouseup', e => {
  if (!_mouseDown) return;
  _mouseDown = false;
  _mousePos = null;
  _rebuildTouchKeys();
});
