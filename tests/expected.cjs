// Independent expectations transcribed from the sheets; see docs/REGELPRUEFUNG.md.
// Mali is a preservation baseline, not a newly verified paper-sheet oracle.
const skillNames=['Akrobatik','Aufmerksamkeit','Erkennen','Erste Hilfe','Fingerfertigkeit','Geistesstärke','Handwerken','Heimlichkeit','Land und Leute','Redekunst','Muskelspiel','Reflexe','Reiten','Unempfindlichkeit','Wissensgebiete'];
const weaponNames=['Fausthieb','Dolche & Messer','Fechtwaffen','Schwerter','Säbel','Schlagwaffen','Schleuder','Pistole','Muskete','Ausweichen','Schildbenutzung'];
const weaponStats=[[0,1,'ath'],[1,1,'ges'],[2,1,'ath'],[3,2,'kkr'],[4,2,'kkr'],[5,2,'kkr'],[1,2,'ges'],[3,2,'sin'],[8,3,'sin'],[null,1,'ath'],[null,1,'kkr']];
const pairs=(names,values)=>Object.fromEntries(names.map((n,i)=>[n,values[i]]));
const powers=(base,level,p4,p5)=>[...base,...(level>=4?p4:[]),...(level>=5?p5:[])];
function expected(id,level){
 let c;
 if(id==='mali')c={
  attribute:{kkr:5,ath:3,ges:2,sin:3,wis:5,wil:4},lepMax:level===5?17:16,
  initiative:5,panzerwert:2,apBasis:4,coupsBasis:3,ideenBasis:6,geldStart:155,unterhalt:50,
  skills:[0,0,0,3,0,0,0,0,0,2,1,1,0,level===5?1:0,2],
  fw:[0,0,0,0,0,level>=4?3:2,0,level===5?2:1,0,0,0],owned:[0,3,5,7,9],
  equipment:['Kriegshammer','Schwert','Pistole','Lederkoller','Söldnerkleidung'],
  powers:powers([['Worte des Herrn',2],['Predigt — Menschenkenntnis',2],['Predigt — Gib dein Bestes',2],['Predigt — Kraftreserven',2],['Mächtiger Hieb',2],['Hammer-Handwerk — Werkzeuge',3],['Hammer-Handwerk — Weiter Schwung',3],['Hammer-Handwerk — Schaftparade',3]],level,[['Heilige Aura — Litanei des Schutzes',4],['Heilige Aura — Aura des Heiligen Blutes',4],['Heilige Aura — Aura der Himmlischen Hilfe',4]],[['Feuer und Stahl',5]])
 };
 if(id==='hagen')c={
  attribute:{kkr:3,ath:3,ges:5,sin:5,wis:4,wil:2},lepMax:13,initiative:11,
  panzerwert:1,apBasis:5,coupsBasis:3,ideenBasis:4,geldStart:195,unterhalt:130,
  skills:[0,0,0,1,1,0,2,0,0,0,0,0,0,1,2],
  fw:[0,0,0,2,0,0,level===5?3:2,0,level>=4?3:2,0,0],owned:[0,3,6,8,9],
  equipment:['Muskete','Schwert','Schleuder','Transportables Laboratorium','Handwerkerkleidung','Brandgeschosse','Blitzgeschosse','Wurfgranaten'],
  powers:powers([['Musketen-Meisterschaft',2],['Feuerregen',2],['Wurfgeschosse herstellen',2],['Elixiere herstellen',3]],level,[['Scharfschütze',4]],[['Unscheinbar',5]])
 };
 if(id==='maximilian')c={
  attribute:{kkr:5,ath:3,ges:2,sin:3,wis:4,wil:5},lepMax:level===5?19:18,
  initiative:5,panzerwert:3,apBasis:3,coupsBasis:3,ideenBasis:5,geldStart:245,unterhalt:50,
  skills:[0,1,2,0,0,0,0,0,2,2,level===5?1:0,0,0,level===5?2:1,0],
  fw:[0,0,0,level>=4?3:2,0,0,0,1,0,0,2],owned:[0,3,7,9,10],
  equipment:['Schwert','Pistole','Schild','Kürass','Gardeuniform'],
  powers:powers([['Hart wie Stahl',2],['Leibgarde',2],['Fortgeschrittene Kriegstaktik',2],['Schwachstelle erkennen',3]],level,[['Gegenschlag',4]],[['Neu formieren',5]])
 };
 if(c){
  c.fertigkeiten=pairs(skillNames,c.skills);
  c.waffen=weaponNames.map((name,i)=>({name,fw:c.fw[i],schaden:weaponStats[i][0],ap:weaponStats[i][1],attr:weaponStats[i][2],besitz:c.owned.includes(i)}));
  delete c.skills;delete c.fw;delete c.owned;
 }else if(id==='catherine')c={
  attribute:{kkr:3,ath:4,ges:5,sin:4,wis:2,wil:3},lepMax:13,initiative:9,
  panzerwert:2,apBasis:4,coupsBasis:5,ideenBasis:2,geldStart:90,unterhalt:140,
  fertigkeiten:{'Alchemistisches Wissen':1,Akrobatik:2,Aufmerksamkeit:0,'Erste Hilfe':0,Fingerfertigkeit:2,Geistesstärke:0,Handwerken:0,Heimlichkeit:1,Muskelspiel:0,'Mystisches Wissen':1,'Praktisches Wissen':1,Recherche:0,Redekunst:0,Seefahrt:0,Unempfindlichkeit:0,'Land und Leute':1},
  waffen:[['Fausthieb',0,1,0,'ath',true],['Dolche & Messer',1,1,2,'ges',true],['Fechtwaffen',2,1,0,'ath',false],['Schwerter',4,2,0,'kkr',true],['Schlagwaffen',5,2,0,'kkr',false],['Stangenwaffen',8,3,0,'kkr',false],['Wurfwaffen',1,2,0,'ges',false],['Pistole',3,2,2,'sin',true],['Armbrüste',5,2,0,'sin',false],['Muskete',9,3,0,'sin',false],['Ausweichen',null,1,0,'ath',true]].map(([name,schaden,ap,fw,attr,besitz])=>({name,schaden,ap,fw,attr,besitz})),
  equipment:['Dolch','Säbel','Pistole','Lederkoller','Transportables Laboratorium','Reisekleidung','Waffengifte'],
  powers:[['Meister der Dolche',2],['Gifte herstellen',2],['Teufelsaustreibung',2]]
 };
 return c;
}
module.exports={expected,ids:['mali','catherine','hagen','maximilian'],levels:[3,4,5]};
