// 在一根无限长的数轴上，你站在0的位置。终点在target的位置。

// 你可以做一些数量的移动 numMoves :

//  - 每次你可以选择向左或向右移动。
//  - 第 i 次移动（从  i == 1 开始，到 i == numMoves ），在选择的方向上走 i 步。
// 给定整数 target ，返回 到达目标所需的 最小 移动次数(即最小 numMoves ) 。

// 输入: target = 2
// 输出: 3
// 解释:
// 第一次移动，从 0 到 1 。
// 第二次移动，从 1 到 -1 。
// 第三次移动，从 -1 到 2 。

// 输入: target = 3
// 输出: 2
// 解释:
// 第一次移动，从 0 到 1 。
// 第二次移动，从 1 到 3 。


// 设 s 为 1～count 的和 即使走了 count 步的总和
// 如果 s = target ，则count 即为答案。
// 如果 s > target ，则需要在 1～count 中部分步为回退操作。将和凑到 target
// 如果diff = s - target 为偶数，则可以在 1～count 中找出若干步（和为diff/2）。使其凑到target。所以此时最小所需步数还是count
// 如果diff = s - target 为奇数，那就凑不出上述所说的若干步，考虑 count+1 和 count+2中必有一项和diff可以凑出偶数，然后部分步改为回退。

// 总结：如果是偶数...事情就好办；如果是奇数，就继续走...只要差为偶数，就可以通过一步操作（也就是某一次或多次逆向，一定可以弥补差距...）
/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
    target = Math.abs(target);
    let count = 0; //步数
    while (target > 0) {
        count++;
        target -= count;
    }
    if (target % 2 === 0) return count; // 如果刚好走完 或者 多走了偶数步（第 diff/2 步需要倒退）
    // 如果是奇数步，则需判断再走一步 或者 再走两步能否凑出偶数(count为奇数时再走2步，偶数再走1步)
    if (count % 2 === 0) return count + 1;
    else return count + 2;
};


// 简化代码
var reachNumber = function (target) {
    target = Math.abs(target);
    let count = 0; //步数
    while (target > 0) {
        count++;
        target -= count;
    }
    return target % 2 === 0 ? count : count + 1 + count % 2;
};
// 时间复杂度：O(√target)，循环内最多执行O(√target)次。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
