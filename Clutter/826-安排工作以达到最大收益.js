// 你有 n 个工作和 m 个工人。给定三个数组： difficulty, profit 和 worker ，其中:
//  - difficulty[i] 表示第 i 个工作的难度，profit[i] 表示第 i 个工作的收益。
//  - worker[i] 是第 i 个工人的能力，即该工人只能完成难度小于等于 worker[i] 的工作。

// 每个工人 最多 只能安排 一个 工作，但是一个工作可以 完成多次 。

//  - 举个例子，如果 3 个工人都尝试完成一份报酬为 $1 的同样工作，那么总收益为 $3 。如果一个工人不能完成任何工作，他的收益为 $0 。

// 返回 在把工人分配到工作岗位后，我们所能获得的最大利润 。

// 输入: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
// 输出: 100
// 解释: 工人被分配的工作难度是 [4,4,6,6] ，分别获得 [20,20,30,30] 的收益。

// 输入: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
// 输出: 0

// 方法一：排序+双指针
// 如果把 worker 按照从小到大的顺序排序（工人按照能力升序排序），那么第 i 个工人能做的工作，他右边的（ worker 值更大的）工人也能做。
// 如果再把 difficulty 和 profit 绑定在一起，按照 difficulty 从小到大的顺序排序，此时有 worker[i] <= difficulty[j]，[0, j] 中收益最大的工作报酬为 best ，那么 worker[i] 右边的工人至少都可以获得 best 的报酬，对于下一个工人就不需要再遍历 [0, j] 的工作了。

// 因此，我们可以使用「双指针」来解决这个问题。
// 指针 i 指向 worker 工人数组，指针 j 指向 difficulty 任务数组。从低难度的任务开始遍历，同时维护 difficulty[j] <= worker[i] 的最大收益 profit[j] ，即为第 i 个工人所能获得的最大利润。累加每位工人能获得的最大利润，即为答案。

/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function (difficulty, profit, worker) {
    // difficulty 和 profit 绑定在一起，并按照工作难度升序排序
    const jobs = difficulty
        .map((d, i) => [d, profit[i]])
        .sort((a, b) => a[0] - b[0]);

    worker.sort((a, b) => a - b); // 工人按照能力升序排序

    let res = 0; // 所有工人能得到的利润总和
    let i = 0,
        j = 0; // 双指针
    let best = 0; // 能力大于等于 worker[i] 的工人至少可以获得的利润

    // 遍历工人并为每个工人分配最佳工作
    while (i < worker.length) {
        const w = worker[i];
        // 寻找该工人可以完成的任务的最大收益
        while (j < jobs.length && w >= jobs[j][0]) {
            best = Math.max(best, jobs[j][1]); // 更新 best 为当前工作收益和之前收益中的最大值。
            j++;
        }
        res += best; // 累计最大收益综合
        i++;
    }

    return res;
};
// 时间复杂度：O(nlogn + mlogm)，n 和 m 分别为数组 difficulty 和 worker 的长度，其排序所需 O(nlogn + mlogm) 的时间，遍历数组为工人分配最佳任务只需要 O(n+m) 的时间，因为我们的双指针只进不退，每个工人和每个工作只被访问一次，因此总的时间复杂度为O(nlogn + mlogm)。
// 空间复杂度：O(n)，排序需要 O(logn) 的递归调用栈空间，构建新的工作难度和报酬数组 jobs 需要 O(n) 的空间，因此总的空间消耗为 O(n)。
