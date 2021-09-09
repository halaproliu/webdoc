# 判断是否是utf8数据

```js
function isUTF8(bytes) {
  var i = 0
  while (i < bytes.length) {
    if ( // 是否是ASCII
      bytes[i] === 0x09 ||
      bytes[i] === 0x0a ||
      bytes[i] === 0x0d ||
      (bytes[i] >= 0x20 && bytes[i] <= 0x7e)
    ) {
      i += 1
      continue
    }
    if ( // non-overlong 2-byte
      bytes[i] >= 0xc2 &&
      bytes[i] <= 0xdf &&
      (bytes[i + 1] >= 0x80 && bytes[i + 1] <= 0xbf)
    ) {
      i += 2
      continue
    }

    if (
      // excluding overlongs
      (bytes[i] === 0xe0 &&
        (bytes[i + 1] >= 0xa0 && bytes[i + 1] <= 0xbf) &&
        (bytes[i + 2] >= 0x80 && bytes[i + 2] <= 0xbf)) || // straight 3-byte
        (((bytes[i] >= 0xe1 && bytes[i] <= 0xec) || bytes[i] === 0xee || bytes[i] === 0xef) &&
        (bytes[i + 1] >= 0x80 && bytes[i + 1] <= 0xbf) &&
        (bytes[i + 2] >= 0x80 && bytes[i + 2] <= 0xbf)) || // excluding surrogates
        (bytes[i] === 0xed &&
        (bytes[i + 1] >= 0x80 && bytes[i + 1] <= 0x9f) &&
        (bytes[i + 2] >= 0x80 && bytes[i + 2] <= 0xbf))
    ) {
      i += 3
      continue
    }

    if (
    // planes 1-3
      (bytes[i] === 0xf0 &&
      (bytes[i + 1] >= 0x90 && bytes[i + 1] <= 0xbf) &&
      (bytes[i + 2] >= 0x80 && bytes[i + 2] <= 0xbf) &&
      (bytes[i + 3] >= 0x80 && bytes[i + 3] <= 0xbf)) || // planes 4-15
      (bytes[i] >= 0xf1 && bytes[i] <= 0xf3 &&
      (bytes[i + 1] >= 0x80 && bytes[i + 1] <= 0xbf) &&
      (bytes[i + 2] >= 0x80 && bytes[i + 2] <= 0xbf) &&
      (bytes[i + 3] >= 0x80 && bytes[i + 3] <= 0xbf)) || // plane 16
      (bytes[i] === 0xf4 &&
      (bytes[i + 1] >= 0x80 && bytes[i + 1] <= 0x8f) &&
      (bytes[i + 2] >= 0x80 && bytes[i + 2] <= 0xbf) &&
      (bytes[i + 3] >= 0x80 && bytes[i + 3] <= 0xbf))
    ) {
      i += 4
      continue
    }
    return false
  }
  return true
}

export default isUTF8
```