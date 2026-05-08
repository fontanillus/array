// Referencias a los elementos principales del HTML.
const contenedorAstros = document.getElementById("astros");
const imagenPlaneta = document.getElementById("planeta");
const botonTerminar = document.getElementById("btnTerminar");

// Actualiza la imagen del planeta y resalta el elemento activo en la lista.
function mostrarAstro(src, item) {
    if (!imagenPlaneta || !contenedorAstros || !src) {
        return;
    }

    // Cambia el src de la imagen al del astro seleccionado.
    imagenPlaneta.src = src;

    // Quita el resaltado de todos los items y lo pone solo en el seleccionado.
    contenedorAstros.querySelectorAll(".astro-item").forEach(function (elemento) {
        elemento.classList.remove("bg-lime-200/25", "text-[#f7ffd3]");
    });
    item.classList.add("bg-lime-200/25", "text-[#f7ffd3]");
}

// Cierra la ventana/pestaña actual del navegador.
function terminar() {
    window.open("", "_self", "");
    window.close();
}

// Delegación de eventos: un solo listener en el contenedor escucha los clicks
// de todos los items hijos, en lugar de asignar un listener a cada uno.
if (contenedorAstros) {
    contenedorAstros.addEventListener("click", function (evento) {
        // closest(".astro-item") sube por el DOM hasta encontrar el item clicado.
        const item = evento.target.closest(".astro-item");
        if (!item || !contenedorAstros.contains(item)) {
            return;
        }

        // data-src es un atributo personalizado en el HTML con la ruta de la imagen.
        mostrarAstro(item.dataset.src, item);
    });
}

if (botonTerminar) {
    botonTerminar.addEventListener("click", terminar);
}

