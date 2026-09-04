# AGENTS 系统提示词（rms）

本提示词供智能代理/协作开发者使用，语言默认为中文，输出保持简洁、结构化清单风格。若有不确定的业务名、路由或接口，先查阅本仓库对应文件再提问。

## 任务说明与执行方式
- 接收需求时，以“目标、范围、约束、验证”四项为准：明确要达成的结果、允许修改的文件或模块、兼容性/依赖/安全限制，以及可执行的验收方式。
- 优先使用用户提供的原始上下文：点名的文件、完整报错、复现步骤、截图和接口样例；不要以二手概述替代可直接读取的材料。
- 信息不足时，先在仓库内定位相关实现、调用方和现有测试；仍无法确定时，提出具体问题，说明缺少的是哪一项（目标、范围、约束或验证）。
- 小且边界清楚的任务可直接实施。跨模块、影响不明确或涉及架构调整的任务，先说明拟修改的文件、方案与验证方式，获得确认后再实施。
- 每次变更只覆盖当前目标；不擅自引入依赖、调整无关代码、改变既有接口或扩大修改范围。需要扩大范围时，先说明原因和影响。
- 完成前执行与改动相匹配的验证，并报告实际执行的命令和结果；若验证受阻，明确说明未验证项、原因及风险，不将“看起来可行”视为完成。

## 项目概览
- 主应用：Vue 2 + qiankun 微前端壳，入口 `src/main.js`，容器 `#mainApp`，子应用挂载容器 `#microApp`。
- 路由：`vue-router` history 模式，配置入口 `src/router/index.js`，路由清单 `src/router/allRoutes.js`，前置守卫在 `src/router/interceptor/authority`。
- 微前端配置：`src/config/microAppConfig.js` 按环境提供各子应用域名（不要在沟通中写出具体域名/密钥）。
- 状态与组件：`vuex`（`src/store`）、UI 组件库 Element-UI、Vant、VocUI；可选 ECharts、axios、dayjs 等。
- 构建工具：Vue CLI 4，配置可查看根目录 `vue.config.js`。

## 关键目录/文件速览
- `src/config`：环境与微前端配置。
- `src/router`：路由定义与拦截器。
- `src/views` / `src/components`：页面与可复用组件。
- `src/utils` / `src/helpers` / `src/mixins`：工具与混入。
- `src/styles`：全局样式。
- `src/assets/imgs/icon`: 图标文件。
- `cypress/`：端到端测试。
- 根目录 `.env.development` / `.env.fat` / `.env.uat` / `.env.prod`：环境变量占位（勿泄露具体值）。
- `cdnUrls.json`：CDN 相关配置参考。

## 常用命令（pnpm）
- 安装依赖：`pnpm install`
- 本地启动：`pnpm run serve`
- 构建：`pnpm run build:fat` | `pnpm run build:uat` | `pnpm run build:prod`
- 代码检查：`pnpm run lint`
- 端到端测试：`pnpm run e2e`（或 `e2e:chrome` / `e2e:edge` / `e2e:firefox` / `e2e:fat` / `e2e:prod`）
- 构建报告：`pnpm run analyze`

## 质量与规范
- ESLint：`plugin:vue/essential` + `eslint:recommended`，解析器 `babel-eslint`。提交前确保无 lint 报错。
- Husky：`pre-commit` 自动执行 `pnpm run lint`，不要跳过。
- 保持 `pnpm-lock.yaml` 与依赖一致；避免直接改动生成/构建产物。
- 保留已有 `.prettierrc` 与 `browserslist` 要求，确保浏览器兼容性。
- 所有新生成页面css使用BEM规范
- 遵循现有代码风格。
- 不做无关重构。
- 重复代码抽取通用代码或者变量，如多处文件重复，可提取变量到单独文件。

## 路由页面布局
- 所有由 `src/components/layouts/Basic.vue` 中 `<router-view class="child-view" />` 加载的路由页面，最外层根节点必须使用以下布局样式，使页面内容与顶部 `voc-header-new` 的左右边界对齐：

```scss
margin: 0 auto;
width: 100%;
height: 100%;
box-sizing: border-box;
padding: 3.75rem 1rem 1rem;
display: flex;
justify-content: center;
```

- 页面根节点在此基础上继续使用页面自身的 BEM Block；不得通过修改 `Basic.vue`、`child-view` 或顶部导航组件来实现单页对齐。
- 页面内容 Header 必须使用 `display: flex`、两端对齐和自动换行，并在 PC 状态固定于距顶部 `50px` 的位置；背景色固定为 `#eff1f9`，支持阴影状态。页面 BEM 命名时，将原型中的 `.pc`、`.shadow` 分别改为 `__header--pc`、`__header--shadow`：

```scss
&__header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px 16px 0;
  width: 100%;
  box-sizing: border-box;
  background: #eff1f9;
  transition: box-shadow 0.3s;

  &--shadow {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &--pc {
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 999;
  }
}
```

## 测试与验证
- 最低要求：本地 `pnpm run lint`。
- 影响路由或微前端注册时：至少运行 lint + 任一浏览器的 `pnpm run e2e:<browser>`。
- 产出报告：如需体积分析，使用 `pnpm run analyze`。

## 微前端约束
- 子应用注册在 `src/main.js`，`activeRule` 与路由前缀保持一致。
- `prefetch=false`，使用 `fetchCSSDecorator(window.fetch)`；不要移除，避免样式隔离问题。
- 开发模式启用 Vue devtools 钩子，生产环境保持默认。

## 环境与安全
- 仅说明存在 `.env.*` 文件，避免写出域名、密钥、BasicAuth 等敏感信息；示例用占位符 `<ENV_VALUE>`。
- 若需讨论域名，请用“dev/fat/uat/prod 环境域名见 microAppConfig 配置”描述，不贴真实值。
- 修改公用组件前，先检查是否有其他页面在引用，避免破坏全局样式。

## 与代理协作的输出风格
- 语气简洁直接；默认中文；优先提供步骤清单、命令、文件路径。
- 若信息不足：先查 `src/router`、`src/config` 等源后再提问；提问应具体、可操作。
- 默认假设使用 pnpm；如用户要求其他包管理器需明确说明差异。

## .agents 指令索引
- UI 设计稿与实际页面视觉走查：`.agents/ui-visual-review-prompt.md`。
- Vue 页面结构生成：`.agents/page-structure-prompt.md`。
- 公共组件复用：`.agents/component-usage-prompt.md`。
- 任务命中上述场景时，先读取对应指令文件，再执行后续工作；用户明确指定的指令文件优先。

## 待办与假设
- 团队统一使用 pnpm；未采用约定式提交工具（后续可补）。
- 质量规范优先于快速启动说明；安全性高于信息完整度。
