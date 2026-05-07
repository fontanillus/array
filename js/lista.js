let carrito = [];

const INPUT = document.getElementById("producto-input");
const LISTA = document.getElementById("lista-compras");
const PRODUCTOS = document.getElementById("num-prod");
const MENSAJE = document.getElementById("mensaje");
const INPUT_POSICION = document.getElementById("inputPosicion");
const BOTON_AGREGAR = document.getElementById("btnAgregar");
const BOTON_ELIMINAR = document.getElementById("btnEliminar");
const BOTON_VACIAR = document.getElementById("btnVaciar");

function renderizarLista() {
  LISTA.innerHTML = "";

  carrito.forEach(function (producto, indice) {
    const elemento = document.createElement("li");
    elemento.id = String(indice);
    elemento.textContent = (indice + 1) + ": " + producto;
    elemento.className = "rounded-xl border border-white/10 bg-white/5 px-3 py-2";
    LISTA.appendChild(elemento);
  });

  PRODUCTOS.textContent = String(carrito.length);
}

function agregar() {
  const producto = INPUT.value.trim().toUpperCase();
  const posicionExistente = carrito.indexOf(producto);

  if (producto === "") {
    MENSAJE.textContent = "Escribe algo primero.";
    INPUT.focus();
    return;
  }

  if (posicionExistente !== -1) {
    MENSAJE.textContent = "Producto ya añadido a la lista.";
    INPUT.focus();
    return;
  }

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

  const posicionUsuario = Number(entrada);
  const esEntero = Number.isInteger(posicionUsuario);

  if (!esEntero || posicionUsuario < 1 || posicionUsuario > carrito.length) {
    MENSAJE.textContent = "Debes indicar una posicion valida entre 1 y " + carrito.length + ".";
    if (INPUT_POSICION) {
      INPUT_POSICION.focus();
    }
    return;
  }

  const posicionArray = posicionUsuario - 1;
  const productoEliminado = carrito[posicionArray];
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
