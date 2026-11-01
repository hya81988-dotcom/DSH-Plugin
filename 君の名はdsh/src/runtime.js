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
