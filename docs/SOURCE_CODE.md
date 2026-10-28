# 君の名はdsh：1.1.9 平铺包完整源码

本次针对截图中的 ENOENT / lstat 安装目录缺少 lib，修正 ZIP 目录层级并补齐准确安装说明。平铺 ZIP 的根目录直接包含 package.json、lib、assets 和 locale。运行时代码、1.2 秒淡出、显示名称和原视频音轨保持不变。

## package.json

```json
{
  "name": "dsh-your-name-theme",
  "version": "1.1.9",
  "description": "君の名はdsh：启动淡出过渡与《你的名字。》主题",
  "type": "module",
  "main": "lib/index.js",
  "exports": {
    ".": "./lib/index.js",
    "./client": "./lib/client.js",
    "./package.json": "./package.json",
    "./locale/*.json": "./locale/*.json"
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
    "INSTALL.txt"
  ],
  "scripts": {
    "build": "node scripts/build.mjs",
    "test": "node tests/run.mjs",
    "preview": "node scripts/serve.mjs"
  },
  "engines": {
    "node": ">=20"
  },
  "license": "MIT"
}

```

## INSTALL.txt

```text
君の名はdsh 1.1.9 —— 平铺安装包

本包打开后第一层就是 package.json、lib、assets、locale 等项目，外面没有 your-name-dsh 文件夹。

针对截图中正在被 DSH 使用的路径：
D:\dsh-plugins\君の名はdsh

1. 完全退出 DSH，包括系统托盘。
2. 打开本压缩包，将包内所有文件和文件夹直接解压到上面的路径，并允许覆盖同名插件文件。
3. 确认下面三个文件真实存在：
   D:\dsh-plugins\君の名はdsh\package.json
   D:\dsh-plugins\君の名はdsh\lib\index.js
   D:\dsh-plugins\君の名はdsh\lib\client.js
4. 再打开 DSH 并启用插件。

如果 package.json 和 lib 位于“君の名はdsh\your-name-dsh”下面，说明仍多了一层：应把 your-name-dsh 里的内容移到“君の名はdsh”这一层。

截图中的 ENOENT / lstat ...\lib 表示当前安装引用路径下没有 lib 目录。这次修正压缩包目录结构和安装说明，运行时代码、约1.2秒淡出、显示名称、原视频音轨和主题素材没有改动。

```

## cordis.patch.yml

```yaml
- insert:
    - id: your-name-startup-theme
      name: dsh-your-name-theme
      config: {}

```

## src/host.js

```js
/** Browser-only theme. This root row enables discovery of exports['./client'].
 * No HTTP server, model hook, file read, RPC or credentials are required. */
export const name = 'your-name-startup-theme';
export function apply() {}

```

## src/config.js

```js
/** All host DOM knowledge lives here. Modify this file, then `npm run build`.
 * selectors are alternatives, not an assumption that every DSH release uses
 * the same DOM. cssModules resolves exported names from host stylesheets.
 */
export const DEFAULT_CONFIG = {
  enabled: true,
  transition: {
    enabled: true,
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
  theme: { backgroundPosition: '58% 50%', showKnots: true, showScenery: true },
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
    },
    observeAttributes: ['class', 'data-plugin-css'],
  },
};

```

## src/runtime.js

