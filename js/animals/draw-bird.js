function drawBird(s, col, acc) {
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 0, 9*s, 11*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.ellipse(0, 4*s, 6*s, 6*s, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(7*s, -3*s);
  ctx.quadraticCurveTo(16*s, -1*s, 14*s, 5*s);
  ctx.lineTo(7*s, 3*s);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillRect(-5*s, -6*s, 4*s, 4*s);
  ctx.fillRect(1*s, -6*s, 4*s, 4*s);
  ctx.fillStyle = '#000';
  ctx.fillRect(-3*s, -5*s, 2*s, 3*s);
  ctx.fillRect(3*s, -5*s, 2*s, 3*s);
  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  ctx.moveTo(5*s, -2*s);
  ctx.lineTo(12*s, 0);
  ctx.lineTo(5*s, 2*s);
  ctx.fill();
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(-1*s, -11*s); ctx.lineTo(1*s, -17*s); ctx.lineTo(3*s, -11*s);
  ctx.fill();
}
