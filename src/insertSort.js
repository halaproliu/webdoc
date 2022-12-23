// 插入排序
function insertSort(arr) {
    if (arr.length <= 1) return arr
    for (let i = 0; i < arr.length; i++) {
        let curr = arr[i]
        let j = i
        while(j > 0 && curr < arr[j - 1]) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = curr
    }
    return arr
}