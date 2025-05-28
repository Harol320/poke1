import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BotonMenu from '../componentes/BotonMenu'; // 📌 Importa el botón

function Categoria({ onFavorito }) {
  const route = useRoute();
  const { tipo } = route.params; // Obteniendo el parámetro desde la navegación

  const chistes = [
    { id: 1, categoria: 'borrachos', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2QM6BZWMvwkfWzWxSCjQP-q1x6Y6o4L4Xg&s' },
    { id: 2, categoria: 'borrachos', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOu1osGvFlWmBdXEQKeHRKQfKI01c09EZiOA&s' },
    { id: 3, categoria: 'borrachos', imagen: 'https://cdn.slidesharecdn.com/ss_thumbnails/areir219-thumbnail.jpg?width=560&fit=bounds' },
    { id: 4, categoria: 'borrachos', imagen: 'https://i.pinimg.com/736x/d8/43/d1/d843d13eedd98d9ff5ca205b7d88a1f8.jpg' },
    { id: 5, categoria: 'ninos', imagen: 'https://i.pinimg.com/originals/bf/56/5a/bf565a9bf735acf7a5580ea59ce36054.jpg' },
    { id: 6, categoria: 'ninos', imagen: 'https://i0.wp.com/docentesaldia.com/wp-content/uploads/2022/10/chistes-cortos-para-ninos-5.png?fit=960%2C960&ssl=1' },
    { id: 7, categoria: 'animales', imagen: 'https://cdn.babysits.com/content/community/community-resources/co/panda.jpg' },
    { id: 8, categoria: 'animales', imagen: 'https://cdn.babysits.com/content/community/community-resources/co/apollo.jpg' },
  ];

  const filtrados = chistes.filter(c => c.categoria === tipo);

  return (
    <ScrollView style={styles.lista}>
      <BotonMenu /> {BotonMenu}
      {filtrados.map(chiste => (
        <View style={styles.chiste} key={chiste.id}>
          {chiste.imagen ? (
            <Image source={{ uri: chiste.imagen }} style={styles.imagen} />
          ) : (
            <Text>Imagen no disponible</Text>
          )}
          <Button title="Agregar a Favoritos" onPress={() => onFavorito(chiste)} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 20,
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
});

export default Categoria;