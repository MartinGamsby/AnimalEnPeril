function drawTouchControls() {
  if (!touchUI.show) return;
  const btns = getTouchBtns();
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (const btn of btns) {
    const pressed = !!input.touchKeys[btn.key];
    const alpha = pressed ? 0.55 : 0.22;

    // Button background
    ctx.fillStyle = pressed ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.35)';
    _drawRoundedRect(btn.x, btn.y, btn.w, btn.h, 8);
    ctx.fill();

    // Border glow
    ctx.strokeStyle = btn.color;
    ctx.lineWidth = pressed ? 2.5 : 1.2;
    ctx.globalAlpha = alpha;
    ctx.stroke();

    // Cooldown bar for DASH button
    if (btn.id === 'dash') {
      const dashReady = player.dashCooldown <= 0;
      const barH = 4;
      const barY = btn.y + btn.h - barH - 4;
      const barX = btn.x + 6;
      const barW = btn.w - 12;
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#334';
      ctx.fillRect(barX, barY, barW, barH);
      if (!dashReady) {
        const pct = 1 - player.dashCooldown / C.DASH_COOLDOWN;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = COL.CYAN;
        ctx.fillRect(barX, barY, barW * pct, barH);
      } else {
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = COL.CYAN;
        ctx.fillRect(barX, barY, barW, barH);
      }
    }

    // Cooldown bar for SHIFT/DIM button
    if (btn.id === 'shift') {
      const shiftReady = player.shiftCooldown <= 0 && !player.shifted;
      const barH = 4;
      const barY = btn.y + btn.h - barH - 4;
      const barX = btn.x + 6;
      const barW = btn.w - 12;
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#334';
      ctx.fillRect(barX, barY, barW, barH);
      if (player.shifted) {
        const pct = player.shiftTimer / C.SHIFT_DURATION;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = COL.DIM_B;
        ctx.fillRect(barX, barY, barW * pct, barH);
      } else if (!shiftReady) {
        const pct = 1 - player.shiftCooldown / C.SHIFT_COOLDOWN;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = COL.DIM_B;
        ctx.fillRect(barX, barY, barW * pct, barH);
      } else {
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = COL.DIM_B;
        ctx.fillRect(barX, barY, barW, barH);
      }
    }

    // Label
    ctx.globalAlpha = pressed ? 0.9 : 0.45;
    ctx.fillStyle = btn.color;
    const hasBar = btn.id === 'dash' || btn.id === 'shift';
    ctx.font = btn.label.length > 2 ? 'bold 13px monospace' : 'bold 20px monospace';
    ctx.fillText(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2 + (hasBar ? -4 : 0));

    // Key shortcut hint on dash/shift
    if (hasBar) {
      ctx.globalAlpha = pressed ? 0.5 : 0.2;
      ctx.font = '9px monospace';
      ctx.fillText(btn.id === 'dash' ? '[E]' : '[L\u21E7]', btn.x + btn.w / 2, btn.y + 12);
    }

    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawBackButton() {
  if (!touchUI.show) return;
  const s = Math.max(52, Math.min(72, W * 0.09, H * 0.13));
  const pad = 18;
  const bw = s * 1.2;
  const bh = s * 0.65;
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = '#556';
  ctx.lineWidth = 1;
  ctx.beginPath();
  const r = 6;
  ctx.moveTo(pad + r, pad);
  ctx.lineTo(pad + bw - r, pad);
  ctx.quadraticCurveTo(pad + bw, pad, pad + bw, pad + r);
  ctx.lineTo(pad + bw, pad + bh - r);
  ctx.quadraticCurveTo(pad + bw, pad + bh, pad + bw - r, pad + bh);
  ctx.lineTo(pad + r, pad + bh);
  ctx.quadraticCurveTo(pad, pad + bh, pad, pad + bh - r);
  ctx.lineTo(pad, pad + r);
  ctx.quadraticCurveTo(pad, pad, pad + r, pad);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#aaa';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('\u2190 RETOUR', pad + bw / 2, pad + bh / 2);
  ctx.restore();
}
