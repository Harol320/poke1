import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura
import BotonMenu from '../componentes/BotonMenu';
function ListarChistes() {
  const [chistes, setChistes] = useState([]);

  useEffect(() => {
    const obtenerChistes = async () => {
      try {
        const q = query(collection(db, 'chistes'), orderBy('creado_en', 'desc'));
        const querySnapshot = await getDocs(q);
        const chistesArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChistes(chistesArray);
      } catch (error) {
        console.error('Error al obtener chistes:', error.message);
      }
    };

    obtenerChistes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chistes agregados</Text>
      {chistes.length === 0 ? (
        <Text style={styles.mensaje}>No hay chistes aún.</Text>
      ) : (
        chistes.map(chiste => (
          <View style={styles.chiste} key={chiste.id}>
            {chiste.imagen ? (
              <Image source={{ uri: chiste.imagen }} style={styles.imagen} />
            ) : (
              <Text>Imagen no disponible</Text>
            )}
            <Text style={styles.categoria}><strong>Categoría:</strong> {chiste.categoria}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mensaje: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  chiste: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  categoria: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default ListarChistes;