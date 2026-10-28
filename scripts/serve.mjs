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
