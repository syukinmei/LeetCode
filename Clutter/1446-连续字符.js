// 给你一个字符串 s ，字符串的「能量」定义为：只包含一种字符的最长非空子字符串的长度。
// 请你返回字符串的能量。

// 输入：s = "leetcode"
// 输出：2
// 解释：子字符串 "ee" 长度为 2 ，只包含字符 'e' 。

// 输入：s = "abbcccddddeeeeedcba"
// 输出：5
// 解释：子字符串 "eeeee" 长度为 5 ，只包含字符 'e' 。

// 输入：s = "triplepillooooow"
// 输出：5

// 输入：s = "hooraaaaaaaaaaay"
// 输出：11

// 输入：s = "tourist"
// 输出：1


/**
 * @param {string} s
 * @return {number}
 */
// 方法一：双指针
var maxPower = function (s) {
    let left = 0, right = 0, ans = 0;
    for (; right < s.length; right++) {
        if (s[right] !== s[left]) {
            ans = Math.max(right - left, ans);
            left = right;
        }
    }
    ans = Math.max(right - left, ans)
    return ans;
};

// 方法二：单指针
// 初始化当前字符连续出现的次数cnt为1
// 从s[1]开始，向后遍历字符串，如果s[i]=s[i-1]，则将cnt+1，否则将cnt重置为1
// 维护上诉过程中cnt的最大值，即为答案
var maxPower = function (s) {
    let ans = 1, cnt = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            cnt++;
            ans = Math.max(ans, cnt);
        } else {
            cnt = 1;
        }
    }
    return ans;
};
// 方法一、二相同
// 时间复杂度：O(n)，n是字符串 s 的长度。遍历一次s的时间为O(n)。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。