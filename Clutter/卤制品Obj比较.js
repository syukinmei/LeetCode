// 输入：｛a：2，b：3｝｛a：1，b：6｝ 我想要得到｛a：2，b：6｝

/**
 * 
 * @param {*} objA 
 * @param {*} objB 
 * @returns 
 */
var greaterObjset = function (objA, objB) {
    const resObj = {};
    for (const key in objA) {
        resObj[key] = objA[key] > objB[key] ? objA[key] : objB[key];
    }
    return resObj;
}


const objA = {
    a: 1,
    b: 2,
    c: 3,
}
const objB = {
    a: 3,
    b: 4,
    c: 1,
}
console.log(greaterObjset(objA, objB));

// 时间复杂度：O(n)，n为 Object.keys(objA) 的长度，需要遍历对象的每一个键值对并比较。
// 空间复杂度：O(1)，，返回值不计入空间复杂度。