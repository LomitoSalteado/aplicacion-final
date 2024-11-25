import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const coleccionProductos = collection(db, "productos");

// Obtener todos los productos
export const obtenerProductos = async () => {
  const snapshot = await getDocs(coleccionProductos);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Agregar un producto
export const agregarProducto = async (producto) => {
  await addDoc(coleccionProductos, producto);
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
  const productoRef = doc(db, "productos", id);
  await deleteDoc(productoRef);
};
