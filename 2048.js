const Tab = document.getElementById("Main");
const TextTaille = document.getElementById("taille");
const StartBtn = document.getElementById("StartBTN");
const TestAddBtn = document.getElementById("testAddBTN");
const TC=50//taille d'une cellule
let ActualTab;
let nbtour=0;
const nbtourTXT = document.getElementById("nbTourTXT");




function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function updateTab(TabARecop,Taille){
	N=Taille
	Tab.innerText="";
	for(i=0;i<N;i++){
		const Row=document.createElement("TR");
		for(j=0;j<N;j++){
			const Cell=document.createElement("TD");
			Cell.style.backgroundColor='grey';
			Cell.setAttribute("width",TC);
			Cell.setAttribute("height",TC);//a changer avec setAttribute("id",cellule);
			if(TabARecop[i][j]!=0){
				Cell.innerText=TabARecop[i][j];
				//console.log(TabARecop[i][j])
			}
			//Cell.innerText="i="+i+" j="+j//pour savoir les indice
			Row.appendChild(Cell);
		}
		Tab.appendChild(Row)
	}
	nbtourTXT.innerText=nbtour;
}


function createEmptyTab(Taille){
	let tab=[]
	for(i=0; i<Taille; i++) {
	    tab[i]=[];
	    for(j=0; j<Taille; j++) {
	        tab[i][j] = 0;
	    }
	}
	return tab
}


function get2or4(){
	const tirage=getRandomInt(3)
	if(tirage<2) return 2
	else return 4
	//return (getRandomInt(2)+1)*2;//old version avec 1/2 d'avoir 2 et 4 
}

function movepossible(tab){
	let possible=false
	for(i=0;i<N;i++){
		for(j=0;j<N;j++){
			actuCase=tab[i][j]
			try{
				if(actuCase==tab[i+1][j]){
					possible=true
					break
				}
			}catch(e){
				null
			}
			try{
				if( actuCase==tab[i-1][j]){
					possible=true
					break
				}
			}catch(e){
				null
			}
			try{
				if( actuCase==tab[i][j+1]){
					possible=true
					break
				}
			}catch(e){
				null
			}
			try{
				if( actuCase==tab[i][j-1]){
					possible=true
					break
				}
			}catch(e){
				null
			}
		}
	}
	return possible
}

function countLibre(tab){
	let N=tab.length
	let nblibre=0
	for(i=0;i<N;i++){
		for(j=0;j<N;j++){
			if(tab[i][j]==0) nblibre++;
		}
	}
	return nblibre
}


function addToEmpty(tab) {
	const N= tab.length;
	nblibre=countLibre(tab)
	console.log("il y a "+nblibre+" case vide!")
	if(nblibre==0){
		findepartie(tab)
	}else{
		let trouve=false
		while (!trouve){
			let col= getRandomInt(N);
			let lin= getRandomInt(N);
			if(tab[lin][col]==0) {
				tab[lin][col]=get2or4();
				trouve=true;
			}
		}
	}
	return tab
}

function findepartie(tab){
	if(countLibre(tab)==0){
		let moveposs=movepossible(tab)
		console.log("on est plein donc on teste si ya un move possible : "+ moveposs)
		if(!moveposs){
			alert("fin de partie");
		}
	}
}

function start() {
	const N = TextTaille.value;
	let TabStart=createEmptyTab(N)
	let debCol1= getRandomInt(N);
	let debLin1= getRandomInt(N);
	let debCol2= getRandomInt(N);
	let debLin2= getRandomInt(N);
	TabStart[debLin1][debCol1]=get2or4()
	TabStart[debLin2][debCol2]=get2or4()
	updateTab(TabStart,N)
	//console.log(TabStart)
	return TabStart;
}

function depassement(x,y,taille){
	return x==-1 || y==-1 || x==taille || y==taille;
}

