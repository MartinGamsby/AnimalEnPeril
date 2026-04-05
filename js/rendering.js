// ============================================================
// Rendering Functions
// ============================================================

function drawBG() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = player.shifted ? 'rgba(14,8,32,0.7)' : 'rgba(8,8,22,0.7)';
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = player.shifted ? 'rgba(180,60,255,0.06)' : 'rgba(0,180,255,0.04)';
  ctx.lineWidth = 1;
  const sx = -(cam.x % C.TILE);
  const sy = -(cam.y % C.TILE);
  for (let x = sx; x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = sy; y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (gameTime % 3 === 0) {
    emitParticle(cam.x + rng(0, W), cam.y + H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, player.shifted ? 'rgba(180,60,255,0.3)' : 'rgba(0,180,255,0.2)', rng(1, 2.5));
  }
}

function drawTiles() {
  const startC = Math.max(0, Math.floor(cam.x / C.TILE));
  const endC = Math.min(level.cols - 1, Math.ceil((cam.x + W) / C.TILE));
  const startR = Math.max(0, Math.floor(cam.y / C.TILE));
  const endR = Math.min(level.rows - 1, Math.ceil((cam.y + H) / C.TILE));
  const ox = -cam.x + cam.shakeX;
  const oy = -cam.y + cam.shakeY;

  for (let r = startR; r <= endR; r++) {
    for (let c = startC; c <= endC; c++) {
      const t = getTile(c, r);
      const tx = c * C.TILE + ox;
      const ty = r * C.TILE + oy;

      if (t === 1) {
        ctx.fillStyle = COL.WALL;
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        ctx.strokeStyle = player.shifted ? 'rgba(180,60,255,0.4)' : 'rgba(0,170,255,0.35)';
        ctx.lineWidth = 1.5;
        if (!isSolid(c, r - 1)) { ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + C.TILE, ty); ctx.stroke(); }
        if (!isSolid(c, r + 1)) { ctx.beginPath(); ctx.moveTo(tx, ty + C.TILE); ctx.lineTo(tx + C.TILE, ty + C.TILE); ctx.stroke(); }
        if (!isSolid(c - 1, r)) { ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty + C.TILE); ctx.stroke(); }
        if (!isSolid(c + 1, r)) { ctx.beginPath(); ctx.moveTo(tx + C.TILE, ty); ctx.lineTo(tx + C.TILE, ty + C.TILE); ctx.stroke(); }
      } else if (t === 2) {
        if (player.shifted) {
          ctx.strokeStyle = 'rgba(0,140,220,0.25)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(tx + 1, ty + 1, C.TILE - 2, C.TILE - 2);
          ctx.setLineDash([]);
        } else {
          ctx.fillStyle = 'rgba(0,100,180,0.5)';
          ctx.fillRect(tx, ty, C.TILE, C.TILE);
          ctx.strokeStyle = COL.DIM_A;
          ctx.lineWidth = 2;
          ctx.strokeRect(tx + 1, ty + 1, C.TILE - 2, C.TILE - 2);
        }
      } else if (t === 3) {
        if (!player.shifted) {
          ctx.strokeStyle = 'rgba(200,60,255,0.15)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(tx + 1, ty + 1, C.TILE - 2, C.TILE - 2);
          ctx.setLineDash([]);
        } else {
          ctx.fillStyle = 'rgba(150,30,200,0.5)';
          ctx.fillRect(tx, ty, C.TILE, C.TILE);
          ctx.strokeStyle = COL.DIM_B;
          ctx.lineWidth = 2;
          ctx.strokeRect(tx + 1, ty + 1, C.TILE - 2, C.TILE - 2);
        }
      } else if (t === 4) {
        ctx.fillStyle = COL.SPIKE;
        ctx.beginPath();
        ctx.moveTo(tx + 2, ty + C.TILE);
        ctx.lineTo(tx + C.TILE / 2, ty + 6);
        ctx.lineTo(tx + C.TILE - 2, ty + C.TILE);
        ctx.fill();
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = COL.SPIKE;
        ctx.beginPath();
        ctx.moveTo(tx - 1, ty + C.TILE + 2);
        ctx.lineTo(tx + C.TILE / 2, ty + 2);
        ctx.lineTo(tx + C.TILE + 1, ty + C.TILE + 2);
        ctx.fill();
        ctx.restore();
      } else if (t === 5) {
        ctx.fillStyle = COL.SPIKE;
        ctx.beginPath();
        ctx.moveTo(tx + 2, ty);
        ctx.lineTo(tx + C.TILE / 2, ty + C.TILE - 6);
        ctx.lineTo(tx + C.TILE - 2, ty);
        ctx.fill();
      } else if (t === 9) {
        ctx.fillStyle = COL.VOID;
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        for (let i = 0; i < 3; i++) {
          const nx = tx + Math.sin(gameTime * 0.1 + c + i) * 8 + 16;
          const ny = ty + Math.cos(gameTime * 0.13 + r + i) * 8 + 16;
          ctx.fillStyle = `rgba(${100 + Math.sin(gameTime * 0.05 + i) * 50|0},0,${100 + Math.cos(gameTime * 0.07 + i) * 50|0},0.4)`;
          ctx.fillRect(nx - 3, ny - 3, 6, 6);
        }
      } else if (t === 12) {
        // Floor hole — dark pit opening at top
        ctx.fillStyle = '#050008';
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        // Ragged edges
        ctx.fillStyle = COL.WALL;
        ctx.beginPath();
        ctx.moveTo(tx, ty); ctx.lineTo(tx + 4, ty + 6); ctx.lineTo(tx, ty + 10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tx + C.TILE, ty); ctx.lineTo(tx + C.TILE - 4, ty + 6); ctx.lineTo(tx + C.TILE, ty + 10);
        ctx.fill();
        // Depth glow
        const holeGrad = ctx.createLinearGradient(tx, ty, tx, ty + C.TILE);
        holeGrad.addColorStop(0, 'rgba(80,0,120,0.3)');
        holeGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = holeGrad;
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        // Animated particles inside
        if (gameTime % 6 === 0) {
          emitParticle(c * C.TILE + rng(4, 28), r * C.TILE + rng(4, 28), rng(-0.3, 0.3), rng(0.2, 0.8), 15, 'rgba(120,0,180,0.4)', 1);
        }
      } else if (t === 13) {
        // Ceiling hole — dark pit opening at bottom
        ctx.fillStyle = '#050008';
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        // Ragged edges
        ctx.fillStyle = COL.WALL;
        ctx.beginPath();
        ctx.moveTo(tx, ty + C.TILE); ctx.lineTo(tx + 4, ty + C.TILE - 6); ctx.lineTo(tx, ty + C.TILE - 10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tx + C.TILE, ty + C.TILE); ctx.lineTo(tx + C.TILE - 4, ty + C.TILE - 6); ctx.lineTo(tx + C.TILE, ty + C.TILE - 10);
        ctx.fill();
        // Depth glow
        const cHoleGrad = ctx.createLinearGradient(tx, ty + C.TILE, tx, ty);
        cHoleGrad.addColorStop(0, 'rgba(80,0,120,0.3)');
        cHoleGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = cHoleGrad;
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        // Dripping particles
        if (gameTime % 8 === 0) {
          emitParticle(c * C.TILE + rng(4, 28), r * C.TILE + rng(4, 28), rng(-0.3, 0.3), rng(-0.8, -0.2), 15, 'rgba(120,0,180,0.4)', 1);
        }
      }
    }
  }
}

