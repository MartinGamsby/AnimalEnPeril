// ============================================================
// Save System (localStorage)
// ============================================================

const SaveManager = {
  KEY: 'animalEnPeril_save',

  defaults() {
    return {
      coins: 0,
      unlockedAnimals: ['cat', 'dog'],
      selectedAnimal: 0,
      completedLevels: [],
      levelStars: {},
      levelBestFlips: {},
      levelBestTime: {},
      background: 'forest',
      showTouchControls: 'auto',
      musicVolume: 0.3,
      totalDeaths: 0,
      challengeCompleted: [],
      challengeStars: {},
      challengeBestFlips: {},
      challengeBestTime: {},
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Merge with defaults to handle new fields
      const merged = { ...this.defaults(), ...data };
      // Ensure free animals are always unlocked
      for (const icon of ['cat', 'dog']) {
        if (!merged.unlockedAnimals.includes(icon)) merged.unlockedAnimals.push(icon);
      }
      return merged;
    } catch {
      return null;
    }
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch {
      // silently fail
    }
  },

  hasSave() {
    return localStorage.getItem(this.KEY) !== null;
  },

  reset() {
    localStorage.removeItem(this.KEY);
  },

  getOrCreate() {
    return this.load() || this.defaults();
  },
};
