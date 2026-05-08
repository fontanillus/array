// Array con la clasificación inicial del concurso.
let clasificaciones = ["Ana", "Oswaldo", "Raúl", "Celia", "María", "Antonio"];

// Referencias a los elementos del HTML.
const CLASIFICACION_INICIAL = document.getElementById("clasificacionInicial");
const CLASIFICACION_ACTUALIZADA = document.getElementById("clasificacionActualizada");
const BOTON_CONCURSAR = document.getElementById("btnConcursar");

// Une el array en un string separado por comas para mostrarlo en pantalla.
function textoClasificacion(lista) {
	return lista.join(", ");
}

// Muestra la clasificación original al cargar la página.
function mostrarInicial() {
	CLASIFICACION_INICIAL.textContent = textoClasificacion(clasificaciones);
}

function aplicarCambiosConcurso() {
	// Si ya se aplicaron los cambios (Marta encabeza), no los aplica de nuevo.
	if (clasificaciones[0] === "Marta") {
		CLASIFICACION_ACTUALIZADA.textContent = textoClasificacion(clasificaciones);
		return;
	}

	// indexOf localiza la posición de Celia en el array.
	// splice(pos, 1) la elimina; splice(nuevaPos, 0, "Celia") la inserta antes de Raúl.
	const indiceCelia = clasificaciones.indexOf("Celia");
	if (indiceCelia !== -1) {
		clasificaciones.splice(indiceCelia, 1);
		const indiceRaul = clasificaciones.indexOf("Raúl");
		clasificaciones.splice(indiceRaul, 0, "Celia");
	}

	// splice(pos, 1) elimina a Antonio de su posición actual.
	const indiceAntonio = clasificaciones.indexOf("Antonio");
	if (indiceAntonio !== -1) {
		clasificaciones.splice(indiceAntonio, 1);
	}

	// splice(pos, 0, ...) inserta Roberto y Amaya justo antes de Oswaldo.
	const indiceOswaldo = clasificaciones.indexOf("Oswaldo");
	if (indiceOswaldo !== -1) {
		clasificaciones.splice(indiceOswaldo, 0, "Roberto", "Amaya");
	}

	// unshift() añade Marta al inicio del array (posición 0).
	clasificaciones.unshift("Marta");

	// push() añade Antonio al final del array.
	clasificaciones.push("Antonio");

	CLASIFICACION_ACTUALIZADA.textContent = textoClasificacion(clasificaciones);
}

// Asignamos el evento click al botón para aplicar los cambios.
if (BOTON_CONCURSAR) {
	BOTON_CONCURSAR.addEventListener("click", aplicarCambiosConcurso);
}

// Mostramos la clasificación inicial al cargar la página.
mostrarInicial();
