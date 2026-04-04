// ============================================================
// Player Logic
// ============================================================

const player = {
  x: 0, y: 0, w: 20, h: 28, vx: 0, vy: 0,
  gravDir: 1, grounded: false, facing: 1,
  wallSliding: false, wallDir: 0, wallLock: 0,
  dashing: false, dashTimer: 0, dashCooldown: 0,
  shifted: false, shiftTimer: 0, shiftCooldown: 0,
  coyote: 0, jumpBuffer: 0,
  orbs: 0, dead: false,
  spawnX: 0, spawnY: 0,
  trail: [],
  gravityFlips: 0,
};

function resetPlayer() {
  player.x = level.start.x; player.y = level.start.y;
  player.vx = player.vy = 0;
  player.gravDir = 1; player.grounded = false; player.facing = 1;
  player.wallSliding = false; player.wallDir = 0; player.wallLock = 0;
  player.dashing = false; player.dashTimer = 0; player.dashCooldown = 0;
  player.shifted = false; player.shiftTimer = 0; player.shiftCooldown = 0;
  player.coyote = 0; player.jumpBuffer = 0;
  player.dead = false; player.trail = [];
  player.spawnX = level.start.x; player.spawnY = level.start.y;
}

function loadLevel(idx) {
  levelIdx = idx;
  level = levels[idx];
  player.orbs = 0;
  player.gravityFlips = 0;
  for (const o of level.orbs) o.collected = false;
  resetPlayer();
  cam.x = player.x - W / 2; cam.y = player.y - H / 2;
  for (const p of particles) p.active = false;
}

// ---- TILE HELPERS ----
function getTile(col, row) {
  if (col < 0 || col >= level.cols || row < 0 || row >= level.rows) return 1;
  return level.tiles[row * level.cols + col];
}

function isSolid(col, row) {
  const t = getTile(col, row);
  if (t === 1) return true;
  if (t === 2 && !player.shifted) return true;
  if (t === 3 && player.shifted) return true;
  return false;
}

function isSpike(col, row) {
  const t = getTile(col, row);
  return t === 4 || t === 5 || t === 10 || t === 11;
}

function isVoid(col, row) {
  return getTile(col, row) === 9;
}

function collidesWithLevel(x, y, w, h) {
  const left = Math.floor(x / C.TILE);
  const right = Math.floor((x + w - 1) / C.TILE);
  const top = Math.floor(y / C.TILE);
  const bot = Math.floor((y + h - 1) / C.TILE);
  for (let r = top; r <= bot; r++) {
    for (let c = left; c <= right; c++) {
      if (isSolid(c, r)) return true;
    }
  }
  return false;
}

function hitsHazard(x, y, w, h) {
  const left = Math.floor(x / C.TILE);
  const right = Math.floor((x + w - 1) / C.TILE);
  const top = Math.floor(y / C.TILE);
  const bot = Math.floor((y + h - 1) / C.TILE);
  for (let r = top; r <= bot; r++) {
    for (let c = left; c <= right; c++) {
      if (isSpike(c, r) || isVoid(c, r)) return true;
    }
  }
  return false;
}

// ---- LASER ----
function updateLasers() {
  if (!level.lasers) return;
  for (const l of level.lasers) {
    if (!l._t) l._t = Math.random() * Math.PI * 2;
    l._t += 0.02 * l.speed;
    if (l.vertical) {
      l.currentY = l.y1 + (l.y2 - l.y1) * (0.5 + 0.5 * Math.sin(l._t));
    }
  }
}

function laserHitsPlayer() {
  if (!level.lasers) return false;
  const px = player.x, py = player.y, pw = player.w, ph = player.h;
  for (const l of level.lasers) {
    if (l.vertical) {
      const lx = l.x;
      const ly = l.currentY || l.y1;
      if (px + pw > lx - 3 && px < lx + 3) {
        if (py + ph > ly - 200 && py < ly + 4) return true;
      }
    }
  }
  return false;
}

