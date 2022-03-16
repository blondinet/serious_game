// Initialisation des variables globales
var nb_msg = -1;
var nb_car = 0;
var chaine = "";
var id;

function changeMessage()
{
	nb_msg++;
	if (nb_msg <= nb_car) {
	document.getElementById("consignes").innerHTML = chaine.substr(0,nb_msg);
	}
	else {
		clearInterval(id);
	}
}

function afficheMessage(monTexte) {
	nb_msg = -1;
	chaine = monTexte;
	nb_car = chaine.length;
	id = setInterval("changeMessage()",20);
}
