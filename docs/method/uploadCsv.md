# 前端使用JavaScript导入csv

### 第三方库

可以使用第三方插件库[sheetjs](https://github.com/sheetjs/sheetjs),具体实现如下：

```js
function readFile () {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e) => {
            resolve(e)
        }
        reader.onerror = e => {
            reject(e)
        }
        if (type === 'text') {
          reader.readAsText(file)
        } else if (type === 'binary') {
          reader.readAsBinaryString(file)
        } else {
          reader.readAsArrayBuffer(file)
        }
    })
}
```

```js
async function getData (file) {
    const e = await readFile(file)
    let out = {}
    let headers = {}
    // 读取文件数据
    let e = await readFile(file.raw, 'text')
    let data = e.target.result
    // 读取excel数据
    let workbook = window.XLSX.read(data, { type: 'array', raw: true, codepage: 936 })
    // 读取所有sheet数据
    workbook.SheetNames.forEach(n => {
        out[n] = window.XLSX.utils.sheet_to_json(workbook.Sheets[n], { cellDates: true, raw: true })
        // 以横向方式读取数据，第一行为标题数组
        headers[n] = window.XLSX.utils.sheet_to_json(workbook.Sheets[n], { header: 1, cellDates: true, raw: true })
    })
    // 获取第一个sheet的数据
    let sheetName = workbook.SheetNames[0]
    arr = out[sheetName] // 所有数据
    header = header[sheetName]
}
```

> 使用以上代码发现读取utf-8格式的csv文件后，中文乱码，于是修改为以下代码遂解决问题。

```js
async function getData (file) {
    const e = await readFile(file)
    let out = {}
    let headers = {}
    // 读取文件数据
    let e = await readFile(file.raw, 'text')
    let data = e.target.result
    let buf = new Uint8Array(data)
    // utf8格式的文件读取中文会乱码，添加BOM，使其格式变为utf-8 with bom
    let blob = new Blob(['\ufeff' + data], { type: 'text/csv; charset=utf-8' })
    e = await readFile(blob)
    data = e.target.result
    // 读取excel数据
    let workbook = window.XLSX.read(data, { type: 'array', raw: true, codepage: 936 })
    // 读取所有sheet数据
    workbook.SheetNames.forEach(n => {
        out[n] = window.XLSX.utils.sheet_to_json(workbook.Sheets[n], { cellDates: true, raw: true })
        // 以横向方式读取数据，第一行为标题数组
        headers[n] = window.XLSX.utils.sheet_to_json(workbook.Sheets[n], { header: 1, cellDates: true, raw: true })
    })
    // 获取第一个sheet的数据
    let sheetName = workbook.SheetNames[0]
    arr = out[sheetName] // 所有数据
    header = header[sheetName]
}
```