// ---- UPDATE ----
function updatePlayer() {
  const p = player;
  if (p.dead) return;

  let moveX = 0;
  if (p.wallLock > 0) { p.wallLock--; }
  else {
    if (held('ArrowLeft') || held('KeyA')) moveX = -1;
    if (held('ArrowRight') || held('KeyD')) moveX = 1;
  }

  if (moveX !== 0) p.facing = moveX;

  // Dash
  if (p.dashCooldown > 0) p.dashCooldown--;
  if ((justPressed('KeyE') || justPressed('ShiftRight')) && p.dashCooldown <= 0 && !p.dashing) {
    p.dashing = true;
    p.dashTimer = C.DASH_FRAMES;
    p.dashCooldown = C.DASH_COOLDOWN;
    p.vy = 0;
    Audio.dash();
    shake(4);
  }

  if (p.dashing) {
    p.vx = C.DASH_SPEED * p.facing;
    p.vy = 0;
    p.dashTimer--;
    p.trail.push({ x: p.x, y: p.y, life: 12 });
    emitParticle(p.x + p.w / 2, p.y + p.h / 2, -p.facing * rng(1, 3), rng(-1, 1), 15, COL.CYAN, rng(2, 4));
    if (p.dashTimer <= 0) {
      p.dashing = false;
      p.vx = p.facing * C.PLAYER_SPEED;
    }
  } else {
    p.vx = moveX * C.PLAYER_SPEED;
  }

  // Gravity
  if (!p.dashing) {
    p.vy += C.GRAVITY * p.gravDir;
    p.vy = clamp(p.vy, -C.MAX_FALL, C.MAX_FALL);
  }

  // Wall slide
  p.wallSliding = false;
  if (!p.grounded && !p.dashing && moveX !== 0) {
    const checkX = moveX > 0 ? p.x + p.w + 1 : p.x - 2;
    const midR = Math.floor((p.y + p.h / 2) / C.TILE);
    const checkC = Math.floor(checkX / C.TILE);
    if (isSolid(checkC, midR)) {
      p.wallSliding = true;
      p.wallDir = moveX;
      const slideMax = C.WALL_SLIDE_SPEED * p.gravDir;
      if (p.gravDir > 0 && p.vy > slideMax) p.vy = slideMax;
      if (p.gravDir < 0 && p.vy < slideMax) p.vy = slideMax;
      if (gameTime % 4 === 0) {
        emitParticle(moveX > 0 ? p.x + p.w : p.x, p.y + p.h * 0.7, rng(-0.5, 0.5), -p.gravDir * rng(0.5, 1.5), 12, '#fff', 1.5);
      }
    }
  }

  // Jump buffer
  if (justPressed('Space') || justPressed('ArrowUp') || justPressed('KeyW')) {
    p.jumpBuffer = C.JUMP_BUFFER;
  }
  if (p.jumpBuffer > 0) p.jumpBuffer--;

  // Coyote time
  if (p.grounded) p.coyote = C.COYOTE;
  else if (p.coyote > 0) p.coyote--;

  // Jump / Gravity flip
  if (p.jumpBuffer > 0) {
    if (p.coyote > 0 && !p.dashing) {
      p.vy = -C.JUMP_FORCE * p.gravDir;
      p.grounded = false;
      p.coyote = 0;
      p.jumpBuffer = 0;
      Audio.jump();
      emitBurst(p.x + p.w / 2, p.y + (p.gravDir > 0 ? p.h : 0), 6, 2, 12, '#fff', 2);
    } else if (p.wallSliding && !p.dashing) {
      p.vx = C.WALL_JUMP_X * -p.wallDir;
      p.vy = -C.WALL_JUMP_Y * p.gravDir;
      p.wallLock = C.WALL_LOCK;
      p.facing = -p.wallDir;
      p.jumpBuffer = 0;
      p.wallSliding = false;
      Audio.jump();
      emitBurst(p.wallDir > 0 ? p.x + p.w : p.x, p.y + p.h / 2, 8, 3, 15, COL.CYAN, 2);
    } else if (!p.grounded && p.coyote <= 0 && !p.wallSliding) {
      // Gravity flip
      p.gravDir *= -1;
      p.vy = 3 * p.gravDir;
      p.jumpBuffer = 0;
      p.gravityFlips++;
      Audio.flip();
      shake(5);
      emitBurst(p.x + p.w / 2, p.y + p.h / 2, 12, 3, 18, COL.MAGENTA, 3);
    }
  }

  // Dimension shift
  if (p.shiftCooldown > 0) p.shiftCooldown--;
  if (p.shifted) {
    p.shiftTimer--;
    if (p.shiftTimer <= 0) {
      p.shifted = false;
      if (collidesWithLevel(p.x, p.y, p.w, p.h)) {
        p.shifted = true;
        p.shiftTimer = 30;
      } else {
        Audio.shift();
      }
    }
  }
  if (justPressed('ShiftLeft') && p.shiftCooldown <= 0 && !p.shifted) {
    const wasShifted = p.shifted;
    p.shifted = true;
    if (collidesWithLevel(p.x, p.y, p.w, p.h)) {
      p.shifted = wasShifted;
      Audio.error();
    } else {
      p.shiftTimer = C.SHIFT_DURATION;
      p.shiftCooldown = C.SHIFT_COOLDOWN;
      Audio.shift();
      shake(3);
      emitBurst(p.x + p.w / 2, p.y + p.h / 2, 15, 4, 20, COL.DIM_B, 3);
    }
  }

  // Move X
  p.x += p.vx;
  if (collidesWithLevel(p.x, p.y, p.w, p.h)) {
    if (p.vx > 0) {
      p.x = Math.floor((p.x + p.w) / C.TILE) * C.TILE - p.w - 0.01;
    } else if (p.vx < 0) {
      p.x = Math.ceil(p.x / C.TILE) * C.TILE + 0.01;
    }
    p.vx = 0;
  }

  // Move Y
  p.y += p.vy;
  p.grounded = false;
  if (collidesWithLevel(p.x, p.y, p.w, p.h)) {
    if (p.vy * p.gravDir > 0) {
      p.grounded = true;
      if (p.gravDir > 0) {
        p.y = Math.floor((p.y + p.h) / C.TILE) * C.TILE - p.h - 0.01;
      } else {
        p.y = Math.ceil(p.y / C.TILE) * C.TILE + 0.01;
      }
      if (p.dashCooldown > 15) p.dashCooldown = 15;
    } else {
      if (p.gravDir > 0) {
        p.y = Math.ceil(p.y / C.TILE) * C.TILE + 0.01;
      } else {
        p.y = Math.floor((p.y + p.h) / C.TILE) * C.TILE - p.h - 0.01;
      }
    }
    p.vy = 0;
  }

  // Hazards
  if (hitsHazard(p.x + 2, p.y + 2, p.w - 4, p.h - 4) || laserHitsPlayer()) {
    killPlayer();
  }

  // Collectibles
  for (const orb of level.orbs) {
    if (orb.collected) continue;
    const dx = (p.x + p.w / 2) - orb.x;
    const dy = (p.y + p.h / 2) - orb.y;
    if (dx * dx + dy * dy < 400) {
      orb.collected = true;
      p.orbs++;
      Audio.collect();
      emitBurst(orb.x, orb.y, 20, 4, 25, COL.YELLOW, 3);
    }
  }

  // Portal
  const portalActive = p.orbs >= level.reqOrbs;
  if (portalActive) {
    const dx = (p.x + p.w / 2) - level.portal.x;
    const dy = (p.y + p.h / 2) - level.portal.y;
    if (dx * dx + dy * dy < 500) {
      Audio.portal();
      completeLevel();
    }
  }

  // Trail update
  for (let i = p.trail.length - 1; i >= 0; i--) {
    p.trail[i].life--;
    if (p.trail[i].life <= 0) p.trail.splice(i, 1);
  }

  // Out of bounds
  if (p.y > level.h + 100 || p.y < -100) killPlayer();
}

