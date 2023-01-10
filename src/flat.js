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

Array.prototype.flat = function (depth = Infinity) {
    return this.reduce((prev, next) => {
        if (Array.isArray(next)) {
            if(depth--) {
                return prev.concat(next.flat(depth))
            } else {
                let arr = []
                arr.push(next)
                return prev.concat(arr)
            }
        }
        return prev.concat(next)
    }, [])
}

// console.log([1, 3, 4, [8, 9, [10, 11, [23, 33]]]].flat())

export default flat

