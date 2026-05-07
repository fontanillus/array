let clasificaciones = ["Ana", "Oswaldo", "Raúl", "Celia", "María", "Antonio"];

const CLASIFICACION_INICIAL = document.getElementById("clasificacionInicial");
const CLASIFICACION_ACTUALIZADA = document.getElementById("clasificacionActualizada");
const BOTON_CONCURSAR = document.getElementById("btnConcursar");

function textoClasificacion(lista) {
	return lista.join(", ");
}

function mostrarInicial() {
	CLASIFICACION_INICIAL.textContent = textoClasificacion(clasificaciones);
}

function aplicarCambiosConcurso() {
	if (clasificaciones[0] === "Marta") {
		CLASIFICACION_ACTUALIZADA.textContent = textoClasificacion(clasificaciones);
		return;
	}

	const indiceCelia = clasificaciones.indexOf("Celia");
	if (indiceCelia !== -1) {
		clasificaciones.splice(indiceCelia, 1);
		const indiceRaul = clasificaciones.indexOf("Raúl");
		clasificaciones.splice(indiceRaul, 0, "Celia");
	}

	const indiceAntonio = clasificaciones.indexOf("Antonio");
	if (indiceAntonio !== -1) {
		clasificaciones.splice(indiceAntonio, 1);
	}

	const indiceOswaldo = clasificaciones.indexOf("Oswaldo");
	if (indiceOswaldo !== -1) {
		clasificaciones.splice(indiceOswaldo, 0, "Roberto", "Amaya");
	}

	clasificaciones.unshift("Marta");
	clasificaciones.push("Antonio");

	CLASIFICACION_ACTUALIZADA.textContent = textoClasificacion(clasificaciones);
}

if (BOTON_CONCURSAR) {
	BOTON_CONCURSAR.addEventListener("click", aplicarCambiosConcurso);
}

mostrarInicial();