function drawLasers() {
  if (!level.lasers) return;
  const ox = -cam.x + cam.shakeX;
  const oy = -cam.y + cam.shakeY;

  for (const l of level.lasers) {
    const w = l._currentWidth || l.width || 3;
    const wobOff = l._wobbleOffset || 0;
    const angle = l._currentAngle || 0;
    const beamLen = 200;

    let sx, sy, ex, ey;
    // currentX/currentY already include diagonal movement + wobble from updateLasers()
    if (l.vertical) {
      sx = (l.currentX != null ? l.currentX : l.x) + ox;
      sy = (l.currentY != null ? l.currentY : l.y1) + oy;
      ex = sx + Math.sin(angle) * beamLen;
      ey = sy - Math.cos(angle) * beamLen;
    } else if (l.horizontal) {
      sx = (l.currentX != null ? l.currentX : l.x1) + ox;
      sy = (l.currentY != null ? l.currentY : l.y) + oy;
      ex = sx + Math.cos(angle) * beamLen;
      ey = sy + Math.sin(angle) * beamLen;
    } else {
      continue;
    }

    // Glow
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(255,50,50,0.12)';
    ctx.lineWidth = w * 4;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, sy); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,80,80,0.25)';
    ctx.lineWidth = w * 1.5;
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, sy); ctx.stroke();
    ctx.restore();

    // Core beam
    ctx.strokeStyle = COL.RED;
    ctx.lineWidth = Math.max(1.5, w * 0.7);
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, sy); ctx.stroke();

    // Emitter dot
    const dotR = 3 + w * 0.5 + Math.sin(gameTime * 0.2) * 1.5;
    ctx.fillStyle = COL.RED;
    ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2); ctx.fill();
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#ff8888';
    ctx.beginPath(); ctx.arc(sx, sy, dotR + 4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

function drawOrbs() {
  const ox = -cam.x + cam.shakeX;
  const oy = -cam.y + cam.shakeY;

  for (const orb of level.orbs) {
    if (orb.collected) continue;
    const bx = orb.x + ox;
    const by = orb.y + oy + Math.sin(gameTime * 0.06 + orb.bob) * 4;
    const pulse = 1 + Math.sin(gameTime * 0.1) * 0.15;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = COL.YELLOW;
    ctx.beginPath(); ctx.arc(bx, by, 14 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    ctx.fillStyle = COL.YELLOW;
    ctx.beginPath(); ctx.arc(bx, by, 7 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(bx - 2, by - 2, 2.5, 0, Math.PI * 2); ctx.fill();

    if (gameTime % 8 === 0) {
      emitParticle(orb.x + rng(-8, 8), orb.y + rng(-8, 8), rng(-0.5, 0.5), rng(-1, 0), 20, COL.YELLOW, 1.5);
    }
  }
}

function drawPortal() {
  const ox = -cam.x + cam.shakeX;
  const oy = -cam.y + cam.shakeY;
  const px = level.portal.x + ox;
  const py = level.portal.y + oy;
  const active = player.orbs >= level.reqOrbs;
  const t = gameTime * 0.05;

  ctx.save();
  if (active) {
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 6; i++) {
      const a = t + i * Math.PI / 3;
      const r = 16 + Math.sin(t * 2 + i) * 4;
      ctx.strokeStyle = i % 2 === 0 ? COL.CYAN : COL.MAGENTA;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(px, py, r, a, a + Math.PI * 0.8);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.3 + Math.sin(t * 3) * 0.1;
    ctx.fillStyle = COL.PORTAL;
    ctx.beginPath(); ctx.arc(px, py, 20, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();

    if (gameTime % 3 === 0) {
      const pa = Math.random() * Math.PI * 2;
      emitParticle(level.portal.x + Math.cos(pa) * 20, level.portal.y + Math.sin(pa) * 20,
        -Math.cos(pa) * 1.5, -Math.sin(pa) * 1.5, 20, COL.PORTAL, 2);
    }
  } else {
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = '#446';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const a = t * 0.5 + i * Math.PI * 2 / 3;
      ctx.beginPath();
      ctx.arc(px, py, 14, a, a + Math.PI * 0.6);
      ctx.stroke();
    }
    ctx.fillStyle = '#334';
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawPlayer() {
  const p = player;
  if (p.dead) return;
  const ox = -cam.x + cam.shakeX;
  const oy = -cam.y + cam.shakeY;
  const animalType = ANIMALS[selectedAnimal].icon;
  const animalColor = ANIMALS[selectedAnimal].color;

  for (const t of p.trail) {
    ctx.save();
    ctx.globalAlpha = t.life / 12 * 0.3;
    drawAnimalIcon(animalType, t.x + ox + p.w / 2, t.y + oy + p.h / 2, p.h, p.facing, p.gravDir, animalColor);
    ctx.restore();
  }

  const px = p.x + ox;
  const py = p.y + oy;
  const centerX = px + p.w / 2;
  const centerY = py + p.h / 2;

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = p.dashing ? 0.4 : 0.15;
  ctx.fillStyle = p.shifted ? COL.MAGENTA : animalColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, p.h * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const highlight = p.dashing ? '#fff' : (p.shifted ? COL.MAGENTA : null);
  drawAnimalIcon(animalType, centerX, centerY, p.h, p.facing, p.gravDir, highlight);

  const bodyColor = p.shifted ? COL.MAGENTA : animalColor;
  ctx.fillStyle = bodyColor;
  ctx.globalAlpha = 0.6;
  const arrowY = p.gravDir > 0 ? py + p.h + 3 : py - 6;
  ctx.beginPath();
  if (p.gravDir > 0) {
    ctx.moveTo(px + p.w / 2 - 4, arrowY);
    ctx.lineTo(px + p.w / 2, arrowY + 4);
    ctx.lineTo(px + p.w / 2 + 4, arrowY);
  } else {
    ctx.moveTo(px + p.w / 2 - 4, arrowY + 4);
    ctx.lineTo(px + p.w / 2, arrowY);
    ctx.lineTo(px + p.w / 2 + 4, arrowY + 4);
  }
  ctx.fill();
  ctx.globalAlpha = 1;

  if (p.wallSliding) {
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.5;
    const sx = p.wallDir > 0 ? px + p.w : px - 3;
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(sx, py + 5 + i * 8, 2, 4);
    }
    ctx.globalAlpha = 1;
  }
}

function drawHUD() {
  ctx.save();

  // Orb counter
  ctx.font = 'bold 20px monospace';
  ctx.textBaseline = 'top';

  ctx.fillStyle = COL.YELLOW;
  ctx.beginPath(); ctx.arc(25, 30, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(23, 28, 2, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.shadowColor = COL.YELLOW;
  ctx.shadowBlur = 8;
  ctx.fillText(`${player.orbs}/${level.reqOrbs}`, 40, 20);
  ctx.shadowBlur = 0;

  // Time counter
  const timeSec = Math.floor(levelTime / 60);
  ctx.font = '14px monospace';
  ctx.fillStyle = COL.CYAN;
  ctx.fillText(`${timeSec}s`, 40, 48);

  // Gravity flip counter
  ctx.fillStyle = COL.MAGENTA;
  ctx.fillText(`Gravite: ${player.gravityFlips}`, 90, 48);

  // Star preview (compact)
  if (level.stars) {
    const curStars = Shop.getStars(level, timeSec, player.gravityFlips);
    ctx.font = '12px monospace';
    ctx.fillStyle = COL.YELLOW;
    ctx.fillText('★'.repeat(curStars) + '☆'.repeat(5 - curStars), 40, 67);
  }

  // Level name
  if (gameTime < 120) {
    ctx.globalAlpha = gameTime < 60 ? gameTime / 60 : (120 - gameTime) / 60;
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = COL.CYAN;
    ctx.shadowColor = COL.CYAN;
    ctx.shadowBlur = 15;
    ctx.fillText(level.name, W / 2, 50);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }

  // Dash cooldown
  const dashReady = player.dashCooldown <= 0;
  ctx.fillStyle = dashReady ? COL.CYAN : '#334';
  ctx.fillRect(W - 120, 20, 40, 6);
  if (!dashReady) {
    const pct = 1 - player.dashCooldown / C.DASH_COOLDOWN;
    ctx.fillStyle = COL.CYAN;
    ctx.fillRect(W - 120, 20, 40 * pct, 6);
  }
  ctx.font = '11px monospace';
  ctx.fillStyle = dashReady ? COL.CYAN : '#556';
  ctx.fillText('DASH [E]', W - 120, 35);

  // Shift cooldown
  const shiftReady = player.shiftCooldown <= 0 && !player.shifted;
  ctx.fillStyle = player.shifted ? COL.DIM_B : (shiftReady ? COL.DIM_B : '#334');
  ctx.fillRect(W - 60, 20, 40, 6);
  if (!shiftReady && !player.shifted) {
    const pct = 1 - player.shiftCooldown / C.SHIFT_COOLDOWN;
    ctx.fillStyle = COL.DIM_B;
    ctx.fillRect(W - 60, 20, 40 * pct, 6);
  } else if (player.shifted) {
    const pct = player.shiftTimer / C.SHIFT_DURATION;
    ctx.fillStyle = COL.DIM_B;
    ctx.fillRect(W - 60, 20, 40 * pct, 6);
  }
  ctx.font = '11px monospace';
  ctx.fillStyle = shiftReady || player.shifted ? COL.DIM_B : '#556';
  ctx.fillText('SHIFT [L+]', W - 70, 35);

  // Controls hint (first level)
  if (levelIdx === 0 && gameTime < 400) {
    ctx.globalAlpha = gameTime < 300 ? 0.7 : (400 - gameTime) / 100 * 0.7;
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#889';
    ctx.fillText('< > / A D  Bouger   |   ESPACE / W  Sauter   |   ESPACE (air)  Inverser gravite', W / 2, H - 60);
    ctx.fillText('E  Dash   |   SHIFT Gauche  Changer de dimension   |   Glisse & saute sur les murs', W / 2, H - 38);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }

  // Deaths counter
  ctx.font = '13px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(`Morts : ${deaths}`, 15, H - 20);

  // Restart hint
  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = COL.CYAN;
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 6;
  ctx.fillText('[R] Recommencer', W - 170, H - 20);
  ctx.shadowBlur = 0;

  // Coins (from save)
  const save = SaveManager.getOrCreate();
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText(`Pieces : ${save.coins}`, 120, H - 20);

  ctx.restore();
}

function drawDeathScreen() {
  ctx.save();
  const progress = 1 - deathTimer / 50;

  ctx.fillStyle = `rgba(255,0,60,${0.2 * (1 - progress)})`;
  ctx.fillRect(0, 0, W, H);

  if (progress > 0.3) {
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = 'ELIMINE';
    for (let i = 0; i < 3; i++) {
      const offset = (Math.random() - 0.5) * 20 * (1 - progress);
      ctx.fillStyle = i === 0 ? COL.RED : i === 1 ? COL.CYAN : COL.MAGENTA;
      ctx.globalAlpha = 0.7;
      ctx.fillText(text, W / 2 + offset, H / 2 + (i - 1) * 2);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.fillText(text, W / 2, H / 2);
  }

  ctx.restore();
}

function drawStars(cx, cy, count, size) {
  for (let i = 0; i < 5; i++) {
    const sx = cx + (i - 2) * (size * 2.2);
    const filled = i < count;
    ctx.save();
    ctx.translate(sx, cy);
    ctx.beginPath();
    for (let j = 0; j < 5; j++) {
      const aOuter = -Math.PI / 2 + j * Math.PI * 2 / 5;
      const aInner = -Math.PI / 2 + (j + 0.5) * Math.PI * 2 / 5;
      ctx.lineTo(Math.cos(aOuter) * size, Math.sin(aOuter) * size);
      ctx.lineTo(Math.cos(aInner) * size * 0.4, Math.sin(aInner) * size * 0.4);
    }
    ctx.closePath();
    if (filled) {
      ctx.fillStyle = COL.YELLOW;
      ctx.shadowColor = COL.YELLOW;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawLevelComplete() {
  ctx.save();
  const progress = 1 - levelCompleteTimer / 120;

  if (progress < 0.15) {
    ctx.fillStyle = `rgba(255,255,255,${(0.15 - progress) * 4})`;
    ctx.fillRect(0, 0, W, H);
  }

  if (progress > 0.15) {
    ctx.font = 'bold 40px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = COL.PORTAL;
    ctx.shadowBlur = 20;
    ctx.fillStyle = COL.PORTAL;
    ctx.fillText(playingChallenge ? 'DEFI TERMINE' : 'NIVEAU TERMINE', W / 2, H / 2 - 70);
    ctx.shadowBlur = 0;

    // Stars
    if (progress > 0.3) {
      drawStars(W / 2, H / 2 - 20, lastLevelStars, 14);
    }

    // Stats
    if (progress > 0.4) {
      ctx.font = '16px monospace';
      ctx.fillStyle = '#aaa';
      ctx.fillText(`Temps : ${lastLevelTime}s  |  Inversions : ${lastLevelFlips}`, W / 2, H / 2 + 20);
      ctx.fillStyle = COL.YELLOW;
      ctx.fillText(`+${lastLevelCoins} pieces`, W / 2, H / 2 + 45);

      // Show next star requirement
      if (lastLevelStars < 5 && level.stars) {
        const nextReq = level.stars[5 - lastLevelStars - 1];
        if (nextReq) {
          ctx.font = '13px monospace';
          ctx.fillStyle = '#667';
          ctx.fillText(`Prochaine etoile : <${nextReq.time}s et <${nextReq.flips} inversions`, W / 2, H / 2 + 70);
        }
      }
    }
  }

  ctx.restore();
}

function drawDimensionOverlay() {
  if (!player.shifted) return;
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#f0f';
  ctx.fillRect(-3, 0, W, H);
  ctx.fillStyle = '#00f';
  ctx.fillRect(3, 0, W, H);
  ctx.restore();

  ctx.save();
  const grad = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.7);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(100,20,150,0.15)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

function drawScanlines() {
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#000';
  for (let y = 0; y < H; y += 4) {
    ctx.fillRect(0, y, W, 2);
  }
  ctx.restore();
}

// ---- INTRO SCREEN ----
const introLines = [
  "Laboratoire Nexus - Rapport d'incident #47",
  "",
  "L'experience sur l'accelerateur de particules",
  "a mal tourne...",
  "",
  "Une anomalie gravitationnelle s'est propagee",
  "a travers toute la Terre.",
  "",
  "La gravite est devenue... instable.",
  "",
  "Les animaux sont en danger !",
  "",
  "Toi seul peux manipuler cette anomalie",
  "pour les sauver.",
];

function drawIntro() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  // Animated grid (subtle)
  ctx.strokeStyle = 'rgba(255,50,50,0.04)';
  ctx.lineWidth = 1;
  const off = introTime * 0.15;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Warning flash
  if (introTime < 60 && introTime % 20 < 10) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = COL.RED;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // BG particles
  if (introTime % 4 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(255,50,50,0.2)', rng(1, 2));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Warning header
  if (introTime > 20) {
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = COL.RED;
    ctx.globalAlpha = 0.5 + Math.sin(introTime * 0.1) * 0.3;
    ctx.fillText('/// ALERTE - ANOMALIE DETECTEE ///', W / 2, H / 2 - 200);
    ctx.globalAlpha = 1;
  }

  // Typewriter text
  const charsPerFrame = 1.2;
  const totalChars = Math.floor(Math.max(0, introTime - 40) * charsPerFrame);
  let charCount = 0;
  const startY = H / 2 - 130;

  for (let i = 0; i < introLines.length; i++) {
    const line = introLines[i];
    if (charCount >= totalChars) break;
    const visible = Math.min(line.length, totalChars - charCount);
    const text = line.substring(0, visible);
    charCount += line.length;

    if (i === 0) {
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = COL.CYAN;
    } else if (line.includes('danger')) {
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = COL.RED;
    } else if (line.includes('sauver')) {
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = COL.GREEN;
    } else {
      ctx.font = '16px monospace';
      ctx.fillStyle = '#99aacc';
    }
    ctx.fillText(text, W / 2, startY + i * 28);
  }

  // Skip prompt
  if (introTime > 80) {
    const blink = Math.sin(introTime * 0.08) > 0;
    if (blink) {
      ctx.font = '14px monospace';
      ctx.fillStyle = '#556';
      ctx.fillText('Appuie sur ESPACE ou ENTREE pour continuer', W / 2, H / 2 + 220);
    }
  }

  ctx.restore();
}

// ---- TITLE SCREEN ----
function drawTitle() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(0,180,255,0.06)';
  ctx.lineWidth = 1;
  const off = titleTime * 0.3;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (titleTime % 2 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-1, -0.5), 80, 'rgba(0,180,255,0.3)', rng(1, 3));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 64px monospace';
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 30;
  ctx.fillStyle = COL.CYAN;
  ctx.fillText('ANIMAL', W / 2, H / 2 - 100);

  ctx.shadowColor = COL.MAGENTA;
  ctx.fillStyle = COL.MAGENTA;
  ctx.fillText('en PERIL', W / 2, H / 2 - 40);
  ctx.shadowBlur = 0;

  ctx.font = '16px monospace';
  ctx.fillStyle = '#668';
  ctx.fillText('Inverse la gravite  ·  Change de dimension  ·  Traverse le vide', W / 2, H / 2 + 10);

  // Menu options
  const menuY = H / 2 + 60;
  const blink = Math.sin(titleTime * 0.08) > 0;

  // "New Game"
  ctx.font = titleMenuIdx === 0 ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === 0 ? '#fff' : '#556';
  if (titleMenuIdx === 0 && blink) ctx.fillStyle = COL.CYAN;
  ctx.fillText('Nouvelle Partie', W / 2, menuY);

  // "Continue" (only if save exists)
  if (SaveManager.hasSave()) {
    ctx.font = titleMenuIdx === 1 ? 'bold 22px monospace' : '18px monospace';
    ctx.fillStyle = titleMenuIdx === 1 ? '#fff' : '#556';
    if (titleMenuIdx === 1 && blink) ctx.fillStyle = COL.CYAN;
    ctx.fillText('Continuer', W / 2, menuY + 35);
  }

  // "Défis"
  const defiIdx = SaveManager.hasSave() ? 2 : 1;
  ctx.font = titleMenuIdx === defiIdx ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === defiIdx ? '#fff' : '#556';
  if (titleMenuIdx === defiIdx && blink) ctx.fillStyle = COL.RED;
  ctx.fillText('Defis', W / 2, menuY + 35 * defiIdx);

  // "Shop"
  const shopIdx = defiIdx + 1;
  ctx.font = titleMenuIdx === shopIdx ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === shopIdx ? '#fff' : '#556';
  if (titleMenuIdx === shopIdx && blink) ctx.fillStyle = COL.YELLOW;
  ctx.fillText('Boutique', W / 2, menuY + 35 * shopIdx);

  // "Options"
  const optIdx = shopIdx + 1;
  ctx.font = titleMenuIdx === optIdx ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === optIdx ? '#fff' : '#556';
  if (titleMenuIdx === optIdx && blink) ctx.fillStyle = COL.MAGENTA;
  ctx.fillText('Options', W / 2, menuY + 35 * optIdx);

  // Controls hint
  ctx.font = '13px monospace';
  ctx.fillStyle = '#334';
  ctx.fillText('< > / A D  Bouger   |   ESPACE / W  Sauter & Inverser   |   E  Dash   |   SHIFT Gauche  Changer de dimension', W / 2, H - 30);

  ctx.restore();
}

// ---- SELECT SCREEN ----
function drawSelect() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(0,180,255,0.04)';
  ctx.lineWidth = 1;
  const off = selectTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (selectTime % 3 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(0,180,255,0.2)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.CYAN;
  ctx.fillText('Choisis ton animal', W / 2, H / 2 - 160);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  const selCardW = 110;
  const selMaxVisible = Math.min(ANIMALS.length, Math.floor((W - 80) / selCardW));
  const selHalfVis = Math.floor(selMaxVisible / 2);
  let selScroll = Math.max(0, Math.min(selectedAnimal - selHalfVis, ANIMALS.length - selMaxVisible));
  const selTotalVisW = selMaxVisible * selCardW;
  const selStartX = W / 2 - selTotalVisW / 2 + selCardW / 2;

  // Scroll arrows
  if (selScroll > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - selTotalVisW / 2 - 25, H / 2 - 20);
  }
  if (selScroll + selMaxVisible < ANIMALS.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + selTotalVisW / 2 + 25, H / 2 - 20);
  }

  for (let vi = 0; vi < selMaxVisible; vi++) {
    const i = vi + selScroll;
    if (i >= ANIMALS.length) break;
    const ax = selStartX + vi * selCardW;
    const ay = H / 2 - 20;
    const selected = i === selectedAnimal;
    const bob = selected ? Math.sin(selectTime * 0.08) * 6 : 0;
    const unlocked = save.unlockedAnimals.includes(ANIMALS[i].icon);

    if (selected) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.15 + Math.sin(selectTime * 0.1) * 0.05;
      ctx.fillStyle = ANIMALS[i].color;
      ctx.beginPath();
      ctx.arc(ax, ay + bob, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = ANIMALS[i].color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ax, ay + bob, 42, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.save();
    const scale = selected ? 1.15 : 0.85;
    ctx.globalAlpha = unlocked ? (selected ? 1 : 0.5) : 0.2;
    ctx.translate(ax, ay + bob);
    ctx.scale(scale, scale);
    ctx.translate(-ax, -(ay + bob));
    drawAnimalIcon(ANIMALS[i].icon, ax, ay + bob, 34, 1, 1);
    ctx.restore();

    // Name or lock
    if (unlocked) {
      ctx.font = selected ? 'bold 14px monospace' : '12px monospace';
      ctx.fillStyle = selected ? ANIMALS[i].color : '#556';
      ctx.fillText(ANIMALS[i].name, ax, ay + 55 + bob);
    } else {
      ctx.font = '12px monospace';
      ctx.fillStyle = '#444';
      ctx.fillText('Verrouille', ax, ay + 55 + bob);
    }
  }

  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText('<  >  pour choisir', W / 2, H / 2 + 100);

  const blink = Math.sin(selectTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('ENTREE ou ESPACE pour jouer', W / 2, H / 2 + 140);
  }

  ctx.restore();
}

// ---- LEVEL SELECT SCREEN ----
function drawLevelSelect() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(0,180,255,0.04)';
  ctx.lineWidth = 1;
  const off = selectTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (selectTime % 3 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(0,180,255,0.2)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.CYAN;
  ctx.fillText('Choisis un niveau', W / 2, 80);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  const cardW = 130;
  const maxVisible = Math.min(levels.length, Math.floor((W - 80) / cardW));
  const halfVis = Math.floor(maxVisible / 2);
  let scrollOffset = Math.max(0, Math.min(levelSelectIdx - halfVis, levels.length - maxVisible));
  const totalVisW = maxVisible * cardW;
  const startX = W / 2 - totalVisW / 2 + cardW / 2;

  // Scroll arrows
  if (scrollOffset > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - totalVisW / 2 - 25, H / 2 - 20);
  }
  if (scrollOffset + maxVisible < levels.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + totalVisW / 2 + 25, H / 2 - 20);
  }

  for (let vi = 0; vi < maxVisible; vi++) {
    const i = vi + scrollOffset;
    if (i >= levels.length) break;
    const cx = startX + vi * cardW;
    const cy = H / 2 - 20;
    const selected = i === levelSelectIdx;
    const completed = save.completedLevels.includes(i);
    const accessible = i === 0 || save.completedLevels.includes(i - 1);
    const stars = save.levelStars[i] || 0;
    const bob = selected ? Math.sin(selectTime * 0.08) * 4 : 0;

    // Card bg
    ctx.fillStyle = selected ? 'rgba(0,180,255,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.fillRect(cx - 55, cy - 60 + bob, 110, 120);
    ctx.strokeStyle = selected ? COL.CYAN : (accessible ? '#334' : '#222');
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(cx - 55, cy - 60 + bob, 110, 120);

    // Level number
    ctx.font = accessible ? 'bold 36px monospace' : '36px monospace';
    ctx.fillStyle = accessible ? (selected ? '#fff' : '#778') : '#333';
    ctx.fillText(`${i + 1}`, cx, cy - 15 + bob);

    // Level name
    ctx.font = '11px monospace';
    ctx.fillStyle = accessible ? (selected ? COL.CYAN : '#556') : '#333';
    ctx.fillText(levels[i].name, cx, cy + 20 + bob);

    // Stars
    if (completed) {
      drawStars(cx, cy + 45 + bob, stars, 10);
    } else if (!accessible) {
      ctx.font = '20px monospace';
      ctx.fillStyle = '#333';
      ctx.fillText('?', cx, cy + 45 + bob);
    }
  }

  // Navigation
  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText('<  >  pour choisir   |   ECHAP  retour', W / 2, H / 2 + 120);

  const blink = Math.sin(selectTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('ENTREE ou ESPACE pour jouer', W / 2, H / 2 + 155);
  }

  ctx.restore();
}

// ---- CHALLENGE SELECT SCREEN ----
function drawChallengeSelect() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,50,50,0.06)';
  ctx.lineWidth = 1;
  const off = selectTime * 0.25;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (selectTime % 2 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(255,50,50,0.3)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.RED;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.RED;
  ctx.fillText('DEFIS EXTREMES', W / 2, 80);
  ctx.shadowBlur = 0;

  ctx.font = '14px monospace';
  ctx.fillStyle = '#665';
  ctx.fillText('Niveaux brutaux pour les meilleurs joueurs', W / 2, 115);

  const save = SaveManager.getOrCreate();
  if (!save.challengeCompleted) save.challengeCompleted = [];
  if (!save.challengeStars) save.challengeStars = {};

  const cardW = 150;
  const maxVisible = Math.min(challengeLevels.length, Math.floor((W - 80) / cardW));
  const halfVis = Math.floor(maxVisible / 2);
  let scrollOffset = Math.max(0, Math.min(challengeSelectIdx - halfVis, challengeLevels.length - maxVisible));
  const totalVisW = maxVisible * cardW;
  const startX = W / 2 - totalVisW / 2 + cardW / 2;

  if (scrollOffset > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - totalVisW / 2 - 25, H / 2 - 20);
  }
  if (scrollOffset + maxVisible < challengeLevels.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + totalVisW / 2 + 25, H / 2 - 20);
  }

  for (let vi = 0; vi < maxVisible; vi++) {
    const i = vi + scrollOffset;
    if (i >= challengeLevels.length) break;
    const cx = startX + vi * cardW;
    const cy = H / 2 - 20;
    const selected = i === challengeSelectIdx;
    const completed = save.challengeCompleted.includes(i);
    const accessible = i === 0 || save.challengeCompleted.includes(i - 1);
    const stars = save.challengeStars[i] || 0;
    const bob = selected ? Math.sin(selectTime * 0.08) * 4 : 0;

    // Card bg
    ctx.fillStyle = selected ? 'rgba(255,50,50,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.fillRect(cx - 60, cy - 60 + bob, 120, 130);
    ctx.strokeStyle = selected ? COL.RED : (accessible ? '#433' : '#222');
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(cx - 60, cy - 60 + bob, 120, 130);

    // Skull icon for challenges
    ctx.font = accessible ? '28px monospace' : '28px monospace';
    ctx.fillStyle = accessible ? (selected ? '#fff' : '#887') : '#333';
    ctx.fillText(accessible ? '☠' : '?', cx, cy - 25 + bob);

    // Level name
    ctx.font = '11px monospace';
    ctx.fillStyle = accessible ? (selected ? COL.RED : '#776') : '#333';
    ctx.fillText(challengeLevels[i].name, cx, cy + 10 + bob);

    // Stars
    if (completed) {
      drawStars(cx, cy + 40 + bob, stars, 8);
    } else if (accessible) {
      ctx.font = '11px monospace';
      ctx.fillStyle = '#554';
      ctx.fillText('Non termine', cx, cy + 40 + bob);
    }
  }

  // Navigation
  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText('<  >  pour choisir   |   ECHAP  retour', W / 2, H / 2 + 120);

  const blink = Math.sin(selectTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = COL.RED;
    ctx.fillText('ENTREE ou ESPACE pour jouer', W / 2, H / 2 + 155);
  }

  ctx.restore();
}

// ---- SHOP SCREEN ----
function drawShop() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,220,50,0.04)';
  ctx.lineWidth = 1;
  const off = shopTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (shopTime % 3 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(255,220,50,0.2)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Title
  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.YELLOW;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText('Boutique', W / 2, 80);
  ctx.shadowBlur = 0;

  // Coins
  const save = SaveManager.getOrCreate();
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText(`Pieces : ${save.coins}`, W / 2, 125);

  // Animal cards with scrolling
  const shopCardW = 120;
  const shopMaxVisible = Math.min(ANIMALS.length, Math.floor((W - 80) / shopCardW));
  const shopHalfVis = Math.floor(shopMaxVisible / 2);
  let shopScroll = Math.max(0, Math.min(Shop.selectedIdx - shopHalfVis, ANIMALS.length - shopMaxVisible));
  const shopTotalVisW = shopMaxVisible * shopCardW;
  const shopStartX = W / 2 - shopTotalVisW / 2 + shopCardW / 2;

  // Scroll arrows
  if (shopScroll > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - shopTotalVisW / 2 - 25, H / 2 - 10);
  }
  if (shopScroll + shopMaxVisible < ANIMALS.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + shopTotalVisW / 2 + 25, H / 2 - 10);
  }

  for (let vi = 0; vi < shopMaxVisible; vi++) {
    const i = vi + shopScroll;
    if (i >= ANIMALS.length) break;
    const ax = shopStartX + vi * shopCardW;
    const ay = H / 2 - 10;
    const selected = i === Shop.selectedIdx;
    const unlocked = save.unlockedAnimals.includes(ANIMALS[i].icon);
    const canBuy = Shop.canBuy(i, save);
    const bob = selected ? Math.sin(shopTime * 0.08) * 6 : 0;

    // Card bg
    ctx.fillStyle = selected ? 'rgba(255,220,50,0.1)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(ax - 50, ay - 70 + bob, 100, 150);
    ctx.strokeStyle = selected ? COL.YELLOW : '#333';
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(ax - 50, ay - 70 + bob, 100, 150);

    // Animal
    ctx.save();
    const scale = selected ? 1.1 : 0.85;
    ctx.globalAlpha = unlocked ? 1 : (canBuy ? 0.6 : 0.25);
    ctx.translate(ax, ay - 15 + bob);
    ctx.scale(scale, scale);
    ctx.translate(-ax, -(ay - 15 + bob));
    drawAnimalIcon(ANIMALS[i].icon, ax, ay - 15 + bob, 36, 1, 1);
    ctx.restore();

    // Name
    ctx.font = selected ? 'bold 13px monospace' : '12px monospace';
    ctx.fillStyle = selected ? ANIMALS[i].color : '#556';
    ctx.fillText(ANIMALS[i].name, ax, ay + 40 + bob);

    // Status
    if (unlocked) {
      ctx.font = '11px monospace';
      ctx.fillStyle = COL.GREEN;
      ctx.fillText('Obtenu', ax, ay + 56 + bob);
    } else {
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = canBuy ? COL.YELLOW : '#555';
      ctx.fillText(`${ANIMALS[i].price} pieces`, ax, ay + 56 + bob);
    }
  }

  // Buy prompt
  const sel = ANIMALS[Shop.selectedIdx];
  const selUnlocked = save.unlockedAnimals.includes(sel.icon);
  if (!selUnlocked) {
    const canBuy = Shop.canBuy(Shop.selectedIdx, save);
    ctx.font = '16px monospace';
    ctx.fillStyle = canBuy ? COL.GREEN : '#555';
    ctx.fillText(canBuy ? 'ENTREE pour acheter' : 'Pas assez de pieces', W / 2, H / 2 + 110);
  }

  // Navigation
  ctx.font = '14px monospace';
  ctx.fillStyle = '#445';
  ctx.fillText('<  >  pour choisir   |   ECHAP  retour', W / 2, H / 2 + 150);

  ctx.restore();
}

