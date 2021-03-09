/**
 * @param {number} x
 * @return {boolean}
 */
var violence = function(x) {
    let tmp = x + ''
    let arr = tmp.split('')
    return +arr.reverse().join('') === x
};

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let rev = 0;
    while (rev < x) {
        rev = rev * 10 + x % 10;
        x = ~~(x / 10);
    }
    return (rev === x) || (~~(rev / 10) === x)
};

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

    if(x < 0) return false;
    let flag = true;
    x = x.toString()

    for(let i=0, len = x.length; i < len/2; i++){
        if(x[i] !== x[len - 1 - i]){
            flag = false;
            break
        }
    }
    return flag
};


export {
    violence,
    isPalindrome
}
