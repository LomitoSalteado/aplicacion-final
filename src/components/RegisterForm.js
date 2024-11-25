import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"; 

function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onRegisterSuccess(); // Llamamos a la función proporcionada por `App.js`
    } catch (error) {
      setError("Error al registrarse: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Registrarse</h2>
      <form onSubmit={manejarRegistro}>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Registrarse
        </button>
      </form>
      <p>
        ¿Ya tienes cuenta?{" "}
        <span
          onClick={onSwitchToLogin}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Inicia sesión
        </span>
      </p>
    </div>
  );
}

export default RegisterForm;
