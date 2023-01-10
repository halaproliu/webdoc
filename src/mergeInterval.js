/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0])
    const ret = []
    for (let i = 0; i < intervals.length; i++) {
        //用cur代表当前区间
        let cur = intervals[i]
        //如果ret数组为空或者ret数组中最后一个区间的右边界小于当前区间的左边界，将当前区间加入到ret数组中
        if (ret.length === 0 || ret.at(-1)[1] < cur[0]) {
            ret.push(cur)
        } else {
            //如果ret数组中最后一个区间的右边界大于等于当前区间的左边界，说明两者有重叠，这时候要对ret数组中最后一个区间的右边界进行修改
            ret.at(-1)[1] = Math.max(ret.at(-1)[1], cur[1])
        }
    }
    return ret
};