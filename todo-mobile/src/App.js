import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmDeleteAccount from './pages/ConfirmDeleteAccount';

const Stack = createStackNavigator(); // Creazione di uno stack navigator

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // Stato per tracciare se i caratteri sono caricati

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync(); // Impedire che la schermata iniziale si nasconda automaticamente
      await Font.loadAsync({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
      }); // Caricare i caratteri in modo asincrono
      setFontsLoaded(true); // Impostare fontsLoaded su true una volta che i caratteri sono caricati
      await SplashScreen.hideAsync(); // Nascondere la schermata iniziale
    }
    loadFonts(); // Chiamare la funzione loadFonts
  }, []); // L'array delle dipendenze vuoto significa che questo effetto viene eseguito una volta al montaggio

  if (!fontsLoaded) {
    return null; // Restituire null se i caratteri non sono ancora caricati
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> {/* La rotta iniziale è impostata su Login */}
        <Stack.Screen name="Login" component={Login} /> {/* Schermata di Login */}
        <Stack.Screen name="Register" component={Register} /> {/* Schermata di Registrazione */}
        <Stack.Screen name="Dashboard" component={Dashboard} /> {/* Schermata di Dashboard */}
        <Stack.Screen name="ConfirmDeleteAccount" component={ConfirmDeleteAccount} /> {/* Schermata di Conferma Eliminazione Account */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
