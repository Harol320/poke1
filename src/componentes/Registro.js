import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; // Ajusta la ruta según tu configuración
import { useNavigation } from '@react-navigation/native';


const Registro = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const [mensaje, setMensaje] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();

  const handleChange = (key, value) => {
    setFormulario(prev => ({ ...prev, [key]: value }));
  };

  const handleRegistro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formulario.correo, formulario.password);
      const uid = userCredential.user.uid;

      await addDoc(collection(db, 'usuarios'), {
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        rol: 'usuario',
      });

      setMensaje('✅ Usuario registrado correctamente');
      setFormulario({
        nombre: '',
        correo: '',
        password: '',
        fechaNacimiento: '',
        telefono: '',
      });

      // Redirigir después de 2 segundos (opcional)
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      setMensaje(`❌ Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formulario.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={formulario.correo}
        onChangeText={(text) => handleChange('correo', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={formulario.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={formulario.fechaNacimiento}
        onChangeText={(text) => handleChange('fechaNacimiento', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={formulario.telefono}
        onChangeText={(text) => handleChange('telefono', text)}
        keyboardType="phone-pad"
      />
      <Button title="Registrarse" onPress={handleRegistro} />
      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}
      <Text style={styles.loginText}>¿Ya tienes cuenta?</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
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
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
  },
  mensaje: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
});

export default Registro;
