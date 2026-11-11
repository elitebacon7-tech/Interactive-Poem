const field=document.getElementById('field'),count=document.getElementById('count');
const seeds=["Did I say that wrong?","What if they noticed?","Why did I laugh?","Maybe it meant something.","Should I have said more?","Are they mad?","Replay it again.","Was that rude?","What if I'm wrong?","Why am I like this?"];
const mutate=[t=>t.replace(/\?$/,"??"),t=>t+" Again.",t=>"But "+t.charAt(0).toLowerCase()+t.slice(1),t=>t.split(" ").reverse().join(" "),t=>"What if: "+t,t=>t.replace(/\b(\w+)\b/,"$1 $1")];
const rnd=(a,b)=>Math.random()*(b-a)+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
let n=0;
function add(text,x,y){
  if(n>=150)return;
  const b=document.createElement('button');
  b.type='button';b.className='thought new';b.textContent=text;
  b.style.fontSize=rnd(.9,3.2)+'rem';
  b.style.left=Math.max(0,Math.min(x,90))+'%';
  b.style.top=Math.max(0,Math.min(y,90))+'%';
  b.style.setProperty('--r',rnd(-25,25)+'deg');
  b.style.setProperty('--jx',rnd(-12,12)+'px');
  b.style.setProperty('--jy',rnd(-12,12)+'px');
  b.style.setProperty('--d',rnd(1.5,4)+'s');
  b.style.fontWeight=Math.random()>.7?'900':'400';
  b.style.fontStyle=Math.random()>.7?'italic':'normal';
  if(Math.random()>.7)b.classList.add('red');
  if(Math.random()>.75)b.classList.add('ghost');
  b.addEventListener('click',()=>think(b));
  field.appendChild(b);n++;update();
}
function think(b){
  const x=parseFloat(b.style.left),y=parseFloat(b.style.top);
  b.textContent=pick(mutate)(b.textContent);       
  b.style.left=Math.max(0,Math.min(x+rnd(-8,8),90))+'%'; 
  b.style.top=Math.max(0,Math.min(y+rnd(-8,8),90))+'%';
  const k=Math.random()<.5?2:3;                    
  for(let i=0;i<k;i++)add(pick(mutate)(b.textContent.length>70?pick(seeds):b.textContent),x+rnd(-15,15),y+rnd(-15,15));
}
function update(){count.textContent=n+(n===1?' thought':' thoughts')}
function reset(){field.innerHTML='';n=0;document.body.classList.remove('calm');
  for(let i=0;i<3;i++)add(pick(seeds),rnd(5,75),rnd(5,75));}
document.getElementById('reset').onclick=reset;
document.getElementById('calm').onclick=e=>{
  const c=document.body.classList.toggle('calm');
  e.target.textContent=c?"It didn't work":"Try to calm down";
  if(c)add("Calm down.",rnd(20,60),rnd(20,60)); };
reset();
