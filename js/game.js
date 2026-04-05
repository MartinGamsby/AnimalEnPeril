// ============================================================
// Main Game Loop & State Management
// ============================================================

// States: INTRO, TITLE, SELECT, LEVEL_SELECT, CHALLENGE_SELECT, SHOP, OPTIONS, PLAYING, DEAD, LEVEL_COMPLETE, WIN
let state = 'INTRO';
let levelIdx = 0;
let level = null;
let deathTimer = 0;
let levelCompleteTimer = 0;
let titleTime = 0;
let introTime = 0;
let selectTime = 0;
let shopTime = 0;
let optionsTime = 0;
let gameTime = 0;
let levelTime = 0;
let deaths = 0;
let selectedAnimal = 0;
let titleMenuIdx = 0;
let levelSelectIdx = 0;
let challengeSelectIdx = 0;
let optionsIdx = 0;
let lastLevelStars = 0;
let lastLevelCoins = 0;
let lastLevelFlips = 0;
let lastLevelTime = 0;
let playingChallenge = false;
let selectReturnTo = 'PLAYING'; // Where to go after animal SELECT: 'PLAYING', 'LEVEL_SELECT', 'CHALLENGE_SELECT'

function getTitleMenuCount() {
  // New Game, [Continue], Défis, Shop, Options
  return SaveManager.hasSave() ? 5 : 4;
}

function applyBackground(bg) {
  document.body.className = bg === 'forest' ? 'bg-forest' : 'bg-none';
}

// Apply saved background on load
applyBackground(SaveManager.getOrCreate().background);

// ---- MAIN LOOP ----
let lastTime = 0;

