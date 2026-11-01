# 独立组件架构（1.2.0）

两个包都有自己的 package.json、bundle patch、host apply、locale 和 lazy-CJS 客户端工厂，没有彼此依赖。界面包保留旧安装标识，动画包使用新标识；两者分别由 Cordis effect 挂载和卸载。

| 组件 | package id | Cordis entry | 内嵌媒体 | 拥有的作用 |
| --- | --- | --- | --- | --- |
| 界面主题 | dsh-your-name-theme | your-name-startup-theme | 背景 JPEG、湖景 WebP | body 的 data-yn-theme 标记、主题样式、DSHAdapter、景物与结绳 |
| 启动动画 | dsh-your-name-startup | your-name-startup-animation | 原 MP4 | 独立 overlay、视频、声音控件、输入屏障 |

## 生命周期和状态

init 校验配置；mount 注入本组件自己的样式与 DOM；unmount 取消异步等待、定时器、WAAPI、输入事件和适配观察，释放 Blob。组件模式在构建时固定，配置不能把两者重新耦合。模块闭包中的 WeakMap 只管理该工厂自身实例，不占用 DSH 全局命名空间。

主题：new → initialized → preloading（解码两张图片，同时挂载适配）→ ready → disposed。没有视频、遮罩、输入屏障或焦点劫持。

动画：new → initialized → preloading → playing → revealing → ready → disposed。正常播放距结束约 revealMs 时启动整幅 opacity 淡出，原音轨继续尾声；用户跳过立即 pause，再用 skipMs（≤300ms）淡出；播放异常、减弱动态使用短淡出。动画不等待主题图片，也不创建自己的聊天背景。

两者同时开时，真实 DSH 自己先渲染当前界面，主题按自己的生命周期加载；动画只覆盖在其上方并在尾声淡出。关闭任意一个不会卸载另一个。若主题图片失败，主题保留深色可读底色；动画照常运行。若动画失败，迅速进入 DSH 当前界面。

## 对比度修复

旧实现覆盖 label-primary 等浅色文字，但错误使用 bg-l1/l2，遗漏宿主实际使用的 bg-layer-1/2/3、specific-input-major 和 markdown-code-block；浅色宿主因此留下白底。1.2.0 配对覆盖这些 token，并补齐 primary-foreground/inverted 与按钮填色、语义错误/成功色。

DSHAdapter 在配置中集中列出语义选择器和 CSS module 导出：Modal/dialog、CodeCard/card、FileCard/card、MenuSurface/surface、Input/wrap。body portal 同样在观察范围内。只给卡片设置主题填色，不将整幅 modal root/mask 涂成实色；不重排宿主节点。移除了消息内部所有 span 一律继承白字的规则，保留增删和语法颜色。

已核对的上游实现：
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-theme/src/styles/design-platform.css
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-primitives/src/Modal.module.css
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-primitives/src/CodeCard.module.css
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-attachment/src/FileCard.module.css

## 性能与测试边界

默认过渡只动画 opacity，结绳只动画 transform/opacity。没有逐帧扫描 DOM；MutationObserver 的匹配合并到 requestAnimationFrame。60fps 为目标，不能跨设备保证。可选旧 ripple 模式会使用 SVG mask，可能触发额外重绘。

自动测试在 Chromium 的模拟宿主运行，覆盖真实原视频、输入穿透、播放策略、渐隐、独立启停和配对颜色的实际计算对比度。真实 DSH 版本的 DOM、窗口行为及性能仍需安装验收。
