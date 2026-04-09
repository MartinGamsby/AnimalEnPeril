## Project file structure

```
index.html                    # Entry point, loads all scripts in order
css/style.css                 # Styles + forest background
js/
  config.js                   # Constants (C, COL), canvas setup, resize
  utils.js                    # rng() helper
  audio.js                    # Sound effects (Web Audio API) + background music (HTML5 Audio)
  input.js                    # Keyboard + touch input handling
  particles.js                # Particle system (emit, update, draw)
  camera.js                   # Camera follow + shake
  save.js                     # localStorage save/load (SaveManager)
  shop.js                     # Shop logic, star calculation
  player.js                   # Player physics, collision, movement
  game.js                     # Main game loop, state machine, level loading
  animals/
    data.js                   # ANIMALS array (name, color, accent, icon, price)
    draw-cat.js               # Cat drawing function
    draw-dog.js               # Dog drawing function
    draw-rabbit.js            # Rabbit drawing function
    draw-bird.js              # Bird drawing function
    draw-fox.js               # Fox drawing function
    draw-turtle.js            # Turtle drawing function
    draw-owl.js               # Owl drawing function
    draw-snake.js             # Snake drawing function
    draw-panda.js             # Panda drawing function
    draw-eagle.js             # Eagle drawing function
    draw.js                   # drawAnimalIcon() dispatcher
  levels/
    level-meta.js             # _levelMeta + _challengeMeta arrays (stars, lasers, file paths)
    parser.js                 # _parseLevel(), loadAllLevels() (async fetch of .txt files)
    data/
      level-01-awakening.txt  # Raw grid data (one row per line, no syntax)
      level-02-duality.txt
      ... (13 levels + 4 challenges)
      challenge-04-extinction.txt
  rendering/
    utils.js                  # wrapText(), _drawRoundedRect()
    world.js                  # drawBG, drawTiles, drawLasers, drawOrbs, drawPortal, drawDimensionOverlay, drawScanlines
    player.js                 # drawPlayer()
    hud.js                    # drawHUD, drawDeathScreen, drawStars, drawLevelComplete
    touch.js                  # drawTouchControls, drawBackButton
    screens-game.js           # drawIntro, drawTitle, drawWin
    screens-menus.js          # drawSelect, drawLevelSelect, drawChallengeSelect, drawShop, drawOptions
  assets/
    bg-forest.png                # Forest background image
    music.mp3                    # Background music ("Crown of Ash and Sunlight" by Suno)
```

## Game states
INTRO → TITLE → SELECT/LEVEL_SELECT/CHALLENGE_SELECT/SHOP/OPTIONS → PLAYING → DEAD/LEVEL_COMPLETE → WIN
