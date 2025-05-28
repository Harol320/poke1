import React, { useState } from 'react';
import { View, Text, Button, Modal, ScrollView, Image, StyleSheet } from 'react-native';
import Registro from '../componentes/Registro';
import Login from '../componentes/Login';

const Inicio = () => {
  const [mostrarModal, setMostrarModal] = useState(null); // 'login' o 'registro'

  const chistesDestacados = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2QM6BZWMvwkfWzWxSCjQP-q1x6Y6o4L4Xg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOu1osGvFlWmBdXEQKeHRKQfKI01c09EZiOA&s",
    "https://cdn.slidesharecdn.com/ss_thumbnails/areir219-thumbnail.jpg?width=560&fit=bounds",
    "https://i.pinimg.com/736x/d8/43/d1/d843d13eedd98d9ff5ca205b7d88a1f8.jpg",
    "https://i.pinimg.com/originals/bf/56/5a/bf565a9bf735acf7a5580ea59ce36054.jpg",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <Button title="Iniciar sesión" onPress={() => setMostrarModal('Login')} />
      <Button title="Registrarse" onPress={() => setMostrarModal('Registro')} />

      <Modal visible={!!mostrarModal} transparent animationType="slide">
        <View style={styles.modal}>
          <Button title="Cerrar" onPress={() => setMostrarModal(null)} />
          {mostrarModal === 'login' ? <Login onSuccess={() => setMostrarModal(null)} /> : <Registro onSuccess={() => setMostrarModal(null)} />}
        </View>
      </Modal>

      <Text style={styles.subtitle}>Chistes destacados:</Text>
      <ScrollView contentContainerStyle={styles.chistesContainer}>
        {chistesDestacados.map((imagen, index) => (
          <Image key={index} source={{ uri: imagen }} style={styles.imagen} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  chistesContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  imagen: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Inicio;