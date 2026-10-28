# 君の名はdsh

一个真正的 DSH 浏览器客户端插件工程：根 Cordis 插件、bundle patch、`dsh.client` 清单及 lazy-CJS 浏览器模块齐全。已包含你提供的动画和背景，以及可读、可修改、可重新构建的源码。运行时无第三方依赖，不启动额外服务器，不读取密钥。

## 平铺包安装修正

ZIP 打开后第一层就是 `package.json`、`lib`、`assets`、`locale`，外面没有额外的插件文件夹。请把包内全部内容直接解压到 DSH 当前引用的安装目录。

针对本次报错中的路径，目标是 `D:\dsh-plugins\君の名はdsh`。解压完成后应直接存在 `D:\dsh-plugins\君の名はdsh\lib\index.js` 和同目录的 `client.js`。完整步骤见根目录 `INSTALL.txt`。本次只修正压缩包的目录布局与说明，运行时代码和素材不变。

## 1.1.9 本次调整

- 参考用户录屏末尾的整幅交叠淡出：视频尾声启动约 1.2 秒的 opacity 淡出，下面已预加载的真实对话界面同步显现。视频与音轨继续正常播放到尾声，不插入黑屏或额外白屏。
- 默认不再使用圆形揭幕。单击跳过仍在 260ms 内淡出，输入防穿透、减弱动态和异常降级保留。纯透明度过渡可随窗口缩放继续，不因改变尺寸直接结束。
- 插件显示名改为「君の名はdsh」，通过导出的 locale/meta.title 配置覆盖中文、日文和英文界面；npm 包标识仍为 dsh-your-name-theme，方便覆盖已有安装。
- 保留 1.1.8 的左上角字标、原生折叠按钮和结绳修复；视频、原音轨、湖景与主区背景素材均保持不变。

## 1.1.8 本次修复

- 修复左上角 HARNESS 白底浅字：补齐深色主题的反色文字变量。
- 恢复原生侧栏折叠按钮的定位，不再让侧栏通用样式改写 position；Logo 和折叠按钮不再横向悬停偏移或带深色底块。插件没有创建新的折叠按钮。
- 修复 Logo 下方红色结绳被品牌容器裁掉的问题，完整显示绳结与流苏，并给下方控件保留间距。
- 本次仅修改主题适配，原视频、音轨、湖景和主背景素材保持逐字节一致。

## 1.1.7 视觉与音效调整

- 保留原 MP4 音轨和原音量。优先尝试有声播放；浏览器只允许静音自动播放时继续播放，并显示“开启原视频音效”。点击这个控件只切换声音，不跳过、不重新从头播放；画面其他位置仍为一键跳过。
- 楼梯背景照片仍只在聊天主区使用一次。左栏湖景按新上传参考图的色调、质感和灯光处理重绘为冷蓝暮夜：低矮山脊与植被压暗，湖岸有聚散不均的暖白、淡金住家灯光，沿道路断续连成城镇灯带，并在水面留下细碎短倒影。收弱橙色夕照与大片暖色水面，上方原有 SVG 分裂彗星保留。
- 主区增加蓝／粉双色彗星、细星轨和云层，Logo 结绳下移，避免压住字标。
- 原有视频、背景、遮罩揭幕时序、输入框和生命周期保持原设计。

本次包含显示名称配置，建议使用完整工程覆盖原目录，然后完全退出 DSH（含托盘）后重启。仅替换 lib/client.js 可以获得淡出过渡，但不能更新 DSH 插件列表读取的 locale 显示名称。

更新已安装版本：完全退出 DSH（含托盘），将平铺包的全部内容直接覆盖到原插件根目录，再重新打开。如果之前安装的是复制到 profile 的包而不是指向原目录的本地包，请重新执行安装时的 `dsh plugin --profile desktop add "实际目录"`（Web 对应 `web`）。显示名为「君の名はdsh」；安装包标识仍为 `dsh-your-name-theme`。

## 安装与打开

1. 新建一个长期保留的插件目录，将平铺 ZIP 内全部内容直接解压进去；该目录打开后应直接看到 package.json 和 lib。
2. 在 DSH 的插件设置中停用原来的鲸鱼女仆主题、兵长主题等其他完整皮肤，然后完全退出 DSH（包括托盘）。同一界面同时运行两个重度换肤插件会造成样式竞争；本插件不会擅自禁用或修改其他插件。
3. Windows 桌面端在终端执行（替换实际路径）：

```powershell
dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh"
```

Web 端使用自己的 profile：

```powershell
dsh plugin --profile web add "D:\dsh-plugins\君の名はdsh"
```

4. 重新打开 DSH。插件包已经包含 `lib/client.js`，安装使用不需要 `npm install` 或先编译。

卸载对应 profile：

```powershell
dsh plugin --profile desktop remove dsh-your-name-theme
```

插件只在 DSH 的客户端加载完成后控制启动画面；不能替换操作系统窗口创建前或 DSH 原生 splash 的阶段。

## 先看交互预览

```sh
cd your-name-dsh
npm run preview
```

也可直接打开 `preview/fade-preview.gif` 查看尾声交叠淡出的模拟录屏动图。

打开 `http://127.0.0.1:4173`。页面用模拟 DSH 布局运行**同一份生产插件**及真实视频，可以重播、跳过、看静态主题和卸载。此预览不连接模型、不发送消息。`preview/theme-preview.png`（若测试已生成）是模拟布局截图，不是你机器的安装截图。

