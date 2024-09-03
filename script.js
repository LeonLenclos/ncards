window.onload = function() {
for (let i = 1; i <= 202; i++) {
    console.log('faisage de la carte numéro ',i)
    domCard(distributeLines(i),i);
}
};


function printCard(a){
  let w=a[0];
  for(i=0;i<a.length;i++){
    let line = Array(a[i]).fill('♥').join(' ');
    console.log(line);
  }
}

function domCard(a,n){
  let card = document.createElement('div');
  card.title=n;
  card.classList.add('card');
  let enseigne = document.createElement('div');
  enseigne.classList.add('enseigne');
  let fontSize=1/Math.floor(a[0]/2)
  enseigne.style.fontSize=fontSize+'em';

  let corner1 = document.createElement('div');
  corner1.classList.add('corner');
  let corner2 = document.createElement('div');
  corner2.classList.add('corner');
  corner2.classList.add('upsidedown');
  corner1.innerHTML=corner2.innerHTML=n+'<br/>'+'♥';
  let w=a[0];
  for(i=0;i<a.length;i++){
    let line=document.createElement('div');
    line.classList.add('line');
    for(j=0;j<w*2-1;j++){
      let symbol = document.createElement('div');
      if((i%2==0 && j%2==0) || (i%2==1 && j%2==1 && j<2*a[i])){
        symbol.classList.add('symbol');
        if(i>a.length/2){
          symbol.classList.add('upsidedown');
        }
        symbol.innerHTML = '♥';
      }
      line.appendChild(symbol);
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
  
  let lines = Array(h*2-1).fill(0);

  for(let index=0; index<lines.length ; index+=2){
    lines[index]=w;
  }
  
  for(let index=1; index<lines.length ; index+=2){
    if(i>=w-1){
     lines[index]=w-1;
     i-=w-1;
    } else {
      lines[index]=i;
      i=0;
    }
  }


  return lines;
}


