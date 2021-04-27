//initialisiert die eingabe Tabelle
window.onload = function(){
	newRow(localStorage.getItem('anzahlZeilen'));
	newColumn(localStorage.getItem('anzahlSpalten'));
}

let rowCount = 0;
let columnCount = 0;
let maxColumns = 10;
let maxRows = 10;
let wrongID = [];

//Erzeugt neue Zeile
function newRow (numberOfRows){
	
	//Spezialfall für die 1. Zeile, da hier die Spaltenbeschriftung eingefügt wird
	if(rowCount < 1){
		let thisRow = document.createElement("div");
		thisRow.setAttribute("id", "zeile0");
		let thisTable = document.getElementById("tabelle");
		thisTable.appendChild(thisRow);
		labelColumns();
		columnCount++;
		rowCount++;

		if (numberOfRows>1){
			newRow(numberOfRows)
		}
	}
	else{
		if (rowCount <= maxRows){
			for (let k = 0; k < numberOfRows; k++){
				
				//Erstellt neue Zeile
				let thisTable = document.getElementById("tabelle");
				let thisRow = document.createElement("div");
				thisTable.appendChild(thisRow);
				
				//fügt Zeilenbeschriftung hinzu
				let newParagraph = document.createElement("p");
				thisRow.appendChild(newParagraph);
				newParagraph.classList.add("variablenanzeigezeile");
				
				if (rowCount === 1){
					newParagraph.innerHTML = 'G';
				}
				else{
					newParagraph.innerHTML = 'S' + String.fromCharCode((rowCount) + 63);
				}
				thisRow.classList.add("zeilen");
					
				//fügt pro vorhandener Spalte ein Eingabefeld ein
				for (let i = 0; i < columnCount; i++){
					
					let newInput = document.createElement("input");
					thisRow.appendChild(newInput);
					newInput.classList.add("eingabefeld");
					thisRow.setAttribute("id", "zeile" + rowCount);
					newInput.setAttribute("id", "zahl" + rowCount + i);
					newInput.setAttribute("onchange", "validInput(id)");
				}
				rowCount++;
			}
		}
		else {
			alert("FEHLER: Maximale Anzahl an Zeilen erreicht!");
		}
	}	
}

//Spaltenbeschriftung
function labelColumns(){
	
	let node = document.getElementById("zeile0");
	while (node.firstChild) { 
		node.removeChild(node.firstChild);
	}
	
		
	for (let i = 0; i < columnCount + 1; i++){
		let newParagraph = document.createElement("p");
		node.appendChild(newParagraph);
		if (i === columnCount){
			newParagraph.innerHTML = 'rechte Seite';
			newParagraph.classList.add("variablenanzeigespalte");
		}
		else{
			newParagraph.innerHTML = 'X' + (i + 1);
			newParagraph.classList.add("variablenanzeigespalte");
		}
	}
}

//Erzeugt neue Spalte
function newColumn(numberOfColumns){
	
	//falls die Zeile für die Spaltenbeschriftung noch nicht erstellt wurde, wird diese hier erstellt
	if (rowCount === 0){
	newRow(1);
	}
	
	
	for (let k = 0; k < numberOfColumns; k++){
	
		if (columnCount < maxColumns){
			
			labelColumns();
			
			//Fügt in jedes Zeilen-Div ein neues Eingabefeld ein
			for (let i = 1; i < rowCount; i++){

				let thisRow = document.getElementById("zeile" + i);
				let newInput = document.createElement("input");
				newInput.classList.add("eingabefeld");
				thisRow.appendChild(newInput);
				newInput.setAttribute("id", "zahl" + i + columnCount);
				newInput.setAttribute("onchange", "validInput(id)");
			}
			columnCount++;
		}
		
		//Fehlermeldung bei mehr als 10 Spalten
		else {
			alert("FEHLER:Maximale Anzahl an Spalten erreicht!");
		}
	}
}


//Wandelt eingegebene Werte in mehrdimensionales Array um
function inputToArrayConverter(){
	let inputArray = [];
	let rowArray = [];
	for (let i = 1; i < rowCount; i++){
		for (let k = 0; k < columnCount; k++){
			let thisNumber = document.getElementById("zahl" + i + k);
			
			rowArray.push(thisNumber.value)
		}
		inputArray.push(rowArray);
		rowArray = []
	}
	//speichert mehrdimensionales Array im Local Storage
	localStorage.setItem("eingabe", JSON.stringify(inputArray));

	simplexAlgorithm();
	location.href = "result.html";
}


