// Importar las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyV40WQGRYFaT8NcLsPjwhxGOUopSzcjI",
  authDomain: "joke1-e6f49.firebaseapp.com",
  projectId: "joke1-e6f49",
  storageBucket: "joke1-e6f49.appspot.com",  // Corregido el dominio del storage
  messagingSenderId: "115604366967",
  appId: "1:115604366967:web:4a73beb0f930546d8a8872"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exportar módulos para usarlos en otros archivos
export { auth, db, storage };