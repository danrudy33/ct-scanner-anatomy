import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const sha=b=>createHash('sha256').update(b).digest('hex');
const expectedScene='ec24987aab48b9fdae7f5b305917fb730ae9adc8a08fdb85abbc3e7e747d3a97';
const pages=['index.html','ct-scanner-dark.html','ct-scanner-light.html'];
const rounds=[];
for(let round=0;round<2;round++){
 const run=spawnSync(process.execPath,[join(root,'scripts/build-pages.mjs')],{cwd:root,encoding:'utf8'});
 if(run.status!==0)throw new Error(run.stderr||run.stdout||'Build failed');
 const record={};
 for(const name of pages){
  const html=readFileSync(join(root,'docs',name),'utf8'),data=html.match(/const DATA=(\{[^\n]+\});/);
  assert.ok(data,'Missing actual packed geometry in '+name);assert.equal(sha(data[1]),expectedScene,'Geometry changed: review before updating this baseline');
  assert.ok(html.includes('Educational prototype'));assert.ok(html.includes('helical mode demonstrates table motion only'));
  assert.ok(html.includes('mountComponentLabels'));assert.ok(!html.includes('not for clinical use or publication'));
  assert.ok(html.includes(readFileSync(join(root,'figures/danrudy33/ct-scanner/src/LICENSE.txt'),'utf8').trim()),'Standalone must retain full MIT notice');
  assert.ok(!/<script[^>]+src=/i.test(html),'Figure must remain standalone');record[name]=sha(html);
 }
 rounds.push(record);
}
assert.deepEqual(rounds[0],rounds[1],'Two builds must produce identical bytes');
console.log(JSON.stringify({deterministic:true,geometryUnchanged:true,packedScene:expectedScene,pages:rounds[1]},null,2));
