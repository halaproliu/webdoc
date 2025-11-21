# 读取指定目录文件

### 方法实现

```js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationPath = path.resolve(__dirname, './src/apis')

// const migrationData = JSON.parse(fs.readFileSync(migrationPath, 'utf8'))
const handleContent = (file) => {
    console.log(file)
}

const readFiles = (currPath, files = []) => {
  const $files = fs.readdirSync(currPath)
  $files.forEach(file => {
    const filePath = path.join(currPath, file)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      readFiles(filePath, files)
    } else {
      files.push(filePath)
    }
  })
  return files
}

const replaceContent = files => {
  for (let currPath of files) {
    console.log(currPath)
    const file = fs.readFileSync(currPath, 'utf8')
    let result = handleContent(file)
    fs.writeFileSync(currPath, result)
  }
}

const files = readFiles(migrationPath)
replaceContent(files)

```