function inputCheck(input) {

	// parseFloat wandelt die 1. Zahl in einem String in eine float variable um
	let test = parseFloat(input);
	
	// Ein negativ ausfallender Vergleich von Input und Float Variable bedeutet fehlerhafte input
	return test == input;
}
module.exports = imputcheck   // leitet die Funktion an die Testdatei weiter

function validInput(id){
	

	let input = document.getElementById(id);
	
	//Ersetzt alle Kommas mit Punkten
	input.value = input.value.replace(",", ".");
	let errorMessage = document.getElementById("fehleranzeige");

	if (inputCheck(input.value) === false){
		
		//fügt roten Rand ein
		input.style.border = '1px solid #FF0000';
		input.style.color = '#ff0000';
		
		errorMessage.innerHTML = ("FEHLER: Bitte Eingabe überprüfen!");
		document.getElementById("berechnenbtn").disabled = true;
		
		//Fügt die ID des Fehlerhaft gefüllten eingabefeldes dem Array hinzu
		if (wrongID.indexOf(id) === "-1"){
			wrongID.push(id);
		}
	}
	else {
		
		//entfernt roten Rand
		input.style.border = 'none';
		input.style.color = '';
		
		//entfernt ggf. ID aus dem Array
		if (wrongID.indexOf(id) !== -1){
			wrongID.splice(wrongID.indexOf(id), 1);
		}
		
		//überprüft das Fehlerhafte ID-Array, falls es leer ist kann die Fehlermeldung entfernt werden
		if (wrongID.length === 0){
			errorMessage.innerHTML = "";
			document.getElementById("berechnenbtn").disabled = false;
			let tableFilled = false;
			
			//überprüft ob alle Eingabefelder gefüllt sind, wenn ja wird "berechnen" Button aktiviert
			for (let i = 1; i < rowCount; i++){
					for (let k = 0; k < columnCount; k++){
						let x = document.getElementById("zahl" + i + k);
						if (x.value === ""){
							tableFilled = true;
						}
					}
			}
			document.getElementById("berechnenbtn").disabled = tableFilled;
		}
	}
}