// ---- OPTIONS SCREEN ----
function drawOptions() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,0,255,0.04)';
  ctx.lineWidth = 1;
  const off = optionsTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.MAGENTA;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.MAGENTA;
  ctx.fillText('Options', W / 2, 100);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  const bgOptions = ['forest', 'none'];
  const bgNames = { forest: 'Foret', none: 'Rien (sombre)' };

  // Background option
  const selected = optionsIdx === 0;
  ctx.font = selected ? 'bold 20px monospace' : '18px monospace';
  ctx.fillStyle = selected ? '#fff' : '#556';
  ctx.fillText(`Fond : < ${bgNames[save.background]} >`, W / 2, H / 2 - 30);

  if (selected) {
    ctx.font = '14px monospace';
    ctx.fillStyle = '#445';
    ctx.fillText('<  >  pour changer', W / 2, H / 2);
  }

  // Stats display
  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(`Niveaux termines : ${save.completedLevels.length} / ${levels.length}`, W / 2, H / 2 + 50);
  ctx.fillText(`Morts totales : ${save.totalDeaths}`, W / 2, H / 2 + 75);

  // Total stars
  let totalStars = 0;
  for (const k in save.levelStars) totalStars += save.levelStars[k];
  ctx.fillText(`Etoiles : ${totalStars} / ${levels.length * 5}`, W / 2, H / 2 + 100);

  // Challenge stats
  const challCompleted = (save.challengeCompleted || []).length;
  if (challCompleted > 0 || challengeLevels.length > 0) {
    let challStars = 0;
    for (const k in (save.challengeStars || {})) challStars += save.challengeStars[k];
    ctx.fillStyle = COL.RED;
    ctx.fillText(`Defis termines : ${challCompleted} / ${challengeLevels.length}`, W / 2, H / 2 + 130);
    ctx.fillText(`Etoiles defis : ${challStars} / ${challengeLevels.length * 5}`, W / 2, H / 2 + 155);
  }

  // Navigation
  ctx.font = '14px monospace';
  ctx.fillStyle = '#445';
  ctx.fillText('ECHAP  retour', W / 2, H / 2 + 180);

  ctx.restore();
}

