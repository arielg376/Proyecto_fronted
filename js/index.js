//import { productos } from "./productos.js";
import { agregarAlCarrito } from "./funciones.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
 
    const contenedor = document.getElementById("contenedor-tarjetas");

    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    fetch("./data/productos.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Error HTTP status: ${res.status}`);
        }
        return res.json();

    })
    .then((data) => {
        data.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjetas_productos");

    const titulo= document.createElement("h3");
    titulo.textContent = producto.nombre;

    const img= document.createElement("img");
    img.src = `./${producto.img}`;
    img.alt = producto.nombre;
    
    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("div");
    precio.classList.add("precio");
    precio.textContent = `precio $ ${producto.precio}`;

    const boton = document.createElement("button");
    boton.classList.add("btn");
    boton.textContent = "Agregar al carrito";

    boton.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(boton);

    contenedor.appendChild(tarjeta);

});

    })
    .catch((err) => {
         console.log(err);
    });


   
});


