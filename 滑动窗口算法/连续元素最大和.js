// 题目：连续元素最大和
/*
    Input: [-3,3,1,-3,2,4,7],n=3
    Output: 13
*/

console.log(maxSumSub([-3, 3, 1, -3, 2, 4, 7], n = 3));

// 暴力解法

/* function maxSumSub(arr, n) {
    let maxSum = 0;

    if (n > arr.length) {
        return arr;
    }

    for (let i = 0; i + n - 1 < arr.length; i++) {
        let tempSum = arr[i];
        for (let j = 1; j < n; j++) {
            tempSum += arr[i + j];
        }
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
} */





// 滑动窗口算法

function maxSumSub(arr, n) {
    let maxSum = 0;

    if (n > arr.length) {
        return arr;
    }

    // 定义窗口并确定值
    for (let i = 0; i < n; i++) {
        maxSum += arr[i];
    }
    let windowSum = maxSum;

    // 窗口逻辑
    for (let i = n; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - n];
        maxSum = Math.max(maxSum, windowSum);
    }
    // let i = n;
    // while (i < arr.length) {
    //     windowSum += arr[i] - arr[i - n];
    //     maxSum = Math.max(maxSum, windowSum);
    //     i++;
    // }

    return maxSum
}

