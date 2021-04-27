
//Erstellt beim laden der HTML Seite die Tabelle
window.onload = function(){
	neueZeile(localStorage.getItem('anzahlZeilen'));
	neueSpalte(localStorage.getItem('anzahlSpalten'));
}

var zzaehler = 0;
var szaehler = 0;
var spaltenlimit = 10;
var falschIdSpeicher = [];

//erstellt eine neue Zeile an eingabefeldern, jede Zeile ist in einem div
function neueZeile (anzzeilen){
	
	//Ausnahme für erste hinzugefügte Zeile, da hier erst ein "Basiselement" (1. Element der 1. Zeile == 1. Element der 1. Spalte) hinzugefügt wird
	if(zzaehler < 1){
		
		//Erstellt neues Div das hier als erste Zeile, also als Zeile0 für die spaltenbeschriftung dient und fügt das "Basiselement" hinzu
		let zeigtauftabelle = document.getElementById("tabelle");
		let zeigtaufzeile = document.createElement("div");
		zeigtauftabelle.appendChild(zeigtaufzeile);
		let neuerp = document.createElement("p");
		zeigtaufzeile.appendChild(neuerp);
		neuerp.classList.add("variablenanzeigezeile");
		neuerp.innerHTML = ' ';

		
		//Fügt die 1. Spaltenbeschriftung hinzu
		neuerp = document.createElement("p");
		zeigtaufzeile.appendChild(neuerp);
		neuerp.classList.add("variablenanzeigespalte");
		neuerp.innerHTML = 'X'+szaehler;
		zeigtaufzeile.setAttribute("id","zeile"+zzaehler);

		
		szaehler++;
		zzaehler++;

		//Falls mehrere Zeilen direkt initialisiert werden sollen, wird die funktion hier nochmal rekursiv aufgerufen um dann im elsezweig weiterzumachen
		if (anzzeilen>1){
			neueZeile(anzzeilen)
		}
	}
	

	else{
		
		//Äußere For-Schleife ermöglicht mehrfaches hinzufügen mit einmaligem aufrufen
		for (k=0;k<anzzeilen;k++){
			
			//Erstellt neues Div als zeile und fügt sie der Tabelle hinzu
			let zeigtauftabelle = document.getElementById("tabelle");
			let zeigtaufzeile = document.createElement("div");
			zeigtauftabelle.appendChild(zeigtaufzeile);
			
			//Erstellt Zeilenbeschriftung
			let neuerp = document.createElement("p");
			zeigtaufzeile.appendChild(neuerp);
			neuerp.classList.add("variablenanzeigezeile");
			neuerp.innerHTML = 'S'+String.fromCharCode(zzaehler+96);
			zeigtaufzeile.classList.add("zeilen");
				
			//Fügt für jede bereits vorhandene Spalte ein Eingabefeld ein
			for (i=0;i<szaehler;i++){
				let neueri = document.createElement("input");
				zeigtaufzeile.appendChild(neueri);
				neueri.classList.add("eingabefeld");
				zeigtaufzeile.setAttribute("id","zeile"+zzaehler);
				neueri.setAttribute("id","zahl"+zzaehler+i);
				neueri.setAttribute("onchange", "validInput(id)");
			}
			zzaehler++;
		}
	}
}

function spalteBeschriften(){
	
	let node = document.getElementById("zeile0");
	while (node.firstChild) { 
		node.removeChild(node.firstChild);
	}
	
		
	for (i=0; i< szaehler+1 ; i++){
		let neuerp = document.createElement("p");
		node.appendChild(neuerp);
		if (i == szaehler){
			neuerp.innerHTML = 'rechte Seite';
			neuerp.classList.add("variablenanzeigespalte");
		}
		else{
			neuerp.innerHTML = 'X'+i;
			neuerp.classList.add("variablenanzeigespalte");
		}
	}
}


