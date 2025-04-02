(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();function h(r,e,...i){const n=document.createElement(r);for(const t in e)t.startsWith("on")?n.addEventListener(t.substring(2),e[t]):t==="bind"?e.bind.set(n):n.setAttribute(t,e[t]);for(const t of i)n.append(t);return n}const o=new Proxy({},{get(r,e,i){if(typeof e=="string")return(n,...t)=>h(e,n,...t)}});class g{constructor(){this.signalValues=[],this.signalSubscribers={},this.effects=[],this.runningEffect=void 0}runEffect(e){const i=this.runningEffect;this.runningEffect=e,this.effects[e](),this.runningEffect=i}createEffect(e){this.effects.push(e);const i=this.effects.length-1;this.runEffect(i)}createSignal(e){this.signalValues.push(e);const i=this,n=this.signalValues.length-1;return{get(){const t=i.signalValues[n];if(i.runningEffect!==void 0){const s=i.signalSubscribers[n]??new Set;s.add(i.runningEffect),i.signalSubscribers[n]=s}return t},set(t){i.signalValues[n]=t;const s=i.signalSubscribers[n];if(s)for(const c of s)i.runEffect(c)},update(t){i.signalValues[n]=t(i.signalValues[n]);const s=i.signalSubscribers[n];if(s)for(const c of s)i.runEffect(c)}}}}const d=new g;function p(r){d.createEffect(r)}function u(r){return d.createSignal(r)}class m{constructor({initialX:e,initialY:i,direction:n}){this.x=e,this.y=i,this.direction=n}update({mouseX:e,mouseY:i}){const n=this.direction*Math.PI/180;this.x+=Math.cos(n),this.y+=Math.sin(n),(this.x<=0||this.x>=window.innerWidth)&&(this.direction=180-this.direction),(this.y<=0||this.y>=window.innerHeight)&&(this.direction=360-this.direction);const t=e-this.x,s=i-this.y,c=Math.sqrt(t*t+s*s),a=200;if(c<a){const l=Math.atan2(s,t)*(180/Math.PI),f=.1*(c/a);this.direction=this.linear_interp(this.direction,l,f)}}draw(e){e.beginPath(),e.arc(this.x,this.y,2,0,Math.PI*2),e.fillStyle="#7a9ffd",e.fill()}linear_interp(e,i,n){return e+(i-e)*n}}function b(){const r=u(),e=u([]);return p(()=>{var c;const i=(c=r.get())==null?void 0:c.getContext("2d");if(!i)return;const n=100;for(let a=0;a<n;a++)e.update(l=>[...l,new m({initialX:Math.floor(Math.random()*(window.innerWidth+1)),initialY:Math.floor(Math.random()*(window.innerHeight+1)),direction:Math.floor(Math.random()*361)})]);const t={mouseX:0,mouseY:0};addEventListener("mousemove",a=>{t.mouseX=a.clientX,t.mouseY=a.clientY});function s(){var a,l;i.clearRect(0,0,(a=r.get())==null?void 0:a.width,(l=r.get())==null?void 0:l.height);for(const f of e.get())f.update(t),f.draw(i);requestAnimationFrame(s)}s()}),o.div({class:"flex justify-center items-center min-h-screen"},o.canvas({bind:r,id:"background",width:window.innerWidth,height:window.innerHeight,class:"fixed top-0 left-0 -z-10"},"Your browser does not support the canvas element."),o.div({class:"flex justify-center items-center min-h-screen"},o.div({class:"grid md:grid-cols-5 px-12 lg:px-34 gap-24 items-center"},o.div({class:"flex flex-col gap-4 col-span-2"},o.h1({class:"text-5xl text-[#dedcff] ubuntu-800"},"Lucas Fietkiewicz"),o.p({class:"text-[#d8d8d8] ubuntu-300"},"I like optimization and figuring out what makes things tick.")),o.p({class:"text-[#433bff] col-span-3 ubuntu-500"},"I'm a frontend developer with experience on the teams at ",o.a({href:"https://get.even.biz/",target:"_blank",class:"text-[#3d73ff] underline italic"},"even")," and ",o.a({href:"https://www.reikit.com/",target:"_blank",class:"text-[#3d73ff] underline italic"},"REI/kit"),", where I led projects like migrating to new backends and optimizing packages. One of my proudest contributions was developing a build step that verifies API responses, completely eliminating a class of errors with zero added client-side code. Outside of work, I enjoy studying low-level programming and performance tuning. For example, I've built ",o.a({href:"https://github.com/lucasftz/zdom",target:"_blank",class:"text-[#3d73ff] underline italic"},"WASM bindings for Zig"),", making it easy to integrate with the web. I also created a lightweight ",o.a({href:"https://github.com/lucasftz/nui",target:"_blank",class:"text-[#3d73ff] underline italic"},"UI library"),", which this site is written in. You can check out my resume ",o.a({href:"public/resume.pdf",download:"Resume - Lucas",class:"text-[#3d73ff] underline italic"},"here")," and my github ",o.a({href:"https://github.com/lucasftz",target:"_blank",class:"text-[#3d73ff] underline italic"},"here"),"."))))}window.onload=function(){document.getElementById("root").appendChild(b())};
