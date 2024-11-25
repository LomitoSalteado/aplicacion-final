import React from "react";

function ListaProductos({ productos, onEliminar }) {
  return (
    <div className="container mt-5">
      {productos.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay productos disponibles
        </div>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">${producto.precio}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onEliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaProductos;
