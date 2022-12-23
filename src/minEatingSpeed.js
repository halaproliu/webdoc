function minEatingSpeed(piles, h) {
    let left = 1, right = Math.max(...piles)
    let getHours = function(target) {
        let hour = 0
        for(let item of piles) {
            // 这一步很关键，如果用循环一点一点加会超时
            hour += Math.ceil(item / target) 
        }
        return hour
    }
    // 普通的二分
    while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        let hours = getHours(mid)
        if(hours > h) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
}