# 通过身份号解析信息

```js
/**
 * @description: 通过身份证号获取出生日期
 * @param {string} idcard
 * @return {*}
 */
export const getBirthdate = (idcard: string) => {
    return idcard.substring(6, 14);
}

/**
 * @description: 根据身份证号获取出生年份
 * @param {string} idcard
 * @return {*}
 */
export const getBirthYear = (idcard: string) => {
    return idcard.substring(6, 10);
}

/**
 * @description: 根据身份证号获取出生月份
 * @param {string} idcard
 * @return {*}
 */
export const getBirthMonth = (idcard: string) => {
    return idcard.substring(10, 12);
}

/**
 * @description: 根据身份证号获取出生日
 * @param {string} idcard
 * @return {*}
 */
export const getBirthDay = (idcard: string) => {
    return idcard.substring(12, 14);
}

/**
 * @description: 通过身份证号获取性别
 * @param {string} idcard
 * @return {*} 1: 男 2: 女
 */
export const getGender = (idcard: string) => {
    const genderCode = parseInt(idcard.substring(16, 17));
    return genderCode % 2 === 0 ? 2 : 1;
}
```