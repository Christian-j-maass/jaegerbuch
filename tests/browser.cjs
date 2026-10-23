// Usage: npm install --no-save playwright && npx playwright install chromium
// npm run test:browser; JAEGERBUCH_URL=https://... npm run test:browser
// Optional CHROMIUM_EXECUTABLE_PATH for a preinstalled browser.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {expected,ids,levels}=require('./expected.cjs');
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
 ?path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'):'playwright');
async function main(){
 let server;
 const base=process.env.JAEGERBUCH_URL||await new Promise(resolve=>{
  server=http.createServer((req,res)=>{
   const file=path.basename(new URL(req.url,'http://localhost').pathname)||'index.html';
   if(!['index.html','icon-192.png','icon-512.png','manifest.webmanifest'].includes(file)){res.writeHead(404);res.end();return;}
   res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.png')?'image/png':'application/manifest+json');
   res.end(fs.readFileSync(path.join(__dirname,'..',file)));
  }).listen(0,'127.0.0.1',()=>resolve(`http://127.0.0.1:${server.address().port}/`));
 });
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(base,{waitUntil:'networkidle'});
  await page.locator('#kopfJaegerWahl').waitFor();
  for(const id of ids)for(const level of levels){
   const old=await page.evaluate(()=>JSON.stringify({c:Buch.charaktere,z:Buch.zustaende,aktiv:Buch.aktiv}));
   await page.locator('#kopfJaegerWahl').click();
   assert.equal(await page.locator('[data-profilwahl]').count(),4);
   assert.equal(await page.locator('[data-stufenwahl]').count(),0);
   await page.locator(`[data-profilwahl="${id}"]`).click();
   assert.equal(await page.locator('[data-stufenwahl]').count(),3);
   await page.locator(`[data-stufenwahl="${level}"]`).click();
   assert.equal(await page.evaluate(()=>JSON.stringify({c:Buch.charaktere,z:Buch.zustaende,aktiv:Buch.aktiv})),old,'Preview must not mutate profiles or saves');
   assert.equal(await page.locator(`[data-stufenwahl="${level}"]`).getAttribute('aria-pressed'),'true');
   await page.locator('#stufeBestaetigen').click();
   const c=await page.evaluate(()=>JSON.parse(JSON.stringify(charakter()))),e=expected(id,level);
   assert.equal(c.id,`${id}-${level}`);
   for(const k of ['attribute','lepMax','initiative','panzerwert','apBasis','coupsBasis','ideenBasis','geldStart','unterhalt'])assert.deepEqual(c[k],e[k],`${c.id} ${k}`);
   assert.deepEqual(c.kraefte.map(k=>[k.name,k.abStufe]),e.powers);
   for(const tab of ['leben','handeln','runde','buch','marker']){
    await page.locator(`[data-seite="${tab}"]`).click();
    assert.ok(await page.locator(`#seite-${tab}`).innerText());
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile viewport overflow');
   }
   await page.evaluate(()=>{zustand().lep=7;zustand().coups=0;zustand().buchungen=[];zustand().merkzettel=charakter().id;zustand().logbuch=[{t:1,x:'behalten'}];speichern();});
   console.log(`PASS mobile ${id}-${level}`);
  }
  const saves=await page.evaluate(()=>JSON.stringify(Buch.zustaende));
  for(const id of ids)for(const level of levels){
   await page.locator('#kopfJaegerWahl').click();await page.locator(`[data-profilwahl="${id}"]`).click();await page.locator(`[data-stufenwahl="${level}"]`).click();await page.locator('#stufeBestaetigen').click();
  }
  assert.equal(await page.evaluate(()=>JSON.stringify(Buch.zustaende)),saves);
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.evaluate(()=>JSON.stringify(Buch.zustaende)),saves);
  // Input followed immediately by selection: no delayed note may land on the next hunter.
  await page.locator('[data-seite="buch"]').click();
  await page.locator('#merkzettel').fill('Sofort vor dem Wechsel');
  await page.locator('#kopfJaegerWahl').click();await page.locator('[data-profilwahl="hagen"]').click();await page.locator('[data-stufenwahl="3"]').click();await page.locator('#stufeBestaetigen').click();
  assert.equal(await page.evaluate(()=>Buch.zustaende['maximilian-5'].merkzettel),'Sofort vor dem Wechsel');
  assert.equal(await page.evaluate(()=>Buch.zustaende['hagen-3'].merkzettel),'hagen-3');
  // Cancel/back must also preserve the saved game and active hunter.
  const beforeCancel=await page.evaluate(()=>JSON.stringify(Buch));
  await page.locator('#kopfJaegerWahl').click();await page.locator('[data-profilwahl="catherine"]').click();await page.locator('[data-stufenwahl="5"]').click();await page.locator('#zurueckProfile').click();await page.locator('[data-blatt="zu"]').click();
  assert.equal(await page.evaluate(()=>JSON.stringify(Buch)),beforeCancel);
  await page.locator('#kopfJaegerWahl').click();
  if(process.env.JAEGERBUCH_SCREENSHOT){
   await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished)));
   await page.screenshot({path:process.env.JAEGERBUCH_SCREENSHOT,fullPage:false,animations:'disabled'});
  }
  await page.locator('[data-profilwahl="catherine"]').click();
  assert.match(await page.locator('#blattInhalt').innerText(),/Stufe 2/);
  assert.deepEqual(errors,[]);
  console.log('PASS persisted saves, rapid notes, cancel/back and Caprice notice; no page errors');
 }finally{await browser.close();if(server)server.close();}
}
main().catch(err=>{console.error(err);process.exitCode=1;});