//Fügt neue Spalte hinzu
function neueSpalte(anzspalten){
	
	//Ausnahme falls noch keine Zeile erstellt wurde, wird neueZeile 1 mal aufgerufen um dann dort das "Basiselement hinzuzufügen
	if (zzaehler === 0){
	neueZeile(1);
	}
	
	//Äußere For-Schleife ermöglicht mehrfaches hinzufügen mit einmaligem aufrufen
	for (k=0;k<anzspalten;k++){	
	
	//Sorgt dafür das nicht mehr Spalten als maximal erlaubt erstellt werden können
		if (szaehler <spaltenlimit){
			
			/* //Fügt die Spaltenbeschriftung in der 1. Zeile hinzu
			let zeigtaufzeile0 = document.getElementById("zeile0");
			let neuerp = document.createElement("p");
			zeigtaufzeile0.appendChild(neuerp);
			neuerp.innerHTML = 'X'+szaehler;
			neuerp.classList.add("variablenanzeigespalte"); */
			
	spalteBeschriften();
			
			
			//Fügt für jede vorhandene Zeile ein neues Eingabefeld hinzu um neue Spalte zu erstellen
			for (let i=1;i<zzaehler;i++){

				let zeigtaufzeile = document.getElementById("zeile"+i);
				let neueri = document.createElement("input");
				neueri.classList.add("eingabefeld");
				zeigtaufzeile.appendChild(neueri);
				neueri.setAttribute("id","zahl"+i+szaehler);
				neueri.setAttribute("onchange", "validInput(id)");
			}
			szaehler++;
		}
		
		//Fehlerfall maximale anzahl Spalten erreicht
		else {
			alert("FEHLER:Maximale Anzahl an Spalten erreicht!");
		}
		

	}
}


//Wandelt eingegebene Werte in mehrdimensionales Array um
function eingabeArrayWandler(){
	var eingabear = [];
	let zeilenar = [];
	let fehleranzeige = false;
	for (let i = 1; i < zzaehler; i++){
		for (let k = 0; k < szaehler; k++){
			var zeigtzahl = document.getElementById("zahl"+i+k);
			
			zeilenar.push(zeigtzahl.value)
		}
		eingabear.push(zeilenar);
		zeilenar = []
	}
	
	localStorage.setItem("eingabe", JSON.stringify(eingabear));
	
	//******Hier findet der Algo statt******
	simplexAlgo();
	
	location.href = "indexergebnis.html";
}


function eingabecheck(eingabe) {

	// parseFloat wandelt die 1. Zahl in einem String in eine float variable um
	let test = parseFloat(eingabe); 
	
	// Ein negativ ausfallender vergleich von eingabe und float variable bedeutet fehlerhafte eingabe
	if (test != eingabe ){
		return false;
	}
	else {	
		return true;
	}
}


//wird "onchange" ausgeführt, also sobald eingabefeld Fokus verliert
//Überprüft die Richtigkeit der Eingabe
function validInput(id){

	let input = document.getElementById(id);
	input.value = input.value.replace(",",".");
	let fehler = document.getElementById("fehleranzeige");


//Eingabe ist Fehlerhaft
	if (eingabecheck(input.value) == false){
		
		//Textfarbe rot + roter Rand
		input.style.border = '1px solid #FF0000';
		input.style.color = '#ff0000';
		
		//Fehleranzeige unter Tabelle + Button deaktivieren
		fehleranzeige.innerHTML =("FEHLER: Bitte Eingabe überprüfen!");
		document.getElementById("berechnenbtn").disabled = true;
		
		//Feldid wird in "Fehlerspeicher" geschrieben falls noch nicht vorhanden
		if (falschIdSpeicher.indexOf(id)== "-1"){
			falschIdSpeicher.push(id);
		}
	}

	//Eingabe passt
	else {

	// Setzt Rote Markierung + Fehlermeldung zurück falls vorhanden
	input.style.border = 'none';
	input.style.color = '';
	
	// falls ID im Speicher, wird sie gelöscht
	if (falschIdSpeicher.indexOf(id) != -1){
		falschIdSpeicher.splice(falschIdSpeicher.indexOf(id),1);
	}
	
	//falls der Fehlerspeicher leer ist
	if (falschIdSpeicher.length == 0){
		fehleranzeige.innerHTML = "";

		//deaktiviert "berechnenbtn" bei Fallscheingabe
		document.getElementById("berechnenbtn").disabled = false;


		// Überprüft nach jeder erfolgreichen eingabe (elsezweig) ob die Tabelle vollständig ausgefüllt wurde
		// bei positivem ergebnis wird der "berechnen" Button aktiviert
		let voll = false;
		for (let i = 1; i < zzaehler; i++){
				for (let k = 0; k < szaehler; k++){
					var x = document.getElementById("zahl"+i+k);
					if (x.value == ""){
						voll = true;
					}
				}
		}
		document.getElementById("berechnenbtn").disabled = voll;
	}
	}
}


// Eingabebeschränkung alt

