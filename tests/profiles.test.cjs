const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {expected,ids,levels}=require('./expected.cjs');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').match(/<script>\s*([\s\S]*?)<\/script>/)[1];
function app(){
 const events={},storage=new Map();
 const ctx=vm.createContext({console,document:{addEventListener:(type,fn)=>{(events[type]||=[]).push(fn);}},window:{},localStorage:{setItem:(k,v)=>storage.set(k,v),getItem:k=>storage.get(k)||null,removeItem:k=>storage.delete(k)},confirm:()=>true});
 vm.runInContext(source,ctx);
 // Only DOM rendering is stubbed: use the real selection, persistence and state logic.
 vm.runInContext('zeichnen=()=>{};blattSchliessen=()=>{};seiteZeigen=()=>{};melden=()=>{};',ctx);
 return {ctx,events,run:s=>vm.runInContext(s,ctx),json:s=>JSON.parse(vm.runInContext('JSON.stringify('+s+')',ctx))};
}
for(const id of ids)for(const level of levels)test(`${id} / Stufe ${level}: vollständige Profilwerte`,()=>{
 const a=app(),c=a.json(`startProfilBauen('${id}',${level})`),e=expected(id,level);
 for(const key of ['attribute','lepMax','initiative','panzerwert','apBasis','coupsBasis','ideenBasis','geldStart','unterhalt'])assert.deepEqual(c[key],e[key],key);
 assert.deepEqual(Object.fromEntries(c.fertigkeiten.map(f=>[f.name,f.fw])),e.fertigkeiten);
 assert.deepEqual(c.waffen.map(({name,schaden,ap,fw,attr,besitz})=>({name,schaden,ap,fw,attr,besitz})),e.waffen);
 assert.deepEqual(c.kraefte.map(k=>[k.name,k.abStufe]),e.powers);
 assert.deepEqual(c.ausruestung.map(x=>x.name),e.equipment);
 assert.equal(c.ersteHilfeMax,2);assert.equal(c.magHeilungMax,4);
 assert.equal(c.id,`${id}-${level}`);assert.equal(c.stufe,level);
 a.run(`var c=startProfilBauen('${id}',${level});var z=neuerZustand(c)`);
 for(const [key,cKey] of [['lep','lepMax'],['ap','apBasis'],['coups','coupsBasis'],['ideen','ideenBasis']])assert.equal(a.json('z')[key],c[cKey]);
 for(const w of c.waffen)assert.equal(a.run(`summe(c,c.waffen.find(w=>w.name===${JSON.stringify(w.name)}))`),w.fw+c.attribute[w.attr]);
 assert.equal(a.run('kassenstand(z)'),e.geldStart);
 assert.equal(a.run("resMax(c,z,'segnungen')"),5);
 if(id==='hagen')assert.equal(c.kraefte.find(k=>k.name==='Feuerregen').ap,3);
 if(id==='catherine')assert.match(c.aufstiegsnotizen.join(' '),/nicht belegt/);
});

test('Caprice hat auf allen Spielstufen identische belegte Stufe-2-Werte',()=>{
 const a=app(),cs=levels.map(s=>a.json(`startProfilBauen('catherine',${s})`));
 for(const c of cs){delete c.id;delete c.stufe;}assert.deepEqual(cs[0],cs[1]);assert.deepEqual(cs[1],cs[2]);
});

test('Alle zwölf Spielstände bleiben beim Wechsel und nach dem Neuladen erhalten',()=>{
 const a=app();
 for(const id of ids)for(const level of levels){
  a.run(`startProfilWaehlen('${id}',${level});Object.assign(zustand(),{lep:7,ap:1,coups:0,ideen:1,puffer:2,imKampf:true,runde:6,buchungen:[],merkzettel:'Notiz ${id}-${level}',logbuch:[{t:1,x:'unverändert'}]});zustand().einfluss.innen=2;charakter().eigeneNotiz='eigene Ergänzung';`);
 }
 const before=a.json('({charaktere:Buch.charaktere,zustaende:Buch.zustaende})');
 for(const id of ids)for(const level of levels)a.run(`startProfilWaehlen('${id}',${level})`);
 assert.deepEqual(a.json('({charaktere:Buch.charaktere,zustaende:Buch.zustaende})'),before);
 a.run('speichern();laden()');
 assert.deepEqual(a.json('({charaktere:Buch.charaktere,zustaende:Buch.zustaende})').zustaende,before.zustaende);
 for(const id of ids)for(const level of levels)assert.equal(a.json(`Buch.zustaende['${id}-${level}'].buchungen`).length,0);
});

test('Schnelle Merkzetteleingabe vor Charakterwechsel bleibt beim richtigen Jäger',()=>{
 const a=app();a.run("startProfilWaehlen('hagen',3)");
 a.events.input[0]({target:{id:'merkzettel',value:'Hagens frisch eingegebene Notiz'}});
 a.run("startProfilWaehlen('maximilian',4)");
 assert.equal(a.json("Buch.zustaende['hagen-3'].merkzettel"),'Hagens frisch eingegebene Notiz');
 assert.equal(a.json("Buch.zustaende['maximilian-4'].merkzettel"),'');
 a.run('laden()');assert.equal(a.json("Buch.zustaende['hagen-3'].merkzettel"),'Hagens frisch eingegebene Notiz');
});

test('Ungültige Profile oder Spielstufen verändern das Buch nicht',()=>{
 const a=app(),before=a.json('Buch');
 for(const [id,s] of [['hagen',2],['hagen',6],['mali',NaN],['unbekannt',3]]){
  assert.equal(a.run(`startProfilBauen('${id}',${s})`),null);a.run(`startProfilWaehlen('${id}',${s})`);
 }assert.deepEqual(a.json('Buch'),before);
});

test('Alte Profile werden nur ausdrücklich korrigiert; Spielstände bleiben bytegleich',()=>{
 const a=app();
 for(const id of ['catherine','hagen','maximilian'])for(const level of levels){
  a.run(`startProfilWaehlen('${id}',${level});delete charakter().profilRegelstand;charakter().initiative=99;zustand().lep=6;zustand().buchungen=[{t:1,b:140,g:'Startgeld'},{t:2,b:-10,g:'Einkauf'}];zustand().merkzettel='Behalten';`);
  const old=a.json('charakter()'),before=a.json('Buch.zustaende');
  a.run(`startProfilWaehlen('mali',3);startProfilWaehlen('${id}',${level})`);
  assert.deepEqual(a.json('charakter()'),old);
  a.ctx.confirm=()=>false;assert.equal(a.run('profilKorrigieren()'),false);assert.deepEqual(a.json('charakter()'),old);
  a.ctx.confirm=()=>true;assert.equal(a.run('profilKorrigieren()'),true);
  const after=a.json('Buch.zustaende');delete after['mali-3'];delete before['mali-3'];assert.deepEqual(after,before);
  assert.equal(a.json('charakter().initiative'),expected(id,level).initiative);
 }
});

test('Profilbau liefert unabhängige Objekte und gibt keine Änderungen weiter',()=>{
 const a=app();a.run("var first=startProfilBauen('catherine',3);first.attribute.ges=0;first.waffen[0].fw=9;");
 assert.equal(a.json("startProfilBauen('catherine',3).attribute.ges"),5);
 assert.equal(a.json("startProfilBauen('catherine',3).waffen[0].fw"),0);
});
