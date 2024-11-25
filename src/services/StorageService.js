import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Inicializa el servicio de almacenamiento
const storage = getStorage();

/**
 * Sube un archivo a Firebase Storage.
 * @param {File} archivo - El archivo que deseas subir.
 * @param {string} ruta - La ruta dentro del storage donde se guardará el archivo.
 * @returns {Promise<string>} - URL de descarga del archivo subido.
 */
export const subirArchivo = async (archivo, ruta) => {
  try {
    // Crea una referencia al archivo en el storage
    const referenciaArchivo = ref(storage, ruta);

    // Sube el archivo
    await uploadBytes(referenciaArchivo, archivo);

    // Obtén la URL de descarga
    const url = await getDownloadURL(referenciaArchivo);
    console.log("Archivo subido correctamente. URL:", url);

    return url;
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    throw error;
  }
};

/**
 * Obtiene la URL de un archivo almacenado en Firebase Storage.
 * @param {string} ruta - La ruta del archivo en el storage.
 * @returns {Promise<string>} - URL de descarga del archivo.
 */
export const obtenerURLArchivo = async (ruta) => {
  try {
    // Crea una referencia al archivo
    const referenciaArchivo = ref(storage, ruta);

    // Obtén la URL de descarga
    const url = await getDownloadURL(referenciaArchivo);
    return url;
  } catch (error) {
    console.error("Error al obtener la URL del archivo:", error);
    throw error;
  }
};
