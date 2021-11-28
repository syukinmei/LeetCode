// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 输入: s = ""
// 输出: 0



// var lengthOfLongestSubstring = function (s) {
//     let maxLength = 0;
//     let maxString = [];
//     let i = 0
//     while (i < s.length) {
//         if ((maxString.indexOf(s.charAt(i)) !== -1)) {
//             maxLength = Math.max(maxLength, maxString.length);
//         }
//         maxString = maxString.slice(maxString.indexOf(s.charAt(i)) + 1)
//         maxString.push(s.charAt(i));
//         i++;
//     }
//     maxLength = Math.max(maxLength, maxString.length);
//     return maxLength;
// };

// var lengthOfLongestSubstring = function (s) {
//     // 特殊情况处理
//     if (s.length < 2) return s.length;

//     let left = right = 0;
//     let dict = new Object();
//     let res = 1;

//     while (right < s.length) {
//         if (s[right] in dict) {
//             left = Math.max(left, dict[s[right]] + 1)
//         }
//         dict[s[right]] = right;
//         res = Math.max(res, right - left + 1)
//         right += 1;
//     }

//     return res
// }


// var lengthOfLongestSubstring = function (s) {
//     let ans = 0; // answer记录结果
//     let window = new Set();
//     // 左指针用来收缩窗口
//     let left = 0;
//     // 右指针用来扩张窗口
//     let right = 0;

//     while (left < s.length) {
//         // 如果不重复（window里不存在当前字符），就不断扩张窗口，元素添加到window中
//         while (right < s.length && !window.has(s[right])) {
//             window.add(s[right]);
//             right++;
//         }
//         // 到这里说明有元素重复了，先记录子串长度，然后收缩窗口
//         ans = Math.max(ans, right - left);
//         // 收缩窗口
//         window.delete(s[left]);
//         left++;
//     }
//     return ans;
// }


var lengthOfLongestSubstring = function (s) {
    // 特殊处理，字符串长度为0或者1 结果就为字符串的长度
    if (s.length <= 1) return s.length;
    // dic字符字典，存放每个元素上一次出现的索引位置
    let dic = new Map();
    // 左右指针
    let left = 0, right = 0;
    // 答案answer
    let ans = 0;
    // 遍历s字符串
    while (right < s.length) {
        // 判断重复字符是否在窗口内,需要将窗口左边界移动到上一次出现的位置的下标+1位置
        if (dic.has(s[right]) && dic.get(s[right]) >= left) {
            left = dic.get(s[right]) + 1;
        }
        dic.set(s[right], right);
        ans = Math.max(right - left + 1, ans);
        right++;
    }
    return ans;
}



var lengthOfLongestSubstring = function (s) {
    // 字符字典 存放当前字符上次出现的索引位置
    let dic = new Map();
    let left = 0; // 窗口左边界
    let ans = 0; // 记录不含有重复字符的最长子串长度
    for (let i = 0; i < s.length; i++) {
        // 如果字符字典里存在该元素，且上次出现的位置大于左指针，则说明字符重复发生在窗口内，缩小窗口
        if (dic.has(s[i]) && dic.get(s[i]) >= left) {
            // 将左指针移动到上次出现的索引的下一个位置以缩小当前窗口
            left = dic.get(s[i]) + 1;
        }
        // 将当前字符出现的索引记录入字符字典中
        dic.set(s[i], i);
        // 更新窗口长度，将当前统计的不重复字符串的长度 与 历史不重复字符串的长度对比，存储最大值；
        ans = Math.max(ans, i - left + 1);
    }
    return ans;
};