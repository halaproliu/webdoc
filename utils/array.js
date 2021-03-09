export function isArrayEqual (arr, expectedArr) {
    let expectedStr = JSON.stringify(expectedArr)
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        let str = JSON.stringify(arr[i])
        sum += Number(!!expectedStr.includes(str))
    }
    return sum === arr.length
}
