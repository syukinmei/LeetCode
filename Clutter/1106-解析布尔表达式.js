// 给你一个以字符串形式表述的 布尔表达式（boolean） expression，返回该式的运算结果。
// 有效的表达式需遵循以下约定：

//  - "t"，运算结果为 True
//  - "f"，运算结果为 False
//  - "!(expr)"，运算过程为对内部表达式 expr 进行逻辑 非的运算（NOT）
//  - "&(expr1,expr2,...)"，运算过程为对 2 个或以上内部表达式 expr1, expr2, ... 进行逻辑 与的运算（AND）
//  - "|(expr1,expr2,...)"，运算过程为对 2 个或以上内部表达式 expr1, expr2, ... 进行逻辑 或的运算（OR）


// 输入：expression = "!(f)"
// 输出：true

// 输入：expression = "|(f,t)"
// 输出：true

// 输入：expression = "&(t,f)"
// 输出：false

// 输入：expression = "|(&(t,f,t),!(t))"
// 输出：false

// 方法一：栈
// 从左到右遍历表达式 expression ，对于遍历到的每个字符 c：
//  - 如果c 是 "tf!&|" 中的一个（即非 ',()'），对其进行入栈操作。
//  - 如果是 ')'，我们将栈中的 'tf' 元素依此出栈，直到遇到操作符 '!&|'。此过程中我们需要记录出栈字符 t 和 f 的个数。最后根据出栈字符的个数和操作符计算得到新的字符是 t 还是  f ，并将其入栈。
// 遍历完表达式 expression 后，栈中只剩下一个字符 t或f，如果是 t 返回 true ，否则返回 false。
/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function (expression) {
    const stack = [];
    for (let c of expression) {
        if (c !== ',' && c !== '(' && c !== ')') {
            stack.push(c); // 将 'tf!&|' 入栈。
        } else if (c === ')') {
            // 出栈
            let t = 0, f = 0; // 记录这个 () 中 t 和 f的数量。
            while (stack[stack.length - 1] === 't' || stack[stack.length - 1] === 'f') {
                t += stack[stack.length - 1] === 't' ? 1 : 0;
                f += stack[stack.length - 1] === 'f' ? 1 : 0;
                stack.pop(); // 将栈中的 t 和 f 出栈
            }
            const op = stack.pop();
            switch (op) {
                case '!':
                    stack.push(t > 0 ? 'f' : 't');
                    break;
                case '&':
                    stack.push(f > 0 ? 'f' : 't');
                    break;
                case '|':
                    stack.push(t > 0 ? 't' : 'f');
                    break;
                default:
            }
        }
    }
    return stack[0] === 't';
};
// 时间复杂度：O(n)，n 为 布尔表达式 expression 的长度。需要遍历 expression 一次并解析。
// 空间复杂度：O(n)，n 为 布尔表达式 expression 的长度。空间复杂度主要取决于栈的空间开销，栈内字符个数不超过n。
