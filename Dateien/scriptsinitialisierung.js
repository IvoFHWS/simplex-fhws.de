

//--------------------------------Eingabeseite----------------------------------
window.onload = function(){
localStorage.clear();
document.getElementById("auswahlZeilen").value = "-1";
document.getElementById("auswahlSpalten").value = "-1";
}

function setZeilen(anzzeilen){
	localStorage.setItem('anzahlZeilen',anzzeilen);
	buttontest();
}
function setSpalten(anzspalten){
	localStorage.setItem('anzahlSpalten',anzspalten);
	buttontest();
}
function buttontest(){
	if ((localStorage.getItem('anzahlZeilen') > 0)&&(localStorage.getItem('anzahlSpalten') >0)){
		document.getElementById("tabErstellen").disabled = false;
	}
	else{
		document.getElementById("tabErstellen").disabled = true;
	}
}