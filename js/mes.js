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

	const numeroMes = Number(entrada);
	const esEntero = Number.isInteger(numeroMes);

	if (!esEntero || numeroMes < 1 || numeroMes > 12) {
		resultado.textContent = "Debes introducir un numero entero entre 1 y 12.";
		inputMes.focus();
		return;
	}

	resultado.textContent = "El mes " + numeroMes + " se corresponde con " + meses[numeroMes] + ".";
}

const boton = document.getElementById("btnPreguntar");
if (boton) {
	boton.addEventListener("click", consultarMes);
}

const inputMes = document.getElementById("inputMes");
if (inputMes) {
	inputMes.addEventListener("keydown", function (evento) {
		if (evento.key === "Enter") {
			consultarMes();
		}
	});
}
