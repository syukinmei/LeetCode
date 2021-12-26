// 给你一个字符串 licensePlate 和一个字符串数组 words ，请你找出并返回 words 中的 最短补全词 。
// 补全词 是一个包含 licensePlate 中所有的字母的单词。在所有补全词中，最短的那个就是 最短补全词 。

// 在匹配 licensePlate 中的字母时：
// - 忽略 licensePlate 中的 数字和空格 。
// - 不区分大小写。
// - 如果某个字母在 licensePlate 中出现不止一次，那么该字母在补全词中的出现次数应当一致或者更多。

// 例如：licensePlate = "aBc 12c"，那么它的补全词应当包含字母 'a'、'b' （忽略大写）和两个 'c' 。可能的 补全词 有 "abccdef"、"caaacab" 以及 "cbca" 。
// 请你找出并返回 words 中的 最短补全词 。题目数据保证一定存在一个最短补全词。当有多个单词都符合最短补全词的匹配条件时取 words 中 最靠前的 那个。


// 输入：licensePlate = "1s3 PSt", words = ["step", "steps", "stripe", "stepple"]
// 输出："steps"
// 解释：最短补全词应该包括 "s"、"p"、"s"（忽略大小写） 以及 "t"。
// "step" 包含 "t"、"p"，但只包含一个 "s"，所以它不符合条件。
// "steps" 包含 "t"、"p" 和两个 "s"。
// "stripe" 缺一个 "s"。
// "stepple" 缺一个 "s"。
// 因此，"steps" 是唯一一个包含所有字母的单词，也是本例的答案。

// 输入：licensePlate = "1s3 456", words = ["looks", "pest", "stew", "show"]
// 输出："pest"
// 解释：licensePlate 只包含字母 "s" 。所有的单词都包含字母 "s" ，其中 "pest"、"stew"、和 "show" 三者最短。答案是 "pest" ，因为它是三个单词中在 words 里最靠前的那个。

// 输入：licensePlate = "Ah71752", words = ["suggest","letter","of","husband","easy","education","drug","prevent","writer","old"]
// 输出："husband"

// 输入：licensePlate = "OgEu755", words = ["enough","these","play","wide","wonder","box","arrive","money","tax","thus"]
// 输出："enough"

// 输入：licensePlate = "iMSlpe4", words = ["claim","consumer","student","camera","public","never","wonder","simple","thought","use"]
// 输出："simple"



/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
// 方法一：正则过滤 + 字符串按字典序排序后比较相同字符数
var shortestCompletingWord = function (licensePlate, words) {
    // 处理字符串 licensePlate，使用正则将非字母删除，字母转小写，字符串转数组，按照字典序排序
    licensePlate = licensePlate.replace(/[^a-zA-Z]/g, '').toLowerCase().split('').sort();
    let res = '';
    for (const w of words) {
        const word = w.split('').sort(); // words中每一项单词都按字典序排序
        if (word.length < licensePlate.length) continue; // 长度小于licensePlate一定不是补全词 跳过单次循环
        let count = 0; // 记录单词匹配次数
        for (let i = 0, j = 0; i < licensePlate.length && j < word.length;) {
            if (licensePlate[i] === word[j]) {
                // 相等两个指针都右移
                i++; j++; count++;
            } else if (licensePlate[i] > word[j]) {
                // word[j]小，j指针右移，尝试寻找和licensePlate[i]相等的元素
                j++;
            } else if (licensePlate[i] < word[j]) {
                // licensePlate中存在word中没有的字母 word一定不是补全词 跳过本次循环
                break;
            }
        }
        // 判断是否是补全词，单词匹配次数 = licensePlate的长度 为补全词
        if (count === licensePlate.length) {
            if (res == '' || res.length > w.length) {
                res = w;
            }
        }
    }
    return res;
};

console.log(shortestCompletingWord('abf', ['fa', 'fed', 'anrf', 'afeb', 'abfc']));