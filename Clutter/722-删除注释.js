// 给一个 C++ 程序，删除程序中的注释。这个程序source是一个数组，其中source[i]表示第 i 行源码。 这表示每行源码由 '\n' 分隔。
// 在 C++ 中有两种注释风格，行内注释和块注释。

//  - 字符串// 表示行注释，表示//和其右侧的其余字符应该被忽略。
//  - 字符串/* 表示一个块注释，它表示直到下一个（非重叠）出现的*/之间的所有字符都应该被忽略。（阅读顺序为从左到右）非重叠是指，字符串/*/并没有结束块注释，因为注释的结尾与开头相重叠。

// 第一个有效注释优先于其他注释。

//  - 如果字符串//出现在块注释中会被忽略。
//  - 同样，如果字符串/*出现在行或块注释中也会被忽略。

// 如果一行在删除注释之后变为空字符串，那么不要输出该行。即，答案列表中的每个字符串都是非空的。
// 样例中没有控制字符，单引号或双引号字符。

//  - 比如，source = "string s = "/* Not a comment. */";" 不会出现在测试样例里。

// 此外，没有其他内容（如定义或宏）会干扰注释。
// 我们保证每一个块注释最终都会被闭合， 所以在行或块注释之外的/*总是开始新的注释。
// 最后，隐式换行符可以通过块注释删除。 有关详细信息，请参阅下面的示例。
// 从源代码中删除注释后，需要以相同的格式返回源代码。

// 输入: source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
// 输出: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]
// 解释: 示例代码可以编排成这样:
// /*Test program */
// int main()
// {
//   // variable declaration
// int a, b, c;
// /* This is a test
//    multiline
//    comment for
//    testing */
// a = b + c;
// }
// 第 1 行和第 6-9 行的字符串 /* 表示块注释。第 4 行的字符串 // 表示行注释。
// 编排后:
// int main()
// {

// int a, b, c;
// a = b + c;
// }

// 输入: source = ["a/*comment", "line", "more_comment*/b"]
// 输出: ["ab"]
// 解释: 原始的 source 字符串是 "a/*comment\nline\nmore_comment*/b", 其中我们用粗体显示了换行符。删除注释后，隐含的换行符被删除，留下字符串 "ab" 用换行符分隔成数组时就是 ["ab"].

// 方法一：模拟
// 使用一个变量 inBlock 来表示当前是否处于块注释中，初始值为 false，用 newLine 存储当前行的有效字符。
// 遍历每一行进行分类讨论：
//  - 在块注释中，
//      - 如果当前字符和下一个字符组成了 */ 则说明退出块注释，将 inBlock 置为 false，并且跳过这两个字符。
//      - 否则，进行保持在块注释内的状态，不做任何操作。
//  - 不在块注释中，
//      - 如果当前字符和下一个字符组成了 /*，说明块注释开始了，将 inBlock 置为 true，并且跳过这两个字符。
//      — 如果当前字符和下一个字符组成了 //，说明遇到了行注释，我们直接break跳过当前行的遍历。
//      - 否则，说明当前字符是有效字符，将其加入到 newLine 中。

// 遍历完每一行，如果 inBlock 为 treu，且 newLine 不为空，说明当前行是有效的，将其加入结果数组中，并清空 newLine，继续遍历下一行。
/**
 * @param {string[]} source
 * @return {string[]}
 */
var removeComments = function (source) {
  const res = [];
  let inBlock = false; // 表示当前是否处于块注释中
  let newLine = ""; // 存储当前处理的代码行
  // 遍历每一行，逐行分析
  for (let line of source) {
    const Len = line.length;
    // 遍历当前行的每一个字符
    for (let i = 0; i < Len; i++) {
      // 在块注释中
      if (inBlock) {
        // 退出块注释
        if (line[i] === "*" && line[i + 1] === "/") {
          inBlock = false;
          i++; // 跳过注释结束符
        }
        // 不在块注释中
      } else {
        // 遇到 /* 进入块注释
        if (line[i] === "/" && line[i + 1] === "*") {
          inBlock = true;
          i++; // 跳过注释开始符
        } else if (line[i] === "/" && line[i + 1] === "/") {
          // 遇到行注释，直接忽略该行后面的部分，break
          break;
        } else {
          newLine += line[i]; // 将非注释字符添加到当前处理的代码行中
        }
      }
    }
    // 一行遍历结束，如果不在块注释中 且 当前处理的代码行非空，则将其加入结果数组中，并重置当前处理的代码行
    if (!inBlock && newLine.length > 0) {
      res.push(newLine);
      newLine = "";
    }
  }
  return res; // 返回处理后的代码行数组
};
// 时间复杂度：O(nm)，n 为 source 源码的行数，m 为 source[i] 源码的最长行的长度。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。

// 方法二：正则
// 使用了两个分组，分别匹配//开头和/*开头、*/结尾的字符
//   \/\/.*$ 匹配以//开头的字符，\/\/表示匹配//，.*表示匹配任意字符（除了换行符）零次或多次，$表示匹配行尾。
//   \/\*[\s\S]*?\*\/ 匹配以/*开头、*/结尾的字符，\/\*表示匹配/*，[\s\S]*?表示匹配任意字符（包括换行符）零次或多次，非贪婪模式，\*\/表示匹配*/。
// 使用gm标志可以进行全局匹配（匹配多个结果）和多行匹配（跨行匹配）。
var removeComments = function (source) {
  return source
    .join("\n")
    .replace(/(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm, "")
    .split("\n")
    .filter(Boolean); // 移除数组中的假值元素
};
