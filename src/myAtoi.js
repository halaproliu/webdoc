/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    const number = parseInt(str, 10);
    const INT_MIN = Math.pow(-2, 31)
    const INT_MAX = Math.pow(2, 31) - 1

    if(isNaN(number)) {
        return 0;
    } else if (number < INT_MIN || number > INT_MAX) {
        return number < INT_MIN ? INT_MIN : INT_MAX;
    } else {
        return number;
    }
};

myAtoi = function(str) {
    let INT_MIN = Math.pow(-2, 31)
    let INT_MAX = Math.pow(2, 31) - 1
    let reg = /^[\+|\-)]?\d+/g
    let result = str.trim().match(reg) && str.trim().match(reg)[0]
    return Math.max(Math.min(result, INT_MAX), INT_MIN) || 0
};

myAtoi = function (str) {
    let state = 'start'
    let sign = 1
    let ans = 0
    const table = {
        start: ['start', 'signed', 'in_number', 'end'],
        signed: ['end', 'end', 'in_number', 'end'],
        in_number: ['end', 'end', 'in_number', 'end'],
        end: ['end', 'end', 'end', 'end']
    }
    const INT_MIN = Math.pow(-2, 31)
    const INT_MAX = Math.pow(2, 31) - 1

    function getCol(c) {
        if (' ' === c) return 0
        if ('+' === c || '-' === c) return 1
        if (!isNaN(+c)) return 2
        return 3
    }

    function get(c) {
        state = table[state][getCol(c)]
        if (state === 'in_number') {
            ans = ans * 10 + +c - '0'
        } else if (state === 'signed') {
            sign = c === '+' ? 1 : -1
        }
    }

    let chars = str.split('')
    for (let i = 0; i < chars.length; i++) {
        get(chars[i])
    }
    return Math.max(Math.min(ans * sign, INT_MAX), INT_MIN)
}

export default myAtoi
