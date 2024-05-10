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
