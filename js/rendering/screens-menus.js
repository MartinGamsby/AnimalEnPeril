function drawSelect() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(0,180,255,0.04)';
  ctx.lineWidth = 1;
  const off = selectTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (selectTime % 3 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(0,180,255,0.2)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.CYAN;
  ctx.fillText('Choisis ton animal', W / 2, H / 2 - 160);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  const selCardW = 110;
  const selMaxVisible = Math.min(ANIMALS.length, Math.floor((W - 80) / selCardW));
  const selHalfVis = Math.floor(selMaxVisible / 2);
  let selScroll = Math.max(0, Math.min(selectedAnimal - selHalfVis, ANIMALS.length - selMaxVisible));
  const selTotalVisW = selMaxVisible * selCardW;
  const selStartX = W / 2 - selTotalVisW / 2 + selCardW / 2;

  if (selScroll > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - selTotalVisW / 2 - 25, H / 2 - 20);
  }
  if (selScroll + selMaxVisible < ANIMALS.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + selTotalVisW / 2 + 25, H / 2 - 20);
  }

  for (let vi = 0; vi < selMaxVisible; vi++) {
    const i = vi + selScroll;
    if (i >= ANIMALS.length) break;
    const ax = selStartX + vi * selCardW;
    const ay = H / 2 - 20;
    const selected = i === selectedAnimal;
    const bob = selected ? Math.sin(selectTime * 0.08) * 6 : 0;
    const unlocked = save.unlockedAnimals.includes(ANIMALS[i].icon);

    if (selected) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.15 + Math.sin(selectTime * 0.1) * 0.05;
      ctx.fillStyle = ANIMALS[i].color;
      ctx.beginPath();
      ctx.arc(ax, ay + bob, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = ANIMALS[i].color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ax, ay + bob, 42, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.save();
    const scale = selected ? 1.15 : 0.85;
    ctx.globalAlpha = unlocked ? (selected ? 1 : 0.5) : 0.2;
    ctx.translate(ax, ay + bob);
    ctx.scale(scale, scale);
    ctx.translate(-ax, -(ay + bob));
    drawAnimalIcon(ANIMALS[i].icon, ax, ay + bob, 34, 1, 1);
    ctx.restore();

    if (unlocked) {
      ctx.font = selected ? 'bold 14px monospace' : '12px monospace';
      ctx.fillStyle = selected ? ANIMALS[i].color : '#556';
      ctx.fillText(ANIMALS[i].name, ax, ay + 55 + bob);
    } else {
      ctx.font = '12px monospace';
      ctx.fillStyle = '#444';
      ctx.fillText('Verrouillé', ax, ay + 55 + bob);
    }
  }

  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(touchUI.show ? 'Touche pour choisir' : '<  >  pour choisir', W / 2, H / 2 + 100);

  const blink = Math.sin(selectTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText(touchUI.show ? 'Touche pour jouer' : 'ENTRÉE ou ESPACE pour jouer', W / 2, H / 2 + 140);
  }

  ctx.restore();
  drawBackButton();
}

