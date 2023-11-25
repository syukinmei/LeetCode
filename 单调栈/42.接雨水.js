// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// |
// |               |
// |       | π π π | | π |
// | _ | π | | π | | | | | |
//   0 1 0 2 1 0 1 3 2 1 2 1

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（π部分表示雨水）。

// 输入：height = [4,2,0,3,2,5]
// 输出：9

/**
 * 方法一：枚举案列求（力扣会超时）
 * 计算每列可以积累的水量，其和即最终答案
 * 每一列可积攒水量我们只需要关注当前列、左边最高柱子、右边最高柱子即可。
 * 根据木桶效应，对于每列可积水量为：当前列左侧最高柱子 和 右侧最高柱子的较小值 减去当前列的柱子高度。
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let sum = 0;
    const n = height.length;
    for (let i = 0; i < n; i++) {
        // 计算当前列左侧最高柱子高度
        let l_max = 0;
        for (let t = 0; t < i; t++) {
            l_max = Math.max(l_max, height[t]);
        }

        // 计算当前列右侧最高柱子高度
        let r_max = 0;
        for (let t = n - 1; t > i; t--) {
            r_max = Math.max(r_max, height[t]);
        }

        sum += Math.max(Math.min(l_max, r_max) - height[i], 0);
    }
    return sum;
};
// 时间复杂度：O(n^2)，n 为数组 height 的长度，计算所有列的积水量需要遍历一次 heigjt 数组，对于每列我们为了找出左侧最高和右侧最高需要再遍历一次 height 数组，因此总的时间复杂度为O(n^2)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

/**
 * 对方法一的优化
 * 使用额外的数组存储 "左侧最大值" 和 "右侧最大值"，只需要分别遍历一次数组即可获取。
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const n = height.length;

    // l_max_arr[i] 和 r_max_arr[i] 分别表示，对于 height 数组坐标 i 左侧最大值和右侧最大值
    const l_max_arr = new Array(n); // 从 height[0] 到 height[i] 的最大值
    const r_max_arr = new Array(n); // 从 height[i] 到 height[n-1] 的最大值

    // 构建完整的 l_max_arr 数组
    l_max_arr[0] = 0;
    for (let i = 1; i < n; i++) {
        l_max_arr[i] = Math.max(l_max_arr[i - 1], height[i - 1]);
    }

    // 构建完整的 r_max_arr 数组
    r_max_arr[n - 1] = 0;
    for (let i = n - 2; i >= 0; i--) {
        r_max_arr[i] = Math.max(r_max_arr[i + 1], height[i + 1]);
    }

    // 求和：计算每列可累积水量并相加
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.max(Math.min(l_max_arr[i], r_max_arr[i]) - height[i], 0);
    }
    return sum;
};
// 时间复杂度：O(n)，构建 l_max_arr 和 r_max_arr 数组，计算每列可累积水量并相加 的时间复杂度分别为 O(n)，因此总的时间复杂度为O(n)。
// 空间复杂度：O(n)，n 为数组 height 的长度，需要两个长度和 height 相同的数组存储最大值。

/**
 * 方法二：单调栈
 * 维护一个单调递减栈，当遇到大于栈顶元素时，进行弹栈后栈中仍有值，此时形成了凹槽，左边有积水。
 * [0,1,0,2,1,0,1,3,2,1,2,1]
 * [1,0]2，
 * 积水高度为：Math.min(当前元素高,栈顶元素高)-弹栈元素高
 * 积水宽度为：当前索引-栈顶下标-1
 * 宽度是 i-left-1，高度是 Math.mid(height[left],height[i])-height[top]
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const stack = []; // 单调递减栈，当遇到大于栈顶的元素时候说明形成凹槽可以积累雨水，储存索引用于计算trap宽高
    let sumTrap = 0; // 记录结果值 雨水面积
    for (let i = 0; i < height.length; i++) {
        // 栈中有值 且 当前元素 大于 栈顶元素 则弹栈
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            let mid = height[stack.pop()];
            if (stack.length === 0) break; // 弹栈后 如果栈为空 则没有trap无法积累雨水 结束本次循环;
            // 弹栈后 如果栈中有值 则栈顶元素、弹栈元素、当前元素形成trap 计算积雨量
            // 有 trap 底宽为：i-栈顶-1  高为：Math.mid(栈顶元素高,当前元素高)-弹栈元素高
            sumTrap +=
                (i - stack[stack.length - 1] - 1) *
                (Math.min(height[i], height[stack[stack.length - 1]]) - mid);
        }
        // 压栈
        stack.push(i);
    }
    return sumTrap;
};
// 时间复杂度：O(n)，其中n是数组 height 的长度 。从 0 到 n-1 的每一个下标最多只会入栈和出栈各一次。
//                 单次遍历O(n)，每个条形块最多访问两次（入栈和出栈），并且入栈和出栈都是O(1)的。
// 空间复杂度：O(n)，其中n是数组 height 的长度。空间复杂度主要取决于栈空间，栈的大小不会超过n，最多在阶梯型或平坦型条形块结构中占用O(n)的空间。
