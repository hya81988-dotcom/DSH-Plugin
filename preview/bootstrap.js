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
