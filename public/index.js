var cartas = new Array(
	{ nombre: '1', seleccion: false },
	{ nombre: '2', seleccion: false },
	{ nombre: '3', seleccion: false },
	{ nombre: '4', seleccion: false },
	{ nombre: '5', seleccion: false },
	{ nombre: '6', seleccion: false },
	{ nombre: '7', seleccion: false },
	{ nombre: '8', seleccion: false },
	{ nombre: '1', seleccion: false },
	{ nombre: '2', seleccion: false },
	{ nombre: '3', seleccion: false },
	{ nombre: '4', seleccion: false },
	{ nombre: '5', seleccion: false },
	{ nombre: '6', seleccion: false },
	{ nombre: '7', seleccion: false },
	{ nombre: '8', seleccion: false }
);

var intentos = 0;
var jugada1 = '';
var jugada2 = '';
var identificadorJ1 = '';
var identificadorJ2 = '';

let contador = 20;
function puntuacion(){
	contador = contador - 1;
	document.getElementById('contador').innerHTML = (`<div>Te quedan ${contador} intentos</div>`)
	return contador;
}
contador();

function iniciarJuego() {
	var dato = document.getElementById('juego');
	dato.style.opacity = 1;

	cartas.sort(function () {
		return Math.random() - 0.5;
	});
	for (var i = 0; i < 16; i++) {
		var carta = cartas[i].nombre;
		var dato = document.getElementById(i.toString());
		dato.dataset.valor = carta;
	}
}

function resetearJuego() {
	cartas.sort(function () {
		return Math.random() - 0.5;
	});
	for (var i = 0; i < 16; i++) {
		var carta = cartas[i].nombre;
		var dato = document.getElementById(i.toString());
		dato.dataset.valor = carta;
		colorCambio(i, 'black', '?');
	}
}

function girarCarta() {
	var evento = window.event;

	jugada2 = evento.target.dataset.valor;
	identificadorJ2 = evento.target.id;

	if (jugada1 !== '') {
		if (
			jugada1 === jugada2 &&
			identificadorJ1 !== identificadorJ2 &&
			cartas[parseInt(identificadorJ2)].seleccion != true &&
			cartas[parseInt(identificadorJ1)].seleccion != true
		) {
			cartas[parseInt(identificadorJ1)].seleccion = true;
			cartas[parseInt(identificadorJ2)].seleccion = true;

			colorCambio(identificadorJ2, 'blue', jugada2);
			vaciar();
			comprobar();
		} else if (identificadorJ1 !== identificadorJ2) {
			var self = this;
			setTimeout(function () {
				colorCambio(self.identificadorJ1, 'black', '?');
				colorCambio(self.identificadorJ2, 'black', '?');
				vaciar();
				puntuacion();
				if(contador == 0){
					document.getElementById('juego').innerHTML = 
					`<div id="volver"><h1>PERDISTE</h1><input type="button" value="Iniciar" onclick="volver()" /></div> `
				}
			}, 200);

			colorCambio(identificadorJ2, 'blue', jugada2);
		}
	} else if (jugada2 !== 'valor') {
		colorCambio(identificadorJ2, 'blue', jugada2);

		jugada1 = jugada2;
		identificadorJ1 = identificadorJ2;
	}
}

function vaciar() {
	jugada1 = '';
	jugada2 = '';

	identificadorJ1 = '';
	identificadorJ2 = '';
}

function colorCambio(posicion, color, contenido) {
	document.getElementById(posicion.toString()).style.backgroundColor = color;
	document.getElementById(posicion.toString()).innerHTML = contenido;
}

function comprobar() {
	var aciertos = 0;
	for (var i = 0; i < 16; i++) {
		if (cartas[i].seleccion == true) {
			aciertos++;
		}
	}

	if (aciertos == 16) {
		document.getElementById('juego').innerHTML = 
		`<div id="juego"><h1>GANASTE</h1><p>Tu puntuación es ${contador*5}</p><input type="button" value="Iniciar" onclick="volver()" /></div> `

		document.getElementById('juego').innerHTML = 
		`<`;
		//fetch enviando la variable ${contador*5}
	}
}

function resetearJuego() {
	cartas.sort(function () {
		return Math.random() - 0.5;
	});
	for (var i = 0; i < 16; i++) {
		var carta = cartas[i].nombre;
		var dato = document.getElementById(i.toString());
		dato.dataset.valor = carta;
		colorCambio(i, 'black', '?');
	}
}


function volver(){
	contador = 20;
	document.getElementById('volver').innerHTML = `<div id="juego">
	<div id="contador"></div>
	<table>
	  <tr>
		<td id="0" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="1" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="2" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="3" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
	  </tr>
	  <tr>
		<td id="4" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="5" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="6" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="7" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
	  </tr>
	  <tr>
		<td id="8" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="9" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="10" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="11" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
	  </tr>
	  <tr>
		<td id="12" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="13" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="14" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
		<td id="15" class="letra" onclick="girarCarta()" data-valor="valor">?</td>
	  </tr>
	  </table>
  </div>
<div class="centrar">
  <input type="button" value="Iniciar" onclick="iniciarJuego()" />  
  <input type="button" value="Reset" onclick="resetearJuego()" /> 
</div>
`
}