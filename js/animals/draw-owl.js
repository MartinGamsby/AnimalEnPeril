function drawOwl(s, col, acc) {
  // Body
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 2*s, 10*s, 12*s, 0, 0, Math.PI*2); ctx.fill();
  // Belly
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.ellipse(0, 6*s, 6*s, 7*s, 0, 0, Math.PI*2); ctx.fill();
  // Ear tufts
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(-8*s, -10*s); ctx.lineTo(-5*s, -18*s); ctx.lineTo(-2*s, -10*s);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(2*s, -10*s); ctx.lineTo(5*s, -18*s); ctx.lineTo(8*s, -10*s);
  ctx.fill();
  // Eye discs
  ctx.fillStyle = '#ddc';
  ctx.beginPath(); ctx.arc(-4*s, -4*s, 5*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(4*s, -4*s, 5*s, 0, Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle = '#ff8800';
  ctx.beginPath(); ctx.arc(-4*s, -4*s, 3*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(4*s, -4*s, 3*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(-4*s, -4*s, 1.5*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(4*s, -4*s, 1.5*s, 0, Math.PI*2); ctx.fill();
  // Beak
  ctx.fillStyle = '#eebb44';
  ctx.beginPath();
  ctx.moveTo(-2*s, 0); ctx.lineTo(0, 4*s); ctx.lineTo(2*s, 0);
  ctx.fill();
  // Wings
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(-10*s, -2*s); ctx.quadraticCurveTo(-16*s, 4*s, -12*s, 12*s); ctx.lineTo(-10*s, 6*s);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(10*s, -2*s); ctx.quadraticCurveTo(16*s, 4*s, 12*s, 12*s); ctx.lineTo(10*s, 6*s);
  ctx.fill();
}
