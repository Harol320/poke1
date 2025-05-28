import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura

function AgregarChiste() {
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!imagen || !categoria) {
      alert('Completa todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'chistes'), {
        imagen,
        categoria,
        creado_en: serverTimestamp() // Ahora guardamos un timestamp válido para ordenación
      });

      setMensaje('✅ Chiste agregado');
      setImagen('');
      setCategoria('');
    } catch (error) {
      console.error('Error al agregar chiste:', error.message);
      setMensaje('Error al agregar chiste');
    }
  };

  return (
    <form style={{ padding: 20 }} onSubmit={manejarEnvio}>
      <h3>Agregar nuevo chiste</h3>
      <input
        type="url"
        placeholder="URL de imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="">Selecciona una categoría</option>
        <option value="borrachos">Borrachos</option>
        <option value="ninos">Niños</option>
        <option value="animales">Animales</option>
        <option value="otros">Otros</option>
      </select>
      <button type="submit">Agregar chiste</button>
      {mensaje && <p style={{ color: 'green', marginTop: '10px' }}>{mensaje}</p>}
    </form>
  );
}

export default AgregarChiste;