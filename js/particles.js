// ============================================================
// Particle System
// ============================================================

const MAX_PARTICLES = 400;
const particles = [];
for (let i = 0; i < MAX_PARTICLES; i++) particles.push({ active: false });

function emitParticle(x, y, vx, vy, life, color, size) {
  for (const p of particles) {
    if (p.active) continue;
    p.x = x; p.y = y; p.vx = vx; p.vy = vy;
    p.life = p.maxLife = life; p.color = color; p.size = size;
    p.active = true;
    return p;
  }
}

function emitBurst(x, y, count, speed, life, color, size) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = rng(speed * 0.3, speed);
    emitParticle(x + rng(-3, 3), y + rng(-3, 3), Math.cos(a) * s, Math.sin(a) * s, life + rng(-5, 5)|0, color, rng(size * 0.5, size));
  }
}

function updateParticles() {
  for (const p of particles) {
    if (!p.active) continue;
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.03;
    p.vx *= 0.98;
    p.life--;
    if (p.life <= 0) p.active = false;
  }
}

function drawParticles(cx, cy) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const p of particles) {
    if (!p.active) continue;
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x - cx, p.y - cy, p.size * (0.5 + alpha * 0.5), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
