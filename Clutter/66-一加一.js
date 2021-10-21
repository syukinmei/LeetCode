// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
// 你可以假设除了整数 0 之外，这个整数不会以零开头。

// 输入：digits = [1,2,3]
// 输出：[1,2,4]
// 解释：输入数组表示数字 123

// 输入：digits = [4,3,2,1]
// 输出：[4,3,2,2]
// 解释：输入数组表示数字 4321。

// 输入：digits = [0]
// 输出：[1]


/**
 * @param {number[]} digits
 * @return {number[]}
 */

// 该题只需要关注digits的末尾出现了多少个9即可。考虑三种情况
// 一：digits末尾没有9，如p[1,2,3]，末尾数直接加1，得到[1,2,4]并且方法
// 二：digits末尾有若干个9，如[1,9,9],找到末尾开始的第一个不是9的元素并加1，末尾的9全部置0即可，得到[2,0,0]
// 三：digits所有元素都是9，如[9，9]，则需要构造一个长度比digits多1的新数组，将首元素置为1，其余元素为0即可；
// 代码：对digits逆向遍历，每一项加1，判断是否不为10（不满足进制条件），不进制直接返回，进制则元素置为0，最后处理全部为9数组需要加1位的情况

var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) { // 对digits逆向遍历  
        digits[i]++;
        if (digits[i] % 10 !== 0) {
            return digits;
        } else {
            digits[i] = 0;
        }
    }
    // digits = [... new Array(digits.length + 1)].map(_ => 0);
    digits = new Array(digits.length + 1).fill(0);
    digits[0] = 1;
    // digits.unshift(1);
    return digits;
};

console.log(plusOne([1, 2, 3]));
console.log(plusOne([1, 9, 9]));
console.log(plusOne([9, 9]));

// 时间复杂度：O(n),n为数组digits的长度
// 空间复杂度：O(1)，返回值不计入空间复杂度