function tabMoveUp(ActuTab){
	let N=ActuTab.length;
	let newtab=Array.from(ActuTab);
	movetot=0
	for(i=1;i<N;i++){
		for(j=0;j<N;j++){
			if(newtab[i][j]!=0){
				let caseAfter=newtab[i-1][j]//la case après le mouvement
				let CasePresent=newtab[i][j]
				let move=0
				console.log("on bouge la case d'indice "+i+" "+j+" qui est : "+CasePresent+" vers le haut")
				while(i-(move+1)>=0 && newtab[i-(move+1)][j]==0){//pas de dépassement
					move++
					console.log(newtab[i-move][j]+" lin="+i+"+"+-move+" col="+j)
				}
				console.log("on arrete après "+move+" vers le haut")
				if(i-move>0){//pas en haut du tab
					if(newtab[i-move-1][j]==CasePresent){
						move++
						console.log("on multiplie par 2 car "+newtab[i-move][j]+" = "+CasePresent)
						newtab[i-move][j]*=2;
					}else{
						console.log("on remplace "+newtab[i-move][j]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
						newtab[i-(move)][j]=CasePresent
					}
				}else{
					console.log("on remplace "+newtab[i-move][j]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
					newtab[i-(move)][j]=CasePresent
				}
				
				console.log("on a fait "+move);

				if(move>0) {
					newtab[i][j]=0;
					console.log("on a bouger une case donc on remplace la case d'indice "+i+" "+j+" par 0")
				}
				movetot+=move
				/*
					if(!depassement(i+(d-u)*(move+1),j+(r-l)*(move+1),N)){//test si aux bord du tableau
						move++
						caseAfter=ActuTab[i+(d-u)*move][j+(r-l)*move]
						if(caseAfter==CasePresent) {
							newtab[i+(d-u)*(move)][j+(r-l)*(move)]*=2;
							console.log("on multiplie par 2 car "+caseAfter+" = "+CasePresent)
						}else{//a changer pour faire 1 cas on bouge plus et un cas on fait une autre action
							move--
							console.log("on remplace "+newtab[i+(d-u)*(move)][j+(r-l)*(move)]+" d'indice "+i+"+("+d+"-"+u+")*"+(move)+"="+(i+(d-u)*(move))+" col="+j+"+("+r+"-"+l+")*"+(move)+"="+(j+(r-l)*(move))+" par "+CasePresent)
							newtab[i+(d-u)*(move)][j+(r-l)*(move)]=CasePresent
							
						}
					}else {
						console.log("on remplace "+newtab[i+(d-u)*(move)][j+(r-l)*(move)]+" d'indice "+i+"+("+d+"-"+u+")*"+(move)+"="+(i+(d-u)*(move))+" col="+j+"+("+r+"-"+l+")*"+(move)+"="+(j+(r-l)*(move))+" par "+CasePresent)
						newtab[i+(d-u)*(move)][j+(r-l)*(move)]=CasePresent
					}
					if(move	!=0)newtab[i][j]=0*/
				console.log(newtab)
				//debugger
			}
		}
	}
	if(movetot!=0) newtab=addToEmpty(newtab);
	return newtab
}

function tabMoveLeft(ActuTab){
	let N=ActuTab.length;
	let newtab=Array.from(ActuTab);
	movetot=0
	for(i=0;i<N;i++){
		for(j=1;j<N;j++){
			if(newtab[i][j]!=0){
				let caseAfter=newtab[i][j-1]//la case après le mouvement
				let CasePresent=newtab[i][j]
				let move=0
				console.log("on bouge la case d'indice "+i+" "+j+" qui est : "+CasePresent+" vers le haut")
				while(j-(move+1)>=0 && newtab[i][j-(move+1)]==0){//pas de dépassement
					move++
//					console.log(newtab[i][j-move]+" lin="+i+" col="+j+"+"+-move)
				}
				console.log("on arrete après "+move+" vers le haut")
				if(j-move>0){//pas en haut du tab
					if(newtab[i][j-move-1]==CasePresent){
						move++
						console.log("on multiplie par 2 car "+newtab[i][j-move]+" = "+CasePresent)
						newtab[i][j-move]*=2;
					}else{
						//console.log("on remplace "+newtab[i][j-move]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
						newtab[i][j-move]=CasePresent
					}
				}else{
					//console.log("on remplace "+newtab[i][j-move]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
					newtab[i][j-move]=CasePresent
				}
				
				console.log("on a fait "+move);

				if(move>0) {
					newtab[i][j]=0;
					console.log("on a bouger une case donc on remplace la case d'indice "+i+" "+j+" par 0")
				}
				movetot+=move
				console.log(newtab)
			}
		}
	}
	if(movetot!=0) newtab=addToEmpty(newtab);
	return newtab
}


function tabMoveRight(ActuTab){
	let N=ActuTab.length;
	let newtab=Array.from(ActuTab);
	movetot=0
	for(i=0;i<N;i++){
		for(j=N-1;j>=0;j--){
			if(newtab[i][j]!=0){
				let caseAfter=newtab[i][j+1]//la case après le mouvement
				let CasePresent=newtab[i][j]
				let move=0
				console.log("on bouge la case d'indice "+i+" "+j+" qui est : "+CasePresent+" vers le haut")
				while(j+(move+1)>=0 && newtab[i][j+(move+1)]==0){//pas de dépassement
					move++
//					console.log(newtab[i][j-move]+" lin="+i+" col="+j+"+"+-move)
				}
				console.log("on arrete après "+move+" vers le haut")
				if(j+move<N-1){//pas en haut du tab
					if(newtab[i][j+move+1]==CasePresent){
						move++
						console.log("on multiplie par 2 car "+newtab[i][j+move]+" = "+CasePresent)
						newtab[i][j+move]*=2;
					}else{
						//console.log("on remplace "+newtab[i][j-move]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
						newtab[i][j+move]=CasePresent
					}
				}else{
					//console.log("on remplace "+newtab[i][j-move]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
					newtab[i][j+move]=CasePresent
				}
				
				console.log("on a fait "+move);

				if(move>0) {
					newtab[i][j]=0;
					console.log("on a bouger une case donc on remplace la case d'indice "+i+" "+j+" par 0")
				}
				movetot+=move
				console.log(newtab)
			}
		}
	}
	if(movetot!=0) newtab=addToEmpty(newtab);
	return newtab
}

function tabMoveDown(ActuTab){
	let N=ActuTab.length;
	let newtab=Array.from(ActuTab);
	movetot=0
	for(i=N-2;i>=0;i--){
		for(j=0;j<N;j++){
			if(newtab[i][j]!=0){
				let caseAfter=newtab[i+1][j]//la case après le mouvement
				let CasePresent=newtab[i][j]
				let move=0
				console.log("on bouge la case d'indice "+i+" "+j+" qui est : "+CasePresent+" vers le haut")
				while(i+(move+1)<N && newtab[i+(move+1)][j]==0){//pas de dépassement
					move++
//					console.log(newtab[i][j-move]+" lin="+i+" col="+j+"+"+-move)
				}
				console.log("on arrete après "+move+" vers le haut")
				if(i+move<N-1){//pas en haut du tab
					if(newtab[i+(move+1)][j]==CasePresent){
						move++
						console.log("on multiplie par 2 car "+newtab[i+move][j]+" = "+CasePresent)
						newtab[i+move][j]*=2;
					}else{
						//console.log("on remplace "+newtab[i][j-move]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
						newtab[i+move][j]=CasePresent
					}
				}else{
					//console.log("on remplace "+newtab[i][j-move]+" d'indice "+i+"-"+move+"="+(i-move)+" col="+j+" par "+CasePresent)
					newtab[i+move][j]=CasePresent
				}
				
				console.log("on a fait "+move);

				if(move>0) {
					newtab[i][j]=0;
					console.log("on a bouger une case donc on remplace la case d'indice "+i+" "+j+" par 0")
				}
				movetot+=move
				console.log(newtab)
			}
		}
	}
	if(movetot!=0){
		newtab=addToEmpty(newtab);
		nbtour++
		updateTab(newtab,newtab.length)
	}
}


/*

function TabMove(ActuTab,dir){
	let l=0
	let r=0
	let u=0
	let d=0
	let N=ActuTab.length
	switch (dir) {
  		case 'left':
    		l=1
    		break;
  		case 'right':
    		r=1
    		break;
  		case 'up':
  			u=1
  			break;
  		case 'down':
  			d=1
  			break;
  		default:
    		alert(`erreur de direction ${dir}`)
	}	let newtab=Array.from(ActuTab)	let newtab=Array.from(ActuTab)
	let reverse=1
	if(l==1 || d==1) reverse=-1
	for(i=(N-1)*(d+l);reverse*i<(N-d)*(u+r)-(l+d);i=i+reverse){
		for(j=(N-1)*(d+l);reverse*j<(N-r)*(u+r)-(l+d);j=j+reverse){
			console	.log("on rentre dans la boucle à l'indice "+j+" "+i)
			if(ActuTab[i][j]!=0){
				let caseAfter=ActuTab[i-u+d][j-l+r]//la case après le mouvement
				let CasePresent=ActuTab[i][j]
				let move=0
				console.log("on bouge la case d'indice "+i+" "+j+" qui est : "+CasePresent+" dans la direction "+dir)
				debugger;
				while(!depassement(i+(d-u)*(move+1),j+(r-l)*(move+1),N) && (move==0 || ActuTab[i+(d-u)*(move)][j+(r-l)*(move)]==0)){ //i+(d-u)*move>=0 && j+(r-l)*move>=0 && i+(d-u)*move<=N-1 && j+(r-l)*move<=N-1)){ //pas de dépassement
					move++
					console.log(ActuTab[i+(d-u)*move][j+(r-l)*move]+" lin="+i+"+"+((d-u)*move)+" col="+j+"+"+((r-l)*move))
				}
				if(ActuTab[i+(d-u)*(move)][j+(r-l)*(move)]!=0) move--
				console.log("on arrete après "+move+" vers la "+dir)
					if(!depassement(i+(d-u)*(move+1),j+(r-l)*(move+1),N)){//i+(d-u)*move!=0 || j+(r-l)*move!=0 || i+(d-u)*move!=N-1 || j+(r-l)*move!=N-1){//test si aux bord du tableau
						move++
						caseAfter=ActuTab[i+(d-u)*move][j+(r-l)*move]
						if(caseAfter==CasePresent) {
							newtab[i+(d-u)*(move)][j+(r-l)*(move)]*=2;
							console.log("on multiplie par 2 car "+caseAfter+" = "+CasePresent)
						}else{//a changer pour faire 1 cas on bouge plus et un cas on fait une autre action
							move--
							console.log("on remplace "+newtab[i+(d-u)*(move)][j+(r-l)*(move)]+" d'indice "+i+"+("+d+"-"+u+")*"+(move)+"="+(i+(d-u)*(move))+" col="+j+"+("+r+"-"+l+")*"+(move)+"="+(j+(r-l)*(move))+" par "+CasePresent)
							newtab[i+(d-u)*(move)][j+(r-l)*(move)]=CasePresent
							
						}
					}else {
						console.log("on remplace "+newtab[i+(d-u)*(move)][j+(r-l)*(move)]+" d'indice "+i+"+("+d+"-"+u+")*"+(move)+"="+(i+(d-u)*(move))+" col="+j+"+("+r+"-"+l+")*"+(move)+"="+(j+(r-l)*(move))+" par "+CasePresent)
						newtab[i+(d-u)*(move)][j+(r-l)*(move)]=CasePresent
					}
					if(move	!=0)newtab[i][j]=0
				console.log(newtab)
				debugger
			}
		}
	}
	//console.log(newtab)
	newtab=addToEmpty(newtab)
	return newtab
}*/



function keyDownHandler(event) {
	let newtab=Array.from(ActualTab)
	let jouer=true
    switch (event.keyCode) {
  		case 39: //direction="right";
  			console.log("on part a droite")
  			newtab=tabMoveRight(ActualTab)
    		break;
  		case 37: //direction="left";
    		newtab=tabMoveLeft(ActualTab);
    		console.log("on part a gauche")
    		break;
  		case 40://direction="down";
  			newtab=tabMoveDown(ActualTab)
  			console.log("on part en bas")
  			break;
  		case 38://direction="up";
  			newtab=tabMoveUp(ActualTab);
  			console.log("on part en haut")
  			break;
  		default:
  			jouer=false
	}
	//console.log(direction)
    if (jouer){
    	findepartie(newtab)
    }
    return newtab;
}

StartBtn.addEventListener("click",function(){
	ActualTab=start();
	nbtour++
    console.log(ActualTab)
})	

document.body.addEventListener("keydown",function(event){
	ActualTab=keyDownHandler(event);
})

/*
TestAddBtn.addEventListener("click",function(){
	ActualTab=addToEmpty(ActualTab)
	updateTab(ActualTab,ActualTab.length)
})*/