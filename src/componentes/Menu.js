import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



export  function Menu() {
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Inicio', route: 'Inicio' },
    { name: 'Borrachos', route: 'Categoria', params: { tipo: 'borrachos' } },
    { name: 'Niños', route: 'Categoria', params: { tipo: 'ninos' } },
    { name: 'Animales', route: 'Categoria', params: { tipo: 'animales' } },
    { name: 'Tock', route: 'Categoria', params: { tipo: 'tock' } },
    { name: 'Favoritos', route: 'Favoritos' },
    { name: 'Agregar', route: 'AgregarChiste' },
    { name: 'Perfil', route: 'Usuario' },
    { name: 'Login', route: 'Login' },
    { name: 'Registro', route: 'Registro' },
    { name: 'Listar Chistes', route: 'ListarChistes' },
    { name: 'Ir al menú', route: 'Menu' }
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(item.route, item.params)}
        >
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Menu;