import React from 'react';

const Producto = ({ producto, agregarAlCarrito }) => {
  return (
    <div>
      <h4>{producto.nombre}</h4>
      <p>Precio: ${producto.precio}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
};

export default Producto;
