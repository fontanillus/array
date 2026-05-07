const contenedorAstros = document.getElementById("astros");
const imagenPlaneta = document.getElementById("planeta");
const botonTerminar = document.getElementById("btnTerminar");

function mostrarAstro(src, item) {
    if (!imagenPlaneta || !contenedorAstros || !src) {
        return;
    }

    imagenPlaneta.src = src;
    contenedorAstros.querySelectorAll(".astro-item").forEach(function (elemento) {
        elemento.classList.remove("bg-lime-200/25", "text-[#f7ffd3]");
    });
    item.classList.add("bg-lime-200/25", "text-[#f7ffd3]");
}

function terminar() {
    window.open("", "_self", "");
    window.close();
}

if (contenedorAstros) {
    contenedorAstros.addEventListener("click", function (evento) {
        const item = evento.target.closest(".astro-item");
        if (!item || !contenedorAstros.contains(item)) {
            return;
        }

        mostrarAstro(item.dataset.src, item);
    });
}

if (botonTerminar) {
    botonTerminar.addEventListener("click", terminar);
}

