// ============================================================
// Animal Definitions & Drawing
// ============================================================

const ANIMALS = [
  { name: 'Chat',   color: '#ff9944', accent: '#ffcc88', icon: 'cat',    price: 0 },
  { name: 'Chien',  color: '#88aaff', accent: '#bbccff', icon: 'dog',    price: 5 },
  { name: 'Lapin',  color: '#ff77aa', accent: '#ffaacc', icon: 'rabbit', price: 8 },
  { name: 'Oiseau', color: '#44ddaa', accent: '#88ffcc', icon: 'bird',   price: 12 },
  { name: 'Renard', color: '#ff6633', accent: '#ff9966', icon: 'fox',    price: 15 },
];

function drawAnimalIcon(type, cx, cy, size, facing, gravDir, highlight) {
  const s = size / 28;
  ctx.save();
  ctx.translate(cx, cy);
  if (gravDir < 0) ctx.scale(1, -1);
  if (facing < 0) ctx.scale(-1, 1);
  const animal = ANIMALS.find(a => a.icon === type) || ANIMALS[0];
  const col = highlight || animal.color;
  const acc = animal.accent;

  if (type === 'cat') {
    ctx.fillStyle = col;
    ctx.fillRect(-8*s, -10*s, 16*s, 20*s);
    ctx.beginPath();
    ctx.moveTo(-8*s, -10*s); ctx.lineTo(-6*s, -18*s); ctx.lineTo(-1*s, -10*s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(1*s, -10*s); ctx.lineTo(6*s, -18*s); ctx.lineTo(8*s, -10*s);
    ctx.fill();
    ctx.fillStyle = acc;
    ctx.beginPath();
    ctx.moveTo(-6*s, -10*s); ctx.lineTo(-5*s, -15*s); ctx.lineTo(-2*s, -10*s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2*s, -10*s); ctx.lineTo(5*s, -15*s); ctx.lineTo(6*s, -10*s);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(-6*s, -6*s, 4*s, 4*s);
    ctx.fillRect(2*s, -6*s, 4*s, 4*s);
    ctx.fillStyle = '#000';
    ctx.fillRect(-4*s, -5*s, 2*s, 3*s);
    ctx.fillRect(4*s, -5*s, 2*s, 3*s);
    ctx.fillStyle = '#ff6688';
    ctx.fillRect(-1*s, -1*s, 2*s, 2*s);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-8*s, -1*s); ctx.lineTo(-14*s, -3*s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-8*s, 1*s); ctx.lineTo(-14*s, 2*s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8*s, -1*s); ctx.lineTo(14*s, -3*s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8*s, 1*s); ctx.lineTo(14*s, 2*s); ctx.stroke();
    ctx.strokeStyle = col;
    ctx.lineWidth = 3*s;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(8*s, 6*s); ctx.quadraticCurveTo(16*s, 2*s, 14*s, -6*s); ctx.stroke();
  } else if (type === 'dog') {
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
  } else if (type === 'rabbit') {
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
  } else if (type === 'bird') {
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
  } else if (type === 'fox') {
    ctx.fillStyle = col;
    ctx.fillRect(-8*s, -10*s, 16*s, 20*s);
    ctx.beginPath();
    ctx.moveTo(-8*s, -10*s); ctx.lineTo(-7*s, -20*s); ctx.lineTo(-1*s, -10*s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(1*s, -10*s); ctx.lineTo(7*s, -20*s); ctx.lineTo(8*s, -10*s);
    ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.moveTo(-6*s, -10*s); ctx.lineTo(-6*s, -16*s); ctx.lineTo(-2*s, -10*s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2*s, -10*s); ctx.lineTo(6*s, -16*s); ctx.lineTo(6*s, -10*s);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(-5*s, -2*s); ctx.lineTo(0, 2*s); ctx.lineTo(5*s, -2*s);
    ctx.lineTo(5*s, 5*s); ctx.lineTo(-5*s, 5*s);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(-6*s, -7*s, 4*s, 4*s);
    ctx.fillRect(2*s, -7*s, 4*s, 4*s);
    ctx.fillStyle = '#000';
    ctx.fillRect(-4*s, -6*s, 2*s, 3*s);
    ctx.fillRect(4*s, -6*s, 2*s, 3*s);
    ctx.fillStyle = '#222';
    ctx.fillRect(-1*s, -1*s, 2*s, 2*s);
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(8*s, 4*s);
    ctx.quadraticCurveTo(18*s, -4*s, 14*s, -12*s);
    ctx.quadraticCurveTo(10*s, -6*s, 8*s, 2*s);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(14*s, -10*s, 3*s, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.restore();
}