```js
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
    for(const role of ['app','sidebar','main','header','logo','brandRow','sidebarToggle','composer','input','message','legacyDecor'])this.targets[role]=this.resolve(role);
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
  async mount(){
    if(this.state==='new')this.init();
    if(this.state!=='initialized'||!this.config.enabled)return this;
    if(ACTIVE.has(this.doc))throw new Error('君の名はdsh already mounted in this document');
    ACTIVE.set(this.doc,this);this.didMount=true;this.state='preloading';this.savedFocus=this.doc.activeElement;
    this.savedTheme=this.doc.body.getAttribute('data-yn-theme');this.doc.body.setAttribute('data-yn-theme','');
    this.style=this.element('style','yn-styles');this.style.textContent=THEME_CSS;this.doc.head.append(this.style);
    this.wallpaper=this.element('div','yn-wallpaper');this.wallpaper.setAttribute('aria-hidden','true');this.wallpaper.style.setProperty('--yn-bg-position',this.config.theme.backgroundPosition);this.doc.body.prepend(this.wallpaper);
    if(this.config.theme.showScenery){const sky=this.element('div','yn-sky-motifs');sky.innerHTML=SKY_SVG.replaceAll('__ID__',uid());this.wallpaper.append(sky);}
    this.lakeUrl=this.config.theme.showScenery?this.asset('lake'):null;
    const scenery=this.lakeUrl?SCENERY_SVG.replaceAll('__LAKE_ART__',this.lakeUrl):null;
    this.adapter=new DSHAdapter(this.doc,this.config.adapter,this.config.theme.showKnots?KUMIHIMO_SVG:null,scenery);this.adapter.mount();
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
    // Decode the independent sidebar artwork before the intro reveals it.
    // A failed lake keeps the muted low-hill fallback and cannot block startup.
    let sceneryReady=Promise.resolve();
    if(scenery){
      this.sceneryImage=new Image();this.sceneryImage.decoding='async';
      sceneryReady=this.waitFor(this.sceneryImage,'load','error',config.assetTimeoutMs,()=>this.sceneryImage?.complete&&this.sceneryImage.naturalWidth>0).then(async()=>{
        try{await this.sceneryImage?.decode();}catch{}
      }).catch(e=>{if(e.name!=='AbortError')this.debug.sceneryError=e.message;});
      this.sceneryImage.src=this.lakeUrl;
    }
    this.image=new Image();this.image.decoding='async';
    const imageReady=this.waitFor(this.image,'load','error',config.assetTimeoutMs,()=>this.image.complete&&this.image.naturalWidth>0).then(async()=>{
      try{await this.image.decode();}catch{}if(this.state==='disposed')return;
      this.wallpaper.style.setProperty('--yn-wallpaper',`url("${this.image.src}")`);
    }).catch(e=>{if(e.name!=='AbortError')this.debug.backgroundError=e.message;});
    this.image.src=this.asset('background');
    if(!config.enabled||(config.respectReducedMotion&&this.motion.matches)){
      await Promise.all([imageReady,sceneryReady]);if(this.state!=='disposed')this.finish(config.enabled?'reduced-motion':'disabled');return this;
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
      await Promise.all([imageReady,sceneryReady,videoReady]);
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
  unmount(){if(this.state==='disposed')return;this.state='disposed';this.abort?.abort();this.shield?.dispose();
    for(const id of this.timers)clearTimeout(id);this.timers.clear();for(const a of this.animations)a.cancel();this.animations.clear();
    this.releaseVideo();this.image?.removeAttribute('src');this.image=null;this.sceneryImage?.removeAttribute('src');this.sceneryImage=null;this.overlay?.remove();this.adapter?.unmount();this.wallpaper?.remove();this.style?.remove();
    if(this.didMount){if(this.savedTheme==null)this.doc.body.removeAttribute('data-yn-theme');else this.doc.body.setAttribute('data-yn-theme',this.savedTheme);}
    for(const u of this.urls)URL.revokeObjectURL(u);this.urls.clear();if(ACTIVE.get(this.doc)===this)ACTIVE.delete(this.doc);
  }
}

export function createYourNamePlugin(config={},options={}) {return new YourNamePlugin(options).init(config);}
export const name='your-name-startup-theme';
export const inject=[];
/** Actual DSH/Cordis browser entry. The host owns disposal through effect. */
export function apply(ctx){
  return ctx.effect(()=>{const plugin=createYourNamePlugin();plugin.mount().catch(error=>{console.error('[Your Name]',error);plugin.unmount();});return()=>plugin.unmount();},'your-name: startup and UI theme');
}

```

