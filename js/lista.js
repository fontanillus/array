// Array principal: guarda los productos que el usuario va agregando al carrito.
let carrito = [];

// Referencias a los elementos del HTML que se usan en el código.
const INPUT = document.getElementById("producto-input");
const LISTA = document.getElementById("lista-compras");
const PRODUCTOS = document.getElementById("num-prod");
const MENSAJE = document.getElementById("mensaje");
const INPUT_POSICION = document.getElementById("inputPosicion");
const BOTON_AGREGAR = document.getElementById("btnAgregar");
const BOTON_ELIMINAR = document.getElementById("btnEliminar");
const BOTON_VACIAR = document.getElementById("btnVaciar");

// Redibuja la lista visual completa leyendo el array carrito.
// Se llama cada vez que el array cambia.
function renderizarLista() {
  LISTA.innerHTML = "";

  // forEach recorre el array y crea un <li> por cada producto.
  carrito.forEach(function (producto, indice) {
    const elemento = document.createElement("li");
    elemento.id = String(indice);
    elemento.textContent = (indice + 1) + ": " + producto;
    elemento.className = "rounded-xl border border-white/10 bg-white/5 px-3 py-2";
    LISTA.appendChild(elemento);
  });

  // Actualiza el contador de productos mostrado en el resumen.
  PRODUCTOS.textContent = String(carrito.length);
}

function agregar() {
  // trim() quita espacios, toUpperCase() evita duplicados por mayúsculas/minúsculas.
  const producto = INPUT.value.trim().toUpperCase();

  // indexOf devuelve -1 si el producto NO está en el array (no es duplicado).
  const posicionExistente = carrito.indexOf(producto);

  if (producto === "") {
    MENSAJE.textContent = "Escribe algo primero.";
    INPUT.focus();
    return;
  }

  // Si indexOf encontró el producto (posición >= 0), es un duplicado: no lo agregamos.
  if (posicionExistente !== -1) {
    MENSAJE.textContent = "Producto ya añadido a la lista.";
    INPUT.focus();
    return;
  }

  // push() añade el producto al final del array.
  carrito.push(producto);
  renderizarLista();
  MENSAJE.textContent = "Ultimo producto agregado: " + producto;
  INPUT.value = "";
  INPUT.focus();
}

function eliminarPorPosicion() {
  if (carrito.length === 0) {
    MENSAJE.textContent = "El carrito ya esta vacio.";
    if (INPUT_POSICION) {
      INPUT_POSICION.value = "";
    }
    return;
  }

  const entrada = INPUT_POSICION ? INPUT_POSICION.value.trim() : "";

  // El usuario ve posiciones desde 1, pero el array empieza en 0.
  const posicionUsuario = Number(entrada);
  const esEntero = Number.isInteger(posicionUsuario);

  if (!esEntero || posicionUsuario < 1 || posicionUsuario > carrito.length) {
    MENSAJE.textContent = "Debes indicar una posicion valida entre 1 y " + carrito.length + ".";
    if (INPUT_POSICION) {
      INPUT_POSICION.focus();
    }
    return;
  }

  // Convertimos la posición del usuario (1..n) al índice del array (0..n-1).
  const posicionArray = posicionUsuario - 1;
  const productoEliminado = carrito[posicionArray];

  // slice + concat construyen un nuevo array sin el elemento eliminado
  // (equivale a splice pero sin mutar el array original directamente).
  carrito = carrito.slice(0, posicionArray).concat(carrito.slice(posicionArray + 1));
  renderizarLista();
  MENSAJE.textContent = "Producto eliminado: " + productoEliminado + ".";
  if (INPUT_POSICION) {
    INPUT_POSICION.value = "";
    INPUT_POSICION.focus();
  }
}

function vaciarCarrito() {
  if (carrito.length === 0) {
    INPUT.value = "";
    MENSAJE.textContent = "El carrito ya esta vacio.";
    INPUT.focus();
    return;
  }

  // Resetea el array asignándolo vacío: todos los productos desaparecen.
  carrito = [];
  renderizarLista();
  INPUT.value = "";
  if (INPUT_POSICION) {
    INPUT_POSICION.value = "";
  }
  MENSAJE.textContent = "El carrito se ha vaciado.";
  INPUT.focus();
}

if (BOTON_AGREGAR) {
  BOTON_AGREGAR.addEventListener("click", agregar);
}

if (BOTON_ELIMINAR) {
  BOTON_ELIMINAR.addEventListener("click", eliminarPorPosicion);
}

if (BOTON_VACIAR) {
  BOTON_VACIAR.addEventListener("click", vaciarCarrito);
}

if (INPUT) {
  INPUT.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      agregar();
    }
  });
}

if (INPUT_POSICION) {
  INPUT_POSICION.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      eliminarPorPosicion();
    }
  });
}

renderizarLista();
