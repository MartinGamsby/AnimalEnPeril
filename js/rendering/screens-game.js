const introLines = [
  "Laboratoire Nexus - Rapport d'incident #47",
  "",
  "L'expérience sur l'accélérateur de particules",
  "a mal tourné...",
  "",
  "Une anomalie gravitationnelle s'est propagée",
  "à travers toute la Terre.",
  "",
  "La gravité est devenue... instable.",
  "",
  "Les animaux sont en danger !",
  "",
  "Toi seul peux manipuler cette anomalie",
  "pour les sauver.",
];

function drawIntro() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(255,50,50,0.04)';
  ctx.lineWidth = 1;
  const off = introTime * 0.15;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (introTime < 60 && introTime % 20 < 10) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = COL.RED;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  if (introTime % 4 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-0.8, -0.3), 80, 'rgba(255,50,50,0.2)', rng(1, 2));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxTextW = W - 40;
  const visualLines = [];
  for (let i = 0; i < introLines.length; i++) {
    const line = introLines[i];
    let font, color;
    if (i === 0) { font = 'bold 16px monospace'; color = COL.CYAN; }
    else if (line.includes('danger')) { font = 'bold 18px monospace'; color = COL.RED; }
    else if (line.includes('sauver')) { font = 'bold 18px monospace'; color = COL.GREEN; }
    else { font = '16px monospace'; color = '#99aacc'; }

    if (!line) {
      visualLines.push({ text: '', font, color });
      continue;
    }
    ctx.font = font;
    for (const sub of wrapText(line, maxTextW)) {
      visualLines.push({ text: sub, font, color });
    }
  }

  const charsPerFrame = 1.2;
  const totalChars = Math.floor(Math.max(0, introTime - 40) * charsPerFrame);
  let charCount = 0;
  const lineH = 28;
  const totalH = visualLines.length * lineH;
  const startY = H / 2 - totalH / 2;

  if (introTime > 20) {
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = COL.RED;
    ctx.globalAlpha = 0.5 + Math.sin(introTime * 0.1) * 0.3;
    ctx.fillText('/// ALERTE - ANOMALIE DÉTECTÉE ///', W / 2, startY - 40);
    ctx.globalAlpha = 1;
  }

  for (let i = 0; i < visualLines.length; i++) {
    const vl = visualLines[i];
    if (charCount >= totalChars) break;
    const visible = Math.min(vl.text.length, totalChars - charCount);
    charCount += vl.text.length || 1;
    if (visible > 0) {
      ctx.font = vl.font;
      ctx.fillStyle = vl.color;
      ctx.fillText(vl.text.substring(0, visible), W / 2, startY + i * lineH);
    }
  }

  if (introTime > 80) {
    const blink = Math.sin(introTime * 0.08) > 0;
    if (blink) {
      ctx.font = '14px monospace';
      ctx.fillStyle = '#556';
      ctx.fillText(touchUI.show ? 'Touche pour continuer' : 'Appuie sur ESPACE ou ENTRÉE pour continuer', W / 2, H / 2 + 220);
    }
  }

  ctx.restore();
}