## 源码目录

| 路径 | 内容 |
| --- | --- |
| `package.json`、`cordis.patch.yml` | DSH 安装发现与 profile 插件入口 |
| `locale/*.json` | 插件列表显示名「君の名はdsh」与说明 |
| `src/host.js` | 无宿主副作用的 Cordis 根插件 |
| `src/config.js` | 时长、视频坐标、素材覆盖、DOM 选择器、CSS 模块映射 |
| `src/runtime.js` | init/mount/unmount、DSHAdapter、启动状态机、事件屏障、遮罩 |
| `src/theme.css` | 主题、毛玻璃、消息、按钮、结绳动效、减弱动态 |
| `src/kumihimo.svg` | 内联 SVG 编织结绳源码 |
| `src/sidebar-scenery.svg`、`src/sky-motifs.svg` | 左栏修订湖景的 SVG 容器、边缘渐变与原有分裂彗星／主区天空意象 |
| `assets/transition.mp4` | 你上传的 DSH_fish.mp4，保持原素材 |
| `assets/bg_image.jpg` | 你上传的楼梯背景图 |
| `assets/sidebar-lake.webp` | 修改后的低山、柔和林带湖景插画，内嵌到插件 |
| `assets/dsh_reference.png` | 仅作对照，不会出现在生产 UI 中 |
| `lib/client.js` | 可直接安装的浏览器 factory，包含离线素材 |
| `scripts/build.mjs` | 无额外构建依赖的打包器 |
| `preview/` | 可交互的模拟 DSH 布局 |
| `tests/run.mjs` | Chromium 事件、状态、视觉遮罩及清理测试 |
| `docs/` | 状态机、验收、兼容与性能说明 |

## 配置与更换素材

修改 `src/config.js` 后，在项目目录执行：

```sh
npm run build
```

然后重启 DSH；如果所用版本不自动重读本地插件，移除后重新添加本目录。配置是插件闭包的一部分，不往 `window` 写入变量。`init(config)` 也可以在测试或自行接入时接受覆盖配置。

默认涟漪中心是原始视频像素 `(550,330)`，除以 `(1280,720)` 得到归一化坐标。视频以 `cover` 显示；运行时把源坐标变换到窗口坐标，计入左右/上下裁切，不能直接把窗口中心当作水纹中心。

```js
transition: {
  prepareBeforeEndMs: 500,   // 提前准备下限；默认淡出会按 revealMs 更早启动。
  revealMs: 1200,
  skipMs: 260,              // init 强制上限 300ms
  rippleCenter: { x: 550/1280, y: 330/720 },
  objectFit: 'cover',
  respectReducedMotion: true
}
```

替换 `assets/transition.mp4` / `assets/bg_image.jpg` / `assets/sidebar-lake.webp` 后重新 build。本版恢复 2:3 竖幅湖景构图，SVG 保持图像比例，上沿静态渐变融入暮色。也可配置 `videoUrl/backgroundUrl` 为自己部署的同源资源地址。本版本默认把素材编译进私有工厂，加载后转换为 Blob URL，避免依赖 DSH 不提供 MP4 的标准图片资源路由。

声音可通过 `transition.sound` 和 `transition.volume` 设置，默认 `true` / `1`。`theme.showScenery:false` 可关闭新增景物，背景照片与原有结绳仍保留。浏览器限制有声自动播放时，插件不会声称已经播放声音，而会明确显示开启按钮。

## 不同版本 DOM 的适配

默认映射依据公开 DSH 源码核对，同时包含较早版本映射及语义 DOM 回退。截图无法确定你本机 DOM 的哈希类名，因此不能声称已在你的版本安装验收。

若某个区域没有应用主题，只修改 `src/config.js` 的 `adapter.selectors`，优先填写你本机稳定的 `data-*` 选择器。例如：

```js
adapter: {
  selectors: {
    sidebar: ['你的侧边栏选择器'],
    main: ['你的聊天主区选择器'],
    composer: ['输入框外层卡片选择器'],
    input: ['真正可编辑的 textarea 或 contenteditable 选择器'],
    logo: ['Logo 容器选择器'],
    message: ['消息正文卡片选择器']
  }
}
```

`cssModules` 用模块身份与导出名解析 `style[data-plugin-css]`，不写死哈希前缀。MutationObserver 只在变更后合并到一帧重新匹配；不会每帧遍历页面。卸载时只撤销本插件自己加的类、属性和 DOM，不重建聊天内容。

## 测试

测试工具是开发依赖，不是运行依赖：

```sh
npm install --no-save playwright pngjs
npx playwright install chromium
npm test
```

可用 `DSH_TEST_CHROME` 指定已有 Chromium 可执行文件。输出记录于 `docs/test-results.json`。请同时完成 `docs/ACCEPTANCE.md` 的真实 DSH 验收项。没有在你的电脑实测的项目不会标为通过。

## 实现边界

- 模块入口、生命周期接线已对照 DSH 文档；没有连接你的 DSH 实例或修改你的 profile。
- 60fps 是设计目标，不是跨设备保证。圆形遮罩即使只动画 `transform`，仍可能触发浏览器重绘；请看 `docs/ARCHITECTURE.md` 的性能验证说明。
- 主动降低动效时跳过视频，使用最长 120ms 的短淡入，结绳保持静态。
- 正文、侧栏与输入框采用深色高遮罩以保证关键文字对比度；背景仍通过卡片周围留白展示男女主。
