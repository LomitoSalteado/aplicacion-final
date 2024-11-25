// Importa las funciones necesarias de Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUZ2St4VXL_OIM5T0KajSq5fj5Orc54S4",
  authDomain: "proyectofinal-6e0a2.firebaseapp.com",
  projectId: "proyectofinal-6e0a2",
  storageBucket: "proyectofinal-6e0a2.firebasestorage.app",
  messagingSenderId: "1034737217658",
  appId: "1:1034737217658:web:e6d8e4964d13c691404bc3",
  measurementId: "G-1GY5E3KLZP"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios de Firebase
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore
const auth = getAuth(app);    // Firebase Authentication
const storage = getStorage(app); // Firebase Storage

// Exporta los servicios para usarlos en otros archivos
export { db, auth, storage };