function drawLevelSelect() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(0,180,255,0.04)';
  ctx.lineWidth = 1;
  const off = selectTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (selectTime % 3 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(0,180,255,0.2)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.CYAN;
  ctx.fillText('Choisis un niveau', W / 2, 80);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  const cardW = 130;
  const maxVisible = Math.min(levels.length, Math.floor((W - 80) / cardW));
  const halfVis = Math.floor(maxVisible / 2);
  let scrollOffset = Math.max(0, Math.min(levelSelectIdx - halfVis, levels.length - maxVisible));
  const totalVisW = maxVisible * cardW;
  const startX = W / 2 - totalVisW / 2 + cardW / 2;

  if (scrollOffset > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - totalVisW / 2 - 25, H / 2 - 20);
  }
  if (scrollOffset + maxVisible < levels.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + totalVisW / 2 + 25, H / 2 - 20);
  }

  for (let vi = 0; vi < maxVisible; vi++) {
    const i = vi + scrollOffset;
    if (i >= levels.length) break;
    const cx = startX + vi * cardW;
    const cy = H / 2 - 20;
    const selected = i === levelSelectIdx;
    const completed = save.completedLevels.includes(i);
    const accessible = i === 0 || save.completedLevels.includes(i - 1);
    const stars = save.levelStars[i] || 0;
    const bob = selected ? Math.sin(selectTime * 0.08) * 4 : 0;

    ctx.fillStyle = selected ? 'rgba(0,180,255,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.fillRect(cx - 55, cy - 60 + bob, 110, 120);
    ctx.strokeStyle = selected ? COL.CYAN : (accessible ? '#334' : '#222');
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(cx - 55, cy - 60 + bob, 110, 120);

    ctx.font = accessible ? 'bold 36px monospace' : '36px monospace';
    ctx.fillStyle = accessible ? (selected ? '#fff' : '#778') : '#333';
    ctx.fillText(`${i + 1}`, cx, cy - 15 + bob);

    ctx.font = '11px monospace';
    ctx.fillStyle = accessible ? (selected ? COL.CYAN : '#556') : '#333';
    ctx.fillText(levels[i].name, cx, cy + 20 + bob);

    if (completed) {
      drawStars(cx, cy + 45 + bob, stars, 10);
    } else if (!accessible) {
      ctx.font = '20px monospace';
      ctx.fillStyle = '#333';
      ctx.fillText('?', cx, cy + 45 + bob);
    }
  }

  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(touchUI.show ? 'Touche pour choisir' : '<  >  pour choisir   |   ÉCHAP  retour', W / 2, H / 2 + 120);

  const blink = Math.sin(selectTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText(touchUI.show ? 'Touche pour jouer' : 'ENTRÉE ou ESPACE pour jouer', W / 2, H / 2 + 155);
  }

  ctx.restore();
  drawBackButton();
}

function drawChallengeSelect() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,50,50,0.06)';
  ctx.lineWidth = 1;
  const off = selectTime * 0.25;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (selectTime % 2 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(255,50,50,0.3)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.RED;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.RED;
  ctx.fillText('DÉFIS EXTRÊMES', W / 2, 80);
  ctx.shadowBlur = 0;

  ctx.font = '14px monospace';
  ctx.fillStyle = '#665';
  ctx.fillText('Niveaux brutaux pour les meilleurs joueurs', W / 2, 115);

  const save = SaveManager.getOrCreate();
  if (!save.challengeCompleted) save.challengeCompleted = [];
  if (!save.challengeStars) save.challengeStars = {};

  const cardW = 150;
  const maxVisible = Math.min(challengeLevels.length, Math.floor((W - 80) / cardW));
  const halfVis = Math.floor(maxVisible / 2);
  let scrollOffset = Math.max(0, Math.min(challengeSelectIdx - halfVis, challengeLevels.length - maxVisible));
  const totalVisW = maxVisible * cardW;
  const startX = W / 2 - totalVisW / 2 + cardW / 2;

  if (scrollOffset > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - totalVisW / 2 - 25, H / 2 - 20);
  }
  if (scrollOffset + maxVisible < challengeLevels.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + totalVisW / 2 + 25, H / 2 - 20);
  }

  for (let vi = 0; vi < maxVisible; vi++) {
    const i = vi + scrollOffset;
    if (i >= challengeLevels.length) break;
    const cx = startX + vi * cardW;
    const cy = H / 2 - 20;
    const selected = i === challengeSelectIdx;
    const completed = save.challengeCompleted.includes(i);
    const accessible = i === 0 || save.challengeCompleted.includes(i - 1);
    const stars = save.challengeStars[i] || 0;
    const bob = selected ? Math.sin(selectTime * 0.08) * 4 : 0;

    ctx.fillStyle = selected ? 'rgba(255,50,50,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.fillRect(cx - 60, cy - 60 + bob, 120, 130);
    ctx.strokeStyle = selected ? COL.RED : (accessible ? '#433' : '#222');
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(cx - 60, cy - 60 + bob, 120, 130);

    ctx.font = accessible ? '28px monospace' : '28px monospace';
    ctx.fillStyle = accessible ? (selected ? '#fff' : '#887') : '#333';
    ctx.fillText(accessible ? '☠' : '?', cx, cy - 25 + bob);

    ctx.font = '11px monospace';
    ctx.fillStyle = accessible ? (selected ? COL.RED : '#776') : '#333';
    ctx.fillText(challengeLevels[i].name, cx, cy + 10 + bob);

    if (completed) {
      drawStars(cx, cy + 40 + bob, stars, 8);
    } else if (accessible) {
      ctx.font = '11px monospace';
      ctx.fillStyle = '#554';
      ctx.fillText('Non terminé', cx, cy + 40 + bob);
    }
  }

  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(touchUI.show ? 'Touche pour choisir' : '<  >  pour choisir   |   ÉCHAP  retour', W / 2, H / 2 + 120);

  const blink = Math.sin(selectTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = COL.RED;
    ctx.fillText(touchUI.show ? 'Touche pour jouer' : 'ENTRÉE ou ESPACE pour jouer', W / 2, H / 2 + 155);
  }

  ctx.restore();
  drawBackButton();
}

