import{c as i}from"./FloatingNav-B-bhmf3W.js";import{r as L,j as F}from"./index-DsoEW3pw.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=i("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=i("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=i("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=i("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);function I({gridSize:t=48,spotlightRadius:s=200,gridColor:y="rgba(255, 255, 255, 0.04)",glowColor:m="255, 98, 0"}){const u=L.useRef(null);return L.useEffect(()=>{const a=u.current;if(!a||typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0))return;const e=a.getContext("2d");if(!e)return;let h=-1e3,l=-1e3;const f=()=>{a.width=window.innerWidth,a.height=window.innerHeight};f(),window.addEventListener("resize",f);const M=r=>{h=r.clientX,l=r.clientY};window.addEventListener("mousemove",M);let w;const k=()=>{e.clearRect(0,0,a.width,a.height);const r=a.width,v=a.height;e.strokeStyle=y,e.lineWidth=1,e.beginPath();for(let n=0;n<=r;n+=t)e.moveTo(n,0),e.lineTo(n,v);for(let n=0;n<=v;n+=t)e.moveTo(0,n),e.lineTo(r,n);if(e.stroke(),h>=0&&l>=0){const n=Math.max(0,Math.floor((h-s)/t)*t),b=Math.min(r,Math.ceil((h+s)/t)*t),E=Math.max(0,Math.floor((l-s)/t)*t),A=Math.min(v,Math.ceil((l+s)/t)*t);for(let o=n;o<=b;o+=t)for(let c=E;c<=A;c+=t){const x=o-h,p=c-l,T=Math.sqrt(x*x+p*p);if(T<s){const d=1-T/s;e.fillStyle=`rgba(${m}, ${d*.7})`,e.beginPath(),e.arc(o,c,2.5*d+1,0,Math.PI*2),e.fill(),e.strokeStyle=`rgba(${m}, ${d*.35})`,e.lineWidth=1.5,e.beginPath(),e.moveTo(o-t/2,c),e.lineTo(o+t/2,c),e.moveTo(o,c-t/2),e.lineTo(o,c+t/2),e.stroke()}}}w=requestAnimationFrame(k)};return k(),()=>{window.removeEventListener("resize",f),window.removeEventListener("mousemove",M),cancelAnimationFrame(w)}},[t,s,y,m]),F.jsx("canvas",{ref:u,className:"pointer-events-none fixed inset-0 z-0 opacity-80"})}export{X as C,Y as F,I as S,q as a,$ as b};
