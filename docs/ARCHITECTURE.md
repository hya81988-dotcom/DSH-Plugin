# 时序、状态与视觉实现

## 正常播放

`new → initialized → preloading → playing → revealing → ready → disposed`

`init()` 深合并并校验配置，限制 skipMs≤300。`mount()` 先注入深色底、图片层、主题样式和适配器，再创建覆盖层及事件屏障，最后并行预加载图片和视频。图片完成 decode、视频 loadeddata 后才能播放。覆盖层在等待时是深色底，不展示未加载的白色图片。

默认 revealStyle='fade'、revealMs=1200。timeupdate 在剩余时长小于等于 max(prepareBeforeEndMs, revealMs) 时调用 finish('normal')；prepare() 在淡出首帧之前同步真实 DSH DOM。视频和原音轨继续播放尾声，整个覆盖层（包括提示与声音按钮）通过 opacity 从 1 过渡到 0，下面的真实主题界面自然显现。事件精度会使启动点有少量误差；若先收到 ended，就保留末帧完成相同长度的淡出，避免硬切。没有复制、重排聊天 DOM，也没有插入中间黑色或白色画面。25 秒总期限、6 秒无进度期限防止卡死。淡出完成后移除视频并释放其 Blob URL。

## 用户跳过

`preloading/playing → revealing(reason=skip) → ready`

window 捕获阶段监听 mousedown（仅左键）与 touchstart（passive:false）。第一时间 preventDefault、stopPropagation、stopImmediatePropagation，并暂停视频；260ms 整幅淡出，不使用 display:none。1.1.0 的显式声音控件是唯一例外：其事件仍被屏障消费，但只改变音量开关，保持视频播放。

视觉层与事件屏障独立。即使用户一直按住，揭幕后松手的 mouseup/click 仍被吞掉；触摸的 touchend 与兼容 mouse/click 也被阻断。一次新手势恢复正常交互。Escape/Enter/空格可跳过，其他按键在覆盖期也不进入背后的输入框。

## 降级

`preloading/playing → revealing(reason=fallback) → ready`

图片失败保留深色渐变底。视频 error、资源超时、有声与静音两次 play() 均失败、无进度、页面隐藏都走有界淡出。prefers-reduced-motion 开启时不下载/播放内嵌视频，图片准备后最长120ms淡出；结绳不循环动画。加载中、播放中或揭幕中卸载都中止 Promise 监听和定时器。

## 原视频音效（1.1.0）

源 MP4 的 AAC 音轨始终保留，不分离、不替换、不追加音乐。默认 transition.sound=true，volume=1。视频仍具有 playsinline/muted 初始属性；调用 play() 前按声音配置设置实际 muted 属性，优先尝试有声播放。若返回 NotAllowedError，则重试静音播放并明确显示开启音效按钮；如果静音也无法播放才走异常淡出。

声音控件在可信手势中同步调用 play()，不使用定时器延后媒体激活，不重置 currentTime。某些触摸浏览器在 touchend 才授予激活权限，因此会幂等重试相同的声音意图。切换按钮和画面一键跳过分别处理，鼠标松手、兼容点击的屏障继续有效。卸载和跳过仍通过同一个 video 元素停止音轨，不会留下独立音频播放。

参考：https://developer.chrome.com/blog/autoplay/

## 左侧代表性物象（1.1.7）

主区楼梯照片仍只绘制一次。左栏湖景按用户参考图的暮夜色调、画面质感和城镇灯光重新处理：低山、植被和岸线呈深海军蓝及灰蓝色，天空只有薄弱暖色地平线，湖面为冷钢蓝。湖岸住家灯光采用不均匀的暖白、浅金色小亮点，局部密集、局部被树林打断，稀疏道路灯将邻近聚落连成有断续的灯带。部分灯光下方绘有符合水面方向的短而破碎的垂直反射。原有 SVG 彗星保持。

此前明亮的橙色晚霞与大片橙色水面收弱，湖景不再以鲜绿或霜白色植被为主。图像保存在 assets/sidebar-lake.webp，仍用原有 2:3 竖幅放置、上沿渐变和底部文字保护遮罩；没有添加运行时闪烁或额外动态灯光。地形降级图的水色同步改为灰蓝。

运行时继续使用内嵌字节、实例 Blob URL、独立预解码和有界错误处理；动态侧栏复用 URL，卸载释放图片和 Blob。启动时序、原视频及音效、输入屏障、主区背景和其他 CSS 保持。

主背景增加克制的双色彗星、远云和细星轨，均为静态 SVG，不增加逐帧布局计算。Logo 处结绳改为更小的下置装饰，避免压住字标。

