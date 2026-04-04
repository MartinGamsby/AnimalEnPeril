// ============================================================
// Utility Functions
// ============================================================

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
function rng(lo, hi) { return lo + Math.random() * (hi - lo); }
