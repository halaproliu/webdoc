/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    if (num < 1 || num > 3999) return ''
    function getDictValue (key, value) {
        const dicts = {
            units: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            tens: ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
            hundreds: ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
            throusands: ['M', 'MM', 'MMM']
        }
        return dicts[key][value - 1] || ''
    }
    let mod = 0
    let throusands = ~~(num / 1000)
    mod = num % 1000
    let hundreds = ~~(mod / 100)
    mod = mod % 100
    let tens = ~~(mod / 10)
    mod = mod % 10
    let units = mod
    let result = getDictValue('throusands', throusands) + getDictValue('hundreds', hundreds) + getDictValue('tens', tens) + getDictValue('units', units)
    return result
};

export default intToRoman
