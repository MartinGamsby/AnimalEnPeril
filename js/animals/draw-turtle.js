function drawTurtle(s, col, acc) {
  // Shell (dome)
  ctx.fillStyle = '#2a7a4a';
  ctx.beginPath(); ctx.ellipse(0, 2*s, 12*s, 10*s, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 2*s, 11*s, 9*s, 0, Math.PI, 0); ctx.fill();
  // Shell pattern
  ctx.strokeStyle = '#2a7a4a';
  ctx.lineWidth = 1.5*s;
  ctx.beginPath(); ctx.moveTo(0, -7*s); ctx.lineTo(0, 2*s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-6*s, -4*s); ctx.lineTo(6*s, -4*s); ctx.stroke();
  // Body/belly
  ctx.fillStyle = acc;
  ctx.fillRect(-10*s, 2*s, 20*s, 8*s);
  // Head
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(10*s, 0, 5*s, 0, Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.fillRect(11*s, -3*s, 3*s, 3*s);
  ctx.fillStyle = '#000';
  ctx.fillRect(12*s, -2*s, 2*s, 2*s);
  // Legs
  ctx.fillStyle = col;
  ctx.fillRect(-8*s, 8*s, 4*s, 5*s);
  ctx.fillRect(4*s, 8*s, 4*s, 5*s);
}
