// 为了不在赎金信中暴露字迹，从杂志上搜索各个需要的字母，组成单词来表达意思。
// 给你一个赎金信 (ransomNote) 字符串和一个杂志(magazine)字符串，判断 ransomNote 能不能由 magazines 里面的字符构成。
// 如果可以构成，返回 true ；否则返回 false 。
// magazine 中的每个字符只能在 ransomNote 中使用一次。

// 输入：ransomNote = "a", magazine = "b"
// 输出：false

// 输入：ransomNote = "aa", magazine = "ab"
// 输出：false

// 输入：ransomNote = "aa", magazine = "aab"
// 输出：true

// 提示：
// 1 <= ransomNote.length, magazine.length <= 105
// ransomNote 和 magazine 由小写英文字母组成

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    if (ransomNote.length > magazine.length) return false;
    // 建立字典1
    const mapNote = new Map();
    for (const item of ransomNote) {
        mapNote.set(item, mapNote.has(item) ? mapNote.get(item) + 1 : 1);
    }

    // 建立字典2
    const mapMagazine = new Map();
    for (const item of magazine) {
        mapMagazine.set(item, mapMagazine.has(item) ? mapMagazine.get(item) + 1 : 1);
    }

    // 判断是否包含
    for (const item of mapNote) {
        // 此时有item = ['a', 2] , ['字符', 出现次数]
        if (!mapMagazine.has(item[0]) || mapMagazine.get(item[0]) < item[1]) return false;
    }
    return true;
};
// 时间复杂度：
// 空间复杂度：

// 方法二：API
// 1、遍历赎金信
// 2、判断赎金信每个字符有没有在杂志中出现过
// 3、若出现过，将该字符串删除
// 4、若没有出现过，返回false
// 5、遍历结束返回true
var canConstruct = function (ransomNote, magazine) {
    const len = ransomNote.length;
    for (let i = 0; i < len; i++) {
        // 当前赎金信字符
        const s = ransomNote[i];
        // 如果在杂志没找到，直接返回false
        if (magazine.indexOf(s) === -1) return false;
        // 若找到，将该字符删去
        magazine = magazine.replace(s, '');
    }
    // 遍历完成，还没返回false，就返回true
    return true;
};


// 方法二：字符统计
// 1、根据题意并利用两字符串只包含小写字母，先使用大小为字符集大小的数组（充当哈希表）对 magazinemagazine 进行词频统计，形成计数数组
// 2、遍历 ransomNoteransomNote 对计数数组进行抵消操作
// 3、若处理过程中出现词频数量为负数，则说明 magazinemagazine 不能凑出 ransomNoteransomNote 返回false

var canConstruct = function (ransomNote, magazine) {
    if (ransomNote.length > magazine.length) return false;

    // 建立计数数组
    // 下标1为a ，2为b，。。。，26为z，值为出现的次数
    const cnt = new Array(26).fill(0);
    for (const c of magazine) {
        cnt[c.charCodeAt() - 'a'.charCodeAt()]++;
    }

    for (const c of ransomNote) {
        cnt[c.charCodeAt() - 'a'.charCodeAt()]--;
        if (cnt[c.charCodeAt() - 'a'.charCodeAt()] < 0) return false;
    }
    return true
}
// 时间复杂度：O(m+n)，m是字符串magazine的长度，n是字符串ransomNote的长度，我们只需要遍历两个字符串一次即可
// 空间复杂度：O(|S|)，S是字符集，这道题中S全为小写字母，因此｜S｜= 26。