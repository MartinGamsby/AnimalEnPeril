function drawPanda(s, col, acc) {
  // Body
  ctx.fillStyle = col;
  ctx.fillRect(-9*s, -10*s, 18*s, 22*s);
  // Ears (black)
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.arc(-7*s, -12*s, 4*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(7*s, -12*s, 4*s, 0, Math.PI*2); ctx.fill();
  // Eye patches (black)
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.ellipse(-4*s, -4*s, 4*s, 3.5*s, -0.2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(4*s, -4*s, 4*s, 3.5*s, 0.2, 0, Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(-4*s, -4*s, 2*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(4*s, -4*s, 2*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(-3.5*s, -4*s, 1*s, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(4.5*s, -4*s, 1*s, 0, Math.PI*2); ctx.fill();
  // Nose
  ctx.fillStyle = acc;
  ctx.beginPath(); ctx.ellipse(0, 1*s, 2.5*s, 1.5*s, 0, 0, Math.PI*2); ctx.fill();
  // Mouth
  ctx.strokeStyle = acc;
  ctx.lineWidth = 1*s;
  ctx.beginPath(); ctx.moveTo(0, 2.5*s); ctx.lineTo(-2*s, 4*s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 2.5*s); ctx.lineTo(2*s, 4*s); ctx.stroke();
  // Arms (black)
  ctx.fillStyle = acc;
  ctx.fillRect(-12*s, -4*s, 4*s, 10*s);
  ctx.fillRect(8*s, -4*s, 4*s, 10*s);
}
