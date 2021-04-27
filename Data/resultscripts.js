
//--------------------------------Lösungsseite----------------------------------
window.onload = function(){
showArray(numberArray);
}



//Testübergabe von Array und Schrittzähler für ablageortbestimmung
// var numberArray = [["a","b","c","d","f","g"],["s","2","4","2","1","1"],["x","1","1","1","1","1"],["y","1","1","1","1","1"]];
let numberArray = JSON.parse(localStorage.getItem("simplexergebnis"));
let numberInterimResults = JSON.parse(localStorage.getItem("anzahlZwischenergebnisse"));
let nowShowed = numberInterimResults+1;


function previousInterimResult(){
	document.getElementById("naechstesZwischenerg").disabled = false;
	if (nowShowed >1){
		nowShowed--;
		showInterimResults(nowShowed);
		document.getElementById("h2").innerHTML = "Zwischenergebnis"+nowShowed;
		markPivotElement(nowShowed);
	}
	else if (nowShowed === 1){
		nowShowed--;
		showInterimResults(nowShowed);
		document.getElementById("h2").innerHTML = "Eingabe";
		document.getElementById("vorherigesZwischenerg").disabled = true;
		markPivotElement(nowShowed);
	}
}
function nextInterimResult(){
	document.getElementById("vorherigesZwischenerg").disabled = false;
	if (nowShowed <numberInterimResults){
		nowShowed++;
		showInterimResults(nowShowed);
		document.getElementById("h2").innerHTML = "Zwischenergebnis"+nowShowed;
		markPivotElement(nowShowed);
	}
	else if (nowShowed === numberInterimResults){
		nowShowed++;
		showInterimResults(nowShowed);
		document.getElementById("h2").innerHTML = "Endergebnis";
		document.getElementById("naechstesZwischenerg").disabled = true;
		markPivotElement(nowShowed);
	}
}

function markPivotElement (zahl){
let result = JSON.parse(localStorage.getItem("zwischenergebnis0"));
let pivotRow = JSON.parse(localStorage.getItem("pivotzeile"+zahl));
let pivotColumn = JSON.parse(localStorage.getItem("pivotspalte"+zahl));

	for (let i = 0; i < (result.length); i++){
			
			for (let k = 0; k < (result[0].length); k++){
				let temp = document.getElementById("anzeige"+i+k);
				if (i===pivotRow || k === pivotColumn){
					if (i === pivotRow && k === pivotColumn){
						temp.style.backgroundColor = '#FDA50F';
					}
					else{
						temp.style.backgroundColor = '#FFFF00';
					}
				}	
				
				else {
					if (i === 0 || k === 0){
						if (i === 0 && k === 0){
							temp.style.backgroundColor = '#F2F2F2';
						}
						else{
						temp.style.backgroundColor = '#DEDCD9';}
					}
					else{

					temp.style.backgroundColor = '#F2F2F2';
					}
				}
			}
		
	}

}


function showInterimResults(nummer){
	
	let interimResult = JSON.parse(localStorage.getItem("zwischenergebnis"+nummer));
	
	for (let i = 0; i < (interimResult.length); i++){
		
		for (let k = 0; k < (interimResult[0].length); k++){
			
			let temp = document.getElementById("anzeige"+i+k);
			temp.innerHTML = interimResult[i][k];
		}
	}
}






function showArray(inputArray){

	let showedTable = document.getElementById("anzeigetabelle");
	let interimDiv = document.createElement("div");
	showedTable.appendChild(interimDiv);
	
	
	//durchläuft die zeilen und erstellt für jede Zeile ein Div
	for (let i = 0; i < inputArray.length; i++){
		
		let createDiv = document.createElement("div");
		interimDiv.appendChild(createDiv);
		createDiv.setAttribute("id","anzzeile"+i);
		createDiv.classList.add("anzzeile");
		
		
		//durchläuft die Spalten und erstellt jeweils ein p
		for (let k = 0; k < inputArray[i].length; k++){
			
		        let createParagraph = document.createElement("p");
				createParagraph.setAttribute("id","anzp"+i+k);
				let showDiv = document.getElementById("anzzeile"+i);
                showDiv.appendChild(createParagraph);
                createParagraph.innerHTML = inputArray[i][k];
				createParagraph.setAttribute("id","anzeige"+i+k);
				if (i === 0 || k === 0){
					if (i === 0 && k === 0){
						createParagraph.classList.add("anzpzahl");
						createParagraph.style.border = 'none';
					}
					else{
						createParagraph.classList.add("anzpvar");}
				}
				else{
					createParagraph.classList.add("anzpzahl");
				}
		}
		
	}
}






