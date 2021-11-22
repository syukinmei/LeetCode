// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。


// 输入：s = ["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]

// 输入：s = ["H","a","n","n","a","h"]
// 输出：["h","a","n","n","a","H"]

// 方法一：双指针
// 左指针指向头，右指针指向尾，依次交换，相遇则结束，这时已完成反转
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        // 一、 通过es6的解构赋值交换变量
        [s[left], s[right]] = [s[right], s[left]];

        // 二、 常见的交换数值，引用第三方变量temp
        // let temp = s[left];
        // s[left] = s[right];
        // s[right] = temp;

        // 三、 位运算（异或，两个位相同为0，相异为1）交换数值，利用其自反性 a ^ b ^ b == a^0 == a 的特点，s为字符串数组本题不适用
        // s[left] ^= s[right];
        // s[right] ^= s[left];
        // s[left] ^= s[right];

        // 四、 利用加法运算，s为字符串数组本题不适用
        // s[left] = s[left] + s[right];
        // s[right] = s[left] - s[right];
        // s[left] = s[left] - s[right];

        // 五、 利用减法运算，s为字符串数组本题不适用
        // s[left] = s[left] - s[right];
        // s[right] = s[left] + s[right];
        // s[left] = s[right] - s[left];

        // 六、 数组
        // s[left] = [s[left], s[right]];
        // s[right] = s[left][0];
        // s[left] = s[left][1];

        // 七、 对象
        // s[left] = { 'left': s[left], 'right': s[right] };
        // s[right] = s[left].left;
        // s[left] = s[left].right;

        // 八、 利用运算符优先级，有点诡异
        // 首先执行 s[right] = s[left] ，此时的s[right] 直接得到了 s[left] 的值，然后数组索引让 s[left] 得到 s[right]的值。
        // s[left] = [s[right], s[right] = s[left]][0];

        left++;
        right--;
    }
};
// 时间复杂度：O(n)，n为字符串数组s的长度。一共执行了n/2次的交换。
// 空间复杂度：O(1)。只需要常数的空间存放若干变量。