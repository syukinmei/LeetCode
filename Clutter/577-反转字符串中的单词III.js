// 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

// 输入："Let's take LeetCode contest"
// 输出："s'teL ekat edoCteeL tsetnoc"

// 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。


/**
 * @param {string} s
 * @return {string}
 */
// 方法一：双指针 + 使用额外空间
// 开辟一个新字符串。然后从头到尾遍历原字符串，直到找到空格为止，此时找到了一个单词，并能得到单词的起止位置。随后，根据单词的起止位置，可以将该单词逆序放到新字符串当中。如此循环多次，直到遍历完原字符串，就能得到翻转后的结果。
var reverseWords = function (s) {
    let ans = [];
    for (let i = 0; i < s.length; i++) {
        // 单词头部
        let start = i;
        // 寻找单词尾部
        while (i < s.length && s.charAt(i) !== ' ') {
            i++;
        }
        // 此时有i-1即是单词尾部，进行反向入栈
        for (let j = i - 1; j >= start; j--) {
            ans.push(s.charAt(j));
        }
        // 此时一个单词已经反向入栈了，加入一个空格隔开单词
        ans.push(' ');
    }
    // 删除最后一个添加的空格
    ans.pop();
    return ans.join('');
};
// 时间复杂度：O(n)，n为字符串 s 的长度。原字符串中的每一个字符都会在O(1)的时间内放入新字符串中；
// 空间复杂度：O(n)，n为字符串 s 的长度。我们开辟了与原字符串等大的空间。


// 方法二：使用API
// 1、先按空格分隔成数组，数组的每一项即是一个单词
// 2、再把每个单词分隔成数组，使用reverse()方法反转单词后，用join()转字符串拼接起来
var reverseWords = function (s) {
    const arr = s.split(' ');
    // arr = [ "Let's", 'take', 'LeetCode', 'contest' ]
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i].split('').reverse().join(''));
    }
    // 此时有 res = [ "s'teL", 'ekat', 'edoCteeL', 'tsetnoc' ]
    return res.join(' ');
};