function gameLoop(ts) {
  requestAnimationFrame(gameLoop);
  const dt = Math.min(ts - lastTime, 50);
  lastTime = ts;

  if (state === 'INTRO') {
    introTime++;
    updateParticles();
    drawIntro();
    if ((justPressed('Enter') || justPressed('Space')) && introTime > 30) {
      Audio.init();
      state = 'TITLE';
      titleTime = 0;
      titleMenuIdx = 0;
    }
  } else if (state === 'TITLE') {
    titleTime++;
    updateParticles();
    drawTitle();

    const menuCount = getTitleMenuCount();
    if (justPressed('ArrowUp') || justPressed('KeyW')) {
      titleMenuIdx = (titleMenuIdx - 1 + menuCount) % menuCount;
    }
    if (justPressed('ArrowDown') || justPressed('KeyS')) {
      titleMenuIdx = (titleMenuIdx + 1) % menuCount;
    }
    if (justPressed('Enter') || justPressed('Space')) {
      Audio.init();
      const hasSave = SaveManager.hasSave();
      const save = SaveManager.getOrCreate();
      if (titleMenuIdx === 0) {
        // New game → pick animal → start level 0
        selectedAnimal = save.selectedAnimal || 0;
        if (!save.unlockedAnimals.includes(ANIMALS[selectedAnimal].icon)) selectedAnimal = 0;
        selectReturnTo = 'PLAYING';
        state = 'SELECT';
        selectTime = 0;
      } else if (hasSave && titleMenuIdx === 1) {
        // Continue → pick animal → level select
        selectedAnimal = save.selectedAnimal || 0;
        if (!save.unlockedAnimals.includes(ANIMALS[selectedAnimal].icon)) selectedAnimal = 0;
        selectReturnTo = 'LEVEL_SELECT';
        state = 'SELECT';
        selectTime = 0;
      } else if (titleMenuIdx === (hasSave ? 2 : 1)) {
        // Défis → pick animal → challenge select
        selectedAnimal = save.selectedAnimal || 0;
        if (!save.unlockedAnimals.includes(ANIMALS[selectedAnimal].icon)) selectedAnimal = 0;
        selectReturnTo = 'CHALLENGE_SELECT';
        state = 'SELECT';
        selectTime = 0;
      } else if (titleMenuIdx === (hasSave ? 3 : 2)) {
        // Shop
        state = 'SHOP';
        shopTime = 0;
        Shop.selectedIdx = 0;
      } else {
        // Options
        state = 'OPTIONS';
        optionsTime = 0;
        optionsIdx = 0;
      }
    }
  } else if (state === 'SELECT') {
    selectTime++;
    updateParticles();
    drawSelect();

    const save = SaveManager.getOrCreate();

    if (justPressed('ArrowLeft') || justPressed('KeyA')) {
      selectedAnimal = (selectedAnimal - 1 + ANIMALS.length) % ANIMALS.length;
    }
    if (justPressed('ArrowRight') || justPressed('KeyD')) {
      selectedAnimal = (selectedAnimal + 1) % ANIMALS.length;
    }
    if (justPressed('Escape')) {
      state = 'TITLE';
      titleTime = 0;
    }
    if (justPressed('Enter') || justPressed('Space')) {
      // Check if animal is unlocked
      if (save.unlockedAnimals.includes(ANIMALS[selectedAnimal].icon)) {
        save.selectedAnimal = selectedAnimal;
        SaveManager.save(save);
        Audio.levelStart();

        if (selectReturnTo === 'LEVEL_SELECT') {
          state = 'LEVEL_SELECT';
          selectTime = 0;
          levelSelectIdx = Math.min(save.completedLevels.length, levels.length - 1);
        } else if (selectReturnTo === 'CHALLENGE_SELECT') {
          state = 'CHALLENGE_SELECT';
          selectTime = 0;
          challengeSelectIdx = 0;
        } else {
          // PLAYING — new game from level 0
          playingChallenge = false;
          loadLevel(0);
          state = 'PLAYING';
          gameTime = 0;
          levelTime = 0;
          deaths = 0;
        }
      } else {
        Audio.error();
      }
    }
  } else if (state === 'LEVEL_SELECT') {
    selectTime++;
    updateParticles();
    drawLevelSelect();

    const save = SaveManager.getOrCreate();

    if (justPressed('ArrowLeft') || justPressed('KeyA')) {
      levelSelectIdx = (levelSelectIdx - 1 + levels.length) % levels.length;
    }
    if (justPressed('ArrowRight') || justPressed('KeyD')) {
      levelSelectIdx = (levelSelectIdx + 1) % levels.length;
    }
    if (justPressed('Escape')) {
      state = 'TITLE';
      titleTime = 0;
    }
    if (justPressed('Enter') || justPressed('Space')) {
      // Check accessibility
      const accessible = levelSelectIdx === 0 || save.completedLevels.includes(levelSelectIdx - 1);
      if (accessible) {
        Audio.levelStart();
        playingChallenge = false;
        loadLevel(levelSelectIdx);
        state = 'PLAYING';
        gameTime = 0;
        levelTime = 0;
        deaths = 0;
      } else {
        Audio.error();
      }
    }
  } else if (state === 'CHALLENGE_SELECT') {
    selectTime++;
    updateParticles();
    drawChallengeSelect();

    const save = SaveManager.getOrCreate();

    if (justPressed('ArrowLeft') || justPressed('KeyA')) {
      challengeSelectIdx = (challengeSelectIdx - 1 + challengeLevels.length) % challengeLevels.length;
    }
    if (justPressed('ArrowRight') || justPressed('KeyD')) {
      challengeSelectIdx = (challengeSelectIdx + 1) % challengeLevels.length;
    }
    if (justPressed('Escape')) {
      state = 'TITLE';
      titleTime = 0;
    }
    if (justPressed('Enter') || justPressed('Space')) {
      // Challenges: first is always accessible, rest need previous completed
      if (!save.challengeCompleted) save.challengeCompleted = [];
      const accessible = challengeSelectIdx === 0 || save.challengeCompleted.includes(challengeSelectIdx - 1);
      if (accessible) {
        Audio.levelStart();
        playingChallenge = true;
        levelIdx = challengeSelectIdx;
        level = challengeLevels[challengeSelectIdx];
        player.orbs = 0;
        player.gravityFlips = 0;
        for (const o of level.orbs) o.collected = false;
        resetPlayer();
        cam.x = player.x - W / 2; cam.y = player.y - H / 2;
        for (const p of particles) p.active = false;
        state = 'PLAYING';
        gameTime = 0;
        levelTime = 0;
        deaths = 0;
      } else {
        Audio.error();
      }
    }
  } else if (state === 'SHOP') {
    shopTime++;
    updateParticles();
    drawShop();

    if (justPressed('ArrowLeft') || justPressed('KeyA')) {
      Shop.selectedIdx = (Shop.selectedIdx - 1 + ANIMALS.length) % ANIMALS.length;
    }
    if (justPressed('ArrowRight') || justPressed('KeyD')) {
      Shop.selectedIdx = (Shop.selectedIdx + 1) % ANIMALS.length;
    }
    if (justPressed('Escape')) {
      state = 'TITLE';
      titleTime = 0;
    }
    if (justPressed('Enter') || justPressed('Space')) {
      const save = SaveManager.getOrCreate();
      if (Shop.buy(Shop.selectedIdx, save)) {
        Audio.buy();
        emitBurst(W / 2, H / 2, 30, 5, 25, COL.YELLOW, 3);
      } else {
        Audio.error();
      }
    }
  } else if (state === 'OPTIONS') {
    optionsTime++;
    updateParticles();
    drawOptions();

    if (justPressed('Escape')) {
      state = 'TITLE';
      titleTime = 0;
    }

    const save = SaveManager.getOrCreate();
    const bgOptions = ['forest', 'none'];

    if (optionsIdx === 0) {
      if (justPressed('ArrowLeft') || justPressed('KeyA') || justPressed('ArrowRight') || justPressed('KeyD')) {
        const curIdx = bgOptions.indexOf(save.background);
        const newIdx = (curIdx + 1) % bgOptions.length;
        save.background = bgOptions[newIdx];
        SaveManager.save(save);
        applyBackground(save.background);
      }
    }
  } else if (state === 'PLAYING') {
    gameTime++;
    levelTime++;
    updatePlayer();
    updateLasers();
    updateCam(player.x + player.w / 2, player.y + player.h / 2, level.w, level.h);
    updateParticles();

    drawBG();
    ctx.save();
    ctx.translate(cam.shakeX, cam.shakeY);
    drawTiles();
    drawLasers();
    drawOrbs();
    drawPortal();
    drawPlayer();
    drawParticles(cam.x, cam.y);
    ctx.restore();
    drawDimensionOverlay();
    drawScanlines();
    drawHUD();

    if (justPressed('KeyR')) {
      resetPlayer();
      for (const o of level.orbs) o.collected = false;
      player.orbs = 0;
      player.gravityFlips = 0;
      deaths = 0;
      gameTime = 0;
      levelTime = 0;
    }
    if (justPressed('Escape')) {
      state = 'TITLE';
      titleTime = 0;
    }
  } else if (state === 'DEAD') {
    deathTimer--;
    updateParticles();
    gameTime++;

    drawBG();
    ctx.save();
    ctx.translate(cam.shakeX, cam.shakeY);
    drawTiles();
    drawLasers();
    drawOrbs();
    drawPortal();
    drawParticles(cam.x, cam.y);
    ctx.restore();
    drawDeathScreen();
    drawHUD();

    updateCam(player.x + player.w / 2, player.y + player.h / 2, level.w, level.h);

    if (deathTimer <= 0) {
      resetPlayer();
      state = 'PLAYING';
      gameTime = 0;
    }
  } else if (state === 'LEVEL_COMPLETE') {
    levelCompleteTimer--;
    updateParticles();
    gameTime++;

    drawBG();
    ctx.save();
    ctx.translate(cam.shakeX, cam.shakeY);
    drawTiles();
    drawLasers();
    drawOrbs();
    drawPortal();
    drawPlayer();
    drawParticles(cam.x, cam.y);
    ctx.restore();
    drawLevelComplete();

    updateCam(player.x + player.w / 2, player.y + player.h / 2, level.w, level.h);

    if (levelCompleteTimer <= 0) {
      const levelList = playingChallenge ? challengeLevels : levels;
      if (levelIdx + 1 < levelList.length) {
        if (playingChallenge) {
          levelIdx = levelIdx + 1;
          level = challengeLevels[levelIdx];
          player.orbs = 0;
          player.gravityFlips = 0;
          for (const o of level.orbs) o.collected = false;
          resetPlayer();
          cam.x = player.x - W / 2; cam.y = player.y - H / 2;
          for (const p of particles) p.active = false;
        } else {
          loadLevel(levelIdx + 1);
        }
        Audio.levelStart();
        state = 'PLAYING';
        gameTime = 0;
        levelTime = 0;
      } else {
        state = 'WIN';
      }
    }
  } else if (state === 'WIN') {
    gameTime++;
    updateParticles();
    if (gameTime % 2 === 0) {
      emitParticle(rng(0, W), H + 10, rng(-0.3, 0.3), rng(-1.5, -0.5), 80, rng(0, 1) > 0.5 ? COL.CYAN : COL.MAGENTA, rng(1, 3));
    }
    drawWin();
    if (justPressed('Enter')) {
      state = 'TITLE';
      titleTime = 0;
      deaths = 0;
    }
  }

  input.just.clear();
}

requestAnimationFrame(gameLoop);
