function drawRabbit(s, col, acc) {
  ctx.fillStyle = col;
  ctx.fillRect(-8*s, -8*s, 16*s, 18*s);
  ctx.fillRect(-6*s, -26*s, 5*s, 20*s);
  ctx.fillRect(1*s, -26*s, 5*s, 20*s);
  ctx.beginPath(); ctx.arc(-3.5*s, -26*s, 2.5*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(3.5*s, -26*s, 2.5*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = acc;
  ctx.fillRect(-4.5*s, -23*s, 3*s, 14*s);
  ctx.fillRect(1.5*s, -23*s, 3*s, 14*s);
  ctx.fillStyle = '#fff';
  ctx.fillRect(-5*s, -5*s, 4*s, 5*s);
  ctx.fillRect(1*s, -5*s, 4*s, 5*s);
  ctx.fillStyle = '#ff2255';
  ctx.fillRect(-3*s, -4*s, 2*s, 3*s);
  ctx.fillRect(3*s, -4*s, 2*s, 3*s);
  ctx.fillStyle = '#ff88aa';
  ctx.beginPath(); ctx.arc(0, 1*s, 2*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.arc(-7*s, 1*s, 3*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(7*s, 1*s, 3*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(8*s, 6*s, 4*s, 0, Math.PI*2); ctx.fill();
}
