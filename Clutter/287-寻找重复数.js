

// 方法一：暴力解法 - 两重循环，逐一找重复，对于数组每一项查看数组中是否有重复项
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)


// 方法二：哈希表
// 题目涉及重复（出现次数大于1）
// 模式识别：一旦涉及出现次数，可是使用哈希表
// 时间复杂度：O(n)
// 空间复杂度：O(n)

/* var findDuplicate = function (nums) {
    let dic = new Set()
    for (let item of nums) {
        if (dic.has(item)) return item
        dic.add(item)
    }
    return -1;
}; */
