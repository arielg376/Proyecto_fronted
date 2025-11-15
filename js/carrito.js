import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funciones.js";
import { actualizarContador } from "./ui.js";
import { calcularTotal } from "./funciones.js"; 

const renderizarCarrito = () => {

    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito")

    const divAcciones = document.getElementById("acciones-carrito")

     const resumenCarrito = document.getElementById("resumen-carrito");

    contenedor.innerHTML ="";
    divAcciones.innerHTML ="";

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "No hay productos en el carrito";
        contenedor.appendChild(mensaje);
        return;
    }

    carrito.forEach((producto, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjetas_productos");

    const titulo= document.createElement("h3");
    titulo.textContent = producto.nombre;

    const img= document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;
    
    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("div");
    precio.classList.add("precio");
    precio.textContent = `precio $ ${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");
    
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
        eliminarProducto(indice);

        renderizarCarrito();
        });

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);        
    });

     const total = calcularTotal(carrito);
    const totalElement = document.createElement("div");
    totalElement.classList.add("total-carrito");
    totalElement.innerHTML = `
        <h3>Total: $${total}</h3>
    `;
    divAcciones.appendChild(totalElement);

    const btnVaciar =document.createElement("button");
    btnVaciar.classList.add("btn");
    btnVaciar.classList.add("btn-vaciar-carrito");
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.addEventListener("click", () => {
        vaciarCarrito();

        renderizarCarrito();
    });

    divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);