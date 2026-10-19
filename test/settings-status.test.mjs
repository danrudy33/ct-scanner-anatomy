// Execute the actual packaged controller and projector in a deterministic DOM/RAF harness.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=new URL('../figures/danrudy33/ct-scanner/src/',import.meta.url);
function harness(){
 const nodes=new Map(),raf=new Map();let serial=0,time=0,mediaChange;
 class Element{constructor(){this.style={};this.dataset={};this.listeners={};this.width=96;this.height=96;this.value='';}addEventListener(k,f){this.listeners[k]=f;}setAttribute(k,v){this[k]=v;}removeAttribute(k){delete this[k];}querySelector(){return svg;}append(){}setPointerCapture(){}releasePointerCapture(){}getContext(){return {createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){},clearRect(){}};}fire(k,e={}){this.listeners[k]?.({preventDefault(){},...e});}}
 const svg=new Element(),node=s=>{if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);};node('#rotation').value='.33';node('#pitch').value='1';node('#mode').value='axial';
 const media={matches:false,addEventListener:(k,f)=>mediaChange=f};
 const ctx=vm.createContext({mountComponentLabels:()=>({draw(){}}),performance:{now:()=>time},Uint8ClampedArray,document:{hidden:false,body:{dataset:{theme:'dark'}},querySelector:node,createElementNS:()=>new Element(),addEventListener(){}},matchMedia:()=>media,IntersectionObserver:class{constructor(f){this.f=f;}observe(){this.f([{isIntersecting:true}]);}},requestAnimationFrame:f=>{raf.set(++serial,f);return serial;},cancelAnimationFrame:i=>raf.delete(i),TURN:{mount:()=>({set(){},anchor:(g,p)=>({screen:p.slice(0,2)})})}});ctx.window=ctx;
 for(const f of ['model.mjs','beam-geometry.mjs','motion.mjs','reconstruction.mjs'])vm.runInContext(readFileSync(new URL(f,source),'utf8').replace(/^import .*;\n/gm,'').replace(/^export /gm,''),ctx);
 vm.runInContext(readFileSync(new URL('live.js',source),'utf8').replace('__DATA__','{"turn":{}}'),ctx);
 const state=()=>JSON.parse(vm.runInContext('JSON.stringify({apart,apartTarget,openingRequested,armed,acquiring,phase,fanViews:fan?.acquired||0,backs:recon?.acquired||0})',ctx));
 return{state,click:id=>node(id).fire('click'),change:(id,value)=>{node(id).value=value;node(id).fire('change');},reduce:()=>{media.matches=true;mediaChange();},text:()=>node('#status').textContent,step(){time+=20;const jobs=[...raf.values()];raf.clear();for(const f of jobs)f(time);},advance(seconds){for(let i=0;i<Math.ceil(seconds/.02);i++)this.step();}};
}
const changes=[['#rotation','.5'],['#pitch','1.2'],['#mode','helical']];
for(const [id,value]of changes){
 for(const pose of ['ready','revealed','apart','complete'])test(`${id} change preserves truthful resting status: ${pose}`,()=>{
  const h=harness();h.reduce();if(pose==='revealed')h.click('#cover-toggle');if(pose==='apart')h.click('#explode');if(pose==='complete')h.click('#scan');
  const before=h.state();assert.equal(before.phase,pose);const text=h.text();h.change(id,value);assert.deepEqual(h.state(),before);assert.equal(h.text(),text);assert.doesNotMatch(h.text(),/interrupted/);
 });
 for(const active of ['positioning','acquiring','reconstructing'])test(`${id} change really interrupts ${active}`,()=>{
  const h=harness();h.click('#scan');for(let i=0;i<1500&&h.state().phase!==active;i++)h.step();assert.equal(h.state().phase,active);h.change(id,value);assert.equal(h.state().phase,'paused');assert.match(h.text(),/scan interrupted/);const stopped=h.state();h.advance(1);assert.deepEqual(h.state(),stopped);
 });
}
test('settings changes do not cancel an in-progress requested teardown',()=>{const h=harness();h.click('#explode');h.advance(.2);h.change('#pitch','1.2');h.advance(3);assert.equal(h.state().phase,'apart');assert.equal(h.state().apart,1);});
