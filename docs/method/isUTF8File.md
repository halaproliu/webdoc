# JS实现判断文件是否是UTF8编码

```js
const isUTF8 = async (file: File) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = (e: any): void => {
      const content = e.target.result;
      const encodingRight = content.indexOf('') === -1;

      if (encodingRight) {
        resolve(encodingRight);
      } else {
        reject(new Error('编码格式错误，请上传 UTF-8 格式文件'));
      }
    };

    reader.onerror = () => {
      reject(new Error('文件内容读取失败，请检查文件是否损坏'));
    };
  });
};
```