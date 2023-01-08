// 归并排序
function mergeSort(arr) {
    if (arr.length < 2) return arr
    let pivotIndex = Math.floor(arr.length / 2)
    let left = arr.slice(0, pivotIndex)
    let right = arr.slice(pivotIndex)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    const result = []
    while(left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while(left.length) result.push(left.shift())
    while(right.length) result.push(right.shift())
    return result
}