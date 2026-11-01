# 君の名はdsh · 界面主题 — 1.2.1 完整源码

## package.json

````json
{
  "name": "dsh-your-name-theme",
  "version": "1.2.1",
  "description": "君の名はdsh · 界面主题：楼梯背景、彗星湖景与结绳装饰，独立于启动动画。",
  "type": "module",
  "main": "lib/index.js",
  "exports": {
    ".": "./lib/index.js",
    "./client": "./lib/client.js",
    "./package.json": "./package.json",
    "./locale/*.json": "./locale/*.json",
    "./icon": "./icon.svg"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    },
    "client": {
      "platform": "web",
      "inject": []
    }
  },
  "files": [
    "lib",
    "assets",
    "src",
    "scripts",
    "locale/*.json",
    "docs",
    "preview",
    "tests",
    "cordis.patch.yml",
    "README.md",
    "LICENSE",
    "THIRD_PARTY_NOTICES.md",
    "INSTALL.txt",
    "icon.svg"
  ],
  "scripts": {
    "build": "node scripts/build.mjs",
    "test": "node tests/run.mjs && node tests/components.mjs",
    "preview": "node scripts/serve.mjs"
  },
  "engines": {
    "node": ">=20"
  },
  "license": "MIT",
  "yourName": {
    "component": "theme",
    "entry": "your-name-startup-theme"
  },
  "icon": "./icon.svg"
}

````

