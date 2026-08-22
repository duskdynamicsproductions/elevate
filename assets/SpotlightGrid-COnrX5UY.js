import{c as w}from"./createLucideIcon-C9PvOrwn.js";import{r as b,j as L}from"./index-C0cTqmKG.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=w("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=w("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=w("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);function I({gridSize:t=48,spotlightRadius:s=200,gridColor:d="rgba(255, 255, 255, 0.04)",glowColor:m="255, 98, 0"}){const u=b.useRef(null);return b.useEffect(()=>{const o=u.current;if(!o||typeof window<"u"&&("ontouchstart"in window||navigator.maxTouchPoints>0))return;const e=o.getContext("2d");if(!e)return;let i=-1e3,h=-1e3;const l=()=>{o.width=window.innerWidth,o.height=window.innerHeight};l(),window.addEventListener("resize",l);const x=r=>{i=r.clientX,h=r.clientY};window.addEventListener("mousemove",x);let y;const M=()=>{e.clearRect(0,0,o.width,o.height);const r=o.width,f=o.height;e.strokeStyle=d,e.lineWidth=1,e.beginPath();for(let n=0;n<=r;n+=t)e.moveTo(n,0),e.lineTo(n,f);for(let n=0;n<=f;n+=t)e.moveTo(0,n),e.lineTo(r,n);if(e.stroke(),i>=0&&h>=0){const n=Math.max(0,Math.floor((i-s)/t)*t),p=Math.min(r,Math.ceil((i+s)/t)*t),F=Math.max(0,Math.floor((h-s)/t)*t),C=Math.min(f,Math.ceil((h+s)/t)*t);for(let a=n;a<=p;a+=t)for(let c=F;c<=C;c+=t){const T=a-i,k=c-h,E=Math.sqrt(T*T+k*k);if(E<s){const v=1-E/s;e.fillStyle=`rgba(${m}, ${v*.7})`,e.beginPath(),e.arc(a,c,2.5*v+1,0,Math.PI*2),e.fill(),e.strokeStyle=`rgba(${m}, ${v*.35})`,e.lineWidth=1.5,e.beginPath(),e.moveTo(a-t/2,c),e.lineTo(a+t/2,c),e.moveTo(a,c-t/2),e.lineTo(a,c+t/2),e.stroke()}}}y=requestAnimationFrame(M)};return M(),()=>{window.removeEventListener("resize",l),window.removeEventListener("mousemove",x),cancelAnimationFrame(y)}},[t,s,d,m]),L.jsx("canvas",{ref:u,className:"pointer-events-none fixed inset-0 z-0 opacity-80"})}export{Y as C,$ as F,I as S,A as a};
