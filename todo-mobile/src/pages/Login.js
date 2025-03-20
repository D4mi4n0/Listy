import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png'; // Assicurati che il percorso sia corretto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('❌ Errore nel login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>Accedi</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Non hai un account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Registrati</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#28837a',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  separator: {
    height: 20,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat_700Bold',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15, // Aggiungiamo margine tra gli elementi
    paddingLeft: 8,
    width: '100%',
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    width: '100%', // La lunghezza del pulsante è uguale a quella dei textfields
    backgroundColor: '#000',
    color: 'white',
    padding: 10,
    marginBottom: 15, // Aggiungiamo margine tra gli elementi
    borderRadius: 4,
    fontSize: 16,
    fontFamily: 'Montserrat_500Medium',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium', // Font Montserrat
  },
  linkText: {
    marginTop: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  link: {
    color: '#28837a',
    fontFamily: 'Montserrat_400Regular',
  },
});

export default Login;