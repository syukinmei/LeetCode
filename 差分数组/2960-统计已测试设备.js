// 给你一个长度为 n 、下标从 0 开始的整数数组 batteryPercentages ，表示 n 个设备的电池百分比。

// 你的任务是按照顺序测试每个设备 i，执行以下测试操作：

//  - 如果 batteryPercentages[i] 大于 0：
//      - 增加 已测试设备的计数。
//      - 将下标在 [i + 1, n - 1] 的所有设备的电池百分比减少 1，确保它们的电池百分比 不会低于 0 ，即 batteryPercentages[j] = max(0, batteryPercentages[j] - 1)。
//      - 移动到下一个设备。
//  - 否则，移动到下一个设备而不执行任何测试。

// 返回一个整数，表示按顺序执行测试操作后 已测试设备 的数量。

// 输入：batteryPercentages = [1,1,2,1,3]
// 输出：3
// 解释：按顺序从设备 0 开始执行测试操作：
// 在设备 0 上，batteryPercentages[0] > 0 ，现在有 1 个已测试设备，batteryPercentages 变为 [1,0,1,0,2] 。
// 在设备 1 上，batteryPercentages[1] == 0 ，移动到下一个设备而不进行测试。
// 在设备 2 上，batteryPercentages[2] > 0 ，现在有 2 个已测试设备，batteryPercentages 变为 [1,0,1,0,1] 。
// 在设备 3 上，batteryPercentages[3] == 0 ，移动到下一个设备而不进行测试。
// 在设备 4 上，batteryPercentages[4] > 0 ，现在有 3 个已测试设备，batteryPercentages 保持不变。
// 因此，答案是 3 。

// 输入：batteryPercentages = [0,1,2]
// 输出：2
// 解释：按顺序从设备 0 开始执行测试操作：
// 在设备 0 上，batteryPercentages[0] == 0 ，移动到下一个设备而不进行测试。
// 在设备 1 上，batteryPercentages[1] > 0 ，现在有 1 个已测试设备，batteryPercentages 变为 [0,1,1] 。
// 在设备 2 上，batteryPercentages[2] > 0 ，现在有 2 个已测试设备，batteryPercentages 保持不变。
// 因此，答案是 2 。

// 方法一：模拟：
// 根据题意可知，对于每个设备 i，执行以下测试操作：
//  - 如果 batteryPercentages[i]>0 ，则增加已测试设备的计数，将下标在 j∈[i+1,n−1] 的所有设备的电池百分比减少 1，但不会减少为负数，此时 batteryPercentages[j]=max⁡(0,batteryPercentages[j]−1)，继续移动到下一个设备；
//  - 如果 batteryPercentages[i]=0，移动到下一个设备而不执行任何测试；
// 根据题目要求进行模拟即可，遍历数组中的每一个元素，如果当前的元素大于 0，则增加计数，并数组将该元素之后的所有元素进行减 1，每个至多减少到 0，最后返回计数即可。
/**
 * @param {number[]} batteryPercentages
 * @return {number}
 */
var countTestedDevices = function (batteryPercentages) {
    const n = batteryPercentages.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (batteryPercentages[i] > 0) {
            count++; // 增加已测试设备的计数
            // 将下标在 j∈[i+1,n−1] 的所有设备的电池百分比减少 1，但不会减少为负数。
            for (let j = i + 1; j < n; j++) {
                batteryPercentages[j] = Math.max(0, batteryPercentages[j] - 1);
            }
        }
    }
    return count;
};
// 时间复杂度：O(n^2)，n 为数组 batteryPercentages 的长度。遍历数组时，最差情况需要对每个元素都需要再遍历其之后对元素。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：差分数组
// 在模拟的方法中，我们需要频繁对大于 0 的元素之后对元素进行 -1 操作，这很容易让我们联想到差分数组。因为差分数组的应用场景就是 「频繁对原始数组的某个区间的元素进行增减」。
// 只是这道题比较特殊，因为它的修改区间是到最后一个数。
// 具体的：
// 我们使用一个变量 count 表示当前元素被减了多少次。
// 遍历设备电池容量数组 batteryPercentages，如果当前设备的电池容量大于 0，则将 count+=1 ，即后面的元素都需要 -count 了。
// 最后返回 count，因为每次遇到 battery > count 都把 count+1 ，这正是题目要求统计的。

// 或者这样想更简单：使用 count 表示当前已测设备的数量，遍历设备数组，如果当前设备的电池容量大于已测设备的数量（battery > count），则将已测设备加 1。最后返回已测设备数量 count 。
var countTestedDevices = function (batteryPercentages) {
    let count = 0; // 初始化计数器为 0。

    // 遍历设备电池容量数组
    for (const battery of batteryPercentages) {
        // 如果当前设备电池电量大于已测试设备数量，则将已测试设备数量加 1。
        if (battery > count) count++;
    }
    // 返回已测设备的数量
    return count;
};
// 时间复杂度：O(n)，n 为数组 batteryPercentages 的长度。只需要遍历一次数组即可。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
