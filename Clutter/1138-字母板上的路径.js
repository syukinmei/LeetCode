// 我们从一块字母板上的位置 (0, 0) 出发，该坐标对应的字符为 board[0][0]。
// 在本题里，字母板为board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]，如下所示。

// [a, b, c, d, e]
// [f, g, h, i, j]
// [k, l, m, n, o]
// [p, q, r, s, t]
// [u, v, w, x, y]
// [z]

// 我们可以按下面的指令规则行动：

//  - 如果方格存在，'U' 意味着将我们的位置上移一行；
//  - 如果方格存在，'D' 意味着将我们的位置下移一行；
//  - 如果方格存在，'L' 意味着将我们的位置左移一列；
//  - 如果方格存在，'R' 意味着将我们的位置右移一列；
//  - '!' 会把在我们当前位置 (r, c) 的字符 board[r][c] 添加到答案中。

// （注意，字母板上只存在有字母的位置。）
// 返回指令序列，用最小的行动次数让答案和目标 target 相同。你可以返回任何达成目标的路径。

// 输入：target = "leet"
// 输出："DDR!UURRR!!DDD!"

// 输入：target = "code"
// 输出："RR!DDRR!UUL!R!"



/**
 * @param {string} target
 * @return {string}
 */
// 模拟
// 两个字符之间的最短距离即等于二者在画板中坐标的曼哈顿距离
// 假设两个字符 a，b 在画板中的位置分别为 (xa, ya)，(xb, yb)。当前处在字符 a 处，需要移动到字符 b 处，此时只需要先上下移动 ｜xa-xb｜ 个位置，再左右移动 ｜ya-yb｜ 个位置，再执行一次添加操作 ! 即可完成字符 b 的添加。
// 例外情况是，字符 z 所在的行只有一列。
//  - 要从字符 z 到其他字符必须先向上移动
//  - 而从其他字符到字符 z 必须先向左移动。
//  - 而其他字符之间移动无需关系顺序。
// 综上所述，为了保证普遍性，每次移动时先保证选择上移和左移即可。
var alphabetBoardPath = function (target) {
    let x = 0, y = 0; // 初始化 (x, y) 从 (0, 0) 开始。
    let res = ''; // 结果
    for (let i = 0; i < target.length; i++) {
        const c = target[i];
        const nx = Math.floor((c.charCodeAt() - 'a'.charCodeAt()) / 5); // 当前字母所在行数
        const ny = Math.floor((c.charCodeAt() - 'a'.charCodeAt()) % 5); // 当前字母所在列数
        // 上移
        if (nx < x) {
            for (let j = 0; j < x - nx; j++) {
                res += 'U';
            }
        }
        // 左移
        if (ny < y) {
            for (let j = 0; j < y - ny; j++) {
                res += 'L';
            }
        }
        // 下移
        if (nx > x) {
            for (let j = 0; j < nx - x; j++) {
                res += 'D';
            }
        }
        // 右移
        if (ny > y) {
            for (let j = 0; j < ny - y; j++) {
                res += 'R';
            }
        }
        // 移动结束，添加！、更新 (x,y) 坐标
        res += '!';
        x = nx;
        y = ny;
    }
    return res;
};
// 时间复杂度：O(n*(R+C))，n 为字符串 target 的长度，R 表示字母板的行数，C 表示字母板的列数，本题分别为 6 和 5。每次移动到新字符生成移动指令时，需要的时间复杂度为 R+C，一共生成指令 n 次，因此总的时间复杂度为 O(n*(R+C))。
// 空间复杂度：O(1)，只需要常数的空间存放若干变量。
