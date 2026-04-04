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

  getStars(levelIdx, gravityFlips) {
    const lvl = levels[levelIdx];
    if (!lvl) return 1;
    const [three, two] = lvl.starThresholds;
    if (gravityFlips <= three) return 3;
    if (gravityFlips <= two) return 2;
    return 1;
  },
};
