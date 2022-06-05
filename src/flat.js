var flat = function (arr) {
    let tmpArr = arr.flat(Infinity)
    let uniqArr = Array.from(new Set(tmpArr))
    return uniqArr.sort((a, b) => a - b)
}

var flat1 = function(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flat1(next) : next)
    }, [])
}

// console.log(flat1([1, 3, 4, [8, 9, [10, 11]]]))

export default flat

