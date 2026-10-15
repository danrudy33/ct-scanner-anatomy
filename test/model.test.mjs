import test from 'node:test';
import assert from 'node:assert/strict';
import { rotation, helical, derived, SCANNER } from '../figures/danrudy33/ct-scanner/src/model.mjs';
import { projection, samplePhantom, createAcquisition, createFan } from '../figures/danrudy33/ct-scanner/src/reconstruction.mjs';
const near = (a,b,tol=1e-9) => assert.ok(Math.abs(a-b)<tol, `${a} != ${b}`);
test('64 rows project to 40 mm collimation; fan covers 50 cm SFOV', () => {
  const d = derived(); near(d.beamAtIso,4); near(d.beamAtDetector,4*95/54);
  near(54*Math.sin(d.fanHalf),25); near(d.isoToDetector,41);
  assert.equal(SCANNER.boreRadius*2,70);
});
test('rpm, g-load and pitch-based table feed are physically computed', () => {
  const r = rotation(.33); near(r.rpm,60/.33); near(r.g,19.962040906,.000001);
  const h = helical({T:.33,pitch:1,length:60}); near(h.tableSpeed,4/.33); near(h.time,4.95); near(h.rotations,15);
  near(rotation(.25).g,34.78136,.001);
});
test('analytic Radon: uniform circle matches its exact chord; symmetry holds', () => {
  const circle=[{a:10,b:10,y:0,z:0,phi:0,density:1}];
  near(projection(.7,0,circle),20); near(projection(0,6,circle),16); near(projection(2,11,circle),0);
  near(projection(.4,5),projection(.4+Math.PI,-5));
});
test('numeric ray integration independently agrees with rotated ellipse projections', () => {
  for (const theta of [.1,.7,1.9]) for (const p of [-8,1,7]) {
    let integral=0; const dt=.002;
    for (let t=-24;t<24;t+=dt) integral+=samplePhantom(p*Math.cos(theta)-t*Math.sin(theta),p*Math.sin(theta)+t*Math.cos(theta))*dt;
    near(projection(theta,p),integral,.025);
  }
});
test('real filtered back-projection recovers the phantom with validated error and contrast', () => {
  const a=createAcquisition(); while(a.step()) {}
  let err=0, norm=0, dot=0, rawNorm=0;
  for(let i=0;i<a.truth.length;i++) {err+=(a.image[i]-a.truth[i])**2; norm+=a.truth[i]**2; dot+=a.unfiltered[i]*a.truth[i]; rawNorm+=a.unfiltered[i]**2;}
  const nrmse=Math.sqrt(err/norm);
  const gain=dot/rawNorm;
  let rawError=0;
  for(let i=0;i<a.truth.length;i++) rawError+=(gain*a.unfiltered[i]-a.truth[i])**2;
  const rawNrmse=Math.sqrt(rawError/norm);
  console.log(JSON.stringify({angles:a.acquired, nrmse, unfilteredBestFitNrmse:rawNrmse, min:Math.min(...a.image), max:Math.max(...a.image)}));
  assert.ok(nrmse<.16,`FBP error too high ${nrmse}`);
  assert.ok(nrmse < rawNrmse*.55, 'ramp filtering must materially outperform blurred back-projection');
  const at=(y,z)=>a.image[Math.floor((a.span/2-z)/a.span*a.pixels)*a.pixels+Math.floor((y+a.span/2)/a.span*a.pixels)];
  near(at(0,0),1,.08); near(at(-5,2),.35,.08); near(at(5,4),1.75,.08);
});