## src/theme.css

```css
/* Owned namespace only. No host content is reparented or replaced. */
body[data-yn-theme] {
  --yn-text:#f5f7ff; --yn-muted:#c3cede; --yn-red:#ec8795;
  --yn-surface:rgba(13,21,37,.94); --yn-border:rgba(238,178,161,.24);
  --dsw-alias-label-primary:#f5f7ff;--dsw-alias-label-secondary:#dce4f2;
  --dsw-alias-label-primary-inverted:#0b1426;
  --dsw-alias-label-tertiary:#c3cede;--dsw-alias-label-caption:#c3cede;
  --dsw-alias-bg-base:#101a2c;--dsw-alias-bg-l1:#142038;--dsw-alias-bg-l2:#18253c;
  --dsw-specific-sidebar-fill:#101a2c;--dsw-alias-border-l3:#53617a;
  --dsw-alias-interactive-bg-hover:#28364c;
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
body[data-yn-theme] .yn-message :where(p,li,span,strong,em,h1,h2,h3,h4,td,th) {color:inherit !important;}
body[data-yn-theme] .yn-message a {color:#ffd3b4 !important;text-decoration:underline;text-underline-offset:3px;}
body[data-yn-theme] .yn-message :where(pre,code) {background:#080f1e !important;color:#e8edf8 !important;border-radius:6px;}
body[data-yn-theme] .yn-message pre {overflow:auto;padding:14px;}
body[data-yn-theme] .yn-message table {border-collapse:collapse;}
body[data-yn-theme] .yn-message :where(td,th) {border:1px solid #53617a;padding:7px 12px;}
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
.yn-intro {position:fixed;inset:0;z-index:2147483600;touch-action:none;overscroll-behavior:contain;outline:none;isolation:isolate;will-change:opacity;}
.yn-intro-visual {position:absolute;inset:0;background:#0b1426;will-change:opacity;}
.yn-intro video {position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#fff;opacity:0;will-change:opacity;transition:opacity 100ms linear;}
.yn-intro[data-video-ready] video {opacity:1;}
.yn-intro-hint {position:absolute;right:max(24px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));
  border:1px solid rgba(255,255,255,.35);border-radius:99px;padding:9px 16px;color:white;background:rgba(10,18,34,.86);font:12px/1.5 system-ui;cursor:pointer;z-index:1;}
.yn-intro-sound {right:auto;left:max(24px,env(safe-area-inset-left));}
.yn-intro-sound:focus-visible {outline:2px solid #ffb9ad;outline-offset:3px;}
.yn-intro-mask-defs {position:absolute;width:0;height:0;pointer-events:none;overflow:hidden;}
@media(prefers-reduced-motion:reduce) {.yn-knot * {animation:none !important;}body[data-yn-theme] *{scroll-behavior:auto !important;}.yn-intro video{transition:none;}}
@supports not (backdrop-filter:blur(1px)) {body[data-yn-theme] .yn-composer{background:#101a2c !important;}}
@media(max-width:700px){body[data-yn-theme] .yn-message{padding:14px 16px !important;}.yn-composer>.yn-knot{left:8%;right:8%;}}

```

## src/kumihimo.svg

```xml
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

```

## src/sidebar-scenery.svg

```xml
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

```

## src/sky-motifs.svg

```xml
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

```

## locale/en.json

```json
{
  "meta": {
    "title": "君の名はdsh",
    "description": "A fading startup transition and a Your Name themed conversation interface."
  }
}

```

## locale/zh.json

```json
{
  "meta": {
    "title": "君の名はdsh",
    "description": "启动动画逐渐淡出，显现《你的名字。》主题对话界面。"
  }
}

```

## locale/ja.json

```json
{
  "meta": {
    "title": "君の名はdsh",
    "description": "起動アニメーションから会話画面へ自然にフェードする「君の名は。」テーマ。"
  }
}

```

## scripts/build.mjs