/* function validInput(id){
// Überprüfung für Copy/Paste bzw. cursor versetzung fehlt noch und Komma/Punkt am ende

let input = event.which;
let allinput = document.getElementById(id).value;


//legt regeln für jedes erlaubte Zeichen Fest
switch (input){
	
	
	//Das "," darf nur ein mal und nicht am Beginn verwendet werden
	case 44:
		if (allinput.indexOf(".") != "-1"){
			event.preventDefault();
			alert("FEHLER: Mehrfachverwendung von\".\" !");
		}
	break;
	
	//
	case 45:
	alert("-");
		if (allinput != ""){
		event.preventDefault();
		alert("FEHLER: \"-\" darf nur am Beginn einer Zahl verwendet werden!");
		}
	break;
	
	
	case 46:
		if (allinput == ""){
			event.preventDefault();
			alert("FEHLER: Fehlerhafte verwendung von \".\" !");
			}
		else if (allinput.indexOf(".") != "-1"){
			event.preventDefault();
			alert("FEHLER: Mehrfachverwendung von\".\" !");
			}
		break;

	//Ziffern 0-9 immer erlaubt
	case 48:
	case 49:
	case 50:
	case 51:
	case 52:
	case 53:
	case 54:
	case 55:
	case 56:
	case 57:
	break;
	
	//Verhindert alle anderen Eingaben
	default:
	alert("FEHLER: kein gültiges Zeichen");
	event.preventDefault();
}
} */




