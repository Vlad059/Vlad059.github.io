// if(!self.define)

//Заменить нижнюю строчку на верхнюю 

if(true)
{let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>i(e,o),l={module:{uri:o},exports:t,require:c};s[o]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(n(...e),t)))}}
define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"qr_mobile"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.f8e6e002.css",revision:null},{url:"/index.html",revision:"6e378c07a11e1be21d5e145e599e2db6"},{url:"/js/app.22d98b92.js",revision:null},{url:"/js/chunk-vendors.5ca1def3.js",revision:null},{url:"/main.js",revision:"621da5dddf2975b84dc4ff48c4313def"},{url:"/manifest.json",revision:"cdb85a45d5c92a2c4b1a30bf51652bfe"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));

self.addEventListener("install", (event)=>{
    self.skipWaiting();
});

console.log("SW");
//# sourceMappingURL=service-worker.js.map
