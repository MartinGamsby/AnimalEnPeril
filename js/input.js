// ============================================================
// Input Handling
// ============================================================

const input = { keys: {}, just: new Set() };
window.addEventListener('keydown', e => {
  if (!input.keys[e.code]) input.just.add(e.code);
  input.keys[e.code] = true;
  if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Escape'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', e => { input.keys[e.code] = false; });
window.addEventListener('contextmenu', e => e.preventDefault());

function justPressed(code) { return input.just.has(code); }
function held(code) { return !!input.keys[code]; }
