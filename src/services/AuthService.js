import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Inicializar el servicio de autenticación
const auth = getAuth();

/**
 * Función para registrar un nuevo usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise} - Resolución del registro o error.
 */
export const registrarUsuario = async (email, password) => {
  try {
    const resultado = await createUserWithEmailAndPassword(auth, email, password);
    return resultado.user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

/**
 * Función para iniciar sesión con correo y contraseña.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise} - Resolución del inicio de sesión o error.
 */
export const iniciarSesion = async (email, password) => {
  try {
    const resultado = await signInWithEmailAndPassword(auth, email, password);
    return resultado.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

/**
 * Función para cerrar sesión.
 * @returns {Promise} - Resolución del cierre de sesión o error.
 */
export const cerrarSesion = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada correctamente.");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};
