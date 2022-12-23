// 选择排序
function selectionSort(arr) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        let tmp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = tmp
    }
    return arr
}