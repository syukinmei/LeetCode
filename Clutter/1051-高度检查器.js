// 学校打算为全体学生拍一张年度纪念照。根据要求，学生需要按照 非递减 的高度顺序排成一行。
// 排序后的高度情况用整数数组 expected 表示，其中 expected[i] 是预计排在这一行中第 i 位的学生的高度（下标从 0 开始）。
// 给你一个整数数组 heights ，表示 当前学生站位 的高度情况。heights[i] 是这一行中第 i 位学生的高度（下标从 0 开始）。
// 返回满足 heights[i] != expected[i] 的 下标数量 。

// 输入：heights = [1,1,4,2,1,3]
// 输出：3 
// 解释：
// 高度：[1,1,4,2,1,3]
// 预期：[1,1,1,2,3,4]
// 下标 2 、4 、5 处的学生高度不匹配。

// 输入：heights = [5,1,2,3,4]
// 输出：5
// 解释：
// 高度：[5,1,2,3,4]
// 预期：[1,2,3,4,5]
// 所有下标的对应学生高度都不匹配。

// 输入：heights = [1,2,3,4,5]
// 输出：0
// 解释：
// 高度：[1,2,3,4,5]
// 预期：[1,2,3,4,5]
// 所有下标的对应学生高度都匹配。

// tips：
// 1 <= heights.length <= 100
// 1 <= heights[i] <= 100


// 题意：对比排序后和排序前位置不一样的个数

/**
 * @param {number[]} heights
 * @return {number}
 */
// 方法一：排序后比较
// 直接将数组 heights 复制一份（记为 expected），并对数组 expected 进行排序。
// 排序后，统计 heights[i] !== expected[i] 的下标数量。
var heightChecker = function (heights) {
    const expected = [...heights];
    expected.sort((a, b) => a - b);

    let count = 0;
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== expected[i]) count++;
    }
    return count;
};
// 时间复杂度：O(nlogn)，n 为数组 heights 的长度，即为排序所需的时间。
// 空间复杂度：O(n)，即为数组 expected 所需的空间。



// 方法二：计数排序
// 注意到本题中学生的高度小于等于 100，因此可以使用计数排序。
// 因为并不要求我们真正的进行排序，因为不需要确确实实的知道每个位置上排列的是谁，只需要统计下每个数的个数，然后依次判断就可以了
// 如 heights = [1, 1, 4, 2, 1, 3] ，则 cnt = [0, 3, 1, 1, 1]。 cnt[i] 表示 i 有 cnt[i] 个。通过cnt 就能推导出 expected应该为[1, 1, 1, 2, 3, 4]
// 在进行计数排序时，我们可以直接使用一个长度为 101 的数组，也可以使用 heights 数组最大元素 max 长度的数组。
var heightChecker = function (heights) {
    const max = Math.max(...heights);
    const cnt = new Array(max + 1).fill(0);

    for (let h of heights) {
        cnt[h]++;
    }

    let count = 0;
    for (let i = 1, j = 0; i < max + 1; i++) {
        while (cnt[i]-- > 0) {
            if (heights[j++] !== i) count++;
        }
    }
    return count;
};
// 时间复杂度：O(n+C)，n 为数组 heights 的长度，C 是数组 heights  中的最大值 max。即为计数排序所需的时间。
// 空间复杂度：O(C)，即为计数排序所需的空间。
