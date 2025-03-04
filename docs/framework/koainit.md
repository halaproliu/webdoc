# 搭建Koa+TypeScript服务端项目

### 方法一

1. 初始化项目并安装依赖：

```js
mkdir my-project && cd my-project

npm init -y
npm install typescript @babel/core @babel/cli @babel/preset-env @babel/preset-typescript @babel/node nodemon @types/koa @types/koa__router --save-dev
npm install koa @koa/router --save
```

or

```js
yarn init -y
yarn add typescript @babel/core @babel/cli @babel/preset-env @babel/preset-typescript @babel/node nodemon @types/koa @types/koa__router -D
yarn add koa @koa/router
```

2. 在项目根目录下创建 tsconfig.json 文件，配置 TypeScript 编译选项：

```js
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "esModuleInterop": true,
    "outDir": "dist",
    "strict": true,
    "moduleResolution": "node",
    "sourceMap": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

3. 在项目根目录下创建 .babelrc 文件，配置 Babel：

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}

```

4. 在项目根目录下创建 nodemon.json 文件，配置 Nodemon：

```js
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": [],
  "exec": "babel-node src/index.ts"
}

```

5. 修改 package.json 文件，添加以下脚本：

```js
{
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && babel src --out-dir dist --extensions '.ts'",
    "start": "node dist/index.js"
  }
}

```

6. 在 src 目录下创建 index.ts 文件，编写 Koa 应用程序代码：

```js
import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());

export default app;

```

7. 运行应用程序

```js
npm run dev

```

以上步骤会使用 TypeScript 编译 TypeScript 代码，并使用 Babel 将编译后的 JavaScript 代码转换成支持 ECMAScript 新特性的代码。同时，使用 Nodemon 监听代码变化，并在开发过程中自动重启应用程序。


### 方法二

以下是使用 TypeScript 和 Koa 搭建项目的步骤：

1. 初始化项目并安装依赖：


```js
mkdir my-project && cd my-project
npm init -y
npm install typescript ts-node @types/koa @types/koa__router --save-dev
npm install koa @koa/router
```

or

```js
npm init -y
yarn add typescript ts-node -D
yarn add koa @koa/router
```

2. 在项目根目录下创建 tsconfig.json 文件，配置 TypeScript 编译选项：


```js
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "esModuleInterop": true,
    "outDir": "dist",
    "strict": true,
    "moduleResolution": "node",
    "sourceMap": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

3. 在项目根目录下创建 src/index.ts 文件，编写 Koa 应用程序代码：

```js
import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

4. 修改 package.json 文件，添加以下脚本：

```js
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

5. 运行应用程序：

```js
npm run dev
```

以上步骤会使用 TypeScript 编译代码，并使用 ts-node 运行 TypeScript 代码，从而支持在 Koa 中使用 TypeScript。

### 添加eslint支持

1. 安装依赖

```js
npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

or

```js
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. 在项目根目录添加.eslintrc.js

```js
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};

```

3. 在项目根目录添加.prettierrc.js

```js
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};

```

自此eslint+prettier代码规范配置完成。

### eslint插件不生效

如果是项目eslint配置不在根目录，可以通过如下配置

```js
// mac
快捷键command + shift + p -> Preferences: Open Workspace Settings(JSON)

// windows
快捷键ctrl + shift + p -> Preferences: Open Workspace Settings(JSON)
```

输入

```js
{
  "eslint.workingDirectories": ["项目目录", "项目目录"]
}

or

// 如项目在packages目录下的server目录
{
  "eslint.workingDirectories": [{"pattern": "packages/*"}]
}
```