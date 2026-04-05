// ============================================================
// Shop System
// ============================================================

const Shop = {
  selectedIdx: 0,

  isUnlocked(animalIcon, saveData) {
    return saveData.unlockedAnimals.includes(animalIcon);
  },

  canBuy(animalIdx, saveData) {
    const animal = ANIMALS[animalIdx];
    if (this.isUnlocked(animal.icon, saveData)) return false;
    return saveData.coins >= animal.price;
  },

  buy(animalIdx, saveData) {
    const animal = ANIMALS[animalIdx];
    if (!this.canBuy(animalIdx, saveData)) return false;
    saveData.coins -= animal.price;
    saveData.unlockedAnimals.push(animal.icon);
    SaveManager.save(saveData);
    return true;
  },

  // 5 stars: time <= stars[0].time AND flips <= stars[0].flips
  // 4 stars: time <= stars[1].time AND flips <= stars[1].flips
  // 3 stars: time <= stars[2].time AND flips <= stars[2].flips
  // 2 stars: time <= stars[3].time AND flips <= stars[3].flips
  // 1 star: just complete
  getStars(lvl, timeSec, gravityFlips) {
    if (!lvl || !lvl.stars) return 1;
    for (let i = 0; i < lvl.stars.length; i++) {
      const s = lvl.stars[i];
      if (timeSec <= s.time && gravityFlips <= s.flips) {
        return 5 - i;
      }
    }
    return 1;
  },
};