function killPlayer() {
  if (player.dead) return;
  player.dead = true;
  deaths++;
  Audio.die();
  shake(12);
  emitBurst(player.x + player.w / 2, player.y + player.h / 2, 35, 5, 30, COL.RED, 3);
  emitBurst(player.x + player.w / 2, player.y + player.h / 2, 20, 3, 25, COL.MAGENTA, 2);
  state = 'DEAD';
  deathTimer = 50;
}

function completeLevel() {
  const stars = Shop.getStars(levelIdx, player.gravityFlips);
  const coinsEarned = player.orbs;

  // Update save
  const save = SaveManager.getOrCreate();
  save.coins += coinsEarned;
  save.totalDeaths += deaths;
  if (!save.completedLevels.includes(levelIdx)) {
    save.completedLevels.push(levelIdx);
  }
  const prevStars = save.levelStars[levelIdx] || 0;
  if (stars > prevStars) save.levelStars[levelIdx] = stars;
  const prevBest = save.levelBestFlips[levelIdx];
  if (prevBest === undefined || player.gravityFlips < prevBest) {
    save.levelBestFlips[levelIdx] = player.gravityFlips;
  }
  SaveManager.save(save);

  // Store for display
  lastLevelStars = stars;
  lastLevelCoins = coinsEarned;
  lastLevelFlips = player.gravityFlips;

  state = 'LEVEL_COMPLETE';
  levelCompleteTimer = 120;
  emitBurst(level.portal.x, level.portal.y, 40, 6, 35, COL.PORTAL, 4);
  shake(8);
}
