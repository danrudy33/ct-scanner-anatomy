import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const build=fileURLToPath(new URL('../figures/danrudy33/ct-scanner/src/build.mjs',import.meta.url));
for(const flag of ['--states','--verify','--only=continuity'])test(`public builder rejects development-only flag ${flag}`,()=>{
 const before=readFileSync(build,'utf8');const result=spawnSync(process.execPath,[build,flag],{encoding:'utf8'});assert.notEqual(result.status,0);assert.match(result.stderr,/Unsupported build option/);assert.equal(readFileSync(build,'utf8'),before);
});
test('quick mode requires an explicit audit',()=>{const result=spawnSync(process.execPath,[build,'--quick'],{encoding:'utf8'});assert.notEqual(result.status,0);assert.match(result.stderr,/--quick requires --audit/);});
