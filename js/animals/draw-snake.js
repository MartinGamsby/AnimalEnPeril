function drawSnake(s, col, acc) {
  // Body coil
  ctx.strokeStyle = col;
  ctx.lineWidth = 6*s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-10*s, 8*s);
  ctx.quadraticCurveTo(-6*s, -2*s, 0, 4*s);
  ctx.quadraticCurveTo(6*s, 10*s, 8*s, 0);
  ctx.stroke();
  // Body pattern
  ctx.strokeStyle = acc;
  ctx.lineWidth = 3*s;
  ctx.beginPath();
  ctx.moveTo(-10*s, 8*s);
  ctx.quadraticCurveTo(-6*s, -2*s, 0, 4*s);
  ctx.quadraticCurveTo(6*s, 10*s, 8*s, 0);
  ctx.stroke();
  // Head
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(8*s, -4*s, 5*s, 4*s, -0.3, 0, Math.PI*2); ctx.fill();
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(10*s, -6*s, 2*s, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(10.5*s, -6*s, 1*s, 0, Math.PI*2); ctx.fill();
  // Tongue
  ctx.strokeStyle = '#ff3344';
  ctx.lineWidth = 1*s;
  ctx.beginPath();
  ctx.moveTo(13*s, -4*s); ctx.lineTo(17*s, -5*s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(17*s, -5*s); ctx.lineTo(19*s, -3*s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(17*s, -5*s); ctx.lineTo(19*s, -7*s);
  ctx.stroke();
}