function drawShop() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,220,50,0.04)';
  ctx.lineWidth = 1;
  const off = shopTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (shopTime % 3 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(255,220,50,0.2)', rng(1, 2.5));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.YELLOW;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText('Boutique', W / 2, 80);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  ctx.font = 'bold 22px monospace';
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText(`Pieces : ${save.coins}`, W / 2, 125);

  const shopCardW = 120;
  const shopMaxVisible = Math.min(ANIMALS.length, Math.floor((W - 80) / shopCardW));
  const shopHalfVis = Math.floor(shopMaxVisible / 2);
  let shopScroll = Math.max(0, Math.min(Shop.selectedIdx - shopHalfVis, ANIMALS.length - shopMaxVisible));
  const shopTotalVisW = shopMaxVisible * shopCardW;
  const shopStartX = W / 2 - shopTotalVisW / 2 + shopCardW / 2;

  if (shopScroll > 0) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('<', W / 2 - shopTotalVisW / 2 - 25, H / 2 - 10);
  }
  if (shopScroll + shopMaxVisible < ANIMALS.length) {
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#556';
    ctx.fillText('>', W / 2 + shopTotalVisW / 2 + 25, H / 2 - 10);
  }

  for (let vi = 0; vi < shopMaxVisible; vi++) {
    const i = vi + shopScroll;
    if (i >= ANIMALS.length) break;
    const ax = shopStartX + vi * shopCardW;
    const ay = H / 2 - 10;
    const selected = i === Shop.selectedIdx;
    const unlocked = save.unlockedAnimals.includes(ANIMALS[i].icon);
    const canBuy = Shop.canBuy(i, save);
    const bob = selected ? Math.sin(shopTime * 0.08) * 6 : 0;

    ctx.fillStyle = selected ? 'rgba(255,220,50,0.1)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(ax - 50, ay - 70 + bob, 100, 150);
    ctx.strokeStyle = selected ? COL.YELLOW : '#333';
    ctx.lineWidth = selected ? 2 : 1;
    ctx.strokeRect(ax - 50, ay - 70 + bob, 100, 150);

    ctx.save();
    const scale = selected ? 1.1 : 0.85;
    ctx.globalAlpha = unlocked ? 1 : (canBuy ? 0.6 : 0.25);
    ctx.translate(ax, ay - 15 + bob);
    ctx.scale(scale, scale);
    ctx.translate(-ax, -(ay - 15 + bob));
    drawAnimalIcon(ANIMALS[i].icon, ax, ay - 15 + bob, 36, 1, 1);
    ctx.restore();

    ctx.font = selected ? 'bold 13px monospace' : '12px monospace';
    ctx.fillStyle = selected ? ANIMALS[i].color : '#556';
    ctx.fillText(ANIMALS[i].name, ax, ay + 40 + bob);

    if (unlocked) {
      ctx.font = '11px monospace';
      ctx.fillStyle = COL.GREEN;
      ctx.fillText('Obtenu', ax, ay + 56 + bob);
    } else {
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = canBuy ? COL.YELLOW : '#555';
      ctx.fillText(`${ANIMALS[i].price} pièces`, ax, ay + 56 + bob);
    }
  }

  const sel = ANIMALS[Shop.selectedIdx];
  const selUnlocked = save.unlockedAnimals.includes(sel.icon);
  if (!selUnlocked) {
    const canBuy = Shop.canBuy(Shop.selectedIdx, save);
    ctx.font = '16px monospace';
    ctx.fillStyle = canBuy ? COL.GREEN : '#555';
    ctx.fillText(canBuy ? (touchUI.show ? 'Touche pour acheter' : 'ENTRÉE pour acheter') : 'Pas assez de pièces', W / 2, H / 2 + 110);
  }

  ctx.font = '14px monospace';
  ctx.fillStyle = '#445';
  ctx.fillText(touchUI.show ? 'Touche pour choisir' : '<  >  pour choisir   |   ÉCHAP  retour', W / 2, H / 2 + 150);

  ctx.restore();
  drawBackButton();
}

