let tamagotchi = null;

        function crearTamagotchi() {
            const mensaje = document.getElementById("mensaje");
            const actividades = document.getElementById("actividades");
            const infoMascota = document.getElementById("infoMascota");
            const nombre = "Minomi";

            mensaje.innerHTML = "";
            actividades.classList.remove("hidden");
            infoMascota.classList.remove("hidden");

            tamagotchi = {
                nombre: nombre,
                salud: (0),
                felicidad: (0),
                limpieza: (0),
                energia: (0),
                personalidad: "Minomi es muy dulce, le encanta recibir caricias y siempre está de buen humor, pero si lo reprende se pone muy triste."
            };

            console.log(tamagotchi.nombre);

            document.getElementById("nombreMascota").innerText = `Tamagotchi: ${nombre}`;
            document.getElementById("nombreMascota").classList.remove("hidden");
            document.getElementById("imagenMascota").classList.remove("hidden");
            document.getElementById("personalidad").innerText = tamagotchi.personalidad;

            mostrarEstado("¡Tu mascota ha nacido!", "img/presentacion.png", "Mascota nacida");
        }

        function reiniciar() {
            tamagotchi = null;
            const infoMascota = document.getElementById("infoMascota");
            const actividades = document.getElementById("actividades");
            const mensaje = document.getElementById("mensaje");
            infoMascota.classList.add("hidden");
            actividades.classList.add("hidden");
            mensaje.innerHTML = "";
        }

        function mostrarEstado(mensajeTexto = "", imagenSrc = "", imagenAlt = "") {
            if (!tamagotchi) return;

            const bloqueEsmeralda = "<span style='color:#c6d6a0'>■</span>";
            document.getElementById('salud').innerHTML = bloqueEsmeralda.repeat(tamagotchi.salud);
            document.getElementById('textoFelicidad').innerHTML = bloqueEsmeralda.repeat(tamagotchi.felicidad);
            document.getElementById('textoLimpieza').innerHTML = bloqueEsmeralda.repeat(tamagotchi.limpieza);
            document.getElementById('textoEnergia').innerHTML = bloqueEsmeralda.repeat(tamagotchi.energia);

            document.getElementById('valorSalud').innerText = tamagotchi.salud;
            document.getElementById('valorFelicidad').innerText = tamagotchi.felicidad;
            document.getElementById('valorLimpieza').innerText = tamagotchi.limpieza;
            document.getElementById('valorEnergia').innerText = tamagotchi.energia;

            const mensaje = document.getElementById("mensaje");
            mensaje.style.color = "#c6d6a0";
            mensaje.innerHTML = mensajeTexto;

            const imagenMascota = document.getElementById("imagenMascota");
            if (imagenSrc) {
                imagenMascota.innerHTML = `<img src="${imagenSrc}" alt="${imagenAlt}" class="h-full w-full object-contain rounded-2xl">`;  
            } else {
                imagenMascota.innerHTML = "";
            }
        }

        function limitarValores() {
            for (let key in tamagotchi) {
                if (typeof tamagotchi[key] === "number") {
                    tamagotchi[key] = Math.max(0, Math.min(10, tamagotchi[key]));
                }
            }
        }

        function alimentar() {
            tamagotchi.energia += 3;
            tamagotchi.felicidad += 2;
            limitarValores();
            mostrarEstado("Has alimentado a tu Tamagotchi 🍎", "img/comiendo.png", "Mascota alimentada");
        }

        function jugar() {
            tamagotchi.felicidad += 2;
            tamagotchi.energia -= 2;
            tamagotchi.limpieza -= 1;
            limitarValores();
            mostrarEstado("Jugaste con tu Tamagotchi 🎾", "img/jugando.png", "Mascota ha jugado");
        }

        function dormir() {
            tamagotchi.energia += 5;
            tamagotchi.salud += 2;
            tamagotchi.limpieza -= 2;
            limitarValores();
            mostrarEstado("Tu Tamagotchi ha dormido 😴", "img/dormir.png", "Mascota ha dormido");
        }

        function duchar() {
            tamagotchi.salud += 3;
            tamagotchi.limpieza += 5;
            limitarValores();
            mostrarEstado("Bañaste a tu Tamagotchi 🛁", "img/bañera.png", "Mascota se ha duchado");
        }

        function reprender() {
            tamagotchi.felicidad -= 3;
            limitarValores();
            mostrarEstado("Reprendiste a tu Tamagotchi 📛", "img/trsisteza.png", "Mascota ha sido reprendida");
        }

        function acariciar() {
            tamagotchi.felicidad += 4;
            limitarValores();
            mostrarEstado("Acariciaste a tu Tamagotchi 💖", "img/alegria.png", "Mascota ha sido acariciada");
        }