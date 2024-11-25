import React, { useEffect, useState } from "react";
import { obtenerProductos, eliminarProducto } from "./services/FirestoreService";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ListaProductos from "./components/ListaProductos";
import FormularioProducto from "./components/FormularioProducto";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setIsAuthenticated(true);
      } else {
        setUsuario(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const cargarProductos = async () => {
        try {
          const productosObtenidos = await obtenerProductos();
          setProductos(productosObtenidos);
        } catch (error) {
          console.error("Error al obtener productos:", error);
        }
      };
      cargarProductos();
    }
  }, [isAuthenticated]);

  const manejarEliminarProducto = async (id) => {
    try {
      await eliminarProducto(id);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const manejarLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUsuario(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "auto" }}>
      {!isAuthenticated ? (
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="card-title text-center mb-4">
            {isRegistering ? "Registro" : "Iniciar Sesión"}
          </h2>
          {isRegistering ? (
            <RegisterForm
              onRegisterSuccess={() => setIsRegistering(false)}
              onSwitchToLogin={() => setIsRegistering(false)}
            />
          ) : (
            <LoginForm
              onLoginSuccess={() => setIsAuthenticated(true)}
              onSwitchToRegister={() => setIsRegistering(true)}
            />
          )}
        </div>
      ) : (
        <div className="container mt-5">
          <div className="text-center mb-4">
            <h1 className="display-5">Lista de Productos</h1>
            <p>
              Bienvenido, <strong>{usuario?.email}</strong>{" "}
              <button className="btn btn-link text-danger" onClick={manejarLogout}>
                Cerrar sesión
              </button>
            </p>
          </div>
          <ListaProductos productos={productos} onEliminar={manejarEliminarProducto} />
          <hr />
          <FormularioProducto setProductos={setProductos} />
        </div>
      )}
    </div>
  );
}

export default App;
