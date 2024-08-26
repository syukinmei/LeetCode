// 你有一个保存员工信息的数据结构，它包含了员工唯一的 id ，重要度和直系下属的 id 。

// 给定一个员工数组 employees，其中：

//  - employees[i].id 是第 i 个员工的 ID。
//  - employees[i].importance 是第 i 个员工的重要度。
//  - employees[i].subordinates 是第 i 名员工的直接下属的 ID 列表。

// 给定一个整数 id 表示一个员工的 ID，返回这个员工和他所有下属的重要度的 总和。

//             [ID: 1, importance: 5]
//               /                \
//  [ID: 2, importance: 3]     [ID: 3, importance: 3]
// 输入：employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1
// 输出：11
// 解释：
// 员工 1 自身的重要度是 5 ，他有两个直系下属 2 和 3 ，而且 2 和 3 的重要度均为 3 。因此员工 1 的总重要度是 5 + 3 + 3 = 11 。

//             [ID: 1, importance: 2]
//               /
//  [ID: 5, importance: -3]
// 输入：employees = [[1,2,[5]],[5,-3,[]]], id = 5
// 输出：-3
// 解释：员工 5 的重要度为 -3 并且没有直接下属。
// 因此，员工 5 的总重要度为 -3。

// 1 <= employees.length <= 2000
// 1 <= employees[i].id <= 2000
// 所有的 employees[i].id 互不相同。
// -100 <= employees[i].importance <= 100
// 一名员工最多有一名直接领导，并可能有多名下属。
// employees[i].subordinates 中的 ID 都有效。

// 方法一：哈希表 + DFS
// 我们用一个哈希表 map 存储所有员工的信息，其中键是员工的 ID，值是员工对象。然后我们从给定的员工 ID 开始深度优先搜索，每次遍历到一个员工时，将该员工的重要度加到答案中，并递归遍历该员工的所有下属，将下属的重要度也加到答案中。
// 具体的：
//  - 根据 id 从哈希表中获取对应的员工对象 employee。
//  - 把 employee.importance 加到返回值中。
//  - 遍历 employee.subordinates ，继续 dfs 下属的 id，把 dfs(subId) 加到返回值中。
/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function (employees, id) {
    // 哈希表 key：存储员工编号 value：对应的信息
    const map = new Map();
    for (const employee of employees) {
        map.set(employee.id, employee);
    }

    const dfs = (id) => {
        const { importance, subordinates } = map.get(id);
        let total = importance; // 获取当前 id 员工的重要性
        // 获取当前员工的直接下属员工的重要性。
        for (const subId of subordinates) {
            total += dfs(subId);
        }
        return total;
    };

    // 返回当前 id 员工及其所有下属员工的重要性之和。
    return dfs(id);
};
// 时间复杂度：O(n)，其中 n 是员工数量。因为一名员工最多有一名直接领导，并可能有多名下属，所以每个员工只会被遍历一次。
// 空间复杂度：O(n)，其中 n 是员工数量。空间复杂度主要取决于哈希表的空间和递归调用栈的空间，哈希表的大小为 n，栈的深度不超过 n。

/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */
