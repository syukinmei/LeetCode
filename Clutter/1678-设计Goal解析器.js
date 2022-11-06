// 请你设计一个可以解释字符串 command 的 Goal 解析器 。command 由 "G"、"()" 和/或 "(al)" 按某种顺序组成。Goal 解析器会将 "G" 解释为字符串 "G"、"()" 解释为字符串 "o" ，"(al)" 解释为字符串 "al" 。然后，按原顺序将经解释得到的字符串连接成一个字符串。

// 给你字符串 command ，返回 Goal 解析器 对 command 的解释结果。

// 输入：command = "G()(al)"
// 输出："Goal"
// 解释：Goal 解析器解释命令的步骤如下所示：
// G -> G
// () -> o
// (al) -> al
// 最后连接得到的结果是 "Goal"

// 输入：command = "G()()()()(al)"
// 输出："Gooooal"

// 输入：command = "(al)G(al)()()G"
// 输出："alGalooG"

// 遍历：
// - 如果当前第 i 个字符为 G，则表示当前字符串模式为 G，转换后的结果为 G，我们直接在结果中添加 G；
// - 如果当前第 i 个字符为 (，则表示当前字符串模式可能为 () 或 (al) ；
//  - 如果第 i+1 个字符为)，则当前字符串模式为 ()，转换为 o；
//  - 如果第 i+1 个字符为a，则当前字符串模式为 (al)，转换为 al；
/**
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
    let res = '';
    for (let i = 0; i < command.length; i++) {
        if (command[i] === 'G') res += 'G';
        else if (command[i] === '(') {
            if (command[i + 1] === ')') res += 'o'
            else res += 'al';
        }
    }
    return res;
};
// 时间复杂度：O(n)，n 为 字符串 command 的长度。我们只需要遍历一遍字符串即可。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
