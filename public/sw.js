if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const u=e=>a(e,i),r={module:{uri:i},exports:c,require:u};s[i]=Promise.all(n.map((e=>r[e]||u(e)))).then((e=>(t(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"bafa6ac2191efe2258e47e02d93cf735"},{url:"/_next/static/chunks/1859-831b4e68a0a5a900.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/2067-ff06bd22c2c547a5.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/2143-a3cc1fba59221b3c.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/2488-4b6215abf8eba47f.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/2837-c5881307e032af78.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/3375-6fd900d74a600d47.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/3a91511d-1a3644f3535afb45.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/4321-1048e37e7bc38745.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/4544-e8c981aed95c71e5.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/4550.a825362a33f83b1d.js",revision:"a825362a33f83b1d"},{url:"/_next/static/chunks/4868-ae2c2963dd70db07.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/5206-095a3824bb55b52d.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/5318.2311afd6b14394de.js",revision:"2311afd6b14394de"},{url:"/_next/static/chunks/5750-0a5febf6d65c00dd.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/5913-4b1960d11b5c273a.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/5956-60887b87604b90ca.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/6260-2f888121963676dd.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/6682-c0b7948e2294b44a.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/6784-8a9e8c35d070b9c6.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/7023-2f519a4fff3ff210.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/7130-7f640cc2d3bb5241.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/7138-d299865e8bf17838.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/8123.2144dbfecccdefbe.js",revision:"2144dbfecccdefbe"},{url:"/_next/static/chunks/8223-347ef1ae1898382f.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/8455-f33056db3326b94d.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/8472-67e015939fd56b34.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/866.efd84bee6403869b.js",revision:"efd84bee6403869b"},{url:"/_next/static/chunks/9765-4e03d86f09d6fef7.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/997-c1cb4caa2a8278f1.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/9c560169-5a3918cd90f534ab.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/_not-found/page-950cefccd6346f00.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/add-to-home/page-351736d0c4e9854d.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/admin-manage/page-95b18e24a8de4994.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/layout-6e7ab789170bf8e2.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/login/page-3440590d96956286.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/login/verify/page-45fc1b8d43d32d63.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/page-7206628dd91a649e.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/play/page-88dbd92bb1e9a85c.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/play/result/page-97a4577890ef74ce.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/play/submit/page-7403401c2ea62cf1.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/play/swipe/page-60f7436740ad859e.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/profile/global-rank/page-a525efbb9e41a57e.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/profile/page-7b7798806f5d7987.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/referral/page-e4db83dd893aa06b.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/shop/page-12bed2b61f4a9535.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/app/start/page-389067e9d7142f08.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/c16f53c3-1d47799576d73586.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/dc112a36-dd72e56818520f67.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/e37a0b60-70bbcd6b3bc795d5.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/fd9d1056-2f370010651f124b.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/main-9c07b7e4a20128aa.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/main-app-8763fcd6601dac75.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-cdc193e4eac4737d.js",revision:"hfuUaQm4CJ1rK9_VHOuGS"},{url:"/_next/static/css/3f3af6781b5aa5e9.css",revision:"3f3af6781b5aa5e9"},{url:"/_next/static/css/94470f27b9ee9024.css",revision:"94470f27b9ee9024"},{url:"/_next/static/css/fab2f26daab1f058.css",revision:"fab2f26daab1f058"},{url:"/_next/static/hfuUaQm4CJ1rK9_VHOuGS/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/hfuUaQm4CJ1rK9_VHOuGS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/ReadexPro-Bold.6668801a.ttf",revision:"6668801a"},{url:"/_next/static/media/ReadexPro-Light.07e18c25.ttf",revision:"07e18c25"},{url:"/_next/static/media/ReadexPro-Medium.f9a8f04b.ttf",revision:"f9a8f04b"},{url:"/_next/static/media/ReadexPro-Regular.34e1f35a.ttf",revision:"34e1f35a"},{url:"/_next/static/media/ReadexPro-SemiBold.06ce4868.ttf",revision:"06ce4868"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/logo128.png",revision:"8b7f7ee7f40e4eed449ccb1a55c7745d"},{url:"/icons/logo144.png",revision:"6af0ec3f4ee496fda6696ec233f9781b"},{url:"/icons/logo48.png",revision:"e027fa5b4c717253035d09866a306a67"},{url:"/icons/logo72.png",revision:"ca2ad0154efc279c792de276b2d28921"},{url:"/icons/logo96.png",revision:"f2aae688b25c46530c1098d13755f486"},{url:"/manifest.json",revision:"4aa30a09c6c5d336072489465238c66e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