```js
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
const read=p=>readFile(path.join(root,p),'utf8');
const [config,runtime,css,svg,scenery,sky,pkg]=await Promise.all(['src/config.js','src/runtime.js','src/theme.css','src/kumihimo.svg','src/sidebar-scenery.svg','src/sky-motifs.svg','package.json'].map(read));
const assets={};
for(const [kind,file,mime] of [['video','transition.mp4','video/mp4'],['background','bg_image.jpg','image/jpeg'],['lake','sidebar-lake.webp','image/webp']])assets[kind]={mime,base64:(await readFile(path.join(root,'assets',file))).toString('base64')};
const factory=`${config.replace(/^export /gm,'')}\nconst THEME_CSS=${JSON.stringify(css)};\nconst KUMIHIMO_SVG=${JSON.stringify(svg)};\nconst SCENERY_SVG=${JSON.stringify(scenery)};\nconst SKY_SVG=${JSON.stringify(sky)};\nconst BUNDLED_ASSETS=${JSON.stringify(assets)};\n${runtime.replace(/^export /gm,'')}\nreturn {name,inject,apply,createYourNamePlugin,YourNamePlugin,DSHAdapter};`;
const output=`/* Your Name DSH ${JSON.parse(pkg).version}. Generated by scripts/build.mjs. */\n(()=>{'use strict';window.__ModuleLoader__.load({id:${JSON.stringify(JSON.parse(pkg).name)},factory:function(require){\n${factory}\n}});})();\n`;
await mkdir(path.join(root,'lib'),{recursive:true});
await writeFile(path.join(root,'lib/client.js'),output);
await writeFile(path.join(root,'lib/index.js'),await read('src/host.js'));
console.log(`Built DSH lazy-CJS client: ${(Buffer.byteLength(output)/1048576).toFixed(2)} MiB (offline media included)`);

```

## scripts/serve.mjs

```js
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
export function createServer(){return http.createServer(async(req,res)=>{
  try{
    const u=new URL(req.url,'http://localhost');let relative=decodeURIComponent(u.pathname);if(relative==='/')relative='/preview/index.html';
    const file=path.resolve(root,'.'+relative);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
    const size=(await stat(file)).size;const ext=path.extname(file);const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mp4':'video/mp4','.json':'application/json'}[ext]||'application/octet-stream';
    const data=await readFile(file);const match=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    const headers={'content-type':mime,'cache-control':'no-store','accept-ranges':'bytes','x-content-type-options':'nosniff'};
    if(match){const start=+match[1],end=match[2]?Math.min(+match[2],size-1):size-1;if(start>end||start>=size){res.writeHead(416,{'content-range':`bytes */${size}`});return res.end();}res.writeHead(206,{...headers,'content-range':`bytes ${start}-${end}/${size}`,'content-length':end-start+1});res.end(data.subarray(start,end+1));}
    else{res.writeHead(200,{...headers,'content-length':size});res.end(data);}
  }catch{res.writeHead(404);res.end('Not found');}
});}
if(process.argv[1]===fileURLToPath(import.meta.url))createServer().listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));

```

## preview/index.html

