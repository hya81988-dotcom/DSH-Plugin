# 君の名はdsh

面向 DeepSeek Harness 的《你的名字。》主题与大肥鱼启动动画。**当前版本 1.2.1；启动动画与界面主题可独立开关。**

| 目录 | 显示名 | 功能 |
| --- | --- | --- |
| 君の名はdsh | 君の名はdsh · 界面主题 | 楼梯主背景、湖景与彗星、编织结绳、毛玻璃输入框、深色可读卡片 |
| 君の名はdsh-启动动画 | 君の名はdsh · 启动动画 | 原大肥鱼视频与音效、约1.2秒渐隐、点击跳过与防穿透 |

## 安装与升级

完全退出 DSH（含托盘），把上面两个目录直接复制到 D:\dsh-plugins，覆盖原有同名文件。不要将总包作为一个插件添加。然后在 PowerShell 执行：

    dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh"
    dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh-启动动画"

完整重启，在设置 → 插件中独立开关两个项目。Web 端请使用自己的 web profile。安装使用不需要 npm install 或编译，每个组件的 lib 已构建。完整路径检查见 [安装说明](安装说明.txt)。

只开主题时直接进入主题界面；只开动画时播放后回到 DSH 当前界面；同时开时渐隐进入主题；都关闭时使用宿主原配置。

## 当前功能

- 启动动画与界面主题是两个独立插件，可以分别开启或同时使用。
- 启动动画保留大肥鱼视频与原音效，尾声约 1.2 秒渐隐，支持点击跳过和防事件穿透。
- 界面主题包含楼梯主背景、侧栏彗星与湖景、红色编织结绳和毛玻璃输入框。
- 弹窗、文件卡片、代码编辑摘要及按钮使用配对的底色与文字色，删除和增删标记保持清晰的语义颜色。停用主题后恢复宿主配色。
- 两个插件分别使用大肥鱼与双彗星结绳 SVG 图标，停用状态下也能显示。

## 开发

每个子目录均包含独立 package.json、bundle patch、locale、src、scripts/build.mjs 与 lib。修改后在对应目录运行 npm run build。本地交互预览与测试入口在界面主题目录：npm run preview、npm test。需同时保留相邻的动画目录；预览不连接模型。

自动检查结果见界面主题目录的 docs/test-results.json 和 docs/component-test-results.json。36 项 Chromium 模拟宿主检查通过；真实 DSH 桌面版本的安装与性能仍需按 docs/ACCEPTANCE.md 验收。

## 授权

代码采用各目录中的 MIT LICENSE。媒体及内嵌副本不包含在代码授权中，详见对应 THIRD_PARTY_NOTICES.md。本项目为非官方主题。
