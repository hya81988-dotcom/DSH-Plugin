# 君の名はdsh · 界面主题

《你的名字。》主题的 DeepSeek Harness 客户端插件。当前版本 **1.2.1**。

此包只负责对话界面的楼梯背景、侧栏彗星与湖景、编织结绳和毛玻璃输入框，**不加载或播放启动视频**。启动动画已拆成独立的 `dsh-your-name-startup` 包，两个包可以分别启停。

## 当前功能

- 楼梯主背景、冷蓝湖景与断续湖岸灯火、侧栏彗星、Logo 编织结绳和毛玻璃输入框。
- 弹窗、文件卡片和代码卡片采用深蓝底色与浅色文字；删除按钮及增删标记保持各自的语义颜色，浅色实心按钮使用深色文字。
- 支持直接挂在 body 的原生弹窗、运行中新增节点和停用还原。
- 原生侧栏折叠按钮保持宿主定位，结绳与流苏完整显示。
- 插件列表使用双彗星与红色结绳 SVG 图标，通过 package.json 的 icon 和 ./icon 导出声明加载，停用时仍可显示。

## 安装与升级

1. 完全退出 DSH，包括托盘。
2. 将本目录全部内容覆盖到原来的 `D:\dsh-plugins\君の名はdsh`。不要把整层同名目录再放进原目录；根目录应直接存在 `package.json` 与 `lib`。
3. 本包保留原来的包标识 `dsh-your-name-theme` 和 Cordis 条目 `your-name-startup-theme`，用于原位升级；此条目现在仅负责界面主题。
4. 需要动画时，再安装独立启动动画包。两个包都安装后，设置 → 插件中会出现两个独立的项目。

如果插件清单仍显示旧描述，或原安装以复制方式保存到 profile，请重新添加本目录并完整重启：

```powershell
dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh"
```

Web 用户将 `desktop` 改成实际使用的 `web` profile。不需要 npm install，不需要构建；`lib` 已包含可直接加载的入口。

## 独立开关

| 界面主题 | 启动动画 | 效果 |
| --- | --- | --- |
| 开 | 关 | 直接进入《你的名字。》主题界面 |
| 关 | 开 | 播放动画后进入 DSH 当前使用的界面 |
| 开 | 开 | 播放动画后渐隐进入本主题 |
| 关 | 关 | 使用 DSH 当前其他配置 |

本主题不会修改宿主的浅色/深色偏好属性或关闭其他插件。停用时撤销自身变量、样式、DOM 和适配标记，恢复宿主原有配色。完整皮肤之间仍可能有样式竞争，请只选择一个界面皮肤；启动动画包可以单独搭配其他皮肤。

## 源码与构建

- `src/config.js`：主题、素材 URL 与 DSH 选择器/CSS 模块适配配置。
- `src/runtime.js`：独立生命周期、DSHAdapter、资源回收。与动画包共用实现，但构建时固定组件职责，不能通过配置重新绑定两者。
- `src/theme.css`：主题底色、文字、弹窗、文件卡片和结绳样式。
- `src/kumihimo.svg`、`src/sidebar-scenery.svg`、`src/sky-motifs.svg`：结绳与景物。
- `assets/bg_image.jpg`、`assets/sidebar-lake.webp`：本包使用的两份图像。
- `lib/index.js`、`lib/client.js`：DSH 可加载入口；浏览器包仅内嵌两张图片，不内嵌视频。

```sh
npm run build
```

修改素材或配置后构建，再重新加载 DSH。独立开启/关闭请使用 DSH 原生插件开关；界面主题包不会通过配置启用动画。

## 本地预览与开发测试

完整拆分工程包含相邻的两个组件目录。本包目录执行：

```sh
npm run preview
```

访问 `http://127.0.0.1:4173`。这是模拟 DSH 布局，加载两个真实生产 bundle，不连接模型、不发送消息。`?theme-only`、`?startup-only`、`?off` 可验证单独模式。预览服务仅用于开发，不属于运行依赖。

```sh
npm install --no-save playwright pngjs
npx playwright install chromium
npm test
```

结果见 `docs/test-results.json` 与 `docs/component-test-results.json`。检查范围为 Chromium、模拟宿主 DOM、真实视频以及公开 DSH token/module 契约；不表示已经在你的 DSH 桌面版本上完成验收。真实安装检查见 `docs/ACCEPTANCE.md`。

## 授权

代码使用 MIT，媒体和内嵌副本另见 `THIRD_PARTY_NOTICES.md`。本项目为非官方主题，不代表《你的名字。》、DeepSeek 或 DSH 的官方产品。
