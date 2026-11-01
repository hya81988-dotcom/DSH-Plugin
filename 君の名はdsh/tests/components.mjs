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
