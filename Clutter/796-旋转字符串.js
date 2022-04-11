// 给定两个字符串, s 和 goal。如果在若干次旋转操作之后，s 能变成 goal ，那么返回 true 。
// s 的 旋转操作 就是将 s 最左边的字符移动到最右边。 
//  - 例如, 若 s = 'abcde'，在旋转一次之后结果就是'bcdea' 。

// 输入: s = "abcde", goal = "cdeab"
// 输出: true

// 输入: s = "abcde", goal = "abced"
// 输出: false

// 生成一个字符串 A+A ，它包含了 A 旋转 n 次后的所有结果，该字符串中包含 B ，则说明 B 可以通过A旋转后得到。