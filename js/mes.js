// Array de meses: el índice 0 es null para que el índice 1 = Enero, 2 = Febrero...
// Así podemos acceder directamente con meses[numeroMes] sin restar 1.
const meses = [
	null,
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
];

function consultarMes() {
	const resultado = document.getElementById("resultado");
	const inputMes = document.getElementById("inputMes");
	const entrada = inputMes.value.trim();

	// Convertimos la entrada a número y comprobamos que sea un entero válido.
	const numeroMes = Number(entrada);
	const esEntero = Number.isInteger(numeroMes);

	// Validación: solo se aceptan enteros del 1 al 12.
	if (!esEntero || numeroMes < 1 || numeroMes > 12) {
		resultado.textContent = "Debes introducir un numero entero entre 1 y 12.";
		inputMes.focus();
		return;
	}

	// Acceso directo al array por índice: meses[1] = "Enero", meses[12] = "Diciembre".
	resultado.textContent = "El mes " + numeroMes + " se corresponde con " + meses[numeroMes] + ".";
}

// Asignamos el evento click al botón para ejecutar la consulta.
const boton = document.getElementById("btnPreguntar");
if (boton) {
	boton.addEventListener("click", consultarMes);
}

// También permitimos consultar pulsando Enter en el input.
const inputMes = document.getElementById("inputMes");
if (inputMes) {
	inputMes.addEventListener("keydown", function (evento) {
		if (evento.key === "Enter") {
			consultarMes();
		}
	});
}
