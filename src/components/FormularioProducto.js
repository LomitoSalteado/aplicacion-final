import React, { useState } from "react";
import { agregarProducto, obtenerProductos } from "../services/FirestoreService";
import ImageUploader from "./ImageUploader";

function FormularioProducto({ setProductos }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !imagenUrl) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const productosExistentes = await obtenerProductos();
    const productoExistente = productosExistentes.find((producto) => producto.nombre === nombre);

    if (productoExistente) {
      alert("El producto ya existe.");
      return;
    }

    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
      imagen: imagenUrl,
    };

    try {
      await agregarProducto(nuevoProducto);
      const productosActualizados = await obtenerProductos();
      setProductos(productosActualizados);
      setNombre("");
      setPrecio("");
      setImagenUrl("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <form onSubmit={manejarSubmit} className="text-center mt-4">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Precio del producto"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <ImageUploader onUploadComplete={setImagenUrl} />
      </div>
      <button type="submit" className="btn btn-success">
        Agregar Producto
      </button>
    </form>
  );
}

export default FormularioProducto;