function simplexAlgorithm(){
	//Feld übergeben
	let calulationArray = JSON.parse(localStorage.getItem("eingabe"));

	let simplex; 								 //Abspeicherort der zusammengefügten Felder (Kopfspalte, Kopfzeile und Feld)
	let positiv; 								 //Variablendeklaration für Abbruchkriterium der do-while-Schleife
	let counter = 1;						 	 //Zähler für die Durchläufe/Zwischenergebnisse
	const row = calulationArray.length;			 
	const column = calulationArray[0].length; 	 

	//Kopfzeile erstellen
	let headingRow = new Array(column + 1);					//column+1, da durch die zusätzliche Zeile die Spaltenlänge erhöht wird
	headingRow[column] = 'rechte Seite';					//die letzte Spalte im Array bildet die 'rechte Seite' des Simplex-Tableaus ab
	headingRow[0] = null;									//die Zeile an der Stelle '0' entspricht den Schnittpunkt mit der Kopfspalte und ist leer
	for (let i = 1; i < column; i++)						//die restlichen Felder des Arrays entsprechen den Nicht-Basis-Variablen (X1,X2,...)
	{
		headingRow[i] = "X" + String.fromCharCode(48 + i);	//im Ascii-Code starten die Zahlen 1-9 ab 49, da die Schleife mit i=1 beginnt, haben wir 48+i gerechnet
	}

	//Kopfspalte erstellen									
	let headingColumn = new Array(row + 1);          		  //row+1, da durch die zusätzliche Spalte die Zeilenlänge erhöht wird
	headingColumn[0] = null;								  //die Spalte an der Stelle '0' entspricht den Schnittpunkt mit der Kopfzeile und ist leer
	headingColumn[1] = "G";									  //die erste mit Zahlen belegte Zeile bildet die Gewinnfunktion 'G'
	for (let i = 2; i <= row; i++) 							  //die restlichen Felder des Arrays entsprechen den Basis-Variablen (SA,SB,...)
	{
		headingColumn[i] = "S" + String.fromCharCode(63 + i); //im Ascii-Code beginnt ab 65 das große Alphabet, da die Schleife mit i=2 beginnt, haben wir 63+i gerechnet
	}

	let initalArray = mergeArrays(headingRow, headingColumn, calulationArray); //Abspeicherung des übergebenen Feldes
	let JSONinitialArray = JSON.stringify(initalArray);						   //Variablendeklaration für die Übergabe in den local Storage
	localStorage.setItem('zwischenergebnis0',JSONinitialArray);				   //Übergabe in den local Storage
	
	do //Schleife wird solange durchlaufen, bis die Variablen der Zielfunktion alle positiv sind//Schleife wird solange durchlaufen, bis die Variablen der Zielfunktion alle positiv sind
	{
		//Pivotspalte suchen
		let minimalValue = calulationArray[0][0]; 				 //anfangs wird der 1. Wert als kleinster Wert abespeichert
		let pivotColumn = 0; 					 
		//Gewinnzeile von links nach rechts durchgehen und den kleinsten negativen Wert abspeichern
		for (let n = 0; n < calulationArray[0].length - 1; n++)  //-1, weil der letzte Wert, also das Ergebnis der Zielfunktion nicht beachtet wird
		{
			if (calulationArray[0][n] < 0 ) 
			{
				if ((calulationArray[0][n]*100) < (minimalValue*100))
				{
					minimalValue = calulationArray[0][n];
					pivotColumn = n;
				}
			}
		}
		
		//pivotzeile suchen
		let minValueHelper = 1000000; 						//hilfswert um den kleinsten Wert zu suchen
		let pivotRow = 0; 									
		//pivotspalte nach unten ablaufen und kleinsten Wert (rechte Seite/zugehöriges Pivotspalte) abspeichern
		for (let i = 1; i < calulationArray.length; i++)
		{
			if (calulationArray[i][pivotColumn] >= 0) 		
			{
				let values = calulationArray[i][calulationArray[i].length - 1] / calulationArray[i][pivotColumn]; 
				if (values < minValueHelper) 
				{
					minValueHelper = values;
					pivotRow = i;
				}
			}
		}

		//pivotelement suchen
		let pivotElement = calulationArray[pivotRow][pivotColumn];


		///// ab hier neue Tabelle belegen (von vorne)

		//rahmen tauschen (Nicht-Basis-Variable der Pivotspalte und Basis-Variable der Pivotzeile tauschen)
		let swapStorage = headingRow[pivotColumn+1];  //Hilfsvariable zum Tauschen der Felder
		let swapStorage2 = headingColumn[pivotRow+1]; //Hilfsvariable zum Tauschen der Felder
			
		//neue kopfzeile 
		let newHeadingRow = headingRow;
		newHeadingRow[pivotColumn+1] = swapStorage2;
			
		//neue kopfspalte
		let newHeadingColumn = headingColumn;
		newHeadingColumn[pivotRow+1] = swapStorage;

		//neues ZahlenArray erstellen
		let newArray = new Array(row);

		for (let i = 0; i < newArray.length; i++)
		{
			newArray[i] = new Array(column);
		}

		//neues pivotelement* belegen (Pivotelement* = Kehrwert des Pivotelementes)
		newArray[pivotRow][pivotColumn] = (1.0 / pivotElement);
		
		//pivotzeile* belegen (Pivotspalte* = (Feld(alt)/Pivotelement)*(-1))
		for (let pr = 0; pr < column; pr++)
		{
			if (newArray[pivotRow][pr] == null) //Überspringt schon belegte Felder
			{
				newArray[pivotRow][pr] = (calulationArray[pivotRow][pr] / pivotElement);
			}
		}

		//pivotspalte* belegen (Pivotzeile* = (Feld(alt)/Pivotelement))
		for (let pc = 0; pc < row; pc++)
		{
			if (newArray[pc][pivotColumn] == null)
			{
				newArray[pc][pivotColumn] = (calulationArray[pc][pivotColumn] / pivotElement * (-1.0));
			}
		}

		//restlichen felder* belegen (-	Restliche Felder = Feld(alt)-(Pivotzeile*Pivotspalte)/Pivotelement)
		for (let a = 0; a < newArray.length; a++)
		{
			for (let b = 0; b < newArray[a].length; b++)
			{
				if (newArray[a][b] == null)
				{
					newArray[a][b] = (calulationArray[a][b] - (calulationArray[a][pivotColumn] * calulationArray[pivotRow][b]) / pivotElement);
				}
			}
		}

		//Ablagearray für gerundete Ausgabe
		let arrayRounded = newArray;
		
		//Zwischenergebnis runden
		for (let z = 0; z < arrayRounded.length; z++)
		{
			for (let s = 0; s < arrayRounded[z].length; s++)
			{
				arrayRounded[z][s] = round((arrayRounded[z][s]), 4);
			}
		}
		//altes Feld mit neuen Zahlen überschreiben
		calulationArray = newArray;

		//Überprüfung, ob Nicht-Basis-Variablen der Zielfunktion negative Werte enthalten
		for (let k = 0; k < calulationArray[0].length - 1; k++)
		{
			if (calulationArray[0][k] < 0)
			{
				positiv = false;
				break;
			}
			else
			{
				positiv = true;
			}
		}
		
		//endergebnis gerundet abspeichern
		if (positiv === true)
		{
			for (let z = 0; z < calulationArray.length; z++)
			{
				for (let s = 0; s < calulationArray[z].length; s++)
				{
					calulationArray[z][s] = round((calulationArray[z][s]), 2);
				}
			}
		}

		//abspeichern der Pivotspalte im local Storage
		let temporaryCounter = counter-1;
		let JSONPivotColumn = JSON.stringify(pivotColumn+1);
		localStorage.setItem('pivotspalte'+temporaryCounter,JSONPivotColumn);
		
		//abspeichern der Pivotzeile im local Storage
		let JSONPivotRow = JSON.stringify(pivotRow+1);
		
		localStorage.setItem('pivotzeile'+temporaryCounter,JSONPivotRow);
		//Zwischenergebnis im LocalStorage speichern
		simplex = mergeArrays(newHeadingRow,newHeadingColumn,arrayRounded);
		let JSONinterimArray = JSON.stringify(simplex);
		localStorage.setItem('zwischenergebnis'+counter,JSONinterimArray);
		counter++;

		// Neue Deklaration
		headingRow = newHeadingRow;
		headingColumn = newHeadingColumn;
	}
	while (positiv === false); //Ende der do-while-Schleife

	//Felder des Endergebnisses zusammenführen
	simplex = mergeArrays(headingRow,headingColumn,calulationArray);

	//Endergebnis im LocalStorage speichern
	let JSONfinalArray = JSON.stringify(simplex);
	localStorage.setItem('simplexergebnis',JSONfinalArray);
	localStorage.setItem('anzahlZwischenergebnisse',(counter-2).toString());

}

//Methode zum Runden auf X Stellen nach dem Komma
function round(number, decimalPlaces)
{
	let d = Math.pow(10, decimalPlaces);
	return Math.round(number * d) / d;
}

//Zusammenfügen der übergebenen Felder zu einem gesamten Feld und dessen Rückgabe
function mergeArrays(headingRow ,headingColumn, numberArray)
{
	const finalArray = [];								

	for (let i = 0; i< headingColumn.length; i++)
	{
		if (i===0) 										//überprüfen, ob es sich um die 1. Zeile handelt
		{
			finalArray.push(headingRow)					//einfügen der Kopfzeile ins Zielfeld
		}
		else
		{
			let temp = [];								//Hilfsfeld
			for (let k = 0; k <headingRow.length; k++)
			{
				if (k===0)								//überprüfen, ob es sich um die 1. Spalte handelt
				{
					temp.push(headingColumn[i]);		//einfügen der Kopfspalte an der Stelle [i]
				} 
				else 
				{
					temp.push(numberArray[i-1][k-1]);	//einfügen des entsprechenden Zahlenwertes an stelle [i-1] [k-1]
				}
			}
			finalArray.push(temp);						//einfügen des Hilfsfeldes als nächste Zeile
		}
	}
	return finalArray;									
}
