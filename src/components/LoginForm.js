import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const manejarSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(); // Llamamos a la función para manejar el login exitoso
    } catch (error) {
      setErrorMessage("Error al iniciar sesión. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <button type="submit" className="btn btn-primary w-100 mt-3">
        Iniciar sesión
      </button>
      <p className="mt-3 text-center">
        ¿No tienes cuenta?{" "}
        <button
          type="button"
          className="btn btn-link"
          onClick={onSwitchToRegister}
        >
          Regístrate aquí
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
