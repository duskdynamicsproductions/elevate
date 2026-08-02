import{c as x}from"./sparkles-CF4V0XYu.js";import{r as b,j as L}from"./index-CCISKpjR.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=x("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=x("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=x("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);function A({gridSize:t=48,spotlightRadius:s=200,gridColor:y="rgba(255, 255, 255, 0.04)",glowColor:l="255, 98, 0"}){const w=b.useRef(null);return b.useEffect(()=>{const o=w.current;if(!o)return;const e=o.getContext("2d");if(!e)return;let m=-1e3,h=-1e3;const i=()=>{o.width=window.innerWidth,o.height=window.innerHeight};i(),window.addEventListener("resize",i);const M=r=>{m=r.clientX,h=r.clientY};window.addEventListener("mousemove",M);let d;const u=()=>{e.clearRect(0,0,o.width,o.height);const r=o.width,f=o.height;e.strokeStyle=y,e.lineWidth=1,e.beginPath();for(let n=0;n<=r;n+=t)e.moveTo(n,0),e.lineTo(n,f);for(let n=0;n<=f;n+=t)e.moveTo(0,n),e.lineTo(r,n);if(e.stroke(),m>=0&&h>=0){const n=Math.max(0,Math.floor((m-s)/t)*t),F=Math.min(r,Math.ceil((m+s)/t)*t),p=Math.max(0,Math.floor((h-s)/t)*t),C=Math.min(f,Math.ceil((h+s)/t)*t);for(let a=n;a<=F;a+=t)for(let c=p;c<=C;c+=t){const k=a-m,T=c-h,E=Math.sqrt(k*k+T*T);if(E<s){const v=1-E/s;e.fillStyle=`rgba(${l}, ${v*.7})`,e.beginPath(),e.arc(a,c,2.5*v+1,0,Math.PI*2),e.fill(),e.strokeStyle=`rgba(${l}, ${v*.35})`,e.lineWidth=1.5,e.beginPath(),e.moveTo(a-t/2,c),e.lineTo(a+t/2,c),e.moveTo(a,c-t/2),e.lineTo(a,c+t/2),e.stroke()}}}d=requestAnimationFrame(u)};return u(),()=>{window.removeEventListener("resize",i),window.removeEventListener("mousemove",M),cancelAnimationFrame(d)}},[t,s,y,l]),L.jsx("canvas",{ref:w,className:"pointer-events-none fixed inset-0 z-0 opacity-80"})}export{X as C,Y as F,A as S,$ as a};
