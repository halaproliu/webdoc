var flat = function (arr) {
    let tmpArr = arr.flat(Infinity)
    let uniqArr = Array.from(new Set(tmpArr))
    return uniqArr.sort((a, b) => a - b)
}

export default flat
