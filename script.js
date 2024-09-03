window.onload = function() {
  for (let i = 1; i <= 116; i+=1) {
    console.log('faisage des cartes numéro ',i)
    domCard(distributeLines(i),i,'♥');
    domCard(distributeLines(i),i,'♠');
    domCard(distributeLines(i),i,'♦');
    domCard(distributeLines(i),i,'♣');
  }
  document.body.innerHTML = document.body.innerHTML + `
  <div title="joker" class="card red">
  <div class="corner">J<br>O<br>K<br>E<br>R</div>
    <div class="enseigne"><div class="line"><div class="symbol">☺</div></div></div>
    <div class="corner upsidedown">J<br>O<br>K<br>E<br>R</div>
  </div>

<div title="joker" class="card">
<div class="corner">J<br>O<br>K<br>E<br>R</div>
<div class="enseigne"><div class="line"><div class="symbol">☺</div></div></div>
<div class="corner upsidedown">J<br>O<br>K<br>E<br>R</div>
</div>
  `;
};


function printCard(a){
  let w=a[0];
  for(i=0;i<a.length;i++){
    let line = Array(a[i]).fill('♥').join(' ');
    console.log(line);
  }
}

function domCard(a,n,s){
  let card = document.createElement('div');
  card.title=n;
  card.classList.add('card');
  if(s=='♥'|| s=='♦'){
    card.classList.add('red');
  }
  let enseigne = document.createElement('div');
  enseigne.classList.add('enseigne');
  let fontSize=1/Math.floor(a[0].length/2)
  enseigne.style.fontSize=fontSize+'em';

  let corner1 = document.createElement('div');
  corner1.classList.add('corner');
  let corner2 = document.createElement('div');
  corner2.classList.add('corner');
  corner2.classList.add('upsidedown');
  corner1.innerHTML=corner2.innerHTML=n+'<br/>'+s;
  let w=a[0];
  for(let i=0;i<a.length;i++){
    let line=document.createElement('div');
    line.classList.add('line');
    for (let j=0; j<a[i].length;j++) {
      if(!(i%2==0&&j==0)){
        line.appendChild(document.createElement('div'));
      }
      let symbol = document.createElement('div');
      if(a[i][j]){
        symbol.classList.add('symbol');
        symbol.innerHTML = s;
        if(i>a.length/2){
          symbol.classList.add('upsidedown');
        }
      }
      line.appendChild(symbol);
      if(i%2==1&&j==a[i].length-1){
        line.appendChild(document.createElement('div'));
      }
    }
    enseigne.appendChild(line);
  }
  card.appendChild(corner1);
  card.appendChild(enseigne);
  card.appendChild(corner2);
  document.body.appendChild(card);
}

function distributeLines(number) {
  
  let w=1;
  let h=1;
  let i=0;
  let n=1;
  

  while(n<number){
    n++;
    if(i+1<=(h-1)*(w-1)){
      i++;
    } else if (h-w<2) {
      h++;
      i=i+1-w;
    } else {
      w++;
      h=Math.floor(n/w);
      i=n%w;
    }
  } 
  
  let lines = Array(h*2-1).fill([]);

  for(let index=0; index<lines.length ; index++){
    if (index%2==0) {
      lines[index]=Array(w).fill(true);
    } else {
      lines[index]=Array(w-1).fill(false);
    }
  }
  
  let intermediaires = Array((h-1)*(w-1)).fill(0);
  if(intermediaires.length%2==1 && i%2==1){
    intermediaires[Math.floor(intermediaires.length/2)]=1;
    i--;
  }
  for (let index = 0; index < intermediaires.length ; index++) {
    if(i>0){
      intermediaires[index]=1;
      i--;
    }
    if(i>0){
      intermediaires[intermediaires.length-1-index]=1;
      i--;
    }

    if(intermediaires[index]){
      lines[1+2*Math.floor(index/(w-1))][index%(w-1)]=true;
    }
  }


  return lines;
}


