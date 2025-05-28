import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ScrollView, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc, addDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura
import { useNavigation } from '@react-navigation/native';

export  function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    fecha_nacimiento: '',
    telefono: '',
    rol: '',
  });
  const [nuevaUrl, setNuevaUrl] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    async function fetchUsuario() {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'Usuario', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsuario(docSnap.data());
          setForm(docSnap.data());
          fetchImagenes(user.uid);
        }
      }
    }
    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const q = query(collection(db, 'multimedia'), where('usuarioid', '==', usuarioid));
    const querySnapshot = await getDocs(q);
    setImagenes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      const docRef = doc(db, 'usuarios', user.uid);
      await updateDoc(docRef, form);
      Alert.alert('Éxito', 'Datos actualizados');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  const handleAgregarUrl = async () => {
    try {
      if (!nuevaUrl.trim()) return;
      const user = auth.currentUser;
      await addDoc(collection(db, 'multimedia'), { url: nuevaUrl, usuarioid: user.uid });
      setNuevaUrl('');
      fetchImagenes(user.uid);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar la imagen');
    }
  };

  const handleEliminarImagen = async (id) => {
    try {
      await deleteDoc(doc(db, 'multimedia', id));
      setImagenes(imagenes.filter(img => img.id !== id));
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la imagen');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };

  if (!usuario) return <Text>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={form.nombre} onChangeText={(text) => handleChange('nombre', text)} />
      <TextInput style={styles.input} placeholder="Correo" value={form.correo} onChangeText={(text) => handleChange('correo', text)} />
      <TextInput style={styles.input} placeholder="Fecha de nacimiento (YYYY-MM-DD)" value={form.fecha_nacimiento} onChangeText={(text) => handleChange('fecha_nacimiento', text)} />
      <TextInput style={styles.input} placeholder="Teléfono" value={form.telefono} onChangeText={(text) => handleChange('telefono', text)} />
      <TextInput style={styles.input} placeholder="Rol" value={form.rol} onChangeText={(text) => handleChange('rol', text)} />
      <Button title="Guardar cambios" onPress={handleUpdate} />

      <Text style={styles.title}>Agregar imagen</Text>
      <TextInput style={styles.input} placeholder="URL de la imagen" value={nuevaUrl} onChangeText={setNuevaUrl} />
      <Button title="Agregar" onPress={handleAgregarUrl} />

      <Text style={styles.title}>Imágenes guardadas</Text>
      {imagenes.map(img => (
        <View key={img.id} style={styles.imageContainer}>
          <Image source={{ uri: img.url }} style={styles.image} />
          <Button title="Eliminar" onPress={() => handleEliminarImagen(img.id)} />
        </View>
      ))}

      <Text style={styles.title}>Cerrar sesión</Text>
      <Button title="Salir" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  imageContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default Usuario;