// Build the standalone gallery payload, then add hosting-only navigation/metadata.
import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const source=join(root,'figures/danrudy33/ct-scanner/src');
for(const args of [['--light'],[]]){
 const result=spawnSync(process.execPath,[join(source,'build.mjs'),...args],{cwd:root,encoding:'utf8'});
 process.stdout.write(result.stdout||'');process.stderr.write(result.stderr||'');
 if(result.status!==0)process.exit(result.status||1);
}
const docs=join(root,'docs');mkdirSync(docs,{recursive:true});
copyFileSync(join(source,'ct-scanner.html'),join(docs,'ct-scanner-dark.html'));
copyFileSync(join(source,'ct-scanner-light.html'),join(docs,'ct-scanner-light.html'));
const base='https://danrudy33.github.io/ct-scanner-anatomy/';
const metadata=`<meta name="description" content="Rotate and explode a CT scanner, identify its components, and compute an ideal axial reconstruction. Educational prototype by danrudy33, built with Anatomy.">
<link rel="canonical" href="${base}">
<meta property="og:type" content="website"><meta property="og:title" content="Inside a CT scanner — interactive anatomy">
<meta property="og:description" content="Rotate. Explode. Reconstruct. An educational CT prototype with named components and computed axial imaging.">
<meta property="og:url" content="${base}"><meta property="og:image" content="${base}preview.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Inside a CT scanner — interactive anatomy"><meta name="twitter:image" content="${base}preview.png">
<style>.project-links{display:flex;gap:10px 20px;flex-wrap:wrap;max-width:900px;margin:18px auto;font:14px/1.5 system-ui,sans-serif;padding:0 12px}.project-links a{color:var(--anatomy-hi,#31383b);text-underline-offset:3px}.project-credit{max-width:900px;margin:24px auto;padding:0 12px;font:13px/1.6 system-ui,sans-serif;color:var(--anatomy-mid,#657078)}</style>`;
const nav='<nav class="project-links" aria-label="Project links"><a href="https://github.com/danrudy33/ct-scanner-anatomy">Source &amp; limitations</a><a href="https://skills.wheresryan.sh/anatomy/community">Anatomy community museum</a><a href="ct-scanner-dark.html">Standalone dark</a><a href="ct-scanner-light.html" download>Download light HTML</a></nav>';
const credit='<footer class="project-credit">By <a href="https://github.com/danrudy33">@danrudy33</a>, built with Hermes Agent and Ryan’s MIT-licensed Anatomy kit. Educational prototype: axial reconstruction is computed; helical mode demonstrates motion only. Visual artifacts may occur. Not clinical software.</footer>';
let html=readFileSync(join(source,'ct-scanner-light.html'),'utf8');
if(!html.includes('</head>')||!html.includes('</body>'))throw new Error('Unexpected page template');
html=html.replace('</head>',metadata+'\n</head>').replace(/(<body\b[^>]*>)/,'$1'+nav).replace('</body>',credit+'</body>');
writeFileSync(join(docs,'index.html'),html);writeFileSync(join(docs,'.nojekyll'),'');
console.log('Built docs/index.html and both standalone themes.');
