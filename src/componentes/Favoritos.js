import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';


function Favoritos({ favoritos }) {
  return (
    <ScrollView contentContainerStyle={styles.lista}>
      {favoritos.length === 0 ? (
        <Text style={styles.mensaje}>No hay favoritos aún.</Text>
      ) : (
        favoritos.map(chiste => (
          <View style={styles.chiste} key={chiste.id}>
            <Image source={{ uri: chiste.imagen }} style={styles.imagen} />
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 20,
    alignItems: 'center',
  },
  mensaje: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  chiste: {
    marginBottom: 20,
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Favoritos;