```html
<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>君の名はdsh · 预览</title>
<style>
*{box-sizing:border-box}body{margin:0;font:14px/1.6 system-ui,-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;color:#17213b;background:#eceff5}button,textarea{font:inherit}button{cursor:pointer}.demo-app{height:100vh;display:grid;grid-template-columns:248px 1fr}.demo-sidebar{padding:24px 20px;display:flex;flex-direction:column;gap:12px}.demo-logo{padding:12px 0 28px;font-size:20px;font-weight:600;letter-spacing:.03em}.demo-logo small{font-size:10px;letter-spacing:.15em}.demo-sidebar button{padding:11px;text-align:left;border:1px solid #9ca4ba;border-radius:9px}.demo-sidebar small{margin:20px 0 4px}.demo-user{margin-top:auto;border-top:1px solid #7d879b;padding-top:18px}.demo-main{display:flex;flex-direction:column;min-width:0;background:#fff}.demo-header{padding:18px 32px;border-bottom:1px solid #aaa;display:flex;align-items:center;justify-content:space-between}.demo-header strong{font-size:15px}.demo-header small{margin-left:14px}.demo-chat{flex:1;overflow:auto;padding:38px clamp(24px,7vw,120px)}.demo-chat time{display:block;margin:18px 0;color:#c3cede;font-size:12px}.demo-message{max-width:720px;margin-bottom:22px;background:#fff;border:1px solid #ccc;padding:18px}.demo-message p{margin:0 0 12px}.demo-message.user{margin-left:auto;width:max-content}.demo-meta{color:#c3cede;font-size:12px;display:flex;gap:22px;margin-top:14px}.demo-compose-wrap{padding:20px clamp(24px,7vw,120px) 18px}.demo-composer{padding:18px 20px;border:1px solid #888;border-radius:16px;background:white;position:relative}.demo-composer textarea{width:100%;min-height:60px;resize:vertical;outline:none;border:0}.demo-tools{display:flex;align-items:center;justify-content:space-between;gap:8px}.demo-tools button{border:1px solid #808b9f;border-radius:8px;padding:6px 12px}.demo-tools span{font-size:12px}.demo-status{font-size:11px;color:#c3cede;margin-top:10px;display:flex;justify-content:space-between}.demo-toolbar{position:fixed;right:20px;top:80px;z-index:10;display:flex;gap:6px}.demo-toolbar button{background:#101b2e;color:#e9edf5;border:1px solid #9c6c7c;border-radius:7px;font-size:11px;padding:6px 10px}.demo-note{font-size:10px;opacity:.8}.demo-toast{position:fixed;bottom:12px;left:12px;z-index:11;color:#c3cede;font-size:10px;pointer-events:none}@media(max-width:720px){.demo-app{grid-template-columns:178px 1fr}.demo-sidebar{padding:18px 10px}.demo-header{padding:16px}.demo-header small{display:none}.demo-chat{padding:28px 16px}.demo-compose-wrap{padding:20px 16px}.demo-tools span{display:none}.demo-toolbar{top:70px}.demo-logo{font-size:16px}}
</style></head><body>
<div class="demo-app" data-dsh-root>
<aside class="demo-sidebar" data-dsh-sidebar><header class="demo-logo" data-dsh-logo>deepseek <small>HARNESS</small></header><button data-test-underlying>＋ 新会话</button><button>◇ 插件</button><button>◷ 自动化任务</button><small>工作区</small><button aria-current="page">✧ 默认工作区</button><div role="tree"><button role="treeitem">Greeting · 今天</button></div><div class="demo-user">◉ hoshi <div class="demo-note">君の名はdsh</div></div></aside>
<main class="demo-main" data-dsh-chat><header class="demo-header" data-dsh-chat-header><div><strong>Greeting</strong><small>对话 · 标准模式</small></div><span>⌘ &nbsp; ···</span></header><section class="demo-chat"><article class="demo-message user" data-message-role="user">你好，今天想一起做些什么？</article><time>已完成，用时 2 秒</time><article class="demo-message" data-message-role="assistant"><p>你好！我在这里，随时准备帮你做事。</p><p>我可以帮你：</p><ul><li><strong>写代码、改代码：</strong>阅读工作区、定位问题与验证修改。</li><li><strong>处理文档：</strong>整理 Word、Excel、PPT 与 PDF。</li><li><strong>查资料：</strong>检索、比较并附上来源。</li></ul><p>把想法告诉我，我们从这里开始。</p><div class="demo-meta"><span>♧ 复制</span><span>用量 9.6K tokens</span><span>15:47</span></div></article></section><div class="demo-compose-wrap"><form class="demo-composer" data-dsh-composer onsubmit="return false"><textarea aria-label="发送消息" placeholder="发送消息或创建任务，调用指令、@ 文件或对话"></textarea><div class="demo-tools"><button type="button">＋</button><span>DeepSeek-V4.1-Flash · High</span><button type="button" data-test-send>↑ 发送</button></div></form><div class="demo-status"><span>1 轮 · 160 tok/s</span><span>缓存命中 0% · 连接正常</span></div></div></main>
</div><div class="demo-toolbar"><button id="replay">重播启动</button><button id="static">直接看主题</button><button id="dispose">卸载主题</button></div><div class="demo-toast">交互预览：模拟 DSH 布局，不连接模型、不发送消息。</div>
<script src="/preview/bootstrap.js"></script><script src="/lib/client.js"></script></body></html>

```

