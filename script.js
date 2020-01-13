var valeurs = [0,1,2,3,4,5,6,7,8];
var button = document.getElementById("restart");
var jeu = document.getElementById("jeu");

//Melange la liste des valeurs
function melange(){
	for (k=0;k<20;k++){
		i = Math.floor(Math.random()*9);
		j = Math.floor(Math.random()*9);
		a = valeurs[i];
		valeurs[i] = valeurs[j];
		valeurs[j] = a;
	}
}

var positionVide = [0,0];
var matrice = [[valeurs[0],valeurs[1],valeurs[2]],[valeurs[3],valeurs[4],valeurs[5]],[valeurs[6],valeurs[7],valeurs[8]]];
var cases = [[0,0,0],[0,0,0],[0,0,0]];

//Attribue les elements de cases aux positions de la page HTML
function attribution (){
	for (i=0;i<3;i++){
		for (j=0;j<3;j++){
			cases[i][j]=jeu.getElementsByClassName("flex-container")[i].getElementsByTagName("div")[j];
		}
	}
}

attribution();

//Remplace les valeurs dans la page HTML
function replace(){
	matrice = [[valeurs[0],valeurs[1],valeurs[2]],[valeurs[3],valeurs[4],valeurs[5]],[valeurs[6],valeurs[7],valeurs[8]]];
	for (i=0;i<3;i++){
		for (j=0;j<3;j++){
			if (matrice[i][j]==0){
				cases[i][j].setAttribute("class","box vide");
				positionVide = [i,j];
			} else {
				cases[i][j].setAttribute("class","box");
				cases[i][j].textContent = matrice [i][j];
			}
		}
	}
}

//Inverse la case vide avec une case situé à côté
function invertProche(i,j){
	p=positionVide[0]*3+positionVide[1];
	q=i*3+j;
	valeurs[p]=valeurs[q];
	valeurs[q]=0;
	matrice = [[valeurs[0],valeurs[1],valeurs[2]],[valeurs[3],valeurs[4],valeurs[5]],[valeurs[6],valeurs[7],valeurs[8]]];
	cases[positionVide[0]][positionVide[1]].textContent = matrice[positionVide[0]][positionVide[1]];
	cases[positionVide[0]][positionVide[1]].setAttribute("class","box");
	cases[i][j].setAttribute("class","box vide");
	positionVide = [i,j];
}

var nbCoup = 0;

//Echange si l'on clique sur une case à côté de celle vide
function actualiseBouton(){
	for (i=0;i<3;i++){
		for (j=0;j<3;j++){
			cases[i][j].onclick = function(){}
		}
	}
	if (positionVide[0]<2){
		cases[positionVide[0]+1][positionVide[1]].onclick = function(){
			invertProche(positionVide[0]+1,positionVide[1]);
			nbCoup++
		}
	}
	if (positionVide[0]>0){
		cases[positionVide[0]-1][positionVide[1]].onclick = function(){
			invertProche(positionVide[0]-1,positionVide[1]);
			nbCoup++
		}
	}
	if (positionVide[1]<2){
		cases[positionVide[0]][positionVide[1]+1].onclick = function(){
			invertProche(positionVide[0],positionVide[1]+1);
			nbCoup++
		}
	}
	if (positionVide[1]>0){
		cases[positionVide[0]][positionVide[1]-1].onclick = function(){
			invertProche(positionVide[0],positionVide[1]-1);
			nbCoup++
		}
	}
}

function actualiseCoup(){
	document.getElementById("text").textContent = "Nombre de coups : "+nbCoup;
}

function verification(a,b){
	return JSON.stringify(a)==JSON.stringify(b);
}

function success(){
	if (verification(valeurs,[1,2,3,4,5,6,7,8,0])){
		document.getElementsByTagName("body")[0].setAttribute("class","success");
		alert("Bien joué! Tu as fini en "+nbCoup+" coups!");
		for (i=0;i<3;i++){
			for (j=0;j<3;j++){
				cases[i][j].onclick = function(){}
			}
		}			
	}
}

window.onload = function(){
	melange();
	replace();
	actualiseBouton();

}

button.onclick = function(){
	melange();
	replace();
	nbCoup=0;
	document.getElementsByTagName("body")[0].setAttribute("class","");
}

window.onclick = function(){
	actualiseBouton();
	actualiseCoup();
	success();
}