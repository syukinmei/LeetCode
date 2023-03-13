/**
 * @param {number} initialEnergy
 * @param {number} initialExperience
 * @param {number[]} energy
 * @param {number[]} experience
 * @return {number}
 */
// 方法一：模拟
var minNumberOfHours = function (
  initialEnergy,
  initialExperience,
  energy,
  experience
) {
  let addEnergy = 0; // 需要训练增加的精力
  let addExperience = 0; // 需要训练增加的经验

  for (let i = 0; i < energy.length; i++) {
    // step1：处理精力
    const need_energy = energy[i];
    // 现有精力不足
    if (initialEnergy <= need_energy) {
      let n = need_energy - initialEnergy + 1; // 缺少n精力
      initialEnergy += n; // 增加n精力
      addEnergy += n; // 记录需要训练的时长
    }
    initialEnergy -= need_energy; // 击败对手需要消耗的精力

    // step2：处理经验
    const need_experience = experience[i];
    // 现有经验不足
    if (initialExperience <= need_experience) {
      let n = need_experience - initialExperience + 1; // 缺少n经验
      initialExperience += n; // 增加n经验
      addExperience += n; // 记录需要训练的时长
    }
    initialExperience += need_experience; // 击败对手获取的经验
  }
  return addEnergy + addExperience; // 返回为了赢得比赛需要增加的精力和经验
};
// 时间复杂度：O(n)，n 为对手数量，需要遍历一次 energy 和 experience 数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：模拟（分开处理精力和经验）
// 我们可以先在初始时，把精力直接补充到足够击败n个对手，因此初始训练小时数为 Math.max(0, sum - initialEnergy + 1)。
// 接下来我们只需要考虑经验的问题，遍历每个对手，若当前经验不足超过对手，则将经验补到刚好能超过该对手，击败对手后把对手的经验值加到自己身上。
// 遍历结束，返回训练的小时数。
// Q：为什么可以这样
// A：因为精力是每次比赛后，都需要减少的，那么我们需要保证比赛前我们的精力要大于所有对手的精力之和。
//    对于经验是每次比赛后，都会增加的，所以要遍历 experience 来处理，如果当前遇到的对手经验比我大，则需要比赛前就将当前经验增加到比对手高 1。
var minNumberOfHours = function (
  initialEnergy,
  initialExperience,
  energy,
  experience
) {
  // step1：初始时，把精力直接补充到足够赢得比赛为止。
  let sum = 0; // 记录赢得训练需要的精力
  for (let en of energy) {
    sum += en;
  }
  // 为赢得比赛需要训练的时长，初始化值为需要补充的精力。
  let trainingHours = initialEnergy <= sum ? sum - initialEnergy + 1 : 0; // 这样更加语义化

  // step2：向对手一一挑战，经验不够则训练足够的时长为止。
  for (let ex of experience) {
    // 当前经验不足击败对手
    if (initialExperience <= ex) {
      trainingHours += ex - initialExperience + 1;
      initialExperience = ex + 1; // 击败对手需要 ex+1 经验。
    }
    // 每次比赛完都增加经验
    initialExperience += ex; // 击败对手获得 ex 经验。
  }

  return trainingHours; // 返回训练的时长。
};
// 时间复杂度：O(n)，需要遍历一次 energy 和 experience 数组。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
