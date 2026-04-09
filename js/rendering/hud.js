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
  ctx.fillText(`Gravité: ${player.gravityFlips}`, 90, 48);

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

  // Dash/Shift cooldown (top-right HUD, only when virtual buttons are hidden)
  if (!touchUI.show) {
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
  }

  // Controls hint (first level)
  if (levelIdx === 0 && gameTime < 400 && !touchUI.show) {
    ctx.globalAlpha = gameTime < 300 ? 0.7 : (400 - gameTime) / 100 * 0.7;
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#889';
    ctx.fillText('< > / A D  Bouger   |   ESPACE / W  Sauter   |   ESPACE (air)  Inverser gravité', W / 2, H - 60);
    ctx.fillText('E  Dash   |   SHIFT Gauche  Changer de dimension   |   Glisse & saute sur les murs', W / 2, H - 38);
    ctx.textAlign = 'left';
    ctx.globalAlpha = 1;
  }

  // Deaths counter
  ctx.font = '13px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(`Morts : ${deaths}`, 15, H - 20);

  // Restart hint
  if (!touchUI.show) {
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = COL.CYAN;
    ctx.shadowColor = COL.CYAN;
    ctx.shadowBlur = 6;
    ctx.fillText('[R] Recommencer', W - 170, H - 20);
    ctx.shadowBlur = 0;
  }

  // Coins (from save)
  const save = SaveManager.getOrCreate();
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText(`Pièces : ${save.coins}`, 120, H - 20);

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
    ctx.fillText(playingChallenge ? 'DÉFI TERMINÉ' : 'NIVEAU TERMINÉ', W / 2, H / 2 - 70);
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
      ctx.fillText(`+${lastLevelCoins} pièces`, W / 2, H / 2 + 45);

      // Show next star requirement
      if (lastLevelStars < 5 && level.stars) {
        const nextReq = level.stars[5 - lastLevelStars - 1];
        if (nextReq) {
          ctx.font = '13px monospace';
          ctx.fillStyle = '#667';
          ctx.fillText(`Prochaine étoile : <${nextReq.time}s et <${nextReq.flips} inversions`, W / 2, H / 2 + 70);
        }
      }
    }
  }

  ctx.restore();
}
