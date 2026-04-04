// ============================================================
// Save System (localStorage)
// ============================================================

const SaveManager = {
  KEY: 'animalEnPeril_save',

  defaults() {
    return {
      coins: 0,
      unlockedAnimals: ['cat'],
      selectedAnimal: 0,
      completedLevels: [],
      levelStars: {},
      levelBestFlips: {},
      background: 'forest',
      totalDeaths: 0,
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Merge with defaults to handle new fields
      return { ...this.defaults(), ...data };
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
