// ============================================================
// Animal en Peril - Configuration & Constants
// ============================================================

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const C = {
  TILE: 32,
  GRAVITY: 0.55,
  MAX_FALL: 11,
  PLAYER_SPEED: 3.8,
  JUMP_FORCE: 10.5,
  WALL_JUMP_X: 6.5,
  WALL_JUMP_Y: 10,
  WALL_SLIDE_SPEED: 1.8,
  DASH_SPEED: 14,
  DASH_FRAMES: 8,
  DASH_COOLDOWN: 50,
  SHIFT_DURATION: 130,
  SHIFT_COOLDOWN: 300,
  CAM_LERP: 0.09,
  COYOTE: 7,
  JUMP_BUFFER: 7,
  WALL_LOCK: 7,
};

const COL = {
  BG: '#080816',
  CYAN: '#0ff',
  MAGENTA: '#f0f',
  YELLOW: '#ffe033',
  RED: '#ff3344',
  GREEN: '#33ff88',
  WALL: '#1a1a2e',
  WALL_EDGE: '#0af',
  DIM_A: '#0088cc',
  DIM_B: '#cc44ff',
  PORTAL: '#88ffee',
  VOID: '#220022',
  SPIKE: '#ff2244',
};

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
