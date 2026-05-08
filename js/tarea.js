// Array principal: almacena todas las tareas que el usuario va añadiendo.
let tareas = [];

// Referencias a los elementos del HTML.
const INPUT_TAREA = document.getElementById("inputTarea");
const INPUT_ELIMINAR = document.getElementById("inputEliminar");
const LISTA_TAREAS = document.getElementById("listaTareas");
const MENSAJE = document.getElementById("mensaje");
const BOTON_ANADIR = document.getElementById("btnAnadir");
const BOTON_MOSTRAR = document.getElementById("btnMostrar");
const BOTON_ELIMINAR = document.getElementById("btnEliminar");
const BOTON_SALIR = document.getElementById("btnSalir");

// Redibuja la lista visual completa a partir del array tareas.
// Se llama cada vez que el array cambia.
function renderizarTareas() {
	LISTA_TAREAS.innerHTML = "";

	// forEach recorre el array y crea un <li> por cada tarea.
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

	// push() añade la tarea al final del array.
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
	// El usuario introduce un número desde 1, el array empieza en 0.
	const posicionUsuario = Number(entrada);
	const esEntero = Number.isInteger(posicionUsuario);

	// Validación: la posición debe ser un entero dentro del rango del array.
	if (!esEntero || posicionUsuario < 1 || posicionUsuario > tareas.length) {
		MENSAJE.textContent = "Indica un numero valido entre 1 y " + tareas.length + ".";
		INPUT_ELIMINAR.focus();
		return;
	}

	// Convertimos la posición del usuario al índice real del array.
	const indice = posicionUsuario - 1;
	const eliminada = tareas[indice];

	// splice(indice, 1) elimina un elemento en esa posición y reordena el array.
	tareas.splice(indice, 1);
	renderizarTareas();
	MENSAJE.textContent = "Tarea eliminada: " + eliminada;
	INPUT_ELIMINAR.value = "";
	INPUT_ELIMINAR.focus();
}

function salirAplicacion() {
	MENSAJE.textContent = "Gracias";

	// Deshabilita todos los botones del menú visualmente y funcionalmente.
	const botones = document.querySelectorAll(".menu-btn");
	botones.forEach(function (boton) {
		boton.disabled = true;
		boton.classList.add("opacity-50", "cursor-not-allowed");
	});

	// También bloquea los inputs para que no se pueda seguir usando la app.
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
