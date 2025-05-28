import 'react-native-gesture-handler'; // Debe ir primero
import { enableScreens } from 'react-native-screens';
enableScreens();

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Categoria from './src/componentes/Categoria';
import Favoritos from './src/componentes/Favoritos';
import Menu from './src/componentes/Menu';
import Listar from './src/componentes/Listar';
import AgregarChiste from './src/componentes/AgregarChiste';
import Inicio from './src/componentes/Inicio';
import Registro from './src/componentes/Registro';
import Login from './src/componentes/Login';
import Usuario from './src/componentes/Usuario';
import ListarChistes from './src/componentes/ListarChistes';

// 👉 FALTABA ESTA LÍNEA
const Stack = createStackNavigator();

export default function App() {
  const [favoritos, setFavoritos] = useState([]);
  const [chistes, setChistes] = useState([]);

  const agregarAFavoritos = (chiste) => {
    if (!favoritos.find(f => f.id === chiste.id)) {
      setFavoritos([...favoritos, chiste]);
    }
  };

  const agregarChiste = (nuevo) => {
    setChistes(prev => [...prev, nuevo]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Categoria">
          {() => <Categoria chistes={chistes} onFavorito={agregarAFavoritos} />}
        </Stack.Screen>
        <Stack.Screen name="Favoritos">
          {() => <Favoritos favoritos={favoritos} />}
        </Stack.Screen>
        <Stack.Screen name="Listar">
          {() => <Listar chistes={chistes} />}
        </Stack.Screen>
        <Stack.Screen name="AgregarChiste">
          {() => <AgregarChiste onAgregar={AgregarChiste} />}
        </Stack.Screen>
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Usuario" component={Usuario} />
        <Stack.Screen name="ListarChistes" component={ListarChistes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
