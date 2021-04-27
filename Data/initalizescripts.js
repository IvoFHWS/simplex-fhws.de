

//--------------------------------Eingabeseite----------------------------------
window.onload = function(){
localStorage.clear();
document.getElementById("auswahlZeilen").value = "-1";
document.getElementById("auswahlSpalten").value = "-1";
}

function setRows(anzzeilen){
	localStorage.setItem('anzahlZeilen',anzzeilen);
	buttontest();
}
function setColumns(anzspalten){
	localStorage.setItem('anzahlSpalten',anzspalten);
	buttontest();
}
function buttontest(){
	document.getElementById("tabErstellen").disabled = !((localStorage.getItem('anzahlZeilen') > 0) && (localStorage.getItem('anzahlSpalten') > 0));
}