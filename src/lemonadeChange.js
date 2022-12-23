// 柠檬水找零（贪心）
function lemonadeChange(bills) {
    let five = 0
    let ten = 0
    for (let bill of bills) {
        if (bill === 5) {
            five += 1
        } else if (bill === 10) {
            if (five === 0) return false
            five -= 1
            ten += 1
        } else {
            if (five > 0 && ten > 0) {
                five -= 1
                ten -= 1
            } else if (five >= 3) {
                five -= 3
            } else {
                return false
            }
        }
    }
    return true
}