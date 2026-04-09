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
