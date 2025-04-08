import React, { useEffect, useState } from 'react'; // Importing necessary modules from React
import { NavigationContainer } from '@react-navigation/native'; // Importing NavigationContainer from react-navigation
import { createStackNavigator } from '@react-navigation/stack'; // Importing createStackNavigator to create stack navigation
import * as Font from 'expo-font'; // Importing Font module from expo
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat'; // Importing specific font styles from expo-google-fonts
import * as SplashScreen from 'expo-splash-screen'; // Importing SplashScreen module from expo
import Dashboard from './pages/Dashboard'; // Importing Dashboard component
import Login from './pages/Login'; // Importing Login component
import Register from './pages/Register'; // Importing Register component
import ConfirmDeleteAccount from './pages/ConfirmDeleteAccount'; // Importing ConfirmDeleteAccount component

const Stack = createStackNavigator(); // Creating a stack navigator

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to track if fonts are loaded

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding
      await Font.loadAsync({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
      }); // Load fonts asynchronously
      setFontsLoaded(true); // Set fontsLoaded to true once fonts are loaded
      await SplashScreen.hideAsync(); // Hide the splash screen
    }
    loadFonts(); // Call the loadFonts function
  }, []); // Empty dependency array means this effect runs once on mount

  if (!fontsLoaded) {
    return null; // Return null if fonts are not loaded yet
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> {/* Initial route is set to Login */}
        <Stack.Screen name="Login" component={Login} /> {/* Login screen */}
        <Stack.Screen name="Register" component={Register} /> {/* Register screen */}
        <Stack.Screen name="Dashboard" component={Dashboard} /> {/* Dashboard screen */}
        <Stack.Screen name="ConfirmDeleteAccount" component={ConfirmDeleteAccount} /> {/* ConfirmDeleteAccount screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
