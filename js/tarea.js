let tareas = [];

const INPUT_TAREA = document.getElementById("inputTarea");
const INPUT_ELIMINAR = document.getElementById("inputEliminar");
const LISTA_TAREAS = document.getElementById("listaTareas");
const MENSAJE = document.getElementById("mensaje");
const BOTON_ANADIR = document.getElementById("btnAnadir");
const BOTON_MOSTRAR = document.getElementById("btnMostrar");
const BOTON_ELIMINAR = document.getElementById("btnEliminar");
const BOTON_SALIR = document.getElementById("btnSalir");

function renderizarTareas() {
	LISTA_TAREAS.innerHTML = "";

	tareas.forEach(function (tarea, indice) {
		const item = document.createElement("li");
		item.textContent = (indice + 1) + ". " + tarea;
		item.className = "rounded-xl border border-white/10 bg-white/5 px-3 py-2";
		LISTA_TAREAS.appendChild(item);
	});
}

function anadirTarea() {
	const texto = INPUT_TAREA.value.trim();

	if (texto === "") {
		MENSAJE.textContent = "Escribe una tarea para anadir.";
		INPUT_TAREA.focus();
		return;
	}

	tareas.push(texto);
	renderizarTareas();
	MENSAJE.textContent = "Tarea anadida: " + texto;
	INPUT_TAREA.value = "";
	INPUT_TAREA.focus();
}

function mostrarTodas() {
	if (tareas.length === 0) {
		MENSAJE.textContent = "No hay tareas registradas.";
		LISTA_TAREAS.innerHTML = "";
		return;
	}

	renderizarTareas();
	MENSAJE.textContent = "Clasificacion de tareas actualizada.";
}

function eliminarTarea() {
	if (tareas.length === 0) {
		MENSAJE.textContent = "No hay tareas para eliminar.";
		INPUT_ELIMINAR.value = "";
		return;
	}

	const entrada = INPUT_ELIMINAR.value.trim();
	const posicionUsuario = Number(entrada);
	const esEntero = Number.isInteger(posicionUsuario);

	if (!esEntero || posicionUsuario < 1 || posicionUsuario > tareas.length) {
		MENSAJE.textContent = "Indica un numero valido entre 1 y " + tareas.length + ".";
		INPUT_ELIMINAR.focus();
		return;
	}

	const indice = posicionUsuario - 1;
	const eliminada = tareas[indice];
	tareas.splice(indice, 1);
	renderizarTareas();
	MENSAJE.textContent = "Tarea eliminada: " + eliminada;
	INPUT_ELIMINAR.value = "";
	INPUT_ELIMINAR.focus();
}

function salirAplicacion() {
	MENSAJE.textContent = "Gracias";

	const botones = document.querySelectorAll(".menu-btn");
	botones.forEach(function (boton) {
		boton.disabled = true;
		boton.classList.add("opacity-50", "cursor-not-allowed");
	});

	INPUT_TAREA.disabled = true;
	INPUT_ELIMINAR.disabled = true;
}

if (BOTON_ANADIR) {
	BOTON_ANADIR.addEventListener("click", anadirTarea);
}

if (BOTON_MOSTRAR) {
	BOTON_MOSTRAR.addEventListener("click", mostrarTodas);
}

if (BOTON_ELIMINAR) {
	BOTON_ELIMINAR.addEventListener("click", eliminarTarea);
}

if (BOTON_SALIR) {
	BOTON_SALIR.addEventListener("click", salirAplicacion);
}

if (INPUT_TAREA) {
	INPUT_TAREA.addEventListener("keydown", function (evento) {
		if (evento.key === "Enter") {
			anadirTarea();
		}
	});
}

if (INPUT_ELIMINAR) {
	INPUT_ELIMINAR.addEventListener("keydown", function (evento) {
		if (evento.key === "Enter") {
			eliminarTarea();
		}
	});
}
