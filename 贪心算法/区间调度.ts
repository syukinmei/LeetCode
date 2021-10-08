// var eraseOverlapIntervals = function (intervals) {
//     if (intervals.length === 0) {
//         return 0
//     }
//     let sortArray = intervals.sort((a, b) => a[1] - b[1]); // 根据End升序排序

//     let count = 1;

//     let xEnd = sortArray[0][1];

//     for (let item of intervals) {
//         // 注意，这里题目说了区间 [1, 2]和[2, 3] 的边界相互“接触”，但没有相互重叠，所以应该是item[0] >= xEnd

//         if (item[0] >= xEnd) {
//             xEnd = item[1]
//             count++;
//         }
//     }
//     return intervals.length - count;
// }


// var eraseOverlapIntervals = function (intervals) {
//     if (intervals.length === 0)
//         return 0;
//     intervals.sort((a, b) => a[0] - b[0]);

//     let count = 0;
//     let xEnd = intervals[0][1];

//     for (let i = 1; i < intervals.length; i++) {
//         if (intervals[i][0] < xEnd) {
//             // 重叠了，移除一个count+1，更新尾部位置取小的；
//             count++;
//             xEnd = Math.min(xEnd, intervals[i][1]);
//         } else {
//             // 没重叠，更新尾部位置
//             xEnd = intervals[i][1];
//         }
//     }
//     return count;
// }

function intervalSchedule(intvls: number[][]) {
   // 比如intvls = [[1,3], [2,4], [3,6]] 
   // 这些区间最多有两个区间互不相交,即[1,3], [3,6],intervalSchedule函数此时应该返回2
   if (intvls.length === 0) return 0;
}
intervalSchedule([[1, 3], [2, 4], [3, 6]]);
// console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))
// console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))
// console.log(eraseOverlapIntervals([[1, 2], [2, 3]]))