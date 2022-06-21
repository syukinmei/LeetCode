// 给你一个有效的 IPv4 地址 address，返回这个 IP 地址的无效化版本。

// 所谓无效化 IP 地址，其实就是用 "[.]" 代替了每个 "."。


// 输入：address = "1.1.1.1"
// 输出："1[.]1[.]1[.]1"

// 输入：address = "255.100.50.0"
// 输出："255[.]100[.]50[.]0"

/**
 * @param {string} address
 * @return {string}
 */
// 三种API大法
var defangIPaddr = function (address) {
    // let arr = address.split('.')
    // let str = arr.join('[.]')
    // return str;

    // return address.replace(/\./g, '[.]')

    return address.replaceAll('.', '[.]')
};
// 时间复杂度：O(n)，n 为字符串 address 的长度，需要遍历一次字符串即可。
// 空间复杂度：O(1)。
