# 君の名はdsh · 启动动画 — 1.2.1 完整源码

## package.json

````json
{
  "name": "dsh-your-name-startup",
  "version": "1.2.1",
  "description": "君の名はdsh · 启动动画：原视频与音效、渐隐过渡及点击跳过，不修改聊天背景。",
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
    "build": "node scripts/build.mjs"
  },
  "engines": {
    "node": ">=20"
  },
  "license": "MIT",
  "yourName": {
    "component": "startup",
    "entry": "your-name-startup-animation"
  },
  "icon": "./icon.svg"
}

````

## icon.svg

````xml
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" fill="none">
  <title>君の名はdsh · 大肥鱼启动动画</title>
  <defs>
    <linearGradient id="night" x1="8" y1="3" x2="54" y2="62" gradientUnits="userSpaceOnUse">
      <stop stop-color="#263E66"/><stop offset="1" stop-color="#101D36"/>
    </linearGradient>
    <linearGradient id="whale" x1="28" y1="17" x2="40" y2="52" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7DCFFF"/><stop offset=".5" stop-color="#439CE8"/><stop offset="1" stop-color="#2C73C4"/>
    </linearGradient>
    <linearGradient id="belly" x1="30" y1="37" x2="36" y2="54" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#D6ECFF"/>
    </linearGradient>
  </defs>
  <rect x=".5" y=".5" width="63" height="63" rx="15.5" fill="url(#night)" stroke="#B0C7E7" stroke-opacity=".28"/>
  <ellipse cx="33" cy="55" rx="21" ry="3" fill="#07142A" opacity=".35"/>
  <path d="M20.8 37.5C13.5 38.8 7.8 35.2 8 27.8C12.7 26.6 16.3 29.2 18.4 32.4C18.5 26.9 21 25.1 24.9 24.5L27.3 35.8L20.8 37.5Z" fill="#4CA4EC" stroke="#163E70" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M16.5 37C15.2 25.2 23.3 17 37 17C49 17 56.4 25.2 56 36.5C55.6 47 47.1 54 34.3 54C23.2 54 17.5 46.6 16.5 37Z" fill="url(#whale)" stroke="#163E70" stroke-width="1.7"/>
  <path d="M18 39.6C24.6 42.4 28.4 38.5 34 38.6C41.7 39 47 39.1 55.2 36.8C54.6 47 46.3 52.8 34.3 52.8C26 52.8 20.4 47.3 18 39.6Z" fill="url(#belly)"/>
  <path d="M25.8 37.4C21.9 36.6 20.4 39.2 22.3 42.1C23.6 44 26.3 44.9 29 44" fill="#5CAEF1" stroke="#2B77B8" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M24 20C26.6 16.8 31 15.5 36.9 15.7C42.6 15.8 47 17.5 49.8 21" stroke="#173656" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M24.2 18.2C23.3 15.9 25.4 14.3 27.2 15C27.1 12.7 29.4 11.7 31.2 13C32 10.9 34.5 10.5 36 12.2C37.5 10.7 39.9 11.1 40.6 13.3C42.9 12.1 44.8 13.5 44.7 15.7C47 15.3 48.7 17.1 47.9 19.3C40.3 16.9 32.4 16.2 24.2 18.2Z" fill="#F6FBFF" stroke="#BED7EB" stroke-width=".8" stroke-linejoin="round"/>
  <ellipse cx="32" cy="29.5" rx="3" ry="4" fill="#112742"/>
  <ellipse cx="46" cy="29" rx="3" ry="4" fill="#112742"/>
  <circle cx="31.1" cy="28.1" r="1.15" fill="white"/>
  <circle cx="45.1" cy="27.6" r="1.15" fill="white"/>
  <circle cx="33" cy="31" r=".55" fill="#9DCBF0"/>
  <circle cx="47" cy="30.5" r=".55" fill="#9DCBF0"/>
  <ellipse cx="27.7" cy="35.3" rx="3.1" ry="1.5" fill="#F9A4BA" opacity=".8"/>
  <ellipse cx="50.3" cy="34.7" rx="2.8" ry="1.4" fill="#F9A4BA" opacity=".8"/>
  <path d="M36.1 35C37.3 37 39.4 37.1 40.8 34.9" stroke="#163C63" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M33.6 42L37.6 44.5L33.6 47V42ZM41.6 42L37.6 44.5L41.6 47V42Z" fill="#253B5A"/>
  <circle cx="37.6" cy="44.5" r="1.3" fill="#456184"/>
  <circle cx="54.4" cy="12.8" r="2.6" fill="#D7F0FF" fill-opacity=".13" stroke="#B9E3FF" stroke-width="1"/>
  <circle cx="14.3" cy="16.4" r="1.1" fill="#ACD7F7" opacity=".7"/>
</svg>

````

## cordis.patch.yml

````yaml
- insert:
    - id: your-name-startup-animation
      name: dsh-your-name-startup
      config: {}

````

## INSTALL.txt

````text
君の名はdsh 1.2.1 — 启动动画（独立组件）

这个目录是完整、可直接安装的启动动画包，不修改背景或聊天配色。
完全退出 DSH（包括托盘），将此目录保存到：
  D:\dsh-plugins\君の名はdsh-启动动画
该目录直接包含 package.json 和 lib 目录。
在 PowerShell 执行：
  dsh plugin --profile desktop add "D:\dsh-plugins\君の名はdsh-启动动画"

重启，在设置 → 插件中单独启用“君の名はdsh · 启动动画”。
可以只开此插件、只开界面主题，或两个一起开。
本包保留原视频与音轨；宿主拦截有声自动播放时，可点音效按钮。

````

## README.md

````markdown
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

代码采用 LICENSE 中的 MIT 许可。assets/transition.mp4 是用户提供的原动画，保留其原音轨。媒体及编译进 lib/client.js 的内嵌副本不属于本项目代码 MIT 授权。素材的公开分发与使用须遵循对应来源许可。

此包不包含主题背景图片或湖景。项目没有获得或宣称获得 DeepSeek、DSH 或相关作品的官方背书。

````

## locale/en.json

````json
{
  "meta": {
    "title": "君の名はdsh · 启动动画",
    "description": "仅播放大肥鱼启动动画与原音效，末尾逐渐淡出；支持点击跳过，不修改对话背景或界面主题。"
  }
}

````

## locale/ja.json

````json
{
  "meta": {
    "title": "君の名はdsh · 启动动画",
    "description": "仅播放大肥鱼启动动画与原音效，末尾逐渐淡出；支持点击跳过，不修改对话背景或界面主题。"
  }
}

````

## locale/zh.json

````json
{
  "meta": {
    "title": "君の名はdsh · 启动动画",
    "description": "仅播放大肥鱼启动动画与原音效，末尾逐渐淡出；支持点击跳过，不修改对话背景或界面主题。"
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
    enabled: true, // 独立启动动画；不会启用背景、结绳或改动 DSH 调色板。
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
  theme: { enabled: false, backgroundPosition: '58% 50%', showKnots: true, showScenery: true },
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
/** Browser-only startup component; no host side effects. */
export const name = 'your-name-startup-animation';
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

