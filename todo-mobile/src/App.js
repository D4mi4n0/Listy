import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import jwtDecode from 'jwt-decode';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Per gestire il token
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmDeleteAccount from './pages/ConfirmDeleteAccount';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Login");

  // Caricamento dei font e verifica del token
  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // Mostra la schermata di splash
        await SplashScreen.preventAutoHideAsync();

        // Carica i font
        await Font.loadAsync({
          Montserrat_400Regular,
          Montserrat_500Medium,
          Montserrat_700Bold,
        });

        // Verifica il token per determinare la schermata iniziale
        const token = await AsyncStorage.getItem('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) {
              setInitialRoute("Dashboard"); // Imposta la dashboard come schermata iniziale se il token è valido
            } else {
              await AsyncStorage.removeItem('token'); // Rimuovi il token scaduto
            }
          } catch {
            await AsyncStorage.removeItem('token'); // Rimuovi il token non valido
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Nascondi la schermata di splash
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndData();
  }, []);

  // Mostra uno stato vuoto finché i font non sono caricati
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {/* Schermata di login */}
        <Stack.Screen name="Login" component={Login} />
        
        {/* Schermata di registrazione */}
        <Stack.Screen name="Register" component={Register} />
        
        {/* Schermata della dashboard */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        
        {/* Schermata di conferma eliminazione account */}
        <Stack.Screen name="ConfirmDeleteAccount" component={ConfirmDeleteAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}