// Guardamos los elementos del HTML que vamos a usar.
const casillas = document.querySelectorAll(".casilla");
const mensaje = document.getElementById("mensaje");
const botonReiniciar = document.getElementById("reiniciar");
const clasesResultado = ["text-[#f7ffd3]", "bg-lime-200/15", "border", "border-lime-200/40", "rounded-xl", "py-2"];

// El juego empieza siempre con X.
let turno = "X";
let juegoTerminado = false;

// Todas las formas posibles de ganar en un tablero 3x3.
const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// A cada casilla le ponemos un evento click para poder jugar.
casillas.forEach((casilla) => {
    casilla.addEventListener("click", jugarTurno);
});

// El boton reiniciar limpia el tablero y empieza otra partida.
if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function jugarTurno(evento) {
    if (!mensaje) {
        return;
    }

    const casilla = evento.target;

    // Si la casilla ya tiene X/O o la partida termino, no hacemos nada.
    if (casilla.textContent !== "" || juegoTerminado) {
        return;
    }

    // Escribimos el turno actual en la casilla pulsada.
    casilla.textContent = turno;

    // Despues de jugar, comprobamos si ese jugador ha ganado.
    if (hayGanador()) {
        mensaje.textContent = `Gana ${turno}`;
        mensaje.classList.add(...clasesResultado);
        juegoTerminado = true;
        return;
    }

    // Si nadie gana y todas las casillas estan llenas, hay empate.
    if (hayEmpate()) {
        mensaje.textContent = "Empate";
        mensaje.classList.add(...clasesResultado);
        juegoTerminado = true;
        return;
    }

    // Cambiamos el turno: si era X pasa a O, y si era O pasa a X.
    turno = turno === "X" ? "O" : "X";
    mensaje.textContent = `Turno de ${turno}`;
}

function hayGanador() {
    // Revisamos si alguna combinacion ganadora tiene tres simbolos iguales.
    return combinacionesGanadoras.some((combinacion) => {
        return combinacion.every((posicion) => {
            return casillas[posicion].textContent === turno;
        });
    });
}

function hayEmpate() {
    // Hay empate si todas las casillas tienen algo escrito.
    return [...casillas].every((casilla) => casilla.textContent !== "");
}

function reiniciarJuego() {
    if (!mensaje) {
        return;
    }

    // Borramos el contenido de todas las casillas.
    casillas.forEach((casilla) => {
        casilla.textContent = "";
    });

    // Volvemos al estado inicial.
    turno = "X";
    juegoTerminado = false;
    mensaje.textContent = "Turno de X";
    mensaje.classList.remove(...clasesResultado);
}
