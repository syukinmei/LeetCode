// 句子 是由若干个单词组成的字符串，单词之间用单个空格分隔，其中每个单词可以包含数字、小写字母、和美元符号 '$' 。如果单词的形式为美元符号后跟着一个非负实数，那么这个单词就表示一个 价格 。

//  - 例如 "$100"、"$23" 和 "$6" 表示价格，而 "100"、"$" 和 "$1e5 不是。

// 给你一个字符串 sentence 表示一个句子和一个整数 discount 。对于每个表示价格的单词，都在价格的基础上减免 discount% ，并 更新 该单词到句子中。所有更新后的价格应该表示为一个 恰好保留小数点后两位 的数字。
// 返回表示修改后句子的字符串。

// 注意：所有价格 最多 为  10 位数字。

// 输入：sentence = "there are $1 $2 and 5$ candies in the shop", discount = 50
// 输出："there are $0.50 $1.00 and 5$ candies in the shop"
// 解释：
// 表示价格的单词是 "$1" 和 "$2" 。
// - "$1" 减免 50% 为 "$0.50" ，所以 "$1" 替换为 "$0.50" 。
// - "$2" 减免 50% 为 "$1" ，所以 "$1" 替换为 "$1.00" 。

// 输入：sentence = "1 2 $3 4 $5 $6 7 8$ $9 $10$", discount = 100
// 输出："1 2 $0.00 4 $0.00 $0.00 7 8$ $0.00 $10$"
// 解释：
// 任何价格减免 100% 都会得到 0 。
// 表示价格的单词分别是 "$3"、"$5"、"$6" 和 "$9"。
// 每个单词都替换为 "$0.00"。

// 方法一：模拟
// 按照题目中的要求进行模拟即可。
// 将给到的句子 sentence 根据空格进行分割，得到一个单词数组 words。然后遍历单词数组，对于每个单词，判断其是否表示一个价格。
//  - 如果该单词是一个价格，我们提取出价格的数值，并计算出减免后的价格。
//  - 如果该单词不表示价格，跳过即可。
// 最后，将更新后的单词数组拼接成以空格分割的字符串即可。

/**
 * @param {string} sentence
 * @param {number} discount
 * @return {string}
 */
var discountPrices = function (sentence, discount) {
    const words = sentence.split(" ");
    const regex_prices = /^\$\d+$/; // 匹配价格字符串的正则
    const SHELL = (100 - discount) / 100; // 计算折扣倍率
    for (let i = 0; i < sentence.length; i++) {
        if (regex_prices.test(words[i])) {
            let price = parseFloat(words[i].slice(1));
            price *= SHELL;
            words[i] = "$" + price.toFixed(2);
        }
    }
    return words.join(" ");
};
// 时间复杂度：O(n)，n 为数组 sentence 的长度。
// 空间复杂度：O(n)，n 为数组 sentence 的长度。
