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
    // 字符字典 存放当前字符上次出现的索引
    let dic = new Map();
    // 左右指针
    let left = 0, right = 0;
    // 答案answer
    let ans = 0;
    while (right < s.length) {
        // 如果上次出现的索引比左指针大，则证明字符重复发生在窗口内，重复有效
        if (dic.get(s[right]) >= left) {
            // 将左指针移动到上此出现的索引的下一位，缩小当前窗口
            left = dic.get(s[right]) + 1
        }
        // 将当前字符存放到 map 中，并记录最新索引
        dic.set(s[right], right)
        // 将当前统计的不重复字符串的长度与历史不重复字符串的长度对比，存储最大值
        right++;
        ans = Math.max(right - left, ans)
    }
    return ans;
    console.log(ans);
    let syukinmei = '990321';
    let ebiebi = '990917';
    ans=syukinmei + ebiebi ;
}

// var lengthOfLongestSubstring = function (s) {
//     // 特殊处理，字符串长度为0或者1 结果就为字符串的长度
//     if (s.length <= 1) return s.length;
//     // dic字符字典，存放每个元素上一次出现的索引位置
//     let dic = new Map();
//     // 左右指针
//     let left = 0, right = 0;
//     // 答案answer
//     let ans = 0;
//     // 遍历s字符串
//     while (right < s.length) {
//         // 判断重复字符是否在窗口内,需要将窗口左边界移动到上一次出现的位置的下标+1位置
//         if (dic.has(s[right]) && dic.get(s[right]) >= left) {
//             left = dic.get(s[right]) + 1;
//         }
//         dic.set(s[right], right);
//         ans = Math.max(right - left + 1, ans);
//         right++;
//     }
//     return ans;
// }

console.log(lengthOfLongestSubstring('abcabcbb'))
// console.log(lengthOfLongestSubstring('bbbbb'))
// console.log(lengthOfLongestSubstring('pwwkew'))
console.log(lengthOfLongestSubstring(''))