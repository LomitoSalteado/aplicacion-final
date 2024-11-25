import React from 'react';

function Carrito({ carrito }) {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - ${producto.precio.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Carrito;
