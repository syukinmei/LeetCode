var twoSum = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (nums[left] + nums[right] !== target) {
        if (nums[left] + nums[right] > target) right -= 1;
        if (nums[left] + nums[right] < target) left += 1;
    }

    console.log([left, right]);
    return [left, right];
};
twoSum([1, 3, 6, 7, 9, 10, 14, 15], 13)