/**
 * frio.js — Juego "Frio o caliente"
 * ===================================
 * El jugador debe adivinar un numero secreto entre 1 y 500.
 * Cada intento devuelve una pista segun la distancia al numero:
 *   - Frio    → diferencia >= 50
 *   - Tibio   → diferencia entre 15 y 49
 *   - Caliente → diferencia < 15
 *
 * Ademas actualiza el panel Smart Charts (barras) y cambia
 * el fondo de pantalla para reforzar visualmente la pista.
 */

// Numero aleatorio generado una sola vez al cargar la pagina.
let numeroSecreto = Math.floor(Math.random() * 500) + 1;

// Acumulador de intentos, empieza en 0.
let intentos = 0;

// Actualiza las barras y porcentajes del panel Smart Charts.
function setChartValues(frio, tibio, caliente) {
    const chartFrio = document.getElementById('chartFrio');
    const chartTibio = document.getElementById('chartTibio');
    const chartCaliente = document.getElementById('chartCaliente');
    const valorFrio = document.getElementById('valorFrio');
    const valorTibio = document.getElementById('valorTibio');
    const valorCaliente = document.getElementById('valorCaliente');

    chartFrio.style.width = `${frio}%`;
    chartTibio.style.width = `${tibio}%`;
    chartCaliente.style.width = `${caliente}%`;

    valorFrio.textContent = `${frio}%`;
    valorTibio.textContent = `${tibio}%`;
    valorCaliente.textContent = `${caliente}%`;
}

// Cambia el fondo segun el estado para reforzar la pista visual.
function setEscenario(estado) {
    const escenario = document.getElementById('escenario');
    const body = document.body;

    // Colores del enunciado: frio=azul, tibio=amarillo, caliente=rojo.
    if (estado === 'frio') {
        body.style.backgroundColor = '#1e40af';
        escenario.style.backgroundImage = "linear-gradient(145deg, #0a1f44, #1e40af), radial-gradient(circle at 18% 20%, rgba(56,189,248,0.35), transparent 45%)";
    } else if (estado === 'tibio') {
        body.style.backgroundColor = '#facc15';
        escenario.style.backgroundImage = "linear-gradient(145deg, #422006, #92400e), radial-gradient(circle at 22% 20%, rgba(251,191,36,0.45), transparent 45%)";
    } else if (estado === 'caliente') {
        body.style.backgroundColor = '#dc2626';
        escenario.style.backgroundImage = "linear-gradient(145deg, #3b0a0a, #991b1b), radial-gradient(circle at 24% 20%, rgba(239,68,68,0.45), transparent 45%)";
    } else if (estado === 'ganaste') {
        body.style.backgroundColor = '#1a936f';
        escenario.style.backgroundImage = [
            "radial-gradient(circle at 20% 25%, rgba(250,204,21,0.75), transparent 38%)",
            "radial-gradient(circle at 78% 20%, rgba(52,211,153,0.7), transparent 38%)",
            "radial-gradient(circle at 50% 80%, rgba(167,139,250,0.65), transparent 40%)",
            "radial-gradient(circle at 88% 75%, rgba(251,113,133,0.6), transparent 35%)",
            "radial-gradient(circle at 12% 75%, rgba(56,189,248,0.6), transparent 35%)",
            "linear-gradient(135deg, #0d1f12, #1a3a2a)"
        ].join(", ");
    } else {
        // Estado 'inicio': fondo por defecto al reiniciar
        body.style.backgroundColor = '';
        escenario.style.backgroundImage = "";
    }
}

// Reinicia el juego: nuevo numero secreto, contador a 0 y UI al estado inicial.
function reiniciar() {
    numeroSecreto = Math.floor(Math.random() * 500) + 1;
    intentos = 0;

    document.getElementById('numero').value = '';
    document.getElementById('intentosValor').textContent = '0';
    document.getElementById('estadoActual').textContent = 'Esperando tu primer intento';
    document.getElementById('resultado').textContent = '';
    document.getElementById('btnAdivinar').classList.remove('hidden');
    setChartValues(0, 0, 0);
    setEscenario('inicio');
}

// Ejecuta un intento: valida entrada, compara y muestra pistas.
function adivinar() {
    const entrada = document.getElementById('numero').value;
    const numero = parseInt(entrada, 10);
    const resultado = document.getElementById('resultado');
    const boton = document.getElementById('btnAdivinar');
    const intentosValor = document.getElementById('intentosValor');
    const estadoActual = document.getElementById('estadoActual');

    // Si el valor no es valido, no consume intento y muestra aviso.
    // El enunciado pide validar < 0 o > 500 (el 0 esta permitido).
    if (isNaN(numero) || numero < 0 || numero > 500) {
        resultado.textContent = 'Por favor indica un número entre 0 y 500';
        estadoActual.textContent = 'Entrada invalida';
        return;
    }

    intentos++;
    intentosValor.textContent = intentos;

    const diferencia = Math.abs(numeroSecreto - numero);

    // Caso de exito: el enunciado pide ocultar el boton Adivinar.
    if (numero === numeroSecreto) {
        resultado.textContent = `¡Excelente! El número era ${numeroSecreto}. ¡Has ganado en ${intentos} intentos!`;
        estadoActual.textContent = '¡Has ganado!';
        boton.classList.add('hidden'); // se oculta segun el enunciado
        setChartValues(8, 18, 100);
        setEscenario('ganaste');
        return;
    }

    let mensaje = '';

    // Rangos de cercania para convertir distancia en pistas de juego.
    // Los textos son exactamente los del enunciado.
    if (diferencia >= 50) {
        mensaje = numero > numeroSecreto
            ? 'Frío, frío: tu número es más grande que el mío'
            : 'Frío, frío: tu número es más pequeño que el mío';
        estadoActual.textContent = 'Frío, frío';
        setChartValues(95, 28, 10);
        setEscenario('frio');
    } else if (diferencia >= 15) {
        mensaje = numero > numeroSecreto
            ? 'Tibio, tibio: tu número es más grande que el mío'
            : 'Tibio, tibio: tu número es más pequeño que el mío';
        estadoActual.textContent = 'Tibio, tibio';
        setChartValues(42, 86, 36);
        setEscenario('tibio');
    } else {
        mensaje = numero > numeroSecreto
            ? 'Caliente, caliente: tu número es más grande que el mío'
            : 'Caliente, caliente: tu número es más pequeño que el mío';
        estadoActual.textContent = 'Caliente, caliente';
        setChartValues(16, 44, 92);
        setEscenario('caliente');
    }

    resultado.textContent = mensaje;
}
