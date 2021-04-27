
<!DOCTYPE html>

<html>

	<head>
		<link rel="stylesheet" href="Dateien/style.css" type="text/css">
		<title>Simplex@FHWS</title>
		<meta charset ="utf-8">
		<script src="Dateien/scriptsinitialisierung.js">

		</script>
	</head>
	<body>
	
			
	
		<div id="wrapper">
			<header><h1>Simplex@FHWS</h1></header>
			
			
			<nav>
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="#">Über uns</a></li>
					<li><a href="#">Kontakt</a></li>
				</ul>
			</nav>
			
			<section> 
			
				<select class = "eingabefeld2" id = "auswahlSpalten" onchange= "setSpalten(this.value)">
					<option value = "-1">Anzahl Spalten</option>
					<option value = "1">2</option>
					<option value = "2">3</option>
					<option value = "3">4</option>
					<option value = "4">5</option>
					<option value = "5">6</option>
					<option value = "6">7</option>
					<option value = "7">8</option>
					<option value = "8">9</option>
					<option value = "9">10</option>
				</select>
				
				<select class = "eingabefeld2" id = "auswahlZeilen" onchange= "setZeilen(this.value)">
					<option value = "-1">Anzahl Zeilen</option>
					<option value = "2">2</option>
					<option value = "3">3</option>
					<option value = "4">4</option>
					<option value = "5">5</option>
					<option value = "6">6</option>
					<option value = "7">7</option>
					<option value = "8">8</option>
					<option value = "9">9</option>
					<option value = "10">10</option>
				</select>
			
				<a href = "Dateien/indextabelle.html"><button id ="tabErstellen"  disabled >Tabelle erstellen</button></a>
				
				
			</section>

			
			
			<footer> 
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="#">Über uns</a></li>
					<li><a href="#">Kontakt</a></li>
				</ul>

			</footer>
		</div>     
	</body>



</html>
