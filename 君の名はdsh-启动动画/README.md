# 君の名はdsh · 启动动画

DeepSeek Harness 的独立客户端启动动画插件，版本 **1.2.1**，包标识 `dsh-your-name-startup`。

只播放原大肥鱼视频与音效，在尾声约 1.2 秒逐渐淡出，露出 DSH 当前界面。**不加载楼梯图或湖景，不修改聊天背景、文字颜色或宿主主题设置。** 可与「君の名はdsh · 界面主题」分别开关，也可以独立搭配其他界面。

## 插件图标

插件列表使用戴女仆头饰的呆萌大肥鱼 SVG 图标，通过 package.json 的 icon 和 ./icon 导出声明加载，停用时仍可显示。

## 安装

完全退出 DSH（含托盘）。将本目录保存到长期保留的位置，例如：

`D:\dsh-plugins\君の名はdsh-启动动画`

该目录下面应直接存在 `package.json`、`lib/index.js` 和 `lib/client.js`。在 PowerShell 中执行：

```powershell
dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh-启动动画"
```

完整重启 DSH 后，在设置 → 插件中独立启用「君の名はdsh · 启动动画」。Web 用户将 profile 改为实际使用的 `web`。本包没有运行依赖，不需要 npm install 或先编译。

## 交互

- 正常播放：原视频和音轨继续播放，最后约 1.2 秒整幅渐隐。
- 左键或触摸画面：立即暂停，并在 260ms 内淡出；原始按下、松开和兼容点击均被屏蔽，不会误点背后控件。
- Esc / Enter / 空格可跳过；右键和中键不触发跳过。
- 声音按钮只切换原视频音效，不跳过、不重新从头播放。优先尝试有声自动播放；宿主策略拒绝时静音继续，点击“开启原视频音效”恢复声音。
- 系统减弱动态、素材失败或播放失败：快速淡出进入当前界面。动画插件不负责更换或绘制兜底背景。
- 停用插件会停止视频、释放监听器与 Blob URL，并移除动画 DOM。不会移除另一个主题插件的样式或背景。

此插件在 DSH 客户端加载后运行，不替换操作系统创建窗口前的阶段或 DSH 原生 splash。

## 源码配置

`src/config.js` 的 `transition` 可配置音量、淡出时长、视频 URL 等；默认保留原音轨，`sound:true`、`volume:1`。修改后：

```sh
npm run build
```

浏览器包只内嵌 `assets/transition.mp4`，不依赖另一个包。共用运行时代码中保留的主题类不会在本组件中实例化；配置也不能跨组件启用背景主题。

生命周期与独立开关检查见 `docs/component-test-results.json`。详细开发预览与全套测试位于相邻的界面主题包中；运行检查范围为 Chromium 模拟宿主，不表示已在你的 DSH 安装环境验收。

代码 MIT，媒体不包含在代码许可中，见 `THIRD_PARTY_NOTICES.md`。