// ---- WIN SCREEN ----
function drawWin() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 56px monospace';
  ctx.shadowColor = COL.PORTAL;
  ctx.shadowBlur = 30;
  ctx.fillStyle = COL.PORTAL;
  ctx.fillText(playingChallenge ? 'DEFIS CONQUIS !' : 'ANIMAL SAUVE !', W / 2, H / 2 - 60);
  ctx.shadowBlur = 0;

  ctx.font = '24px monospace';
  ctx.fillStyle = COL.CYAN;
  ctx.fillText(playingChallenge ? 'Tu as survécu à tous les défis' : 'Tu as conquis toutes les dimensions', W / 2, H / 2);

  ctx.font = '18px monospace';
  ctx.fillStyle = '#888';
  ctx.fillText(`Morts : ${deaths}`, W / 2, H / 2 + 50);

  // Total stars
  const save = SaveManager.getOrCreate();
  const starsKey = playingChallenge ? 'challengeStars' : 'levelStars';
  const levelList = playingChallenge ? challengeLevels : levels;
  let totalStars = 0;
  for (const k in (save[starsKey] || {})) totalStars += save[starsKey][k];
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText(`Etoiles totales : ${totalStars} / ${levelList.length * 5}`, W / 2, H / 2 + 80);

  const blink = Math.sin(gameTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('Appuie sur ENTREE pour retourner au menu', W / 2, H / 2 + 130);
  }

  ctx.restore();
}
