/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    const n = gas.length;
    let i = 0;
    while (i < n) {
        let sumOfGas = 0, sumOfCost = 0;
        let cnt = 0;
        while (cnt < n) {
            const j = (i + cnt) % n;
            sumOfGas += gas[j];
            sumOfCost += cost[j];
            if (sumOfCost > sumOfGas) {
                break;
            }
            cnt++; // 右移一步
        }
        if (cnt === n) {
            return i; // 到达终点说明可以环行一周返回位置
        } else {
            i = i + cnt + 1; // 从中断的位置为起点重新开始
        }
    }
    return -1;
};

let gas = [1,2,3,4,5], cost = [3,4,5,1,2]
canCompleteCircuit(gas, cost)