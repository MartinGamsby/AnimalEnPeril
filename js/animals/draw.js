const _animalDrawers = {
  cat: drawCat, dog: drawDog, rabbit: drawRabbit, bird: drawBird,
  fox: drawFox, turtle: drawTurtle, owl: drawOwl, snake: drawSnake,
  panda: drawPanda, eagle: drawEagle,
};

function drawAnimalIcon(type, cx, cy, size, facing, gravDir, highlight) {
  const s = size / 28;
  ctx.save();
  ctx.translate(cx, cy);
  if (gravDir < 0) ctx.scale(1, -1);
  if (facing < 0) ctx.scale(-1, 1);
  const animal = ANIMALS.find(a => a.icon === type) || ANIMALS[0];
  const col = highlight || animal.color;
  const acc = animal.accent;
  const drawer = _animalDrawers[type];
  if (drawer) drawer(s, col, acc);
  ctx.restore();
}