## icon.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none">
  <title>君の名はdsh · 彗星与结绳</title>
  <defs>
    <linearGradient id="night" x1="8" y1="2" x2="52" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#17284D"/><stop offset=".56" stop-color="#25375C"/><stop offset="1" stop-color="#101B35"/>
    </linearGradient>
    <linearGradient id="blue" x1="51" y1="8" x2="23" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#85BCFF" stop-opacity="0"/><stop offset=".55" stop-color="#B3DEFF"/><stop offset="1" stop-color="#F6FDFF"/>
    </linearGradient>
    <linearGradient id="pink" x1="57" y1="12" x2="27" y2="38" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E7A2CD" stop-opacity="0"/><stop offset=".6" stop-color="#ECAAD6"/><stop offset="1" stop-color="#FFE9F6"/>
    </linearGradient>
    <linearGradient id="cord" x1="12" y1="49" x2="52" y2="42" gradientUnits="userSpaceOnUse">
      <stop stop-color="#CC526D"/><stop offset=".5" stop-color="#FF9EAA"/><stop offset="1" stop-color="#DF647D"/>
    </linearGradient>
    <radialGradient id="light" cx="0" cy="0" r="1" gradientTransform="translate(25 34) rotate(90) scale(15)">
      <stop stop-color="#D9EEFF" stop-opacity=".24"/><stop offset="1" stop-color="#D9EEFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x=".5" y=".5" width="63" height="63" rx="15.5" fill="url(#night)" stroke="#9BADCB" stroke-opacity=".28"/>
  <path d="M1 53C13 44 21 45 33 49C43 52 51 48 63 40V49C51 54 43 57 31 54C20 51 10 53 1 59V53Z" fill="#6682AA" opacity=".13"/>
  <circle cx="14" cy="16" r="1" fill="#C5D4EC" opacity=".8"/>
  <circle cx="40" cy="15" r=".7" fill="#C5D4EC" opacity=".55"/>
  <circle cx="51" cy="33" r=".8" fill="#C5D4EC" opacity=".5"/>
  <circle cx="25" cy="34" r="15" fill="url(#light)"/>
  <path d="M51 8C43 18 35 26 25 34" stroke="url(#blue)" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M57 12C47 22 37 31 28 37" stroke="url(#pink)" stroke-width="1.7" stroke-linecap="round"/>
  <path d="M49 11L26 34" stroke="#F8FDFF" stroke-opacity=".7" stroke-width=".65" stroke-linecap="round"/>
  <path d="M25 30.8L26.1 33.1L28.5 34L26.1 35.1L25 37.4L23.9 35.1L21.5 34L23.9 33.1L25 30.8Z" fill="#F7FCFF"/>
  <path d="M10.5 48.5C16 50 22 49.7 27 46.6C31 44.1 32 41.8 29.5 40.8C26.9 39.7 25.1 42.5 26.8 44.8C29 47.8 34.4 48.2 37.2 45.2C39.9 42.4 37.9 40.1 35.6 41.3C33.5 42.4 34.3 46.4 38.6 48C43.4 49.7 48.5 48.8 53.5 45.3" stroke="#56283C" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 48.5C16 50 22 49.7 27 46.6C31 44.1 32 41.8 29.5 40.8C26.9 39.7 25.1 42.5 26.8 44.8C29 47.8 34.4 48.2 37.2 45.2C39.9 42.4 37.9 40.1 35.6 41.3C33.5 42.4 34.3 46.4 38.6 48C43.4 49.7 48.5 48.8 53.5 45.3" stroke="url(#cord)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 48.7C18 50 22 48.9 26 46.9M39 48.3C44 49.4 48 48.3 52 46.4" stroke="#FFE0D8" stroke-width=".65" stroke-dasharray="1.2 2" stroke-linecap="round"/>
  <path d="M31 46.6C30 50 28.8 52.2 27 54M34.1 46.8C35 50.3 37 52.4 39 53.5" stroke="#E88598" stroke-width="1.65" stroke-linecap="round"/>
</svg>

````

## cordis.patch.yml

````yaml
- insert:
    - id: your-name-startup-theme
      name: dsh-your-name-theme
      config: {}

````

## INSTALL.txt

````text
君の名はdsh 1.2.1 — 界面主题（独立组件）

这个目录是完整、可直接安装的界面主题包，不再播放启动视频。
已有插件目录 D:\dsh-plugins\君の名はdsh 可直接原位升级。
完全退出 DSH（包括托盘），将本目录内容覆盖到原插件目录。
必须直接存在：
  D:\dsh-plugins\君の名はdsh\package.json
  D:\dsh-plugins\君の名はdsh\lib\index.js
  D:\dsh-plugins\君の名はdsh\lib\client.js

如需重新登记或刷新复制到 profile 的包，在 PowerShell 执行：
  dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh"

启动动画位于另一个完整目录“君の名はdsh-启动动画”，需单独添加。
重启后列表中两个项目可独立开关，主题包保留原包标识用于升级。
不要将整个双组件总目录作为一个 DSH 插件添加。

````

## README.md

````markdown
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

````

## LICENSE

````text
MIT License

Copyright (c) 2026 Your Name DSH plugin contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

````

## THIRD_PARTY_NOTICES.md

````markdown
# 素材说明

本次开发的代码采用 LICENSE 中的 MIT 许可。assets/bg_image.jpg 为用户提供的《你的名字。》楼梯画面；该媒体及内嵌在 lib/client.js 中的副本不包含在代码 MIT 授权中。素材的公开分发与使用须遵循对应来源许可。本项目没有获得或宣称获得《你的名字。》、DeepSeek 或 DSH 的官方背书。

assets/sidebar-lake.webp 为此前在独立生成湖景上修订的插画；用户图片用于色调、山势、植被和湖岸灯光风格参考，未将参考图片直接贴入此素材。

此界面主题包不包含启动视频，也不包含仅供适配参考的原用户界面截图。独立动画包的媒体另见其自己的素材说明。

````

## locale/en.json

````json
{
  "meta": {
    "title": "君の名はdsh · 界面主题",
    "description": "仅启用《你的名字。》主题界面与装饰；不播放启动动画。修复浅色模式弹窗、文件卡片文字对比度。"
  }
}

````

## locale/ja.json

````json
{
  "meta": {
    "title": "君の名はdsh · 界面主题",
    "description": "仅启用《你的名字。》主题界面与装饰；不播放启动动画。修复浅色模式弹窗、文件卡片文字对比度。"
  }
}

````

## locale/zh.json

````json
{
  "meta": {
    "title": "君の名はdsh · 界面主题",
    "description": "仅启用《你的名字。》主题界面与装饰；不播放启动动画。修复浅色模式弹窗、文件卡片文字对比度。"
  }
}

````

## src/config.js

````javascript
/** All host DOM knowledge lives here. Modify this file, then `npm run build`.
 * selectors are alternatives, not an assumption that every DSH release uses
 * the same DOM. cssModules resolves exported names from host stylesheets.
 */
export const DEFAULT_CONFIG = {
  enabled: true,
  transition: {
    enabled: false, // 界面主题包不播放动画；独立启动动画包会在构建时设为 true。
    prepareBeforeEndMs: 500,
    revealMs: 1200, // 与参考录屏接近的交叠淡出时长；提前等长启动，覆盖视频尾声。
    skipMs: 260,
    fallbackMs: 160,
    assetTimeoutMs: 8000,
    maxPlaybackMs: 25000,
    stalledTimeoutMs: 6000,
    // Measured in the supplied 1280 x 720 video; fractions of SOURCE pixels.
    rippleCenter: { x: 550 / 1280, y: 330 / 720 },
    objectFit: 'cover',
    revealStyle: 'fade', // 整幅动画淡出、下面的真实对话界面同步显现；可选 'ripple'。
    respectReducedMotion: true,
    sound: true, // 尝试原视频有声播放；策略拦截时改为静音并显示开启音效按钮。
    volume: 1,   // 0..1；1 保留原视频音量，不另加背景音乐。
    // Optional same-origin URLs override the bundled offline assets.
    videoUrl: null,
    backgroundUrl: null,
  },
  theme: { enabled: true, backgroundPosition: '58% 50%', showKnots: true, showScenery: true },
  adapter: {
    selectors: {
      app: ['[data-dsh-root]', '#root', '#app'],
      sidebar: ['[data-dsh-sidebar]', '[data-dsh-sidebar-surface]', 'aside[aria-label]', 'aside'],
      main: ['[data-dsh-chat]', 'main'],
      header: ['[data-dsh-chat-header]', 'main > header'],
      logo: ['[data-dsh-logo]', '[data-dsh-brand]'],
      brandRow: ['[data-dsh-brand-row]'],
      sidebarToggle: ['[data-dsh-sidebar-toggle]', 'button[aria-label="收起侧边栏"]', 'button[aria-label="展开侧边栏"]', 'button[aria-label="Collapse sidebar"]', 'button[aria-label="Expand sidebar"]'],
      composer: ['[data-dsh-composer]', 'form:has(textarea)', 'form:has([contenteditable="true"])'],
      input: ['textarea', '[contenteditable="true"][role="textbox"]'],
      message: ['[data-message-role]', '[data-role="assistant"]', '[data-role="user"]'],
      // Portaled dialogs are body children, not descendants of the chat area.
      // Only the card gets a fill; the full-screen modal/mask stays transparent.
      surface: ['[role="dialog"]', '[role="alertdialog"]', '[role="menu"]', '[data-dsh-file-card]', '[data-dsh-code-card]', '[data-dsh-surface]'],
      // Only theme decoration, never user message images or avatars.
      legacyDecor: ['[data-skin-chrome]', '[data-dsh-ornament]', '[data-dsh-character-art]'],
    },
    cssModules: {
      sidebar: [['ui-sidebar/SidebarRoot.module.css', 'root']],
      logo: [['ui-sidebar/SidebarRoot.module.css', 'brand']],
      brandRow: [['ui-sidebar/SidebarRoot.module.css', 'logoRow']],
      sidebarToggle: [['ui-sidebar/SidebarRoot.module.css', 'toggle']],
      main: [['ui-conversation/ConversationRoot.module.css', 'root'], ['ui-chat/ChatRoot.module.css', 'root']],
      composer: [['ui-conversation/InputBar.module.css', 'card'], ['ui-chat/InputBar.module.css', 'card']],
      message: [['ui-conversation/MessageItem.module.css', 'bubble'], ['ui-chat/MessageItem.module.css', 'bubble'], ['ui-conversation/AssistantMarkdown.module.css', 'body'], ['ui-chat/AssistantMarkdown.module.css', 'body']],
      header: [['ui-conversation/ConversationRoot.module.css', 'header'], ['ui-chat/ChatRoot.module.css', 'header']],
      surface: [
        ['ui-primitives/Modal.module.css', 'dialog'],
        ['ui-primitives/CodeCard.module.css', 'card'],
        ['ui-attachment/FileCard.module.css', 'card'],
        ['ui-primitives/MenuSurface.module.css', 'surface'],
        ['ui-primitives/Input.module.css', 'wrap'],
      ],
    },
    observeAttributes: ['class', 'data-plugin-css'],
  },
};

````

## src/host.js

````javascript
/** Browser-only theme. This root row enables discovery of exports['./client'].
 * No HTTP server, model hook, file read, RPC or credentials are required. */
export const name = 'your-name-startup-theme';
export function apply() {}

````

## src/intro.css

````css
.yn-intro {position:fixed;inset:0;z-index:2147483600;touch-action:none;overscroll-behavior:contain;outline:none;isolation:isolate;will-change:opacity;}
.yn-intro-visual {position:absolute;inset:0;background:#fff;will-change:opacity;}
.yn-intro video {position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#fff;opacity:0;will-change:opacity;transition:opacity 100ms linear;}
.yn-intro[data-video-ready] video {opacity:1;}
.yn-intro-hint {position:absolute;right:max(24px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));
  border:1px solid rgba(255,255,255,.35);border-radius:99px;padding:9px 16px;color:white;background:rgba(10,18,34,.86);font:12px/1.5 system-ui;cursor:pointer;z-index:1;}
.yn-intro-sound {right:auto;left:max(24px,env(safe-area-inset-left));}
.yn-intro-sound:focus-visible {outline:2px solid #ffb9ad;outline-offset:3px;}
.yn-intro-mask-defs {position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;}
@media(prefers-reduced-motion:reduce){.yn-intro video{transition:none;}}

````

## src/kumihimo.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 80" fill="none" aria-hidden="true" focusable="false">
  <defs>
    <path id="__ID__-rope" d="M8 47C62 48 106 15 163 30S232 65 264 40C290 17 324 13 318 35C311 61 267 63 258 40C249 16 284 12 307 33C346 68 385 18 431 30S506 58 552 35"/>
    <mask id="__ID__-thread"><use href="#__ID__-rope" stroke="white" stroke-width="6"/></mask>
    <linearGradient id="__ID__-red"><stop stop-color="#8d2237"/><stop offset=".45" stop-color="#ed697b"/><stop offset="1" stop-color="#a92942"/></linearGradient>
  </defs>
  <g class="yn-knot-breath" stroke-linecap="round">
    <use href="#__ID__-rope" stroke="#300e1c" stroke-width="8" opacity=".7"/>
    <use href="#__ID__-rope" stroke="url(#__ID__-red)" stroke-width="5.5"/>
    <use href="#__ID__-rope" stroke="#ffb3ad" stroke-width="2" stroke-dasharray="1.5 5"/>
    <use href="#__ID__-rope" stroke="#6e172f" stroke-width="2" stroke-dasharray="2 4.5" stroke-dashoffset="3"/>
    <path d="M261 42C267 57 264 66 256 74M307 35C316 48 321 60 332 66" stroke="#b73b51" stroke-width="3"/>
    <path d="M255 67L253 77M259 68L259 78M328 62L337 71M331 61L341 68" stroke="#f2b482" stroke-width="1.3"/>
  </g>
  <g mask="url(#__ID__-thread)">
    <rect class="yn-thread-glint" x="-70" y="0" width="46" height="80" fill="#fff0dc" opacity=".5"/>
  </g>
</svg>

````

## src/runtime.js

````javascript
/* Build injects DEFAULT_CONFIG, THEME_CSS, KUMIHIMO_SVG, SCENERY_SVG,
 * SKY_SVG and BUNDLED_ASSETS
 * into this module's private factory. No window configuration or singleton. */
const SVG_NS = 'http://www.w3.org/2000/svg';
const ACTIVE = new WeakMap();
const merge = (a,b={}) => Object.fromEntries(Object.entries({...a,...b}).map(([k,v]) =>
  [k, v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object'
    ? merge(a[k],v) : v]));
const uid = () => 'yn-'+Math.random().toString(36).slice(2,11);
const clamp = (v,min,max) => Math.min(max,Math.max(min,v));
const abortError = () => new DOMException('Plugin unmounted','AbortError');

/** Public mapping layer. All selectors/module-export candidates are config. */
export class DSHAdapter {
  constructor(document, config, knot, scenery=null) {
    this.doc=document;this.config=config;this.knot=knot;this.scenery=scenery;
    this.added=new Map();this.targets={};this.decorations=new Map();this.scenes=new Map();this.raf=0;
  }
  queryAll(selector) {
    try {return [...this.doc.querySelectorAll(selector)].filter(el=>!el.closest('[data-yn-owned]'));}
    catch {console.warn('[Your Name] Invalid adapter selector:',selector);return [];}
  }
  resolve(role) {
    const found=new Set();
    for(const selector of this.config.selectors[role]??[]) for(const el of this.queryAll(selector))found.add(el);
    for(const [suffix,key] of this.config.cssModules[role]??[]) {
      const id='@deepseek-ai/dsh-client-'+suffix;
      const style=[...this.doc.querySelectorAll('style[data-plugin-css]')].find(s=>s.dataset.pluginCss===id);
      if(!style)continue;
      const safe=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const name=style.textContent.match(new RegExp('\\.([\\w-]+_'+safe+')(?=[\\s,{.:#>\\[])'))?.[1];
      if(name) for(const el of this.doc.getElementsByClassName(name))found.add(el);
    }
    return [...found];
  }
  mark(el,role) {
    if(!el || el===this.doc.body)return;
    const name='yn-'+role;
    if(el.classList.contains(name))return;
    if(!this.added.has(el))this.added.set(el,new Set());
    this.added.get(el).add(name);el.classList.add(name);
  }
  sync() {
    for(const [el,names] of this.added)if(!el.isConnected){for(const n of names)el.classList.remove(n);this.added.delete(el);}
    for(const role of ['app','sidebar','main','header','logo','brandRow','sidebarToggle','composer','input','message','surface','legacyDecor'])this.targets[role]=this.resolve(role);
    // Semantic fallbacks, bounded to the conversation area.
    if(!this.targets.sidebar.length){
      const tree=this.doc.querySelector('[role="tree"]');
      if(tree){let node=tree;const max=Math.max(360,tree.getBoundingClientRect().width*1.6);
        while(node.parentElement && node.parentElement!==this.doc.body && node.parentElement.getBoundingClientRect().width<=max)node=node.parentElement;
        this.targets.sidebar=[node];}
    }
    if(!this.targets.composer.length){const input=this.targets.input[0];const parent=input?.closest('form,[class*="_card"],[class*="_composer"]');if(parent)this.targets.composer=[parent];}
    if(!this.targets.logo.length){const logo=this.targets.sidebar[0]?.querySelector('header,[class*="_brand"]');if(logo)this.targets.logo=[logo];}
    for(const [role,els] of Object.entries(this.targets))for(const el of els)this.mark(el,role==='legacyDecor'?'legacy-decor':role);
    // Clear structural backgrounds on the route between chat and app only.
    for(const node of [...this.targets.main,...this.targets.composer]) {
      for(let el=node.parentElement;el && el!==this.doc.body;el=el.parentElement) {
        if(this.targets.sidebar.includes(el))break;
        if(!this.targets.composer.includes(el))this.mark(el,'clear');
        if(this.targets.app.includes(el))break;
      }
    }
    if(this.knot)for(const host of [...this.targets.logo,...this.targets.composer]){
      let decor=this.decorations.get(host);
      if(!decor?.isConnected){decor=this.doc.createElement('div');decor.className='yn-knot';decor.dataset.ynOwned='knot';decor.setAttribute('aria-hidden','true');
        decor.innerHTML=this.knot.replaceAll('__ID__',uid());host.append(decor);this.decorations.set(host,decor);}
    }
    for(const [host,decor] of this.decorations)if(!host.isConnected){decor.remove();this.decorations.delete(host);}
    if(this.scenery)for(const host of this.targets.sidebar){
      let scene=this.scenes.get(host);
      if(!scene?.isConnected){scene=this.doc.createElement('div');scene.className='yn-sidebar-scenery';scene.dataset.ynOwned='scenery';scene.setAttribute('aria-hidden','true');
        // Repainted low-hill lake + original vector comet. The staircase
        // photo is painted once by the main wallpaper; it is never cloned here.
        scene.innerHTML=this.scenery.replaceAll('__ID__',uid());
        host.prepend(scene);this.scenes.set(host,scene);}
    }
    for(const [host,scene] of this.scenes)if(!host.isConnected){scene.remove();this.scenes.delete(host);}
  }
  mount(){this.sync();this.observer=new MutationObserver(records=>{
    if(records.every(r=>r.target.nodeType===1&&r.target.closest('[data-yn-owned]')))return;
    if(!this.raf)this.raf=requestAnimationFrame(()=>{this.raf=0;this.sync();});
  });this.observer.observe(this.doc.body,{childList:true,subtree:true,attributes:true,attributeFilter:this.config.observeAttributes});}
  diagnostics(){return Object.fromEntries(Object.entries(this.targets).map(([k,v])=>[k,v.length]));}
  unmount(){this.observer?.disconnect();cancelAnimationFrame(this.raf);this.raf=0;
    for(const d of this.decorations.values())d.remove();this.decorations.clear();
    for(const s of this.scenes.values())s.remove();this.scenes.clear();
    for(const [el,names] of this.added)for(const name of names)el.classList.remove(name);this.added.clear();this.targets={};}
}

/** Per-instance capture shield. Keeps the initial gesture blocked through
 * mouseup/click or touchend/compatibility-mouse events, even after the video
 * has visually gone. A held button cannot activate a newly revealed control. */
class InputShield {
  constructor(owner){this.owner=owner;this.abort=new AbortController();this.mouse=false;this.touch=false;this.awaitClick=false;this.touchUntil=0;}
  consume(e){if(e.cancelable)e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}
  mount(){const win=this.owner.win;const on=(type,fn)=>win.addEventListener(type,fn,{capture:true,passive:false,signal:this.abort.signal});
    const active=()=>!['ready','disposed'].includes(this.owner.state);
    // Do not preventDefault here: that suppresses the mousedown we use to
    // trigger skip on PointerEvent browsers. The full overlay is the target.
    on('pointerdown',e=>{if(active()&&e.button===0){e.stopPropagation();e.stopImmediatePropagation();}});
    on('mousedown',e=>{
      if(e.button!==0)return;
      if(performance.now()<this.touchUntil){this.consume(e);return;}
      if(active()){this.mouse=true;this.awaitClick=true;this.consume(e);
        if(e.target.closest?.('[data-yn-sound]')){this.controlGesture=true;this.owner.toggleAudio();}
        else this.owner.finish('skip');}
      else if(!this.mouse){this.awaitClick=false;this.maybeDispose();}
    });
    on('touchstart',e=>{if(!active())return;this.touch=true;this.touchUntil=performance.now()+900;this.awaitClick=true;this.consume(e);
      if(e.target.closest?.('[data-yn-sound]')){this.controlGesture=true;this.touchAudio=true;this.owner.toggleAudio();}
      else this.owner.finish('skip');});
    on('pointerup',e=>{if(active()||this.mouse||this.touch){e.stopPropagation();e.stopImmediatePropagation();}});
    on('mouseup',e=>{if(e.button===0&&(active()||this.mouse||performance.now()<this.touchUntil)){this.mouse=false;this.consume(e);this.maybeDispose();}});
    for(const type of ['touchend','touchcancel'])on(type,e=>{if(active()||this.touch){this.touch=e.touches.length>0;this.touchUntil=performance.now()+750;this.consume(e);
      // Some engines grant media activation only at touchend, not touchstart.
      if(this.touchAudio&&type==='touchend'){this.owner.setAudioWanted(this.owner.audioDesired);this.touchAudio=false;}
      this.owner.later(()=>{this.awaitClick=false;this.maybeDispose();},800);}});
    on('click',e=>{if(e.button!==0)return;if(active()||this.awaitClick||performance.now()<this.touchUntil){this.consume(e);
      if(active()&&e.target.closest?.('[data-yn-sound]')&&!this.controlGesture&&e.detail===0)this.owner.toggleAudio();
      this.controlGesture=false;if(!this.touch)this.awaitClick=false;this.maybeDispose();}});
    on('keydown',e=>{if(!active())return;this.consume(e);
      if(e.target.closest?.('[data-yn-sound]')&&['Enter',' '].includes(e.key)){if(!e.repeat)this.owner.toggleAudio();return;}
      if(['Escape','Enter',' '].includes(e.key))this.owner.finish('skip');});
    for(const type of ['wheel','contextmenu','dblclick'])on(type,e=>{if(active())this.consume(e);});
  }
  ready(){this.maybeDispose();}
  maybeDispose(){if(this.owner.state==='ready'&&!this.mouse&&!this.touch&&!this.awaitClick&&performance.now()>=this.touchUntil)this.dispose();}
  dispose(){this.abort.abort();}
}

export class YourNamePlugin {
  constructor(options={}){this.options=options;this.doc=options.document??document;this.win=this.doc.defaultView;this.state='new';this.timers=new Set();this.animations=new Set();this.urls=new Set();this.debug={reason:null,preparedAt:null};}
  init(config={}) {
    if(this.state!=='new')return this;
    this.config=merge(DEFAULT_CONFIG,config);
    // A component never acquires its sibling's effects, even through overrides.
    // Each factory has a private registry and independent lifecycle/disposal.
    this.config.theme.enabled=PLUGIN_MODE==='theme';
    if(PLUGIN_MODE==='theme')this.config.transition.enabled=false;
    const t=this.config.transition;
    for(const k of ['prepareBeforeEndMs','revealMs','skipMs','fallbackMs','assetTimeoutMs','maxPlaybackMs','stalledTimeoutMs'])if(!Number.isFinite(t[k])||t[k]<0)throw new TypeError('Invalid transition.'+k);
    if(!Number.isFinite(t.rippleCenter.x)||!Number.isFinite(t.rippleCenter.y))throw new TypeError('Invalid ripple center');
    if(!Number.isFinite(t.volume))throw new TypeError('Invalid volume');t.volume=clamp(t.volume,0,1);this.audioDesired=t.sound;
    t.skipMs=clamp(t.skipMs,0,300);t.rippleCenter.x=clamp(t.rippleCenter.x,0,1);t.rippleCenter.y=clamp(t.rippleCenter.y,0,1);
    this.abort=new AbortController();this.state='initialized';return this;
  }
  later(fn,ms){const id=setTimeout(()=>{this.timers.delete(id);if(this.state!=='disposed')fn();},ms);this.timers.add(id);return id;}
  clearTimer(id){clearTimeout(id);this.timers.delete(id);}
  listen(target,type,fn,options={}){target.addEventListener(type,fn,{...options,signal:this.abort.signal});}
  element(tag,className){const el=this.doc.createElement(tag);el.className=className;el.dataset.ynOwned='';return el;}
  updateAudioControl(){if(!this.soundButton||!this.video)return;const on=!this.video.muted&&this.video.volume>0;
    this.soundButton.textContent=on?'音效已开启 · 点击静音':'开启原视频音效';this.soundButton.setAttribute('aria-pressed',String(on));
    this.soundButton.setAttribute('aria-label',on?'关闭原视频音效':'开启原视频音效，继续播放动画');}
  async startPlayback(){const v=this.video;v.volume=this.config.transition.volume;v.muted=!this.audioDesired;
    try{await v.play();this.debug.sound=v.muted?'muted-user':'audible';}
    catch(error){if(this.video!==v||this.state!=='preloading')throw abortError();
      if(!this.audioDesired||error.name!=='NotAllowedError')throw error;
      // Do not hide the intro merely because audible autoplay was denied.
      v.muted=true;this.debug.sound='muted-policy';await v.play();}
    if(this.video===v)this.updateAudioControl();}
  setAudioWanted(wanted){if(!this.video||!['preloading','playing'].includes(this.state))return;
    this.audioDesired=Boolean(wanted);const v=this.video,token=++this.audioRequest;v.volume=this.config.transition.volume;v.muted=!this.audioDesired;
    this.updateAudioControl();
    // Call play synchronously inside the trusted gesture, not after a timer.
    Promise.resolve(v.play()).then(()=>{if(this.video===v&&token===this.audioRequest){this.debug.sound=v.muted?'muted-user':'audible';this.updateAudioControl();}},()=>{
      if(this.video===v&&token===this.audioRequest){v.muted=true;this.debug.sound='muted-policy';this.updateAudioControl();}});
  }
  toggleAudio(){this.setAudioWanted(this.video?.muted??true);}
  asset(kind){
    const override=kind==='video'?this.config.transition.videoUrl:kind==='background'?this.config.transition.backgroundUrl:null;
    if(override)return new URL(override,this.doc.baseURI).href;
    const record=BUNDLED_ASSETS[kind];
    if(!record)throw new Error('Asset not included in '+PLUGIN_MODE+' component: '+kind);
    const bytes=atob(record.base64);const data=new Uint8Array(bytes.length);
    for(let i=0;i<bytes.length;i++)data[i]=bytes.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([data],{type:record.mime}));this.urls.add(url);return url;
  }
  waitFor(target,success,fail,timeout,ready) {
    return new Promise((resolve,reject)=>{
      let done=false;
      const cleanup=()=>{target.removeEventListener(success,ok);target.removeEventListener(fail,bad);this.abort.signal.removeEventListener('abort',cancel);this.clearTimer(timer);};
      const settle=(error)=>{if(done)return;done=true;cleanup();error?reject(error):resolve();};
      const ok=()=>settle();const bad=()=>settle(new Error('Failed to load '+target.tagName));const cancel=()=>settle(abortError());
      const timer=this.later(()=>settle(new Error('Asset timeout')),timeout);
      target.addEventListener(success,ok,{once:true});target.addEventListener(fail,bad,{once:true});this.abort.signal.addEventListener('abort',cancel,{once:true});
      if(this.abort.signal.aborted)cancel();else if(ready())ok();
    });
  }
  async mountTheme(){
    this.savedTheme=this.doc.body.getAttribute('data-yn-theme');this.doc.body.setAttribute('data-yn-theme','');this.ownsTheme=true;
    this.wallpaper=this.element('div','yn-wallpaper');this.wallpaper.setAttribute('aria-hidden','true');this.wallpaper.style.setProperty('--yn-bg-position',this.config.theme.backgroundPosition);this.doc.body.prepend(this.wallpaper);
    if(this.config.theme.showScenery){const sky=this.element('div','yn-sky-motifs');sky.innerHTML=SKY_SVG.replaceAll('__ID__',uid());this.wallpaper.append(sky);}
    this.lakeUrl=this.config.theme.showScenery?this.asset('lake'):null;
    const scenery=this.lakeUrl?SCENERY_SVG.replaceAll('__LAKE_ART__',this.lakeUrl):null;
    this.adapter=new DSHAdapter(this.doc,this.config.adapter,this.config.theme.showKnots?KUMIHIMO_SVG:null,scenery);this.adapter.mount();
    const config=this.config.transition;
    let sceneryReady=Promise.resolve();
    if(scenery){
      this.sceneryImage=new Image();this.sceneryImage.decoding='async';
      const img=this.sceneryImage;
      sceneryReady=this.waitFor(img,'load','error',config.assetTimeoutMs,()=>img.complete&&img.naturalWidth>0).then(async()=>{
        try{await img.decode();}catch{}
      }).catch(e=>{if(e.name!=='AbortError')this.debug.sceneryError=e.message;});
      img.src=this.lakeUrl;
    }
    this.image=new Image();this.image.decoding='async';const image=this.image;
    const imageReady=this.waitFor(image,'load','error',config.assetTimeoutMs,()=>image.complete&&image.naturalWidth>0).then(async()=>{
      try{await image.decode();}catch{}if(this.state==='disposed')return;
      this.wallpaper.style.setProperty('--yn-wallpaper',`url("${image.src}")`);
    }).catch(e=>{if(e.name!=='AbortError')this.debug.backgroundError=e.message;});
    image.src=this.asset('background');
    await Promise.all([imageReady,sceneryReady]);
  }
  async mount(){
    if(this.state==='new')this.init();
    if(this.state!=='initialized'||!this.config.enabled)return this;
    if(ACTIVE.has(this.doc))throw new Error(PLUGIN_TITLE+' already mounted in this document');
    ACTIVE.set(this.doc,this);this.didMount=true;this.state='preloading';this.savedFocus=this.doc.activeElement;
    this.style=this.element('style','yn-'+PLUGIN_MODE+'-styles');this.style.textContent=THEME_CSS;this.doc.head.append(this.style);
    const themeReady=this.config.theme.enabled?this.mountTheme():Promise.resolve();
    if(!this.config.transition.enabled){
      await themeReady;
      if(this.state==='preloading'){this.state='ready';this.debug.reason='disabled';}
      return this;
    }
    this.overlay=this.element('div','yn-intro');this.overlay.setAttribute('role','dialog');this.overlay.setAttribute('aria-modal','true');this.overlay.setAttribute('aria-label','启动动画，单击或按 Escape 跳过');this.overlay.tabIndex=-1;
    this.visual=this.element('div','yn-intro-visual');this.video=this.element('video','yn-video');this.video.muted=true;this.video.defaultMuted=true;this.video.playsInline=true;this.video.setAttribute('playsinline','');this.video.setAttribute('muted','');this.video.preload='auto';this.video.disablePictureInPicture=true;this.video.style.objectFit=this.config.transition.objectFit;
    const hint=this.element('button','yn-intro-hint');hint.type='button';hint.textContent='单击画面跳过 · Esc';
    this.soundButton=this.element('button','yn-intro-hint yn-intro-sound');this.soundButton.type='button';this.soundButton.dataset.ynSound='';this.audioRequest=0;this.updateAudioControl();
    this.visual.append(this.video);this.overlay.append(this.visual,hint,this.soundButton);this.doc.body.append(this.overlay);this.overlay.focus({preventScroll:true});
    this.shield=new InputShield(this);this.shield.mount();
    this.startDeadline=this.later(()=>this.finish('startup-timeout'),this.config.transition.assetTimeoutMs+1000);
    this.motion=this.win.matchMedia('(prefers-reduced-motion: reduce)');
    this.listen(this.motion,'change',e=>{if(e.matches&&this.config.transition.respectReducedMotion)this.finish('reduced-motion');});
    this.listen(this.win,'resize',()=>{if(this.state==='revealing'&&this.debug.transitionStyle==='ripple')this.complete();});
    this.listen(this.doc,'visibilitychange',()=>{if(this.doc.hidden&&this.state==='playing')this.finish('hidden');});
    const config=this.config.transition;
    if(config.respectReducedMotion&&this.motion.matches){
      await themeReady;if(this.state!=='disposed')this.finish('reduced-motion');return this;
    }
    const videoReady=this.waitFor(this.video,'loadeddata','error',config.assetTimeoutMs,()=>this.video.readyState>=2);
    this.videoUrl=this.asset('video');this.video.src=this.videoUrl;
    this.listen(this.video,'timeupdate',()=>{
      if(this.state!=='playing')return;
      this.lastProgress=performance.now();
      const left=(this.video.duration-this.video.currentTime)*1000;
      // For the default dissolve, start one fade-duration before the end.
      // The real interface is prepared before its first visible fade frame.
      const lead=config.revealStyle==='fade'?Math.max(config.prepareBeforeEndMs,config.revealMs):config.prepareBeforeEndMs;
      if(Number.isFinite(left)&&left<=lead)this.finish('normal');
    });
    this.listen(this.video,'ended',()=>this.finish('ended'));
    this.listen(this.video,'error',()=>{if(this.state==='playing')this.finish('video-error');});
    try{
      await Promise.all([themeReady,videoReady]);
      if(this.state!=='preloading')return this;
      this.overlay.dataset.videoReady='';
      await this.startPlayback();
      if(this.state!=='preloading'){this.video?.pause();return this;}
      this.state='playing';this.clearTimer(this.startDeadline);this.lastProgress=performance.now();
      const watchdog=()=>{if(this.state!=='playing')return;if(performance.now()-this.lastProgress>config.stalledTimeoutMs)this.finish('stalled');else this.watchdog=this.later(watchdog,1000);};
      this.watchdog=this.later(watchdog,1000);this.deadline=this.later(()=>this.finish('playback-timeout'),config.maxPlaybackMs);
    }catch(e){if(e.name!=='AbortError'&&this.state!=='disposed')this.finish('video-fallback');}
    return this;
  }
  prepare(){if(this.state==='disposed')return;this.adapter?.sync();this.debug.preparedAt=performance.now();}
  center(){
    const w=this.win.innerWidth,h=this.win.innerHeight,vw=this.video?.videoWidth||1280,vh=this.video?.videoHeight||720;
    const s=this.config.transition.objectFit==='contain'?Math.min(w/vw,h/vh):Math.max(w/vw,h/vh);
    return {x:(w-vw*s)/2+vw*s*this.config.transition.rippleCenter.x,y:(h-vh*s)/2+vh*s*this.config.transition.rippleCenter.y,w,h};
  }
  circleReveal(ms){
    const {x,y,w,h}=this.center(),id=uid();
    const svg=this.doc.createElementNS(SVG_NS,'svg');svg.classList.add('yn-intro-mask-defs');svg.dataset.ynOwned='mask';svg.setAttribute('aria-hidden','true');
    const defs=this.doc.createElementNS(SVG_NS,'defs'),mask=this.doc.createElementNS(SVG_NS,'mask');mask.id=id;
    for(const [k,v] of Object.entries({maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:0,y:0,width:w,height:h}))mask.setAttribute(k,String(v));
    mask.style.maskType='luminance';
    const rect=this.doc.createElementNS(SVG_NS,'rect');rect.setAttribute('width',String(w));rect.setAttribute('height',String(h));rect.setAttribute('fill','white');
    const circle=this.doc.createElementNS(SVG_NS,'circle');circle.setAttribute('r','1');circle.setAttribute('fill','black');circle.style.transformOrigin='0px 0px';circle.style.willChange='transform';
    mask.append(rect,circle);defs.append(mask);svg.append(defs);this.overlay.append(svg);
    this.visual.style.maskImage=`url("#${id}")`;this.visual.style.webkitMaskImage=`url("#${id}")`;
    const r=Math.max(Math.hypot(x,y),Math.hypot(w-x,y),Math.hypot(x,h-y),Math.hypot(w-x,h-y))+3;
    const anim=circle.animate([{transform:`translate(${x}px,${y}px) scale(0.01)`},{transform:`translate(${x}px,${y}px) scale(${r})`}],{duration:ms,easing:'cubic-bezier(.16,.68,.24,1)',fill:'forwards'});
    return anim;
  }
  finish(reason='skip'){
    if(['revealing','ready','disposed','new','initialized'].includes(this.state))return;
    this.debug.reason=reason;this.prepare();this.state='revealing';
    // Keep playing on normal tail reveal; freeze immediately on user skip.
    if(reason!=='normal')this.video?.pause();
    this.clearTimer(this.watchdog);this.clearTimer(this.deadline);
    this.clearTimer(this.startDeadline);
    const t=this.config.transition,reduced=t.respectReducedMotion&&this.motion?.matches;
    const ms=reduced?Math.min(t.fallbackMs,120):reason==='skip'?t.skipMs:['normal','ended'].includes(reason)?t.revealMs:t.fallbackMs;
    const circle= !reduced && t.revealStyle==='ripple' && ['normal','skip','ended'].includes(reason) && this.win.CSS?.supports('mask-image','url("#mask")');
    const fade=()=>this.overlay.animate([{opacity:1},{opacity:0}],{duration:ms,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
    this.debug.transitionStyle=circle?'ripple':'fade';this.debug.revealMs=ms;this.debug.revealAtVideoTime=this.video?.currentTime;
    let anim;
    try{anim=circle?this.circleReveal(ms):fade();}
    catch{this.debug.transitionStyle='fade';anim=fade();}
    this.animations.add(anim);anim.finished.then(()=>this.complete(),()=>{});
    // Bounded escape if WAAPI completion stalls in a hidden WebView.
    this.finishDeadline=this.later(()=>this.complete(),ms+35);
  }
  releaseVideo(){if(!this.video)return;this.video.pause();this.video.removeAttribute('src');try{this.video.load();}catch{}this.video.remove();this.video=null;if(this.urls.has(this.videoUrl)){URL.revokeObjectURL(this.videoUrl);this.urls.delete(this.videoUrl);}}
  complete(){if(this.state!=='revealing')return;this.state='ready';this.clearTimer(this.finishDeadline);
    for(const anim of this.animations)anim.cancel();this.animations.clear();this.releaseVideo();this.overlay?.remove();this.overlay=null;
    if(this.savedFocus?.isConnected&&this.savedFocus!==this.doc.body)this.savedFocus.focus({preventScroll:true});this.shield?.ready();
  }
  unmount(){if(this.state==='disposed')return;const restoreFocus=this.overlay?.contains(this.doc.activeElement);this.state='disposed';this.abort?.abort();this.shield?.dispose();
    for(const id of this.timers)clearTimeout(id);this.timers.clear();for(const a of this.animations)a.cancel();this.animations.clear();
    this.releaseVideo();this.image?.removeAttribute('src');this.image=null;this.sceneryImage?.removeAttribute('src');this.sceneryImage=null;this.overlay?.remove();this.adapter?.unmount();this.wallpaper?.remove();this.style?.remove();
    if(this.ownsTheme){if(this.savedTheme==null)this.doc.body.removeAttribute('data-yn-theme');else this.doc.body.setAttribute('data-yn-theme',this.savedTheme);this.ownsTheme=false;}
    for(const u of this.urls)URL.revokeObjectURL(u);this.urls.clear();if(ACTIVE.get(this.doc)===this)ACTIVE.delete(this.doc);
    if(restoreFocus&&this.savedFocus?.isConnected&&this.savedFocus!==this.doc.body)this.savedFocus.focus({preventScroll:true});
  }
}

export function createYourNamePlugin(config={},options={}) {return new YourNamePlugin(options).init(config);}
export const name=PLUGIN_ENTRY;
export const inject=[];
/** Actual DSH/Cordis browser entry. The host owns disposal through effect. */
export function apply(ctx){
  return ctx.effect(()=>{const plugin=createYourNamePlugin();plugin.mount().catch(error=>{console.error('[Your Name]',error);plugin.unmount();});return()=>plugin.unmount();},'your-name: '+PLUGIN_MODE);
}

````

## src/sidebar-scenery.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" class="yn-sidebar-art" viewBox="0 0 300 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="__ID__-sky" x1="40" y1="0" x2="270" y2="900" gradientUnits="userSpaceOnUse"><stop stop-color="#15244c"/><stop offset=".5" stop-color="#242951" stop-opacity=".12"/><stop offset="1" stop-color="#355580" stop-opacity=".64"/></linearGradient>
    <linearGradient id="__ID__-blue"><stop stop-color="#c8f4ff" stop-opacity="0"/><stop offset=".74" stop-color="#9cdbff" stop-opacity=".5"/><stop offset="1" stop-color="#f5fbff"/></linearGradient>
    <linearGradient id="__ID__-pink"><stop stop-color="#edc0fa" stop-opacity="0"/><stop offset="1" stop-color="#f3a8d4" stop-opacity=".8"/></linearGradient>
    <!-- Quiet sky dissolves into the host sidebar; terrain below stays legible. -->
    <linearGradient id="__ID__-landscape-fade" x1="0" y1="450" x2="0" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="white" stop-opacity="0"/>
      <stop offset=".18" stop-color="white" stop-opacity="0"/>
      <stop offset=".35" stop-color="white" stop-opacity=".64"/>
      <stop offset=".48" stop-color="white"/>
      <stop offset="1" stop-color="white"/>
    </linearGradient>
    <mask id="__ID__-landscape-mask" maskUnits="userSpaceOnUse" x="0" y="450" width="300" height="450" style="mask-type:alpha">
      <path d="M0 450H300V900H0Z" fill="url(#__ID__-landscape-fade)"/>
    </mask>
    <linearGradient id="__ID__-fallback-water"><stop stop-color="#293951"/><stop offset=".55" stop-color="#4b5b73"/><stop offset="1" stop-color="#22374c"/></linearGradient>
  </defs>
  <path fill="url(#__ID__-sky)" d="M0 0H300V900H0z"/>
  <!-- Independent landscape asset; __LAKE_ART__ is replaced with a managed Blob URL.
       Both portrait aspect and original pixel geometry are preserved. No HTTP fetch. -->
  <g class="yn-lake-scene" mask="url(#__ID__-landscape-mask)">
    <!-- Muted terrain fallback is visible only if the embedded painting fails. -->
    <g class="yn-lake-fallback" opacity=".7">
      <path d="M0 669Q42 655 87 664Q129 651 170 660Q226 649 300 663V900H0Z" fill="#2c3653"/>
      <path d="M0 718Q45 703 92 714Q150 701 217 713Q257 704 300 718V900H0Z" fill="#28324b"/>
      <path d="M33 761C63 736 119 732 161 737C208 736 258 752 267 772C275 803 224 828 157 833C82 833 31 812 33 782Z" fill="url(#__ID__-fallback-water)"/>
      <path d="M0 843Q53 820 91 847Q150 832 199 847Q252 821 300 841V900H0Z" fill="#1d263e"/>
    </g>
    <image class="yn-lake-art" x="0" y="450" width="300" height="450" preserveAspectRatio="xMidYMid slice" href="__LAKE_ART__"/>
  </g>
  <g class="yn-scene-stars" fill="#d8eaff"><circle cx="35" cy="70" r="1"/><circle cx="245" cy="104" r="1.2"/><circle cx="90" cy="190" r=".8"/><circle cx="275" cy="260" r=".8"/><circle cx="25" cy="350" r="1.1"/><circle cx="227" cy="420" r=".7"/><circle cx="47" cy="532" r="1"/><circle cx="181" cy="515" r=".7"/><circle cx="273" cy="582" r="1.1"/><circle cx="109" cy="604" r=".7"/></g>
  <!-- The approved blue/rose comet is retained byte-for-byte. -->
  <g class="yn-scene-comet">
    <path d="M34 365Q106 397 217 498" stroke="url(#__ID__-blue)" stroke-width="5" stroke-linecap="round"/>
    <path d="M30 365Q116 406 217 498" stroke="url(#__ID__-blue)" stroke-width="1.2"/>
    <path d="M76 400Q147 442 247 538" stroke="url(#__ID__-pink)" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="217" cy="498" r="3" fill="#ebfaff"/><circle cx="247" cy="538" r="1.9" fill="#f8cee7"/>
  </g>
</svg>

````

## src/sky-motifs.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="__ID__-comet" x1="854" y1="20" x2="1428" y2="273" gradientUnits="userSpaceOnUse"><stop stop-color="#abdaff" stop-opacity="0"/><stop offset=".7" stop-color="#b3e5ff" stop-opacity=".55"/><stop offset="1" stop-color="#ecfbff"/></linearGradient>
    <linearGradient id="__ID__-fragment" x1="1050" y1="80" x2="1490" y2="321" gradientUnits="userSpaceOnUse"><stop stop-color="#d6b7ff" stop-opacity="0"/><stop offset="1" stop-color="#ffc7df" stop-opacity=".8"/></linearGradient>
    <radialGradient id="__ID__-star"><stop stop-color="#e5f8ff" stop-opacity=".6"/><stop offset="1" stop-color="#a8d7ff" stop-opacity="0"/></radialGradient>
  </defs>
  <g class="yn-sky-comet">
    <path d="M854 20Q1152 108 1428 273" stroke="url(#__ID__-comet)" stroke-width="6" stroke-linecap="round"/>
    <path d="M865 16Q1158 111 1428 273" stroke="url(#__ID__-comet)" stroke-width="1.4"/>
    <path d="M1050 80Q1307 191 1490 321" stroke="url(#__ID__-fragment)" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="1428" cy="273" r="20" fill="url(#__ID__-star)"/><circle cx="1428" cy="273" r="2.6" fill="#ebfaff"/>
    <circle cx="1490" cy="321" r="1.6" fill="#ffdeed"/>
  </g>
  <g class="yn-distant-clouds" stroke="#d6e5f8" stroke-opacity=".14" stroke-width="1.1">
    <path d="M270 143Q340 124 399 140Q445 108 519 135Q582 124 638 140M286 152Q471 137 650 150"/>
    <path d="M1110 894Q1187 857 1269 879Q1344 848 1429 870Q1490 853 1565 876M1144 901Q1350 886 1585 891"/>
  </g>
  <g class="yn-orbit-lines" stroke="#bfd8ee" stroke-opacity=".09" stroke-width=".8"><path d="M990 -60C1360 43 1505 170 1634 348M1030 -90C1422 32 1550 169 1663 329"/></g>
  <g fill="#dceeff" class="yn-sky-stars"><circle cx="1198" cy="75" r="1.1"/><circle cx="1507" cy="116" r="1.2"/><circle cx="1330" cy="61" r=".8"/><circle cx="1105" cy="202" r="1"/><circle cx="1538" cy="431" r="1.2"/><circle cx="360" cy="848" r=".9"/><circle cx="1174" cy="818" r=".8"/></g>
</svg>

````

## src/theme.css

````css
/* Owned namespace only. No host content is reparented or replaced. */
body[data-yn-theme] {
  --yn-text:#f5f7ff; --yn-muted:#c3cede; --yn-red:#ec8795;
  --yn-surface:rgba(13,21,37,.94); --yn-border:rgba(238,178,161,.24);
  /* Pair foreground AND surface tokens. DSH uses bg-layer-1/2/3,
     not bg-l1/l2. In a light host the old incomplete palette left dialogs,
     file cards and code cards white while their text was already light.
     Important applies only to theme tokens while this owned marker exists;
     it also covers body-portaled dialogs and host dark-mode stylesheet order. */
  --dsw-alias-label-primary:#f5f7ff !important;
  --dsw-alias-label-secondary:#dce4f2 !important;
  --dsw-alias-label-tertiary:#c3cede !important;
  --dsw-alias-label-caption:#c3cede !important;
  --dsw-alias-label-dimmed:#aebdd3 !important;
  --dsw-alias-label-primary-dimmed:#dce4f2 !important;
  --dsw-alias-label-primary-bluish:#e6eeff !important;
  --dsw-alias-label-primary-inverted:#0b1426 !important;
  --dsw-alias-label-primary-foreground:#0b1426 !important;
  --dsw-alias-bg-base:#101a2c !important;
  --dsw-alias-bg-layer-1:#142038 !important;
  --dsw-alias-bg-layer-2:#18253c !important;
  --dsw-alias-bg-layer-3:#22324c !important;
  --dsw-alias-bg-l1:#142038 !important;
  --dsw-alias-bg-l2:#18253c !important;
  --dsw-alias-bg-overlay:#28364c !important;
  --dsw-alias-bg-module-platform:#142038 !important;
  --dsw-alias-bg-multi-select:#22324c !important;
  --dsw-alias-bg-mask-1:rgba(3,7,18,.58) !important;
  --dsw-alias-bg-mask-2:rgba(3,7,18,.28) !important;
  --dsw-alias-bg-mask-3:rgba(3,7,18,.72) !important;
  --dsw-alias-bg-mask-drop:rgba(13,21,37,.9) !important;
  --dsw-alias-bg-skeleton:rgba(195,206,222,.12) !important;
  --dsw-alias-border-l1:#34435b !important;
  --dsw-alias-border-l2:#43516a !important;
  --dsw-alias-border-l2-darkmode-thin:#43516a !important;
  --dsw-alias-border-l3:#53617a !important;
  --dsw-alias-border-l4:#6b7b96 !important;
  --dsw-alias-brand-primary:#f5f7ff !important;
  --dsw-alias-brand-text:#f5f7ff !important;
  --dsw-alias-button-primary-fill:#f5f7ff !important;
  --dsw-alias-button-primary-hover:#dce4f2 !important;
  --dsw-alias-button-primary-dimmed:#43516a !important;
  --dsw-alias-button-contrast-fill:#f5f7ff !important;
  --dsw-alias-button-elevated-fill:#28364c !important;
  --dsw-alias-button-floating-fill:#18253c !important;
  --dsw-alias-button-floating-hover:#28364c !important;
  --dsw-alias-button-ghost-active-fill:#28364c !important;
  --dsw-alias-button-ghost-active-hover:#34435b !important;
  --dsw-alias-button-tool-bar-fill:#28364c !important;
  --dsw-alias-button-tool-bar-hover:#34435b !important;
  --dsw-alias-interactive-bg-hover:#28364c !important;
  --dsw-alias-interactive-bg-hover-solid:#28364c !important;
  --dsw-alias-interactive-bg-active:#34435b !important;
  --dsw-alias-interactive-bg-hover-danger:rgba(255,150,163,.12) !important;
  --dsw-alias-menu-icon:#dce4f2 !important;
  --dsw-menu-surface-fill:rgba(20,32,56,.98) !important;
  --dsw-alias-menu-group-header-fill:#18253c !important;
  --dsw-specific-menu:rgba(20,32,56,.98) !important;
  --dsw-specific-input-major:#142038 !important;
  --dsw-specific-login-input:#142038 !important;
  --dsw-specific-selector:#22324c !important;
  --dsw-specific-tip:#22324c !important;
  --dsw-specific-sidebar-fill:#101a2c !important;
  --dsw-specific-sidebar-nav-item-active:#28364c !important;
  --dsw-specific-sidebar-nav-item-active-accent:#34435b !important;
  --dsw-specific-bubble:#18253c !important;
  --dsw-specific-bubble-highlight:#28364c !important;
  --dsw-alias-markdown-code-block:#101a2c !important;
  --dsw-alias-markdown-code-block-banner:#142038 !important;
  --dsw-alias-markdown-inline-code:#22324c !important;
  --dsw-alias-markdown-citation:#28364c !important;
  --dsw-alias-markdown-tag:#22324c !important;
  --dsw-alias-markdown-placeholder:#142038 !important;
  --dsw-alias-markdown-code-segment-selected:#28364c !important;
  --dsw-alias-markdown-code-segment-unselected:#142038 !important;
  --dsw-alias-state-error-primary:#ff96a3 !important;
  --dsw-alias-state-error-secondary:#ff96a3 !important;
  --dsw-alias-state-success-primary:#85ddb4 !important;
  --dsw-alias-state-success-secondary:#85ddb4 !important;
  --dsw-alias-state-business-primary:#a6c7ff !important;
  --dsw-alias-state-warn-primary:#f6cb87 !important;
  --dsw-alias-state-warn-label:#f6cb87 !important;
  --dsw-alias-link:#bcd3ff !important;
  --dsw-alias-code-diff-added:#18382e !important;
  --dsw-alias-code-diff-deleted:#3b2535 !important;
  --dsw-alias-file-diff-added-bg:#18382e !important;
  --dsw-alias-file-diff-added-gutter:#122c25 !important;
  --dsw-alias-file-diff-added-marker:#85ddb4 !important;
  --dsw-alias-file-diff-deleted-bg:#3b2535 !important;
  --dsw-alias-file-diff-deleted-gutter:#30202c !important;
  --dsw-alias-file-diff-deleted-marker:#ff96a3 !important;
  color:var(--yn-text); background:#0b1426 !important; isolation:isolate;
  color-scheme:dark;
}
.yn-wallpaper { position:fixed;inset:0;z-index:-1;pointer-events:none;background-color:#0b1426;
  background-image:linear-gradient(105deg,rgba(9,17,33,.72),rgba(15,23,42,.56) 60%,rgba(15,23,42,.7)),var(--yn-wallpaper,none);
  background-size:cover;background-position:var(--yn-bg-position,58% 50%); }
body[data-yn-theme] .yn-app, body[data-yn-theme] .yn-main {
  background:transparent !important;background-image:none !important;color:var(--yn-text) !important;
}
body[data-yn-theme] .yn-clear {background:transparent !important;background-image:none !important;}
body[data-yn-theme] .yn-sidebar {
  position:relative;background:#0a1222 !important;background-image:none !important;
  color:var(--yn-text) !important;border-right:1px solid var(--yn-border) !important;
  box-shadow:12px 0 42px rgba(3,7,18,.16);isolation:isolate;
}
.yn-sidebar-scenery {position:absolute;inset:0;pointer-events:none;z-index:-1;overflow:hidden;border-radius:inherit;
  background:radial-gradient(ellipse at 74% 48%,rgba(107,89,157,.22),transparent 60%),linear-gradient(175deg,#101a35,#18213f 53%,#253a5a);}
.yn-sidebar-scenery::after {content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(180deg,transparent 86%,rgba(10,18,34,.84) 100%);}
.yn-sidebar-art {position:absolute;inset:0;width:100%;height:100%;opacity:.86;}
.yn-scene-stars {opacity:.56;}
.yn-scene-comet {opacity:.72;}
.yn-lake-scene {opacity:.93;}
.yn-sky-motifs {position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.yn-sky-motifs>svg {width:100%;height:100%;}
.yn-sky-comet {opacity:.55;}
.yn-sky-stars {opacity:.45;}
.yn-distant-clouds {opacity:.8;}
body[data-yn-theme] .yn-sidebar :where(p,span,label,small,button,a,[role="treeitem"]) {color:inherit !important;}
body[data-yn-theme] .yn-sidebar :where(button,[role="button"],[role="treeitem"],a) {
  background-color:rgba(15,25,43,.94) !important;border-color:var(--yn-border) !important;
  transition:transform 160ms ease,opacity 160ms ease;will-change:transform,opacity;
}
body[data-yn-theme] .yn-sidebar :where(button,[role="button"],[role="treeitem"],a):hover {transform:translateX(2px);opacity:.85;}
body[data-yn-theme] :where(button,a,input,textarea,[contenteditable],[tabindex]):focus-visible {
  outline:2px solid #ffb9ad !important;outline-offset:3px;
}
body[data-yn-theme] .yn-header {background:rgba(12,21,37,.94) !important;color:var(--yn-text) !important;
  background-image:none !important;border-bottom:1px solid var(--yn-border) !important;}
body[data-yn-theme] .yn-header :where(span,button,p) {color:inherit !important;}
body[data-yn-theme] .yn-message {
  color:#f5f7ff !important;background:rgba(13,21,37,.94) !important;background-image:none !important;
  border:1px solid rgba(219,192,182,.2) !important;border-radius:16px !important;
  padding:18px 22px !important;box-shadow:0 12px 36px rgba(0,0,0,.12);
  line-height:1.75;overflow-wrap:anywhere;
}
/* Let token-driven descendants keep success/error and syntax colors. */
body[data-yn-theme] .yn-message a {color:#ffd3b4 !important;text-decoration:underline;text-underline-offset:3px;}
body[data-yn-theme] .yn-message :where(pre,code) {background:#080f1e !important;color:#e8edf8 !important;border-radius:6px;}
body[data-yn-theme] .yn-message pre {overflow:auto;padding:14px;}
body[data-yn-theme] .yn-message table {border-collapse:collapse;}
body[data-yn-theme] .yn-message :where(td,th) {border:1px solid #53617a;padding:7px 12px;}
/* Both semantic dialogs and CSS-module card exports are mapped by the
   adapter. Never fill the modal root/mask or style every div/button white. */
body[data-yn-theme] .yn-surface {
  color:var(--yn-text) !important;background-color:#142038 !important;
  border-color:#53617a !important;
  --dsl-code-block-background:#142038;
}
body[data-yn-theme] .yn-surface :where(input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),textarea,select) {
  background-color:#101a2c !important;color:#f5f7ff !important;caret-color:#ffc7bb;
  border-color:#6b7b96 !important;
}
body[data-yn-theme] .yn-surface :where(input,textarea)::placeholder {color:#aebdd3 !important;opacity:1;}
body[data-yn-theme] .yn-composer {
  position:relative;background:rgba(13,21,37,.94) !important;background-image:none !important;
  color:#f5f7ff !important;border:1px solid rgba(236,135,149,.6) !important;border-radius:20px !important;
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  box-shadow:0 0 0 1px rgba(236,135,149,.08),0 0 24px rgba(160,45,69,.12),0 15px 42px rgba(0,0,0,.25);
}
body[data-yn-theme] .yn-composer :where(textarea,[contenteditable],input) {
  background:transparent !important;color:#f5f7ff !important;caret-color:#ffc7bb;
  border-color:transparent !important;box-shadow:none !important;
}
body[data-yn-theme] .yn-composer :where(textarea,input)::placeholder {color:#c3cede !important;opacity:1;}
body[data-yn-theme] .yn-composer :where(button,span,label,small) {color:#dce4f2 !important;}
body[data-yn-theme] .yn-composer button {background-color:rgba(37,49,69,.8) !important;}
/* Preserve native caption-control positioning and brand chrome. In particular,
   Windows pins the existing toggle in the titlebar, not in the logo row. */
body[data-yn-theme] .yn-sidebarToggle,
body[data-yn-theme] .yn-sidebarToggle:hover,
body[data-yn-theme] .yn-logo,
body[data-yn-theme] .yn-logo:hover {
  background-color:transparent !important;transform:none !important;opacity:1 !important;will-change:auto;
}
body[data-yn-theme] .yn-brandRow {overflow:visible !important;}
body[data-yn-theme] .yn-logo {position:relative;isolation:isolate;overflow:visible !important;
  --dsw-alias-label-primary-inverted:#0b1426;}
/* Keep the identity itself bounded while allowing its separate cord to extend
   below it. Do not reparent React-owned content or disable the native toggle. */
body[data-yn-theme] .yn-logo>:not(.yn-knot) {min-width:0;max-width:100%;overflow:hidden;}
.yn-knot {position:absolute;pointer-events:none;user-select:none;z-index:2;height:40px;left:6px;right:6px;bottom:-18px;overflow:visible;}
.yn-knot svg {width:100%;height:100%;overflow:visible;}
.yn-logo>.yn-knot {height:18px;left:0;right:0;top:calc(100% - 3px);bottom:auto;}
.yn-composer>.yn-knot {top:-25px;bottom:auto;height:38px;left:12%;right:12%;}
.yn-knot-breath {animation:yn-breath 5s ease-in-out infinite;transform-origin:center;will-change:transform,opacity;}
.yn-thread-glint {animation:yn-glint 8s ease-in-out infinite;will-change:transform,opacity;}
@keyframes yn-breath {0%,100%{opacity:.76;transform:translateY(0)}50%{opacity:1;transform:translateY(-1px)}}
@keyframes yn-glint {0%,32%{transform:translateX(0);opacity:0}40%{opacity:.55}80%{transform:translateX(680px);opacity:.55}81%,100%{transform:translateX(680px);opacity:0}}
body[data-yn-theme] .yn-legacy-decor {visibility:hidden !important;pointer-events:none !important;}
@media(prefers-reduced-motion:reduce) {.yn-knot * {animation:none !important;}body[data-yn-theme] *{scroll-behavior:auto !important;}}
@supports not (backdrop-filter:blur(1px)) {body[data-yn-theme] .yn-composer{background:#101a2c !important;}}
@media(max-width:700px){body[data-yn-theme] .yn-message{padding:14px 16px !important;}.yn-composer>.yn-knot{left:8%;right:8%;}}

````

## scripts/build.mjs

````javascript
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=p=>readFile(path.join(root,p),'utf8');
const [config,runtime,manifest]=await Promise.all(['src/config.js','src/runtime.js','package.json'].map(read));
const pkg=JSON.parse(manifest),mode=pkg.yourName.component;
if(!['theme','startup'].includes(mode))throw new Error('Invalid yourName.component');
const css=await read(mode==='theme'?'src/theme.css':'src/intro.css');
const [svg,scenery,sky]=mode==='theme'?await Promise.all(['src/kumihimo.svg','src/sidebar-scenery.svg','src/sky-motifs.svg'].map(read)):['','',''];
const assets={};
const files=mode==='theme'?[['background','bg_image.jpg','image/jpeg'],['lake','sidebar-lake.webp','image/webp']]:[['video','transition.mp4','video/mp4']];
for(const [kind,file,mime] of files)assets[kind]={mime,base64:(await readFile(path.join(root,'assets',file))).toString('base64')};
const meta=JSON.parse(await read('locale/zh.json')).meta;
const factory=`const PLUGIN_MODE=${JSON.stringify(mode)};\nconst PLUGIN_TITLE=${JSON.stringify(meta.title)};\nconst PLUGIN_ENTRY=${JSON.stringify(pkg.yourName.entry)};\n${config.replace(/^export /gm,'')}\nconst THEME_CSS=${JSON.stringify(css)};\nconst KUMIHIMO_SVG=${JSON.stringify(svg)};\nconst SCENERY_SVG=${JSON.stringify(scenery)};\nconst SKY_SVG=${JSON.stringify(sky)};\nconst BUNDLED_ASSETS=${JSON.stringify(assets)};\n${runtime.replace(/^export /gm,'')}\nreturn {name,inject,apply,createYourNamePlugin,YourNamePlugin,DSHAdapter};`;
const output=`/* 君の名はdsh ${pkg.version} · ${mode}. Generated by scripts/build.mjs. */\n(()=>{'use strict';window.__ModuleLoader__.load({id:${JSON.stringify(pkg.name)},factory:function(require){\n${factory}\n}});})();\n`;
await mkdir(path.join(root,'lib'),{recursive:true});
await writeFile(path.join(root,'lib/client.js'),output);
await writeFile(path.join(root,'lib/index.js'),await read('src/host.js'));
console.log(`Built DSH lazy-CJS client: ${(Buffer.byteLength(output)/1048576).toFixed(2)} MiB (offline media included)`);

````

## scripts/serve.mjs

````javascript
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
export const startupRoot=process.env.DSH_STARTUP_ROOT||[
  path.resolve(root,'../your-name-dsh-startup'),
  path.resolve(root,'../君の名はdsh-启动动画'),
].find(existsSync)||path.resolve(root,'../your-name-dsh-startup');
export function createServer(){return http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,'http://localhost');let relative=decodeURIComponent(u.pathname);if(relative==='/')relative='/preview/index.html';
    // Local development preview only: expose the independent sibling package.
    const base=relative.startsWith('/startup/')?startupRoot:root;
    if(base!==root)relative=relative.slice('/startup'.length);
    const file=path.resolve(base,'.'+relative);if(!file.startsWith(base+path.sep)){res.writeHead(403);return res.end();}
    const size=(await stat(file)).size;const ext=path.extname(file);const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.json':'application/json'}[ext]||'application/octet-stream';
    const data=await readFile(file);const match=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    const headers={'content-type':mime,'cache-control':'no-store','accept-ranges':'bytes','x-content-type-options':'nosniff'};
    if(match){const start=+match[1],end=match[2]?Math.min(+match[2],size-1):size-1;if(start>end||start>=size){res.writeHead(416,{'content-range':`bytes */${size}`});return res.end();}res.writeHead(206,{...headers,'content-range':`bytes ${start}-${end}/${size}`,'content-length':end-start+1});res.end(data.subarray(start,end+1));}
    else{res.writeHead(200,{...headers,'content-length':size});res.end(data);}
  }catch{res.writeHead(404);res.end('Not found');}
});}
if(process.argv[1]===fileURLToPath(import.meta.url))createServer().listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));

````

## tests/components.mjs

````javascript
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import vm from 'node:vm';
import {createServer,root,startupRoot} from '../scripts/serve.mjs';
const req=createRequire(import.meta.url);
const {chromium}=req(req.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES].filter(Boolean)}));
const browser=await chromium.launch({headless:true,executablePath:process.env.DSH_TEST_CHROME||undefined,args:['--no-sandbox']});
const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}/`;
const results=[],errors=[];
async function run(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e);}}
async function page(query='?off',options={}){const context=await browser.newContext({viewport:{width:1400,height:900},...options});const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(url+query);await p.evaluate(()=>window.__previewReady);return p;}
const playing=p=>p.waitForFunction(()=>window.__previewPlugin?.state==='playing');
const ready=p=>p.waitForFunction(()=>window.__previewPlugin?.state==='ready');

// Minimal host-owned fixtures use the real DSH exported module names and
// paired design tokens, including body-portaled modal cards. They are not
// injected into production and never claim to reproduce an installed DSH.
async function fixture(p){await p.evaluate(()=>{
  const palette=document.createElement('style');palette.dataset.qa='palette';palette.textContent=`
    body{--dsw-alias-bg-layer-2:white;--dsw-specific-input-major:white;--dsw-alias-markdown-code-block:#fafafa;--dsw-alias-label-primary:#0f1115;--dsw-alias-label-secondary:#61666b;--dsw-alias-label-tertiary:#81858c;--dsw-alias-label-dimmed:#e1e5ee;--dsw-alias-label-primary-foreground:white;--dsw-alias-button-primary-fill:#0f1115;--dsw-alias-state-error-primary:#ec1313;--dsw-alias-state-success-primary:#22c55e}
    body[data-ds-dark-theme]{--dsw-alias-bg-layer-2:#2c2c2e;--dsw-alias-label-primary:#f9fafb}
    .qa-cards{position:fixed;left:310px;top:130px;width:690px;z-index:40;display:grid;gap:16px}
    .qa-row{display:flex;gap:16px}.qa-row>*{flex:1;min-width:0}
    .qa-card{padding:18px 20px;border:1px solid #ddd;border-radius:16px}
    .qa-title{color:var(--dsw-alias-label-primary);font-weight:600}
    .qa-meta{color:var(--dsw-alias-label-tertiary);font-size:12px}
    .qa-label{color:var(--dsw-alias-label-secondary)}
    .qa-added{color:var(--dsw-alias-state-success-primary)}
    .qa-deleted,.qa-danger{color:var(--dsw-alias-state-error-primary)}
    .native_file_card{background:var(--dsw-specific-input-major)}
    .native_code_card{background:var(--dsw-alias-markdown-code-block)}
    .qa-code-header{background:var(--dsw-alias-markdown-code-block);border-bottom:1px solid #53617a;padding-bottom:10px;margin-bottom:10px}
    .native_modal_dialog{position:fixed;z-index:45;right:70px;top:470px;width:390px;background:var(--dsw-alias-bg-layer-2);padding:24px;border-radius:24px;box-shadow:0 24px 80px #0006}
    .qa-modal-body{color:var(--dsw-alias-label-primary);margin:18px 0 36px}
    .qa-actions{display:flex;justify-content:flex-end;gap:8px}
    .qa-actions button,.qa-close{font:inherit;background:transparent;border:1px solid #8190a7;border-radius:10px;padding:8px 12px}
    .qa-cancel,.qa-close{color:var(--dsw-alias-label-primary)}
    .qa-close{float:right;border:none;padding:0}
    .qa-primary{background:var(--dsw-alias-button-primary-fill)!important;color:var(--dsw-alias-label-primary-foreground)}
    .native_input_wrap{padding:12px;border:1px solid #8190a7;border-radius:10px;margin-bottom:16px}
    .qa-input{background:transparent;color:var(--dsw-alias-label-primary);border:0;width:100%;font:inherit}
    .qa-input::placeholder{color:var(--dsw-alias-label-dimmed)}
  `;document.head.append(palette);
  for(const [module,text] of [
    ['ui-primitives/Modal.module.css','.native_modal_dialog {background:var(--dsw-alias-bg-layer-2)}'],
    ['ui-primitives/CodeCard.module.css','.native_code_card {background:var(--dsw-alias-markdown-code-block)}'],
    ['ui-attachment/FileCard.module.css','.native_file_card {background:var(--dsw-specific-input-major)}'],
    ['ui-primitives/Input.module.css','.native_input_wrap {background:var(--dsw-alias-bg-layer-1)}'],
  ]){const s=document.createElement('style');s.dataset.pluginCss='@deepseek-ai/dsh-client-'+module;s.textContent=text;document.head.append(s);}
  const cards=document.createElement('section');cards.className='qa-cards';cards.dataset.qa='cards';cards.innerHTML=`
    <div class="qa-card native_code_card"><div class="qa-code-header"><span class="qa-title">已编辑 2 个文件</span>　<span class="qa-added">+85</span>　<span class="qa-deleted">−0</span></div><div class="qa-label">_probe.txt</div><div class="qa-label">索引.md</div></div>
    <div class="qa-row"><div class="qa-card native_file_card"><div class="qa-title">索引.md</div><div class="qa-meta">检索来源说明：每份文件的真实身份、重整……</div></div><div class="qa-card native_file_card"><div class="qa-title">01_医学诊断数据与建模方法.pdf</div><div class="qa-meta">医学科学部面上项目申请书，47 页</div></div></div>
    <div data-dsh-file-card class="qa-card" style="background:white"><span class="qa-title">旧版白底文件卡片</span><div class="qa-meta">语义选择器同样适配，无需修改内容。</div></div>
  `;document.querySelector('.demo-chat').append(cards);
  const dialog=document.createElement('section');dialog.className='native_modal_dialog';dialog.dataset.qa='dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label','删除工作区');dialog.innerHTML=`<button class="qa-close" aria-label="关闭">×</button><div class="qa-title">删除工作区</div><p class="qa-modal-body">将把“菌国聚力”从工作区列表中移除。文件夹与会话记录会保留，其会话将显示在“未分组”下。</p><div class="native_input_wrap"><input class="qa-input" placeholder="输入工作区名称" aria-label="工作区名称"></div><div class="qa-actions"><button class="qa-cancel">取消</button><button class="qa-danger">删除工作区</button><button class="qa-primary">确认</button></div>`;document.body.append(dialog);
});}

// Compute contrast from actual browser styles, compositing ancestor fills.
async function contrast(p){return p.evaluate(()=>{
  const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
  const l=c=>c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
  const ratio=(a,b)=>{const x=l(a),y=l(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  function background(el){const chain=[];for(let e=el;e;e=e.parentElement)chain.unshift(e);let c=[255,255,255];for(const e of chain){const a=rgb(getComputedStyle(e).backgroundColor);if(a.length>=3){const k=a[3]??1;c=a.slice(0,3).map((v,i)=>v*k+c[i]*(1-k));}}return c;}
  const selectors=['.qa-title','.qa-meta','.qa-label','.qa-added','.qa-deleted','.qa-modal-body','.qa-close','.qa-cancel','.qa-danger','.qa-primary','.qa-input'];
  const out=[];for(const selector of selectors)for(const el of document.querySelectorAll(selector)){const fg=rgb(getComputedStyle(el).color);out.push({selector,ratio:ratio(fg.slice(0,3),background(el)),color:getComputedStyle(el).color,background:background(el)});}
  const input=document.querySelector('.qa-input');out.push({selector:'::placeholder',ratio:ratio(rgb(getComputedStyle(input,'::placeholder').color).slice(0,3),background(input))});return out;
});}

try{
await run('Theme-only: no video, no input shield, no startup focus change',async()=>{
  const p=await page('?off');await p.locator('[data-test-underlying]').focus();await p.evaluate(()=>window.__setTheme());
  assert.equal(await p.locator('.yn-intro,video,.yn-startup-styles').count(),0);assert.equal(await p.evaluate(()=>document.activeElement.hasAttribute('data-test-underlying')),true);
  await p.locator('[data-test-underlying]').click();assert.equal(await p.evaluate(()=>window.__previewClicks),1);
  assert.deepEqual(await p.evaluate(()=>({video:!!window.__themePlugin.video,shield:!!window.__themePlugin.shield,assets:window.__themePlugin.urls.size})),{video:false,shield:false,assets:2});
  await p.context().close();
});
await run('Startup-only: preserves native light UI, palette, body attributes and focus',async()=>{
  const p=await page('?off');await fixture(p);await p.locator('[data-test-underlying]').focus();
  const snapshot=()=>({body:document.body.getAttributeNames().map(k=>[k,document.body.getAttribute(k)]),bg:getComputedStyle(document.querySelector('.native_file_card')).backgroundColor,text:getComputedStyle(document.querySelector('.qa-title')).color,root:document.querySelector('[data-dsh-root]').className});
  const before=await p.evaluate(snapshot);void p.evaluate(()=>window.__setStartup());await playing(p);await p.keyboard.press('Escape');await ready(p);
  assert.deepEqual(await p.evaluate(snapshot),before);assert.equal(await p.locator('.yn-wallpaper,.yn-knot,.yn-sidebar-scenery,.yn-theme-styles').count(),0);
  assert.deepEqual(await p.evaluate(()=>({adapter:!!window.__previewPlugin.adapter,image:!!window.__previewPlugin.image,urls:window.__previewPlugin.urls.size,focus:document.activeElement.hasAttribute('data-test-underlying')})),{adapter:false,image:false,urls:0,focus:true});await p.context().close();
});
for(const dark of [false,true])await run(`${dark?'Dark':'Light'} host: portaled modal, file/code cards, inputs and semantic colors pass AA`,async()=>{
  const p=await page('?theme-only');if(dark)await p.evaluate(()=>document.body.setAttribute('data-ds-dark-theme',''));
  await fixture(p);await p.waitForFunction(()=>document.querySelector('.native_file_card').classList.contains('yn-surface'));
  const c=await contrast(p);for(const x of c)assert.ok(x.ratio>=4.5,JSON.stringify(x));
  assert.notEqual((await p.locator('.qa-added').evaluate(e=>getComputedStyle(e).color)),(await p.locator('.qa-deleted').evaluate(e=>getComputedStyle(e).color)));
  if(!dark)await p.screenshot({path:root+'/preview/readability-preview.png'});
  await p.evaluate(()=>window.__setTheme(false));
  assert.equal(await p.locator('.native_file_card').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)');
  assert.equal(await p.locator('.qa-title').first().evaluate(e=>getComputedStyle(e).color),dark?'rgb(249, 250, 251)':'rgb(15, 17, 21)');
  assert.equal(await p.locator('[class*="yn-"]').count(),0);await p.context().close();
});
await run('Dialogs added after mounting are themed and stay functional',async()=>{
  const p=await page('?theme-only');await fixture(p);await p.waitForFunction(()=>document.querySelector('[role="dialog"]').classList.contains('yn-surface'));
  await p.locator('.qa-input').fill('测试工作区');assert.equal(await p.locator('.qa-input').inputValue(),'测试工作区');
  await p.evaluate(()=>document.querySelector('.qa-cancel').addEventListener('click',()=>document.querySelector('[data-qa="dialog"]').remove()));await p.locator('.qa-cancel').click();assert.equal(await p.locator('[data-qa="dialog"]').count(),0);await p.context().close();
});
await run('Both mount orders coexist; disabling startup keeps the theme mounted',async()=>{
  for(const first of ['theme','startup']){
    const p=await page('?off');
    if(first==='theme'){await p.evaluate(()=>window.__setTheme());void p.evaluate(()=>window.__setStartup());}else{void p.evaluate(()=>window.__setStartup());await playing(p);await p.evaluate(()=>window.__setTheme());}
    await playing(p);await p.evaluate(()=>window.__setStartup(false));
    assert.equal(await p.evaluate(()=>window.__themePlugin.state),'ready');assert.equal(await p.locator('.yn-wallpaper').count(),1);assert.equal(await p.locator('.yn-knot').count(),2);assert.equal(await p.locator('.yn-intro,.yn-startup-styles').count(),0);
    await p.evaluate(()=>window.__setTheme(false));assert.equal(await p.locator('[data-yn-owned]').count(),0);assert.equal(await p.evaluate(()=>document.body.hasAttribute('data-yn-theme')),false);await p.context().close();
  }
});
await run('Disabling/re-enabling the theme does not pause, restart or dismiss the movie',async()=>{
  const p=await page('?startup-only');await playing(p);await p.evaluate(()=>window.__setTheme());
  const before=await p.evaluate(()=>window.__previewPlugin.video.currentTime);await p.evaluate(()=>window.__setTheme(false));
  assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');assert.equal(await p.evaluate(()=>window.__previewPlugin.video.paused),false);assert.ok(await p.evaluate(t=>window.__previewPlugin.video.currentTime>=t,before));assert.equal(await p.evaluate(()=>document.body.hasAttribute('data-yn-theme')),false);
  await p.evaluate(()=>window.__setTheme());await p.keyboard.press('Escape');await ready(p);assert.equal(await p.locator('.yn-wallpaper').count(),1);await p.context().close();
});
await run('Theme asset failure cannot delay an independent startup component',async()=>{
  const p=await page('?off');await p.route('**/slow-background.jpg',()=>{});void p.evaluate(()=>window.__setTheme(true,{transition:{backgroundUrl:'/slow-background.jpg',assetTimeoutMs:600}}));void p.evaluate(()=>window.__setStartup());await playing(p);
  await p.waitForFunction(()=>window.__themePlugin.state==='ready');assert.ok(await p.evaluate(()=>window.__themePlugin.debug.backgroundError));assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.context().close();
});
await run('Independent DSH apply/effect lifecycle and repeated enable/disable leave no owned DOM',async()=>{
  const p=await page('?off');await p.evaluate(()=>{
    window.__stops=[];for(const mod of [window.__themeModule,window.__previewModule])mod.apply({effect(fn,label){window.__stops.push({label,stop:fn()});}});
  });await p.waitForSelector('.yn-intro');await p.waitForSelector('.yn-wallpaper');await p.evaluate(()=>window.__stops.find(x=>x.label.endsWith('startup')).stop());assert.equal(await p.locator('.yn-wallpaper').count(),1);
  await p.evaluate(()=>window.__stops.find(x=>x.label.endsWith('theme')).stop());
  await p.evaluate(async()=>{for(let i=0;i<3;i++){await window.__setTheme();await window.__setTheme(false);await window.__setStartup(true,{transition:{enabled:false}});await window.__setStartup(false);}});
  assert.equal(await p.locator('[data-yn-owned]').count(),0);assert.equal(await p.locator('[class*="yn-"]').count(),0);await p.context().close();
});
await run('Published packages contain distinct metadata, manifest and only their own media',async()=>{
  for(const [folder,kind,id,title] of [[root,'theme','dsh-your-name-theme','君の名はdsh · 界面主题'],[startupRoot,'startup','dsh-your-name-startup','君の名はdsh · 启动动画']]){
    const pkg=JSON.parse(await readFile(folder+'/package.json','utf8'));assert.equal(pkg.name,id);assert.equal(pkg.version,'1.2.1');assert.equal(pkg.yourName.component,kind);assert.ok(pkg.files.includes('locale/*.json'));const self=createRequire(folder+'/package.json');
    for(const lang of ['zh','en','ja'])assert.equal(JSON.parse(await readFile(self.resolve(id+'/locale/'+lang+'.json'),'utf8')).meta.title,title);
    const host=await import(folder+'/lib/index.js');assert.equal(host.name,pkg.yourName.entry);assert.equal(typeof host.apply,'function');
    let registration;vm.runInNewContext(await readFile(folder+'/lib/client.js','utf8'),{window:{__ModuleLoader__:{load:r=>registration=r}}});assert.equal(registration.id,id);const mod=registration.factory(()=>{throw new Error('Unexpected dependency');});assert.equal(mod.name,pkg.yourName.entry);assert.equal(typeof mod.apply,'function');
    const bundle=await readFile(folder+'/lib/client.js','utf8');assert.equal(bundle.includes('"mime":"video/mp4"'),kind==='startup');assert.equal(bundle.includes('"mime":"image/jpeg"'),kind==='theme');assert.equal(bundle.includes('"mime":"image/webp"'),kind==='theme');
  }
});
await run('Configuration overrides cannot re-couple the two components',async()=>{
  const p=await page('?off');await p.evaluate(()=>window.__setTheme(true,{transition:{enabled:true}}));
  assert.equal(await p.locator('video,.yn-intro').count(),0);await p.evaluate(()=>window.__setTheme(false));
  void p.evaluate(()=>window.__setStartup(true,{theme:{enabled:true}}));await playing(p);
  assert.equal(await p.locator('.yn-wallpaper,.yn-knot,.yn-theme-styles').count(),0);assert.equal(await p.evaluate(()=>document.body.hasAttribute('data-yn-theme')),false);await p.context().close();
});
await run('Brand contrast, fixed native toggle and unclipped knot remain correct',async()=>{
  const p=await page('?theme-only');await p.evaluate(()=>{
    const css=document.createElement('style');css.dataset.pluginCss='@deepseek-ai/dsh-client-ui-sidebar/SidebarRoot.module.css';css.textContent='.qaHash_logoRow{overflow:hidden}.qaHash_toggle{position:fixed;top:8px;left:260px}.qaBrand rect{fill:var(--dsw-alias-brand-primary)}.qaBrand text{fill:var(--dsw-alias-label-primary-inverted)}';document.head.append(css);
    const sidebar=document.querySelector('[data-dsh-sidebar]'),logo=document.querySelector('[data-dsh-logo]');const row=document.createElement('div');row.className='qaHash_logoRow';sidebar.insertBefore(row,logo);row.append(logo);logo.insertAdjacentHTML('afterbegin','<svg class="qaBrand" width="100" height="24"><rect width="100" height="24"/><text x="3" y="16">HARNESS</text></svg>');
    const toggle=document.createElement('button');toggle.className='qaHash_toggle';toggle.textContent='收起';sidebar.append(toggle);
  });await p.waitForFunction(()=>document.querySelector('.qaHash_toggle').classList.contains('yn-sidebarToggle'));
  assert.equal(await p.locator('.qaHash_toggle').evaluate(e=>getComputedStyle(e).position),'fixed');const before=await p.locator('.qaHash_toggle').boundingBox();await p.locator('.qaHash_toggle').hover();assert.deepEqual(await p.locator('.qaHash_toggle').boundingBox(),before);
  assert.equal(await p.locator('.qaHash_logoRow').evaluate(e=>getComputedStyle(e).overflow),'visible');assert.equal(await p.locator('.qaBrand text').evaluate(e=>getComputedStyle(e).fill),'rgb(11, 20, 38)');assert.equal(await p.locator('.qaBrand rect').evaluate(e=>getComputedStyle(e).fill),'rgb(245, 247, 255)');assert.equal(await p.locator('[data-dsh-logo]>.yn-knot').count(),1);await p.context().close();
});
await run('No uncaught browser errors in independent component cases',async()=>assert.deepEqual(errors,[]));
}finally{await browser.close();await new Promise(r=>server.close(r));await mkdir(root+'/docs',{recursive:true});await writeFile(root+'/docs/component-test-results.json',JSON.stringify({testedAt:new Date().toISOString(),scope:'Chromium with mock DSH DOM and official token/module contracts; not a real DSH desktop installation',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;

````

## tests/run.mjs

````javascript
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createServer,root} from '../scripts/serve.mjs';
const req=createRequire(import.meta.url);
function dependency(name){try{return req(name);}catch{return req(req.resolve(name,{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES].filter(Boolean)}));}}
const {chromium}=dependency('playwright');const {PNG}=dependency('pngjs');
const browser=await chromium.launch({headless:true,executablePath:process.env.DSH_TEST_CHROME||undefined,args:['--no-sandbox']});
const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}/`;
const results=[];let errors=[];
async function run(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(error){results.push({name,status:'FAIL',error:error.message});console.error('FAIL',name,error);}}
async function page(options={},query='?static') {const context=await browser.newContext({viewport:{width:1400,height:900},...options});const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(url+query);return p;}
const ready=p=>p.waitForFunction(()=>window.__previewPlugin?.state==='ready'&&window.__themePlugin?.state==='ready',{},{timeout:12000});
const start=async(p,config={})=>p.evaluate(config=>{window.__previewPlugin.unmount();window.__previewPlugin=window.__previewModule.createYourNamePlugin(config);void window.__previewPlugin.mount();},config);
try {
await run('Theme surfaces, background and inline braided SVG',async()=>{const p=await page();await ready(p);const data=await p.evaluate(()=>({roles:window.__themePlugin.adapter.diagnostics(),background:getComputedStyle(document.querySelector('.yn-wallpaper')).backgroundImage,knots:document.querySelectorAll('.yn-knot').length,dashes:document.querySelectorAll('.yn-knot [stroke-dasharray]').length}));assert.equal(data.roles.sidebar,1);assert.equal(data.roles.composer,1);assert.ok(data.background.includes('blob:'));assert.equal(data.knots,2);assert.ok(data.dashes>=4);await p.screenshot({path:root+'/preview/theme-preview.png'});await p.context().close();});
await run('Normal tail dissolves for 1200ms while original video keeps playing',async()=>{
  const p=await page({},'');await p.waitForFunction(()=>window.__previewPlugin?.state==='playing');
  await p.evaluate(()=>{const v=window.__previewPlugin.video;v.currentTime=v.duration-.95;});
  await p.waitForFunction(()=>window.__previewPlugin.state==='revealing');
  const d=await p.evaluate(()=>{const q=window.__previewPlugin;return {reason:q.debug.reason,style:q.debug.transitionStyle,ms:q.debug.revealMs,prepared:q.debug.preparedAt,paused:q.video.paused,left:q.video.duration-q.debug.revealAtVideoTime,mask:document.querySelectorAll('.yn-intro-mask-defs').length};});
  assert.equal(d.reason,'normal');assert.equal(d.style,'fade');assert.equal(d.ms,1200);assert.ok(d.prepared);assert.equal(d.paused,false);assert.ok(d.left>.45&&d.left<=1.2);assert.equal(d.mask,0);
  await ready(p);assert.equal(await p.locator('.yn-video').count(),0);await p.context().close();
});
await run('Long left press skip: mouseup and click never pass through',async()=>{const p=await page();await ready(p);await start(p);await p.waitForSelector('.yn-intro');const bounds=await p.locator('[data-test-underlying]').boundingBox();await p.mouse.move(bounds.x+20,bounds.y+12);await p.mouse.down();await ready(p);assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.mouse.up();assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.locator('[data-test-underlying]').click();assert.equal(await p.evaluate(()=>window.__previewClicks),1);await p.context().close();});
await run('Right and middle mouse buttons do not skip',async()=>{const p=await page();await ready(p);await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');await p.mouse.click(500,200,{button:'right'});assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.mouse.click(500,200,{button:'middle'});assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.keyboard.press('Escape');await ready(p);await p.context().close();});
await run('Touch skip suppresses synthesized mouse/click sequence',async()=>{const p=await page({hasTouch:true,isMobile:true});await ready(p);await start(p);await p.waitForSelector('.yn-intro');const b=await p.locator('[data-test-underlying]').boundingBox();await p.touchscreen.tap(b.x+20,b.y+12);await ready(p);assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.waitForTimeout(850);await p.touchscreen.tap(b.x+20,b.y+12);assert.equal(await p.evaluate(()=>window.__previewClicks),1);await p.context().close();});
await run('Reduced motion bypasses video and removes perpetual animations',async()=>{const p=await page({reducedMotion:'reduce'},'');await ready(p);assert.equal(await p.evaluate(()=>window.__previewPlugin.debug.reason),'reduced-motion');assert.equal(await p.locator('.yn-video').count(),0);assert.equal(await p.evaluate(()=>getComputedStyle(document.querySelector('.yn-knot-breath')).animationName),'none');await p.context().close();});
await run('Autoplay rejection reveals theme instead of trapping input',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('Autoplay blocked','NotAllowedError'));});await start(p);await ready(p);assert.equal(await p.evaluate(()=>window.__previewPlugin.debug.reason),'video-fallback');await p.context().close();});
await run('Missing video and missing background have bounded fallbacks',async()=>{const p=await page();await ready(p);await start(p,{transition:{videoUrl:'/missing.mp4',assetTimeoutMs:600}});await ready(p);assert.equal(await p.evaluate(()=>window.__previewPlugin.debug.reason),'video-fallback');await p.evaluate(()=>window.__setTheme(true,{transition:{backgroundUrl:'/missing.jpg',assetTimeoutMs:600}}));await ready(p);assert.ok(await p.evaluate(()=>window.__themePlugin.debug.backgroundError));await p.context().close();});
await run('Default dissolve blends the entire viewport and all intro controls uniformly',async()=>{
  const p=await page();await ready(p);const base=PNG.sync.read(await p.screenshot());
  await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');
  await p.evaluate(()=>{const q=window.__previewPlugin;q.video.style.visibility='hidden';q.visual.style.background='white';q.finish('normal');q.clearTimer(q.finishDeadline);for(const a of q.animations){a.pause();a.currentTime=0;}});
  const opacities=[];
  for(const ms of [300,600,900]){
    const opacity=await p.evaluate(ms=>{const q=window.__previewPlugin;for(const a of q.animations)a.currentTime=ms;return Number(getComputedStyle(q.overlay).opacity);},ms);opacities.push(opacity);
    const frame=PNG.sync.read(await p.screenshot());
    for(const [x,y] of [[5,5],[1394,5],[5,894],[1394,894]]){
      const i=(y*base.width+x)*4;
      for(let c=0;c<3;c++)assert.ok(Math.abs(frame.data[i+c]-(255*opacity+base.data[i+c]*(1-opacity)))<=5,'Every viewport corner must follow the same opacity blend');
    }
  }
  assert.ok(opacities[0]>opacities[1]&&opacities[1]>opacities[2]);assert.ok(opacities.every(x=>x>0&&x<1));
  assert.equal(await p.locator('.yn-intro-mask-defs').count(),0);await p.evaluate(()=>window.__previewPlugin.complete());await ready(p);await p.context().close();
});
await run('Viewport resize preserves an in-progress opacity dissolve',async()=>{
  const p=await page();await ready(p);await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');
  await p.evaluate(()=>{const q=window.__previewPlugin;q.finish('normal');q.clearTimer(q.finishDeadline);for(const a of q.animations){a.pause();a.currentTime=400;}});
  await p.setViewportSize({width:1100,height:720});assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'revealing');
  const box=await p.locator('.yn-intro').boundingBox();assert.equal(box.width,1100);assert.equal(box.height,720);await p.evaluate(()=>window.__previewPlugin.complete());await ready(p);await p.context().close();
});
await run('Ended-event fallback uses the same gentle full-duration dissolve',async()=>{
  const p=await page();await ready(p);await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');
  const d=await p.evaluate(()=>{const q=window.__previewPlugin;q.video.dispatchEvent(new Event('ended'));return {reason:q.debug.reason,ms:q.debug.revealMs,style:q.debug.transitionStyle};});
  assert.deepEqual(d,{reason:'ended',ms:1200,style:'fade'});await ready(p);await p.context().close();
});
await run('DSH display name is exported through English, Chinese and Japanese locale metadata',async()=>{
  const pkg=JSON.parse(await readFile(root+'/package.json','utf8'));assert.equal(pkg.name,'dsh-your-name-theme');assert.ok(pkg.files.includes('locale/*.json'));
  for(const lang of ['en','zh','ja']){
    const file=req.resolve('dsh-your-name-theme/locale/'+lang+'.json');const locale=JSON.parse(await readFile(file,'utf8'));assert.equal(locale.meta.title,'君の名はdsh · 界面主题');
  }
});
await run('SVG inverse mask really opens a hole at measured source center',async()=>{const p=await page();await ready(p);await start(p,{transition:{skipMs:300,revealStyle:'ripple'}});await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const center=await p.evaluate(()=>{const q=window.__previewPlugin;q.video.style.visibility='hidden';q.visual.style.background='white';q.finish('skip');for(const a of q.animations){a.pause();a.currentTime=10;}return q.center();});const png=PNG.sync.read(await p.screenshot());const pixel=(x,y)=>{const i=(Math.round(y)*png.width+Math.round(x))*4;return [...png.data.subarray(i,i+3)];};const mid=pixel(center.x,center.y),corner=pixel(5,5);assert.ok(mid.some(x=>x<180),'The center must reveal the dark themed UI');assert.ok(corner.every(x=>x>245),'The far corner must remain covered');await p.context().close();});
await run('Dynamic composer replacement gets exactly one decoration',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{const c=document.querySelector('[data-dsh-composer]');const n=c.cloneNode(true);n.querySelectorAll('.yn-knot').forEach(x=>x.remove());n.classList.remove('yn-composer');c.replaceWith(n);});await p.waitForFunction(()=>document.querySelector('[data-dsh-composer]')?.classList.contains('yn-composer'));assert.equal(await p.locator('[data-dsh-composer]>.yn-knot').count(),1);await p.context().close();});
await run('CSS-module export adapter resolves changed hash prefixes',async()=>{const p=await page();await ready(p);const count=await p.evaluate(()=>{const s=document.createElement('style');s.dataset.pluginCss='@deepseek-ai/dsh-client-ui-conversation/InputBar.module.css';s.textContent='.freshHash_card {position:relative}';document.head.append(s);const d=document.createElement('div');d.className='freshHash_card';document.body.append(d);window.__themePlugin.adapter.sync();return Number(d.classList.contains('yn-composer'));});assert.equal(count,1);await p.context().close();});
await run('Cleanup cancels in-flight mount and permits clean remount',async()=>{const p=await page();await ready(p);await start(p);await p.evaluate(()=>window.__previewUnmount());await p.waitForTimeout(350);const d=await p.evaluate(()=>({state:window.__previewPlugin.state,owned:document.querySelectorAll('[data-yn-owned]').length,timers:window.__previewPlugin.timers.size,urls:window.__previewPlugin.urls.size,classes:[...document.querySelectorAll('[class]')].some(el=>[...el.classList].some(c=>c.startsWith('yn-'))),attr:document.body.hasAttribute('data-yn-theme')}));assert.deepEqual(d,{state:'disposed',owned:0,timers:0,urls:0,classes:false,attr:false});await p.evaluate(()=>window.__setTheme());await start(p,{transition:{enabled:false}});await ready(p);await p.context().close();});
await run('Critical text colors pass AA against worst-case white photo',async()=>{const lum=rgb=>rgb.map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4}).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);const bg=[13,21,37].map(c=>c*.94+255*.06);for(const color of [[245,247,255],[195,206,222],[220,228,242]])assert.ok((lum(color)+.05)/(lum(bg)+.05)>=4.5);});
await run('Audible autoplay is tried first; policy rejection retries muted',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{const play=HTMLMediaElement.prototype.play;window.__audioAttempts=[];window.__denyAudible=true;HTMLMediaElement.prototype.play=function(){window.__audioAttempts.push(this.muted);if(!this.muted&&window.__denyAudible)return Promise.reject(new DOMException('Policy','NotAllowedError'));return play.call(this);};});await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const data=await p.evaluate(()=>({attempts:window.__audioAttempts,sound:window.__previewPlugin.debug.sound,muted:window.__previewPlugin.video.muted,volume:window.__previewPlugin.video.volume}));assert.deepEqual(data.attempts.slice(0,2),[false,true]);assert.equal(data.sound,'muted-policy');assert.equal(data.muted,true);assert.equal(data.volume,1);await p.context().close();});
await run('Sound button enables audio without skipping or restarting video',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{const play=HTMLMediaElement.prototype.play;window.__denyAudible=true;HTMLMediaElement.prototype.play=function(){if(!this.muted&&window.__denyAudible)return Promise.reject(new DOMException('Policy','NotAllowedError'));return play.call(this);};});await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const time=await p.evaluate(()=>{window.__denyAudible=false;return window.__previewPlugin.video.currentTime;});await p.locator('[data-yn-sound]').click();await p.waitForFunction(()=>window.__previewPlugin.debug.sound==='audible');assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');assert.ok(await p.evaluate(time=>window.__previewPlugin.video.currentTime>=time,time));assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.locator('[data-yn-sound]').click();assert.equal(await p.evaluate(()=>window.__previewPlugin.video.muted),true);assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.context().close();});
await run('Keyboard sound control does not trigger global Enter-to-skip',async()=>{const p=await page();await ready(p);await start(p,{transition:{sound:false}});await p.waitForFunction(()=>window.__previewPlugin.state==='playing');await p.locator('[data-yn-sound]').focus();await p.keyboard.press('Enter');await p.waitForFunction(()=>!window.__previewPlugin.video.muted);assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.context().close();});
await run('Touch sound control keeps the movie playing and blocks ghost clicks',async()=>{const p=await page({hasTouch:true,isMobile:true});await ready(p);await start(p,{transition:{sound:false}});await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const b=await p.locator('[data-yn-sound]').boundingBox();await p.touchscreen.tap(b.x+20,b.y+12);await p.waitForFunction(()=>window.__previewPlugin.debug.sound==='audible');assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.context().close();});
await run('Sidebar uses independent lake artwork; staircase photo is painted once',async()=>{const p=await page();await ready(p);assert.equal(await p.locator('.yn-sidebar-scenery').count(),1);assert.equal(await p.locator('.yn-sidebar-photo').count(),0);assert.equal(await p.locator('.yn-sidebar-scenery img').count(),0);assert.equal(await p.locator('.yn-lake-art').count(),1);assert.ok(await p.evaluate(()=>window.__themePlugin.sceneryImage.naturalWidth>=512));const lake=await p.locator('.yn-lake-art').getAttribute('href');assert.ok(lake.startsWith('blob:'));assert.notEqual(lake,await p.evaluate(()=>window.__themePlugin.image.src));assert.ok(await p.locator('.yn-scene-comet path').count()>0);assert.ok((await p.locator('.yn-wallpaper').evaluate(el=>getComputedStyle(el).backgroundImage)).includes('blob:'));const noPhoto=()=>[...document.querySelectorAll('.yn-sidebar-scenery,.yn-sidebar-scenery *')].every(el=>!getComputedStyle(el).backgroundImage.includes('url(')&&!el.style.getPropertyValue('--yn-sidebar-image'));assert.equal(await p.evaluate(noPhoto),true);await p.evaluate(()=>{const old=document.querySelector('[data-dsh-sidebar]');const fresh=old.cloneNode(true);fresh.querySelectorAll('[data-yn-owned]').forEach(n=>n.remove());fresh.classList.remove('yn-sidebar');old.replaceWith(fresh);});await p.waitForFunction(()=>document.querySelectorAll('.yn-sidebar-scenery').length===1);assert.equal(await p.evaluate(noPhoto),true);assert.equal(await p.locator('.yn-sidebar-photo').count(),0);assert.equal(await p.locator('.yn-lake-art').count(),1);assert.equal(await p.locator('.yn-lake-art').getAttribute('href'),lake);await p.context().close();});
await run('No uncaught browser errors',async()=>assert.deepEqual(errors,[]));
} finally {await browser.close();await new Promise(r=>server.close(r));await mkdir(root+'/docs',{recursive:true});await writeFile(root+'/docs/test-results.json',JSON.stringify({testedAt:new Date().toISOString(),scope:'Chromium mock DSH DOM + real supplied video; not an installed DSH application',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;

````