function drawTitle() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(0,180,255,0.06)';
  ctx.lineWidth = 1;
  const off = titleTime * 0.3;
  for (let x = -C.TILE + (off % C.TILE); x < W; x += C.TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = -C.TILE + (off % C.TILE); y < H; y += C.TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (titleTime % 2 === 0) {
    emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-1, -0.5), 80, 'rgba(0,180,255,0.3)', rng(1, 3));
  }
  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 64px monospace';
  ctx.shadowColor = COL.CYAN;
  ctx.shadowBlur = 30;
  ctx.fillStyle = COL.CYAN;
  ctx.fillText('ANIMAL', W / 2, H / 2 - 90);

  ctx.shadowColor = COL.MAGENTA;
  ctx.fillStyle = COL.MAGENTA;
  ctx.fillText('en PÉRIL', W / 2, H / 2 - 60);
  ctx.shadowBlur = 0;

  ctx.font = '16px monospace';
  ctx.fillStyle = '#668';
  const tagline = 'Inverse la gravité  ·  Change de dimension  ·  Traverse le vide';
  const tagWrapped = wrapText(tagline, W - 40);
  for (let t = 0; t < tagWrapped.length; t++) {
    ctx.fillText(tagWrapped[t], W / 2, H / 2 + 10 + t * 22);
  }

  const menuY = H / 2 + 60 + (tagWrapped.length - 1) * 22;
  const blink = Math.sin(titleTime * 0.08) > 0;

  ctx.font = titleMenuIdx === 0 ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === 0 ? '#fff' : '#556';
  if (titleMenuIdx === 0 && blink) ctx.fillStyle = COL.CYAN;
  ctx.fillText('Nouvelle Partie', W / 2, menuY);

  if (SaveManager.hasSave()) {
    ctx.font = titleMenuIdx === 1 ? 'bold 22px monospace' : '18px monospace';
    ctx.fillStyle = titleMenuIdx === 1 ? '#fff' : '#556';
    if (titleMenuIdx === 1 && blink) ctx.fillStyle = COL.CYAN;
    ctx.fillText('Continuer', W / 2, menuY + 35);
  }

  const defiIdx = SaveManager.hasSave() ? 2 : 1;
  ctx.font = titleMenuIdx === defiIdx ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === defiIdx ? '#fff' : '#556';
  if (titleMenuIdx === defiIdx && blink) ctx.fillStyle = COL.RED;
  ctx.fillText('Défis', W / 2, menuY + 35 * defiIdx);

  const shopIdx = defiIdx + 1;
  ctx.font = titleMenuIdx === shopIdx ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === shopIdx ? '#fff' : '#556';
  if (titleMenuIdx === shopIdx && blink) ctx.fillStyle = COL.YELLOW;
  ctx.fillText('Boutique', W / 2, menuY + 35 * shopIdx);

  const optIdx = shopIdx + 1;
  ctx.font = titleMenuIdx === optIdx ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = titleMenuIdx === optIdx ? '#fff' : '#556';
  if (titleMenuIdx === optIdx && blink) ctx.fillStyle = COL.MAGENTA;
  ctx.fillText('Options', W / 2, menuY + 35 * optIdx);

  ctx.font = '13px monospace';
  ctx.fillStyle = '#334';
  const hintText = touchUI.show ? 'Utilise les boutons tactiles pour jouer' : '< > / A D  Bouger   |   ESPACE / W  Sauter & Inverser   |   E  Dash   |   SHIFT Gauche  Changer de dimension';
  const hintWrapped = wrapText(hintText, W - 40);
  for (let h = 0; h < hintWrapped.length; h++) {
    ctx.fillText(hintWrapped[h], W / 2, H - 30 - (hintWrapped.length - 1 - h) * 18);
  }

  ctx.restore();
}

function drawWin() {
  ctx.fillStyle = COL.BG;
  ctx.fillRect(0, 0, W, H);

  drawParticles(0, 0);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 56px monospace';
  ctx.shadowColor = COL.PORTAL;
  ctx.shadowBlur = 30;
  ctx.fillStyle = COL.PORTAL;
  ctx.fillText(playingChallenge ? 'DÉFIS CONQUIS !' : 'ANIMAL SAUVÉ !', W / 2, H / 2 - 60);
  ctx.shadowBlur = 0;

  ctx.font = '24px monospace';
  ctx.fillStyle = COL.CYAN;
  ctx.fillText(playingChallenge ? 'Tu as survécu à tous les défis' : 'Tu as conquis toutes les dimensions', W / 2, H / 2);

  ctx.font = '18px monospace';
  ctx.fillStyle = '#888';
  ctx.fillText(`Morts : ${deaths}`, W / 2, H / 2 + 50);

  const save = SaveManager.getOrCreate();
  const starsKey = playingChallenge ? 'challengeStars' : 'levelStars';
  const levelList = playingChallenge ? challengeLevels : levels;
  let totalStars = 0;
  for (const k in (save[starsKey] || {})) totalStars += save[starsKey][k];
  ctx.fillStyle = COL.YELLOW;
  ctx.fillText(`Étoiles totales : ${totalStars} / ${levelList.length * 5}`, W / 2, H / 2 + 80);

  const blink = Math.sin(gameTime * 0.08) > 0;
  if (blink) {
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText(touchUI.show ? 'Touche pour retourner au menu' : 'Appuie sur ENTRÉE pour retourner au menu', W / 2, H / 2 + 130);
  }

  ctx.restore();
}
