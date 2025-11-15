
import {
    guardarCarrito,
    obtenerCarrito,
    vaciarCarritoStorage,
} from "./storage.js"

import { actualizarContador, mostrarMensaje } from "./ui.js"

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    carrito.push(producto);
    
    guardarCarrito(carrito);

    actualizarContador(carrito);
    mostrarMensaje("Producto agregado al carrito");
};

export const eliminarProducto = (indice) => {

    const carrito = obtenerCarrito();
    carrito.splice(indice,1);

    guardarCarrito(carrito);

    actualizarContador(carrito);
    mostrarMensaje("Producto eliminado");
};

export const calcularTotal = (productos) => {
  if (!productos || !productos.length) return 0;
  return productos.reduce((acc, p) => acc + (p.precio || 0), 0);
};

export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje("Carrito vaciado")
}