function drawOptions() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,0,255,0.04)';
  ctx.lineWidth = 1;
  const off = optionsTime * 0.2;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px monospace';
  ctx.shadowColor = COL.MAGENTA;
  ctx.shadowBlur = 20;
  ctx.fillStyle = COL.MAGENTA;
  ctx.fillText('Options', W / 2, 100);
  ctx.shadowBlur = 0;

  const save = SaveManager.getOrCreate();
  const bgOptions = ['forest', 'none'];
  const bgNames = { forest: 'Forêt', none: 'Rien (sombre)' };

  const selBg = optionsIdx === 0;
  ctx.font = selBg ? 'bold 20px monospace' : '18px monospace';
  ctx.fillStyle = selBg ? '#fff' : '#556';
  ctx.fillText(`Fond : < ${bgNames[save.background]} >`, W / 2, H / 2 - 30);

  const touchNames = { auto: 'Auto', on: 'Toujours', off: 'Jamais' };
  const selTouch = optionsIdx === 1;
  ctx.font = selTouch ? 'bold 20px monospace' : '18px monospace';
  ctx.fillStyle = selTouch ? '#fff' : '#556';
  ctx.fillText(`Boutons tactiles : < ${touchNames[save.showTouchControls || 'auto']} >`, W / 2, H / 2 + 5);

  const musicPct = Math.round((save.musicVolume !== undefined ? save.musicVolume : 0.3) * 100);
  const selMusic = optionsIdx === 2;
  ctx.font = selMusic ? 'bold 20px monospace' : '18px monospace';
  ctx.fillStyle = selMusic ? '#fff' : '#556';
  ctx.fillText(`Musique : < ${musicPct}% >`, W / 2, H / 2 + 40);

  if (selBg || selTouch || selMusic) {
    ctx.font = '14px monospace';
    ctx.fillStyle = '#445';
    ctx.fillText(touchUI.show ? 'Touche pour changer' : '<  >  pour changer', W / 2, H / 2 + 65);
  }

  ctx.font = '16px monospace';
  ctx.fillStyle = '#556';
  ctx.fillText(`Niveaux terminés : ${save.completedLevels.length} / ${levels.length}`, W / 2, H / 2 + 85);
  ctx.fillText(`Morts totales : ${save.totalDeaths}`, W / 2, H / 2 + 110);

  let totalStars = 0;
  for (const k in save.levelStars) totalStars += save.levelStars[k];
  ctx.fillText(`Étoiles : ${totalStars} / ${levels.length * 5}`, W / 2, H / 2 + 135);

  const challCompleted = (save.challengeCompleted || []).length;
  if (challCompleted > 0 || challengeLevels.length > 0) {
    let challStars = 0;
    for (const k in (save.challengeStars || {})) challStars += save.challengeStars[k];
    ctx.fillStyle = COL.RED;
    ctx.fillText(`Défis terminés : ${challCompleted} / ${challengeLevels.length}`, W / 2, H / 2 + 165);
    ctx.fillText(`Étoiles défis : ${challStars} / ${challengeLevels.length * 5}`, W / 2, H / 2 + 190);
  }

  ctx.font = '14px monospace';
  ctx.fillStyle = '#445';
  ctx.fillText(touchUI.show ? '' : 'ÉCHAP  retour', W / 2, H / 2 + 215);

  ctx.restore();
  drawBackButton();
}