function simplexAlgo() {
	//feld übergeben
	// var feld = [[-210.0, -160.0, -640.0], [4.0, 2.0, 17.0], [2.0, -1.0, 4.0], [7.0, 5.0, 35.0], [1.0, 0.0, 3.0]];
	var feld = getStartFeld();

	let simplex;
	let positiv;
	let counter = 1;
	const zeile = feld.length;
	const spalte = feld[0].length;

	//Kopfzeile erstellen
	let kopfzeile = new Array(spalte + 1);
	kopfzeile[spalte] = 'rechte Seite';
	kopfzeile[0] = null;
	for (let i = 1; i < spalte; i++)
	{
		kopfzeile[i] = "X" + String.fromCharCode(48 + i);
	}

	//Kopfspalte erstellen
	var kopfspalte = new Array(zeile + 1);
	kopfspalte[0] = null;
	kopfspalte[1] = "G";
	for (let i = 2; i <= zeile; i++) {
		kopfspalte[i] = "S" + String.fromCharCode(63 + i);
	}

	do //Schleife wird solange durchlaufen, bis die Variablen der Zielfunktion alle positiv sind//Schleife wird solange durchlaufen, bis die Variablen der Zielfunktion alle positiv sind
	{
		//nach kleinstem Wert in der Zielfunktin (1.Zeile) suchen
		let kleinsterwert = feld[0][0]; //beim feld oben rechts beginnen
		let pivotspalte = 0; //Pivotspalte initialisieren

		//zeile nacheinander nach rechts durchgehen und den kleineren Wert abspeichern
		for (let n = 0; n < feld[0].length - 1; n++) //-1, weil der letzte Wert (das ergebnis der Zielfunktion nicht beachtet wird)
		{
			if (feld[0][n] < 0 ) {

				if ((feld[0][n]*100) < (kleinsterwert*100))
				{
					kleinsterwert = feld[0][n];
					pivotspalte = n;
				}
			}
		}
		//pivotzeile suchen
		let miniwert = 1000000; //hilfswert um den kleinsten Wert zu suchen
		let pivotzeile = 0; //Pivotzeile initialisieren
		//pivotspalte nach unten ablaufen
		for (let i = 1; i < feld.length; i++)
		{
			if (feld[i][pivotspalte] >= 0) //Negative Werte werden ignoriert
			{
				var werte = feld[i][feld[i].length - 1] / feld[i][pivotspalte]; //rechte Seite durch zugehöriges Pivotspaltenelement teilen

				if (werte < miniwert) //geringstes Ergebnis abspeichern
				{
					miniwert = werte;
					pivotzeile = i;
				}
			}
		}

		//pivotelement suchen
		let pivotelement = feld[pivotzeile][pivotspalte];


		///// ab hier neue Tabelle belegen (von vorne)

		//rahmen tauschen
		let tauschablage = kopfzeile[pivotspalte+1];
		let tauschablage2 = kopfspalte[pivotzeile+1];//benötigt, weil das feld sonst überschrieben wird
			
		/*console.log(tauschablage);
		console.log(tauschablage2);*/
			
		//neue kopfzeile
		let neueKopfzeile = kopfzeile;
		neueKopfzeile[pivotspalte+1] = tauschablage2;
			
		//console.log(neueKopfzeile);
		//console.log(kopfzeile);
			
		// neue kopfspalte
		let neueKopfspalte = kopfspalte;
		neueKopfspalte[pivotzeile+1] = tauschablage;
			
		//console.log(neueKopfspalte);
		//console.log(kopfspalte);
			

		//neues ZahlenArray erstellen
		let neuesfeld = new Array(zeile);

		for (let i = 0; i < neuesfeld.length; i++)
		{
			neuesfeld[i] = new Array(spalte);
		}

		//neues pivot* belegen
		neuesfeld[pivotzeile][pivotspalte] = (1.0 / pivotelement);
		// pivotzeile* belegen
		for (let pz = 0; pz < spalte; pz++)
		{
			if (neuesfeld[pivotzeile][pz] == null)
			{
				neuesfeld[pivotzeile][pz] = (feld[pivotzeile][pz] / pivotelement);
			}
		}

		//pivotspalte* belegen
		for (let ps = 0; ps < zeile; ps++)
		{
			if (neuesfeld[ps][pivotspalte] == null)
			{
				neuesfeld[ps][pivotspalte] = (feld[ps][pivotspalte] / pivotelement * (-1.0));
			}
		}

		//Restlichen Felder* belegen
		for (let a = 0; a < neuesfeld.length; a++)
		{
			for (let b = 0; b < neuesfeld[a].length; b++)
			{
				if (neuesfeld[a][b] == null)
				{
					neuesfeld[a][b] = (feld[a][b] - (feld[a][pivotspalte] * feld[pivotzeile][b]) / pivotelement);
				}
			}
		}

		//Ablagearray für gerundete Ausgabe
		let feldGerundet = neuesfeld;
		//Zwischenergebnis runden
		for (let z = 0; z < feldGerundet.length; z++)
		{
			for (let s = 0; s < feldGerundet[z].length; s++)
			{
				feldGerundet[z][s] = runden((feldGerundet[z][s]), 4);
			}
		}
		//altes Feld mit neuen Zahlen überschreiben
		feld = neuesfeld;

		for (let k = 0; k < feld[0].length - 1; k++)
		{
			if (feld[0][k] < 0)
			{
				positiv = false;
				break;
			}
			else
			{
				positiv = true;
			}
		}

		if (positiv === true)
		{
			//endergebnis
			for (let z = 0; z < feld.length; z++)
			{
				for (let s = 0; s < feld[z].length; s++)
				{
					feld[z][s] = runden((feld[z][s]), 2);
				}
			}
		}



		//Zwischenergebnis im LocalStorage speichern
		simplex = mergeArrays(neueKopfzeile,neueKopfspalte,feldGerundet);
		var JSONReadyAr = JSON.stringify(simplex);
		localStorage.setItem('zwischenergebnis'+counter,JSONReadyAr);
		counter++;


		// Neue Deklaration
		kopfzeile = neueKopfzeile;
		kopfspalte = neueKopfspalte;


	}
	while (positiv === false);

	simplex = mergeArrays(kopfzeile,kopfspalte,feld);

	//Endergebnis im LocalStorage speichern
	var JSONReadyAr = JSON.stringify(simplex);
	localStorage.setItem('simplexergebnis',JSONReadyAr);

}

//Methode zum Runden auf X Stellen nach dem Komma
function runden(zahl, dezimalstellen)
{
	let d = Math.pow(10, dezimalstellen);
	return Math.round(zahl * d) / d;
}

function mergeArrays(kopfZeile ,kopfSpalte, zahlenar)
{

	const zielArray = [];

	for (let i = 0; i< kopfSpalte.length; i++)
	{
		if (i===0)
		{
			zielArray.push(kopfZeile)
		}
		else
		{
			let temp = [];
			for (let k = 0; k <kopfZeile.length; k++)
			{
				if (k===0)
				{
					temp.push(kopfSpalte[i]);
				} else {
					temp.push(zahlenar[i-1][k-1]);
				}
			}
			zielArray.push(temp);
		}
	}
	return zielArray;
}

function getStartFeld() {

	let zahlen = JSON.parse(localStorage.getItem("eingabe"));

	return zahlen;
}