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
        // Floor hole
        ctx.fillStyle = '#050008';
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        ctx.fillStyle = COL.WALL;
        ctx.beginPath();
        ctx.moveTo(tx, ty); ctx.lineTo(tx + 4, ty + 6); ctx.lineTo(tx, ty + 10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tx + C.TILE, ty); ctx.lineTo(tx + C.TILE - 4, ty + 6); ctx.lineTo(tx + C.TILE, ty + 10);
        ctx.fill();
        const holeGrad = ctx.createLinearGradient(tx, ty, tx, ty + C.TILE);
        holeGrad.addColorStop(0, 'rgba(80,0,120,0.3)');
        holeGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = holeGrad;
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        if (gameTime % 6 === 0) {
          emitParticle(c * C.TILE + rng(4, 28), r * C.TILE + rng(4, 28), rng(-0.3, 0.3), rng(0.2, 0.8), 15, 'rgba(120,0,180,0.4)', 1);
        }
      } else if (t === 13) {
        // Ceiling hole
        ctx.fillStyle = '#050008';
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
        ctx.fillStyle = COL.WALL;
        ctx.beginPath();
        ctx.moveTo(tx, ty + C.TILE); ctx.lineTo(tx + 4, ty + C.TILE - 6); ctx.lineTo(tx, ty + C.TILE - 10);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tx + C.TILE, ty + C.TILE); ctx.lineTo(tx + C.TILE - 4, ty + C.TILE - 6); ctx.lineTo(tx + C.TILE, ty + C.TILE - 10);
        ctx.fill();
        const cHoleGrad = ctx.createLinearGradient(tx, ty + C.TILE, tx, ty);
        cHoleGrad.addColorStop(0, 'rgba(80,0,120,0.3)');
        cHoleGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = cHoleGrad;
        ctx.fillRect(tx, ty, C.TILE, C.TILE);
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

    let sx, sy, e1x, e1y, e2x, e2y;
    const halfBeam = beamLen / 2;
    if (l.vertical) {
      sx = (l.currentX != null ? l.currentX : l.x) + ox;
      sy = (l.currentY != null ? l.currentY : l.y1) + oy;
      e1x = sx + Math.sin(angle) * halfBeam;
      e1y = sy - Math.cos(angle) * halfBeam;
      e2x = sx - Math.sin(angle) * halfBeam;
      e2y = sy + Math.cos(angle) * halfBeam;
    } else if (l.horizontal) {
      sx = (l.currentX != null ? l.currentX : l.x1) + ox;
      sy = (l.currentY != null ? l.currentY : l.y) + oy;
      e1x = sx + Math.cos(angle) * halfBeam;
      e1y = sy + Math.sin(angle) * halfBeam;
      e2x = sx - Math.cos(angle) * halfBeam;
      e2y = sy - Math.sin(angle) * halfBeam;
    } else {
      continue;
    }

    // Glow
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(255,50,50,0.12)';
    ctx.lineWidth = w * 4;
    ctx.beginPath(); ctx.moveTo(e1x, e1y); ctx.lineTo(e2x, e2y); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,80,80,0.25)';
    ctx.lineWidth = w * 1.5;
    ctx.beginPath(); ctx.moveTo(e1x, e1y); ctx.lineTo(e2x, e2y); ctx.stroke();
    ctx.restore();

    // Core beam
    ctx.strokeStyle = COL.RED;
    ctx.lineWidth = Math.max(1.5, w * 0.7);
    ctx.beginPath(); ctx.moveTo(e1x, e1y); ctx.lineTo(e2x, e2y); ctx.stroke();

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
