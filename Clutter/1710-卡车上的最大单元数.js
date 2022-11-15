// 请你将一些箱子装在 一辆卡车 上。给你一个二维数组 boxTypes ，其中 boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi] ：

//  - numberOfBoxesi 是类型 i 的箱子的数量。
//  - numberOfUnitsPerBoxi 是类型 i 每个箱子可以装载的单元数量。
// 整数 truckSize 表示卡车上可以装载 箱子 的 最大数量 。只要箱子数量不超过 truckSize ，你就可以选择任意箱子装到卡车上。

// 返回卡车可以装载 单元 的 最大 总数。

// 输入：boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
// 输出：8
// 解释：箱子的情况如下：
// - 1 个第一类的箱子，里面含 3 个单元。
// - 2 个第二类的箱子，每个里面含 2 个单元。
// - 3 个第三类的箱子，每个里面含 1 个单元。
// 可以选择第一类和第二类的所有箱子，以及第三类的一个箱子。
// 单元总数 = (1 * 3) + (2 * 2) + (1 * 1) = 8

// 输入：boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
// 输出：91


// 方法一：贪心
// 只能装 truckSize 个箱子到卡车上，根据贪心的思路，只需要每次都拿当前剩下的箱子里单元数量最大的箱子即可。
// 对 boxTypes 按照 numberOfUnitsPerBox 进行降序排序，然后从左到右填充 truckSize 即可。
/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
// 写法一：
var maximumUnits = function (boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]); // 根据箱子可装载的单元数量降序排序
    let res = 0;
    let i = 0;
    while (truckSize > 0 && i < boxTypes.length) {
        if (boxTypes[i][0] <= truckSize) {
            res += boxTypes[i][0] * boxTypes[i][1];
        } else {
            res += boxTypes[i][1] * truckSize;
        }
        truckSize -= boxTypes[i][0];
        i++;
    }
    return res;
};

// 写法二：
var maximumUnits = function (boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]); // 根据箱子可装载的单元数量降序排序
    let res = 0;
    for (let [amount, capacity] of boxTypes) {
        if (amount < truckSize) {
            truckSize -= amount;
            res += amount * capacity;
        } else {
            res += truckSize * capacity;
            break;
        }
    }
    return res;
};
// 时间复杂度：O(nlogn)，n 为 boxTypes 的长度。排序需要O(nlogn)的时间。
// 空间复杂度：O(logn)，n 为 boxTypes 的长度。排序需要O(logn)的递归调用栈空间。