## preview/bootstrap.js

```js
/* This mock module-loader exists ONLY in the preview, not in the plugin. */
let plugin;
window.__previewClicks=0;
document.querySelectorAll('[data-test-underlying],[data-test-send]').forEach(el=>el.addEventListener('click',()=>window.__previewClicks++));
window.__ModuleLoader__={load({factory}){
  const mod=factory(()=>{throw new Error('No runtime dependencies');});window.__previewModule=mod;
  const start=async(config={})=>{plugin?.unmount();plugin=mod.createYourNamePlugin(config);window.__previewPlugin=plugin;await plugin.mount();};
  document.querySelector('#replay').onclick=()=>start();document.querySelector('#static').onclick=()=>start({transition:{enabled:false}});document.querySelector('#dispose').onclick=()=>plugin?.unmount();
  const params=new URLSearchParams(location.search);start(params.has('static')?{transition:{enabled:false}}:{});
}};

```

## tests/run.mjs

```js
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
const ready=p=>p.waitForFunction(()=>window.__previewPlugin?.state==='ready',{},{timeout:12000});
const start=async(p,config={})=>p.evaluate(config=>{window.__previewPlugin.unmount();window.__previewPlugin=window.__previewModule.createYourNamePlugin(config);void window.__previewPlugin.mount();},config);
try {
await run('Theme surfaces, background and inline braided SVG',async()=>{const p=await page();await ready(p);const data=await p.evaluate(()=>({roles:window.__previewPlugin.adapter.diagnostics(),background:getComputedStyle(document.querySelector('.yn-wallpaper')).backgroundImage,knots:document.querySelectorAll('.yn-knot').length,dashes:document.querySelectorAll('.yn-knot [stroke-dasharray]').length}));assert.equal(data.roles.sidebar,1);assert.equal(data.roles.composer,1);assert.ok(data.background.includes('blob:'));assert.equal(data.knots,2);assert.ok(data.dashes>=4);await p.screenshot({path:root+'/preview/theme-preview.png'});await p.context().close();});
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
await run('Missing video and missing background have bounded fallbacks',async()=>{const p=await page();await ready(p);await start(p,{transition:{videoUrl:'/missing.mp4',assetTimeoutMs:600}});await ready(p);assert.equal(await p.evaluate(()=>window.__previewPlugin.debug.reason),'video-fallback');await start(p,{transition:{enabled:false,backgroundUrl:'/missing.jpg',assetTimeoutMs:600}});await ready(p);assert.ok(await p.evaluate(()=>window.__previewPlugin.debug.backgroundError));await p.context().close();});
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
    const file=req.resolve('dsh-your-name-theme/locale/'+lang+'.json');const locale=JSON.parse(await readFile(file,'utf8'));assert.equal(locale.meta.title,'君の名はdsh');
  }
});
await run('SVG inverse mask really opens a hole at measured source center',async()=>{const p=await page();await ready(p);await start(p,{transition:{skipMs:300,revealStyle:'ripple'}});await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const center=await p.evaluate(()=>{const q=window.__previewPlugin;q.video.style.visibility='hidden';q.visual.style.background='white';q.finish('skip');for(const a of q.animations){a.pause();a.currentTime=10;}return q.center();});const png=PNG.sync.read(await p.screenshot());const pixel=(x,y)=>{const i=(Math.round(y)*png.width+Math.round(x))*4;return [...png.data.subarray(i,i+3)];};const mid=pixel(center.x,center.y),corner=pixel(5,5);assert.ok(mid.some(x=>x<180),'The center must reveal the dark themed UI');assert.ok(corner.every(x=>x>245),'The far corner must remain covered');await p.context().close();});
await run('Dynamic composer replacement gets exactly one decoration',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{const c=document.querySelector('[data-dsh-composer]');const n=c.cloneNode(true);n.querySelectorAll('.yn-knot').forEach(x=>x.remove());n.classList.remove('yn-composer');c.replaceWith(n);});await p.waitForFunction(()=>document.querySelector('[data-dsh-composer]')?.classList.contains('yn-composer'));assert.equal(await p.locator('[data-dsh-composer]>.yn-knot').count(),1);await p.context().close();});
await run('CSS-module export adapter resolves changed hash prefixes',async()=>{const p=await page();await ready(p);const count=await p.evaluate(()=>{const s=document.createElement('style');s.dataset.pluginCss='@deepseek-ai/dsh-client-ui-conversation/InputBar.module.css';s.textContent='.freshHash_card {position:relative}';document.head.append(s);const d=document.createElement('div');d.className='freshHash_card';document.body.append(d);window.__previewPlugin.adapter.sync();return Number(d.classList.contains('yn-composer'));});assert.equal(count,1);await p.context().close();});
await run('Cleanup cancels in-flight mount and permits clean remount',async()=>{const p=await page();await ready(p);await start(p);await p.evaluate(()=>window.__previewPlugin.unmount());await p.waitForTimeout(350);const d=await p.evaluate(()=>({state:window.__previewPlugin.state,owned:document.querySelectorAll('[data-yn-owned]').length,timers:window.__previewPlugin.timers.size,urls:window.__previewPlugin.urls.size,classes:[...document.querySelectorAll('[class]')].some(el=>[...el.classList].some(c=>c.startsWith('yn-'))),attr:document.body.hasAttribute('data-yn-theme')}));assert.deepEqual(d,{state:'disposed',owned:0,timers:0,urls:0,classes:false,attr:false});await start(p,{transition:{enabled:false}});await ready(p);await p.context().close();});
await run('Critical text colors pass AA against worst-case white photo',async()=>{const lum=rgb=>rgb.map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4}).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);const bg=[13,21,37].map(c=>c*.94+255*.06);for(const color of [[245,247,255],[195,206,222],[220,228,242]])assert.ok((lum(color)+.05)/(lum(bg)+.05)>=4.5);});
await run('Audible autoplay is tried first; policy rejection retries muted',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{const play=HTMLMediaElement.prototype.play;window.__audioAttempts=[];window.__denyAudible=true;HTMLMediaElement.prototype.play=function(){window.__audioAttempts.push(this.muted);if(!this.muted&&window.__denyAudible)return Promise.reject(new DOMException('Policy','NotAllowedError'));return play.call(this);};});await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const data=await p.evaluate(()=>({attempts:window.__audioAttempts,sound:window.__previewPlugin.debug.sound,muted:window.__previewPlugin.video.muted,volume:window.__previewPlugin.video.volume}));assert.deepEqual(data.attempts.slice(0,2),[false,true]);assert.equal(data.sound,'muted-policy');assert.equal(data.muted,true);assert.equal(data.volume,1);await p.context().close();});
await run('Sound button enables audio without skipping or restarting video',async()=>{const p=await page();await ready(p);await p.evaluate(()=>{const play=HTMLMediaElement.prototype.play;window.__denyAudible=true;HTMLMediaElement.prototype.play=function(){if(!this.muted&&window.__denyAudible)return Promise.reject(new DOMException('Policy','NotAllowedError'));return play.call(this);};});await start(p);await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const time=await p.evaluate(()=>{window.__denyAudible=false;return window.__previewPlugin.video.currentTime;});await p.locator('[data-yn-sound]').click();await p.waitForFunction(()=>window.__previewPlugin.debug.sound==='audible');assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');assert.ok(await p.evaluate(time=>window.__previewPlugin.video.currentTime>=time,time));assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.locator('[data-yn-sound]').click();assert.equal(await p.evaluate(()=>window.__previewPlugin.video.muted),true);assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.context().close();});
await run('Keyboard sound control does not trigger global Enter-to-skip',async()=>{const p=await page();await ready(p);await start(p,{transition:{sound:false}});await p.waitForFunction(()=>window.__previewPlugin.state==='playing');await p.locator('[data-yn-sound]').focus();await p.keyboard.press('Enter');await p.waitForFunction(()=>!window.__previewPlugin.video.muted);assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');await p.context().close();});
await run('Touch sound control keeps the movie playing and blocks ghost clicks',async()=>{const p=await page({hasTouch:true,isMobile:true});await ready(p);await start(p,{transition:{sound:false}});await p.waitForFunction(()=>window.__previewPlugin.state==='playing');const b=await p.locator('[data-yn-sound]').boundingBox();await p.touchscreen.tap(b.x+20,b.y+12);await p.waitForFunction(()=>window.__previewPlugin.debug.sound==='audible');assert.equal(await p.evaluate(()=>window.__previewPlugin.state),'playing');assert.equal(await p.evaluate(()=>window.__previewClicks),0);await p.context().close();});
await run('Sidebar uses independent lake artwork; staircase photo is painted once',async()=>{const p=await page();await ready(p);assert.equal(await p.locator('.yn-sidebar-scenery').count(),1);assert.equal(await p.locator('.yn-sidebar-photo').count(),0);assert.equal(await p.locator('.yn-sidebar-scenery img').count(),0);assert.equal(await p.locator('.yn-lake-art').count(),1);assert.ok(await p.evaluate(()=>window.__previewPlugin.sceneryImage.naturalWidth>=512));const lake=await p.locator('.yn-lake-art').getAttribute('href');assert.ok(lake.startsWith('blob:'));assert.notEqual(lake,await p.evaluate(()=>window.__previewPlugin.image.src));assert.ok(await p.locator('.yn-scene-comet path').count()>0);assert.ok((await p.locator('.yn-wallpaper').evaluate(el=>getComputedStyle(el).backgroundImage)).includes('blob:'));const noPhoto=()=>[...document.querySelectorAll('.yn-sidebar-scenery,.yn-sidebar-scenery *')].every(el=>!getComputedStyle(el).backgroundImage.includes('url(')&&!el.style.getPropertyValue('--yn-sidebar-image'));assert.equal(await p.evaluate(noPhoto),true);await p.evaluate(()=>{const old=document.querySelector('[data-dsh-sidebar]');const fresh=old.cloneNode(true);fresh.querySelectorAll('[data-yn-owned]').forEach(n=>n.remove());fresh.classList.remove('yn-sidebar');old.replaceWith(fresh);});await p.waitForFunction(()=>document.querySelectorAll('.yn-sidebar-scenery').length===1);assert.equal(await p.evaluate(noPhoto),true);assert.equal(await p.locator('.yn-sidebar-photo').count(),0);assert.equal(await p.locator('.yn-lake-art').count(),1);assert.equal(await p.locator('.yn-lake-art').getAttribute('href'),lake);await p.context().close();});
await run('No uncaught browser errors',async()=>assert.deepEqual(errors,[]));
} finally {await browser.close();await new Promise(r=>server.close(r));await mkdir(root+'/docs',{recursive:true});await writeFile(root+'/docs/test-results.json',JSON.stringify({testedAt:new Date().toISOString(),scope:'Chromium mock DSH DOM + real supplied video; not an installed DSH application',results},null,2));}
if(results.some(r=>r.status==='FAIL'))process.exitCode=1;

```
