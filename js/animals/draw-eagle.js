function drawEagle(s, col, acc) {
  // Body
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 2*s, 9*s, 12*s, 0, 0, Math.PI*2); ctx.fill();
  // Belly
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.ellipse(0, 6*s, 6*s, 7*s, 0, 0, Math.PI*2); ctx.fill();
  // Head (white)
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(0, -10*s, 7*s, 0, Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle = '#ffcc00';
  ctx.beginPath(); ctx.arc(-3*s, -11*s, 2*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(3*s, -11*s, 2*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(-2.5*s, -11*s, 1*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(3.5*s, -11*s, 1*s, 0, Math.PI*2); ctx.fill();
  // Beak
  ctx.fillStyle = '#ff9900';
  ctx.beginPath();
  ctx.moveTo(3*s, -8*s); ctx.lineTo(10*s, -6*s); ctx.lineTo(4*s, -5*s);
  ctx.fill();
  // Wings
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(-9*s, -4*s); ctx.quadraticCurveTo(-20*s, -8*s, -18*s, 4*s); ctx.lineTo(-9*s, 4*s);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(9*s, -4*s); ctx.quadraticCurveTo(20*s, -8*s, 18*s, 4*s); ctx.lineTo(9*s, 4*s);
  ctx.fill();
  // Tail
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(-3*s, 12*s); ctx.lineTo(0, 20*s); ctx.lineTo(3*s, 12*s);
  ctx.fill();
}
