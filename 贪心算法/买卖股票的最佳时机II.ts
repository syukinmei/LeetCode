// 输入: prices = [7,1,5,3,6,4]
// 输出: 7
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

function maxProfit(prices: number[]): number {
    let profit: number = 0;
    for (let i: number = 0; i < prices.length - 1; i++) {
        if (prices[i] < prices[i + 1])
            profit += prices[i + 1] - prices[i];
    }
    return profit;
};