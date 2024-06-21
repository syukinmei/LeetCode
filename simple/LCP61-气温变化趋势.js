// 力扣城计划在两地设立「力扣嘉年华」的分会场，气象小组正在分析两地区的气温变化趋势，对于第 i ~ (i+1) 天的气温变化趋势，将根据以下规则判断：

//  - 若第 i+1 天的气温 高于 第 i 天，为 上升 趋势
//  - 若第 i+1 天的气温 等于 第 i 天，为 平稳 趋势
//  - 若第 i+1 天的气温 低于 第 i 天，为 下降 趋势
//  已知 temperatureA[i] 和 temperatureB[i] 分别表示第 i 天两地区的气温。 组委会希望找到一段天数尽可能多，且两地气温变化趋势相同的时间举办嘉年华活动。请分析并返回两地气温变化趋势相同的最大连续天数。

// 即最大的 n，使得第 i~i+n 天之间，两地气温变化趋势相同

// 输入： temperatureA = [21,18,18,18,31] temperatureB = [34,32,16,16,17]
// 输出：2
// 解释：如下表所示， 第 2～4 天两地气温变化趋势相同，且持续时间最长，因此返回 4-2=2
// 天数       |     0~2     |     0~2     |     0~2     |     0~2     |
// 变化趋势A  |     下降     |     平稳    |     平稳    |     上升     |
// 变化趋势B  |     下降     |     下降    |     下降    |     上升     |

// 输入： temperatureA = [5,10,16,-6,15,11,3] temperatureB = [16,22,23,23,25,3,-16]
// 输出：3

// 方法一：模拟
// 对两地每天的天气进行一次遍历，每次计算相邻两天的气温变化趋势，并对两地趋势进行比较。
//  - 如果相同，增加当前连续相同趋势的天数 temp，并尝试更新最大连续相同趋势的天数 maxSameTrend。
//  - 如果不同，将当前续相同趋势的天数 temp 重置为 0。
// 遍历结束后，返回最大连续相同趋势的天数 maxSameTrend。
/**
 * @param {number[]} temperatureA
 * @param {number[]} temperatureB
 * @return {number}
 */
var temperatureTrend = function (temperatureA, temperatureB) {
    let maxSameTrend = 0; // 最大相同趋势的天数
    let temp = 0; // 临时计数器 统计当前连续相同趋势的天数

    // 遍历气温序列
    for (let i = 1; i < temperatureA.length; i++) {
        const trendA = getTrend(temperatureA[i], temperatureA[i - 1]);
        const trendB = getTrend(temperatureB[i], temperatureB[i - 1]);

        // 比较两地气温趋势
        if (trendA === trendB) {
            temp++;
            maxSameTrend = Math.max(maxSameTrend, temp);
        } else {
            temp = 0;
        }
    }

    return maxSameTrend;
};

/**
 * 辅助函数比较今天和前一天的气温趋势
 * @param {number} curDayTemp
 * @param {number} beforeDayTemp
 * @returns {number} 0:持平 1:上升 2:下降
 */
const getTrend = (curDayTemp, beforeDayTemp) => {
    if (curDayTemp === beforeDayTemp) return 0;

    return curDayTemp > beforeDayTemp ? 1 : -1;
};
// 时间复杂度：O(n)，n 为 temperatureA 和 temperatureB 的长度。需要遍历一次气温序列。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
