// 力扣公司的员工都使用员工卡来开办公室的门。每当一个员工使用一次他的员工卡，安保系统会记录下员工的名字和使用时间。如果一个员工在一小时时间内使用员工卡的次数大于等于三次，这个系统会自动发布一个 警告 。
// 给你字符串数组 keyName 和 keyTime ，其中 [keyName[i], keyTime[i]] 对应一个人的名字和他在 某一天 内使用员工卡的时间。
// 使用时间的格式是 24小时制 ，形如 "HH:MM" ，比方说 "23:51" 和 "09:49" 。
// 请你返回去重后的收到系统警告的员工名字，将它们按 字典序升序 排序后返回。
// 请注意 "10:00" - "11:00" 视为一个小时时间范围内，而 "23:51" - "00:10" 不被视为一小时内，因为系统记录的是某一天内的使用情况。


// 输入：keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"], keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
// 输出：["daniel"]
// 解释："daniel" 在一小时内使用了 3 次员工卡（"10:00"，"10:40"，"11:00"）。


// 输入：keyName = ["alice","alice","alice","bob","bob","bob","bob"], keyTime = ["12:01","12:00","18:00","21:00","21:20","21:30","23:00"]
// 输出：["bob"]
// 解释："bob" 在一小时内使用了 3 次员工卡（"21:00"，"21:20"，"21:30"）。


// 输入：keyName = ["john","john","john"], keyTime = ["23:58","23:59","00:01"]
// 输出：[]


// 输入：keyName = ["leslie","leslie","leslie","clare","clare","clare","clare"], keyTime = ["13:00","13:20","14:00","18:00","18:51","19:30","19:49"]
// 输出：["clare","leslie"]


/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
// 哈希表+排序
// 使用哈希表记录每个员工的全部打卡时间。为了方便后序计算，将使用员工卡的时间转成分钟数。
// 然后遍历哈希表，对于每个员工，我们先判断该员工的打卡次数是否大于等于3次，如果不是，则该员工一定不会收到系统警告，直接跳过。否则，将该员工的所有打卡时间进行生序排序，然后遍历排序后的打卡时间，判断下标距离为 2 的两个时间是否在同一个小时内，如果是，则加入答案数组。最后对答案数组按照字典序排序后返回即可。
var alertNames = function (keyName, keyTime) {
    // step1：构建哈希表 key 为员工名，value 为该员工打卡时间列表
    const n = keyName.length;
    const timeMap = new Map();
    for (let i = 0; i < n; i++) {
        const name = keyName[i];
        const time = keyTime[i];
        if (!timeMap.has(name)) {
            timeMap.set(name, []);
        }
        timeMap.get(name).push(convertTime(time));
    }

    // step2：对每个员工分别判断是否收到系统警告
    // 具体的：将时间列表排序，判断是否存在三个连续的元素，判断下标距离为 2 的两个时间是否在同一个小时内，如果是则加入答案数组。
    const res = [];
    for (let [name, times] of timeMap) {
        const len = times.length;
        if (len < 3) break; // 打卡数不足3次一定不会收到系统警告，直接查看下一个员工打卡情况
        times.sort((a, b) => a - b);
        for (let i = 2; i < len; i++) {
            if (!(times[i] - times[i - 2] > 60)) {
                res.push(name);
                break; // 结果数组需要去重，所以收到系统警告后直接查看下一个员工打卡情况。
            }
        }
    }

    //step3：按 字典序生序 排列后返回
    return res.sort();
};


// 辅助函数 时间格式化函数 HH:MM 转分钟
const convertTime = function (time) {
    const hour = (time[0] * 10 + +time[1]);
    const minutes = time[3] * 10 + +time[4];
    return hour * 60 + minutes;
}
// 时间复杂度：O(nlogn)，n 为数组 keyName 和 keyTime 的长度。对其遍历构建员工所有打卡时间的哈希表，所需的时间复杂度为O(n)。然后判断每个员工是否收到系统警告，需要进行排序和便利的操作，最坏情况下，排序的时间复杂度是O(nlogn)，遍历的时间为O(n)，因此时间复杂度为O(nlogn)。
// 空间复杂度：O(n)，n 为数组 keyName 和 keyTime 的长度。客户复杂度主要取决于哈希表，需要存储所有员工的全部打卡时间。