## 默认整幅交叠淡出（1.1.9）

只在覆盖层上使用 Web Animations 的 opacity:1→0，时长 1200ms，easing 为 cubic-bezier(.4,0,.2,1)。覆盖层具有 will-change:opacity，不逐帧改变布局。正常尾声允许 video 继续播放；skip 立即 pause 后执行 260ms 淡出。音量没有叠加渐变，原 MP4 字节与音轨不变。

opacity 为零前覆盖层仍占据全窗口并拦截事件，后续鼠标松手、click 和兼容触摸事件继续由屏障消费。纯透明度淡出不依赖屏幕中心或尺寸，窗口调整大小时继续当前动画。

圆形反向遮罩保留为 revealStyle='ripple' 的兼容选项，默认不启用；只在该选项下发生窗口缩放时提前完成，以免旧圆孔坐标造成边角残留。测试分别检查默认淡出的全屏同一透明度、尾声视频继续播放、尺寸变化不中断，以及显式选用圆孔时的中心定位。

## 插件显示名称

locale/en.json、zh.json、ja.json 的 meta.title 都为「君の名はdsh」，package.json 导出 ./locale/*.json 并将其纳入安装文件。npm 包名、Cordis 行 id 与浏览器 factory id 保持稳定。依据官方插件显示元数据约定实现，不依赖在包名里放日文。

参考：https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/adding-a-package.md#5-add-optional-plugin-display-metadata

## 视觉层级与 WCAG

背景照片叠加深蓝渐变，保留暖色楼梯和人物；sidebar/header/message/composer 分别有自己的深色表面，正文不直接压在照片上。面板基底采用 rgba(13,21,37,.94)，最坏按下层纯白合成为约 rgb(28,35,50)。正文 #f5f7ff、次要字 #c3cede、按钮文字 #dce4f2 都以4.5:1为自动测试门槛。

这是关键表面颜色组合验证，不是对任何 DSH 版本所有第三方内容的整页可访问性认证。生产验收需检查禁用态、浮层、代码高亮、用户内容与其他插件。

编织结绳通过同一路径的底绳、红色丝线、交错 dash 静态纹理和细金色流苏构成；流光是一块通过绳路径 mask 裁切的亮片，只动画 transform/opacity，不动画 stroke-dashoffset。装饰 aria-hidden、pointer-events:none，不遮挡编辑和按钮。

## 清理与隔离

- DSH 的 `apply(ctx)` 通过 `ctx.effect` 持有实例并返回 unmount 清理函数。
- 每个文档的单实例保护用模块内 WeakMap；生产代码不创建 window 配置对象。
- AbortController 统一撤销监听；MutationObserver disconnect；取消 RAF、WAAPI、全部定时器。
- pause 视频，清空 src，load 释放解码器，删除覆盖层与 SVG defs，revokeObjectURL。
- 撤销自己增加的 host class；恢复原 body 标记，不覆盖外部插件的现有类。

## 性能实测方法

DevTools Performance 录制完整启动和跳过；关注 CPU raster、长任务、掉帧与主线程布局。用目标设备原生窗口尺寸测试，不把无头浏览器平均时间当作60fps证据。检查视频解码成本；不同时运行两个整页动效皮肤。必要时缩小视频分辨率或使用淡入降级。

## 公开接口依据（2026-10-27 核对）

- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/modules/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/adding-a-settings-card.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-sidebar/src/client/SidebarRoot.tsx
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-conversation/src/client/skeleton/InputBar.module.css
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-conversation/src/client/skeleton/ConversationRoot.module.css

以上核对的是当前公开源码，不代表用户本机已安装版本相同。


## 品牌区域修复 1.1.8

补齐反色文字变量，修复官方 BrandWordmark 中 HARNESS 路径在浅色徽标上的对比度。移除通用侧栏按钮的 position 覆盖，保留宿主 Windows 标题栏的 fixed 定位与 Web 行内对齐。品牌与折叠按钮不再使用通用横向悬停位移或按钮底色。适配器增加 logoRow 与 toggle 的 CSS 模块映射；只放开品牌行和品牌外层的装饰裁切，身份内容本身保持宽度限制。结绳下置于独立绝对定位装饰，不修改或重新挂载原生 React 内容。

验证使用官方侧栏 CSS 与官方字标构成的浏览器测试页面，覆盖 Web 居中、Windows 原生固定定位、徽标文字颜色、结绳边界、按钮数量与折叠展开功能；这不是用户已安装 DSH 的实机测试。上游参考为 deepseek-ai/deepseek-harness 的 SidebarRoot.tsx、SidebarRoot.module.css 与 BrandWordmark.tsx。
