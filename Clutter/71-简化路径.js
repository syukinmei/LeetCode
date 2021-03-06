// 给你一个字符串 path ，表示指向某一文件或目录的 Unix 风格 绝对路径 （以 '/' 开头），请你将其转化为更加简洁的规范路径。
// 在 Unix 风格的文件系统中，一个点（.）表示当前目录本身；此外，两个点 （..） 表示将目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。任意多个连续的斜杠（即，'//'）都被视为单个斜杠 '/' 。 对于此问题，任何其他格式的点（例如，'...'）均被视为文件/目录名称。
// 请注意，返回的 规范路径 必须遵循下述格式：
// 始终以斜杠 '/' 开头。
// 两个目录名之间必须只有一个斜杠 '/' 。
// 最后一个目录名（如果存在）不能 以 '/' 结尾。
// 此外，路径仅包含从根目录到目标文件或目录的路径上的目录（即，不含 '.' 或 '..'）。
// 返回简化后得到的 规范路径 。

// 输入：path = "/home/"
// 输出："/home"
// 解释：注意，最后一个目录名后面没有斜杠。 

// 输入：path = "/../"
// 输出："/"
// 解释：从根目录向上一级是不可行的，因为根目录是你可以到达的最高级。

// 输入：path = "/home//foo/"
// 输出："/home/foo"
// 解释：在规范路径中，多个连续斜杠需要用一个斜杠替换。

// 输入：path = "/a/./b/../../c/"
// 输出："/c"


/**
 * @param {string} path
 * @return {string}
 */
// 方法一：栈
// 思路：
// 用 / 将路径分割为路径数组，创建一个栈，遍历路径数组。
// 路径数组的有可能为 '' 、 '.' 、 '..' 、 'pathnamexxx'。
// 如果是遇到 '' 、 '.'，一个没有任何含义，一个表示当前目录本身，我们无需切换目录，则直接跳过。
// 如果是'..'，则查看栈是否有值，若有值，因为是返回上一目录需要出栈，若无值，表示已经是根目录操作无效。
// 其他情况就是目录名称 'pathnamexxx' 需要入栈。
// 最后得到目录名称组合的数组，用 / 拼接字符串，首部添加 / 表示根目录后返回。
var simplifyPath = function (path) {
    const pathArr = path.split('/');
    const stack = [];
    for (const pathName of pathArr) {
        if (pathName === '' || pathName === '.') {
            continue;
        } else if (pathName === '..') {
            if (stack.length !== 0) stack.pop();
        } else {
            stack.push(pathName);
        }
    }
    return '/' + stack.join('/');
};
// 时间复杂度：O(n)，n为字符串 path 的长度。
// 空间复杂度：O(n)，n为数组 pathArr 的长度，我们需要存储pathArr中的所有字符串