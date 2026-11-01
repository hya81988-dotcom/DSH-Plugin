/* Preview-only loader. The two production bundles have no cross dependency. */
const modules=new Map();
window.__previewClicks=0;
document.querySelectorAll('[data-test-underlying],[data-test-send]').forEach(el=>el.addEventListener('click',()=>window.__previewClicks++));
window.__ModuleLoader__={load({id,factory}){
  modules.set(id,factory(()=>{throw new Error('No runtime dependencies');}));
  if(modules.size!==2)return;
  window.__themeModule=modules.get('dsh-your-name-theme');
  window.__previewModule=modules.get('dsh-your-name-startup');
  window.__setTheme=async(enabled=true,config={})=>{
    window.__themePlugin?.unmount();window.__themePlugin=null;
    if(enabled){const q=window.__themeModule.createYourNamePlugin(config);window.__themePlugin=q;await q.mount();}
  };
  window.__setStartup=async(enabled=true,config={})=>{
    window.__previewPlugin?.unmount();window.__previewPlugin=null;
    if(enabled){const q=window.__previewModule.createYourNamePlugin(config);window.__previewPlugin=q;await q.mount();}
  };
  window.__previewUnmount=()=>{window.__themePlugin?.unmount();window.__previewPlugin?.unmount();};
  document.querySelector('#replay').onclick=()=>window.__setStartup();
  document.querySelector('#static').onclick=async()=>{await window.__setStartup(false);await window.__setTheme();};
  document.querySelector('#dispose').textContent='关闭界面主题';
  document.querySelector('#dispose').onclick=()=>window.__setTheme(!window.__themePlugin);
  const params=new URLSearchParams(location.search);
  window.__previewReady=Promise.all([
    window.__setTheme(!params.has('startup-only')&&!params.has('off')),
    window.__setStartup(!params.has('theme-only')&&!params.has('off'),params.has('static')?{transition:{enabled:false}}:{}),
  ]);
}};
