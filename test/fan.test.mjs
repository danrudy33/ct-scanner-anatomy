import test from 'node:test';
import assert from 'node:assert/strict';
import { createFan, createAcquisition, projection } from '../figures/danrudy33/ct-scanner/src/reconstruction.mjs';
test('fan acquisition rebins measured fan rays to parallel lines with low interpolation error', () => {
  const fan=createFan(); assert.throws(()=>fan.parallel(.2,3), /completed/);
  while(fan.step()) {}
  let err=0,norm=0;
  for(let theta=0;theta<Math.PI;theta+=.071) for(let s=-16;s<16;s+=.73) {const p=projection(theta,s); err+=(fan.parallel(theta,s)-p)**2; norm+=p*p;}
  const error=Math.sqrt(err/norm); console.log({fanRebinNRMSE:error});
  assert.ok(error<.025);
  const a=createAcquisition({projector:fan.parallel}); while(a.step()) {}
  const nrmse=Math.sqrt(a.image.reduce((sum,v,i)=>sum+(v-a.truth[i])**2,0)/a.truth.reduce((sum,v)=>sum+v*v,0));
  console.log({fanRebinFbpNRMSE:nrmse}); assert.ok(nrmse<.18);
});
