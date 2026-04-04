// ============================================================
// Animal Definitions & Drawing
// ============================================================

const ANIMALS = [
  { name: 'Chat',    color: '#ff9944', accent: '#ffcc88', icon: 'cat',     price: 0 },
  { name: 'Chien',   color: '#88aaff', accent: '#bbccff', icon: 'dog',     price: 0 },
  { name: 'Lapin',   color: '#ff77aa', accent: '#ffaacc', icon: 'rabbit',  price: 5 },
  { name: 'Oiseau',  color: '#44ddaa', accent: '#88ffcc', icon: 'bird',    price: 8 },
  { name: 'Renard',  color: '#ff6633', accent: '#ff9966', icon: 'fox',     price: 12 },
  { name: 'Tortue',  color: '#33bb77', accent: '#66ddaa', icon: 'turtle',  price: 15 },
  { name: 'Hibou',   color: '#aa77cc', accent: '#ccaaee', icon: 'owl',     price: 20 },
  { name: 'Serpent', color: '#66cc33', accent: '#99ee66', icon: 'snake',   price: 25 },
  { name: 'Panda',   color: '#eeeedd', accent: '#222222', icon: 'panda',   price: 30 },
  { name: 'Aigle',   color: '#cc8833', accent: '#eebb66', icon: 'eagle',   price: 40 },
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
  } else if (type === 'turtle') {
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
  } else if (type === 'owl') {
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
  } else if (type === 'snake') {
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
  } else if (type === 'panda') {
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
  } else if (type === 'eagle') {
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
  ctx.restore();
}
