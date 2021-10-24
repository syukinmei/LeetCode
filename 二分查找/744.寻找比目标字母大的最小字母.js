// 给你一个排序后的字符列表 letters ，列表中只包含小写英文字母。另给出一个目标字母 target，请你寻找在这一有序列表里比目标字母大的最小字母。
// 在比较时，字母是依序循环出现的。举个例子：
// 如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'


// 输入:
// letters = ["c", "f", "j"]
// target = "a"
// 输出: "c"

// 输入:
// letters = ["c", "f", "j"]
// target = "c"
// 输出: "f"

// 输入:
// letters = ["c", "f", "j"]
// target = "d"
// 输出: "f"

// 输入:
// letters = ["c", "f", "j"]
// target = "g"
// 输出: "j"

// 输入:
// letters = ["c", "f", "j"]
// target = "j"
// 输出: "c"

// 输入:
// letters = ["c", "f", "j"]
// target = "k"
// 输出: "c"


/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */

// 方法一：线性扫描
// 由于letters已经有序，当我们从左往右扫描找到比target字母大的字母即为答案。否则答案为letter[0];
/* var nextGreatestLetter = function (letters, target) {
    for (let i of letters) {
        if (i > target) return i;
    }
    return letters[0];
}; */
// 时间复杂度：O(N)。N指letters的长度，我们扫描数组的每一个元素
// 空间复杂度：O(1)。只使用了指针。



// 方法二：二分查找
var nextGreatestLetter = function (letters, target) {
    // 单调递增数组，看最后一个元素是否小于target就可以判断是否返回数组第一个元素
    if (letters[letters.length - 1] <= target) return letters[0];
    let left = 0, right = letters.length - 1, mid;
    while (left < right) {
        mid = left + ((right - left) >> 1);
        if (letters[mid] <= target) {
            left = mid + 1;
        } else { // mid 可能为第一个大于target的字母，所以区间不为mid-1；
            right = mid;
        }
    }
    // 此时有left = right
    return letters[left];
};
// 时间复杂度：O(logN)。N指letters的长度，我们只查看数组中的logN个元素。
// 空间复杂度：O(1)。只使用了指针