// 网站域名 "discuss.leetcode.com" 由多个子域名组成。顶级域名为 "com" ，二级域名为 "leetcode.com" ，最低一级为 "discuss.leetcode.com" 。当访问域名 "discuss.leetcode.com" 时，同时也会隐式访问其父域名 "leetcode.com" 以及 "com" 。
// 计数配对域名 是遵循 "rep d1.d2.d3" 或 "rep d1.d2" 格式的一个域名表示，其中 rep 表示访问域名的次数，d1.d2.d3 为域名本身。
// 例如，"9001 discuss.leetcode.com" 就是一个 计数配对域名 ，表示 discuss.leetcode.com 被访问了 9001 次。
// 给你一个 计数配对域名 组成的数组 cpdomains ，解析得到输入中每个子域名对应的 计数配对域名 ，并以数组形式返回。可以按 任意顺序 返回答案。


// 输入：cpdomains = ["9001 discuss.leetcode.com"]
// 输出：["9001 leetcode.com","9001 discuss.leetcode.com","9001 com"]
// 解释：例子中仅包含一个网站域名："discuss.leetcode.com"。
// 按照前文描述，子域名 "leetcode.com" 和 "com" 都会被访问，所以它们都被访问了 9001 次。

// 输入：cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
// 输出：["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
// 解释：按照前文描述，会访问 "google.mail.com" 900 次，"yahoo.com" 50 次，"intel.mail.com" 1 次，"wiki.org" 5 次。
// 而对于父域名，会访问 "mail.com" 900 + 1 = 901 次，"com" 900 + 50 + 1 = 951 次，和 "org" 5 次。


/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
// 方法一：哈希表
// 每个计数配对域名的格式都 "rep d1.d2.d3" 或 "rep d1.d2" 子域名的计数如下：
//  - 对于 "rep d1.d2.d3"，有三个子域名 "d1.d2.d3" 、 "d2.d3" 、 "d3"，每个子域名各被访问了 rep 次；
//  - 对于 "rep d1.d2"，有两个子域名 "d1.d2" 、 "d3"，每个子域名各被访问了 rep 次；
// 为了获得每个子域名的计数配对域名，需要使用哈希表记录每个子域名的计数。
// 遍历数组 cpdomains ，对于每个计数配对域名，获得计数和完整域名，更新哈希表中的每个子域名的访问次数。
// 遍历哈希表 counts ，哈希表中的每个键值对，key是域名，value是计数，将计数和域名拼接得到计数配对域名，添加到答案集ans中。
var subdomainVisits = function (cpdomains) {
    const ans = [];
    const counts = new Map();
    for (const cpdomain of cpdomains) {
        const [count, domain] = cpdomain.split(' ');
        counts.set(domain, (counts.get(domain) || 0) + parseInt(count));
        for (let i = 0; i < domain.length; i++) {
            if (domain[i] === '.') {
                const subDomain = domain.slice(i + 1);
                counts.set(subDomain, (counts.get(subDomain) || 0) + parseInt(count));
            }
        }
    }
    for (const [subDomain, count] of counts.entries()) {
        ans.push(count + ' ' + subDomain);
    }
    return ans;
};
// 时间复杂度：O(L)，L 为数组 cpdomains 中所有字符串长度之和。遍历数组中所有的计数配对域名，计算每个子域名的计数需要O(L)的时间。遍历哈希表需要O(L)的时间。
// 空间复杂度：O(L)，L 为数组 cpdomains 中所有字符串长度之和。构建哈希表需要O(L)的空间。

