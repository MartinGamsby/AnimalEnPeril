function drawDog(s, col, acc) {
  ctx.fillStyle = col;
  ctx.fillRect(-8*s, -10*s, 16*s, 20*s);
  ctx.fillRect(-10*s, -10*s, 5*s, 12*s);
  ctx.fillRect(5*s, -10*s, 5*s, 12*s);
  ctx.fillStyle = acc;
  ctx.fillRect(-10*s, -2*s, 5*s, 4*s);
  ctx.fillRect(5*s, -2*s, 5*s, 4*s);
  ctx.fillStyle = '#fff';
  ctx.fillRect(-5*s, -7*s, 4*s, 5*s);
  ctx.fillRect(1*s, -7*s, 4*s, 5*s);
  ctx.fillStyle = '#000';
  ctx.fillRect(-3*s, -5*s, 2*s, 3*s);
  ctx.fillRect(3*s, -5*s, 2*s, 3*s);
  ctx.fillStyle = '#222';
  ctx.fillRect(-2*s, -1*s, 4*s, 3*s);
  ctx.fillStyle = '#ff5577';
  ctx.fillRect(-1*s, 2*s, 3*s, 4*s);
  ctx.beginPath(); ctx.arc(0.5*s, 6*s, 1.5*s, 0, Math.PI); ctx.fill();
  ctx.strokeStyle = col;
  ctx.lineWidth = 3*s;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(8*s, 4*s); ctx.quadraticCurveTo(15*s, -2*s, 13*s, -8*s); ctx.stroke();
}
