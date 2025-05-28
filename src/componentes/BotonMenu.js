import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BotonMenu() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Menu')}>
      <Text style={styles.texto}>Ir al menú</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  texto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BotonMenu;