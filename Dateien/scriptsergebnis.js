
//--------------------------------Lösungsseite----------------------------------
window.onload = function(){
arraydarstellen(zahlenarray);
}



//Testübergabe von Array und Schrittzähler für ablageortbestimmung
// var zahlenarray = [["a","b","c","d","f","g"],["s","2","4","2","1","1"],["x","1","1","1","1","1"],["y","1","1","1","1","1"]];
var zahlenarray = JSON.parse(localStorage.getItem("simplexergebnis"));

var schrittzähler = 0;

function zwergebniseAnzeigen(){
	let anzZwischenerg = 3;
	for (i=1; i<anzZwischenerg; i++){
	let ausgabe = JSON.parse(localStorage.getItem("zwischenergebnis"+i))
		arraydarstellen(ausgabe);
	}
}

function arraydarstellen(inputar){

	let zeigTab = document.getElementById("anzeigetabelle");
	let zwschritt = document.createElement("div");
	zeigTab.appendChild(zwschritt);
	zwschritt.setAttribute("id","zwschritt"+schrittzähler);
	zwschritt.classList.add("zwschritt");
	
	
	//durchläuft die zeilen und erstellt für jede Zeile ein Div
	for (let i = 0; i < inputar.length; i++){
		
		let erstdiv = document.createElement("div");
		zwschritt.appendChild(erstdiv);
		erstdiv.setAttribute("id","anzzeile"+schrittzähler+i);
		erstdiv.classList.add("anzzeile");
		
		
		//durchläuft die Spalten und erstellt jeweils ein p
		for ( k = 0; k < inputar[i].length; k++){
			
		        let erstp = document.createElement("p");
				erstp.setAttribute("id","anzp"+schrittzähler+i+k);
				let zeigDiv = document.getElementById("anzzeile"+schrittzähler+i);
                zeigDiv.appendChild(erstp);
                erstp.innerHTML = inputar[i][k];
				
				if (i == 0 || k == 0){
					erstp.classList.add("anzpvar");
				}
				else{
					erstp.classList.add("anzpzahl");					
				}
		}
		
	}
	schrittzähler++;
}






