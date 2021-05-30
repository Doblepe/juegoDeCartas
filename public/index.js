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
	document.getElementById('contador').innerHTML = (`<div>Te quedan <br> ${contador} intentos</div>`)
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
	document.getElementById('contador').innerHTML = (`<div>Te quedan <br> ${contador} intentos</div>`)

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
					contador = 2;
					document.getElementById('contador').innerHTML = ``
					
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


		fetch("/editar", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(`${contador*5}`),
		  });
		  document.getElementById('body').innerHTML = 
		  `<body id="body"><img src="diseño/ganador.png" alt="circulo" class="ajustarimagenes" ><div id="volver"><p>Has conseguido<br>${contador*5} puntos</p><a href="juego.html" id="portada2"> Inicio</a></div> </body>`
  
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
	document.getElementById('body').innerHTML = `<a href="juego.html" id="portada"> Jugar</a>`

  
}


//---------------------------------------------------------------------- ESTO ES RUTAS --------------------------------------------------------------------------------------------
show()
function show(){

	fetch("/scores").then(function(respuesta){
		return respuesta.json()
	}).then(function(datos){
		datos.error
		? document.getElementById("feedback").innerHTML =`<h3>Ha ocurrido un fallo</h3>`
		: print(datos)
	})
}
showBestScores()
function showBestScores(){
    fetch("/bestscores").then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
        if(datos.error){document.getElementById("feedback").innerHTML =`<h3>Ha ocurrido un fallo</h3>`
    }else{
        let parrafo = ""
	    for (let i = 0; i < datos.contenido.length; i++) {
		parrafo += `<tr><td>${datos.contenido[i].player}</td><td>${datos.contenido[i].score}</td></tr>`
	}
	document.getElementById("bestScores").innerHTML = `<table><th>player:</th><th>scores</th>${parrafo}</table>`
    }
    })
}
function addPlayer(){
    fetch("/player", 
    {method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({player: document.getElementById("player").value,
score: 0})
}).then(function(respuesta){
    return respuesta.json()
}).then(function(datos){
    datos.insertedCount >=1
    ? (document.getElementById("feedback").innerHTML =`<h3>Se ha grabado correctamente ${datos.contenido[0].player}</h3>`, show())
    : document.getElementById("feedback").innerHTML = `<h3>No se ha guardado correctamente</h3>`

})
}

function updateScore(){
    fetch("/edit", {method: "PUT",
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({player: document.getElementById("player").value,
score: parseInt(document.getElementById("score").value)})
}).then(function(respuesta){
    return respuesta.json()
}).then(function(datos){
    datos.modifiedCount = 1
    ? (document.getElementById("feedback").innerHTML =`<h3>Se ha modificado correctamente ${datos.contenido[0].score}</h3>`, show())
    : document.getElementById("feedback").innerHTML = `<h3>No se ha guardado correctamente</h3>`
})
}



function print(datos){
	let parrafo = ""
	for (let i = 0; i < datos.contenido.length; i++) {
		parrafo += `<tr><td>${datos.contenido[i].player}</td><td>${datos.contenido[i].score}</td></tr>`
	}
	document.getElementById("scores").innerHTML = `<table><th>player:</th><th>scores</th>${parrafo}</table>`
}