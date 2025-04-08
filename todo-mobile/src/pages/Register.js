import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png'; // Assicurati che il percorso sia corretto

const Register = () => {
  const [name, setName] = useState(''); // Stato per il nome
  const [email, setEmail] = useState(''); // Stato per l'email
  const [password, setPassword] = useState(''); // Stato per la password
  const navigation = useNavigation(); // Hook per la navigazione

  const handleRegister = async () => {
    try {
      // Effettua una chiamata API per registrare un nuovo utente
      await api.post('/auth/register', { name, email, password });
      alert('✅ Registrazione avvenuta con successo');
      navigation.navigate('Login'); // Naviga alla pagina di login
    } catch (error) {
      console.error('Register error:', error.response ? error.response.data : error.message);
      alert('❌ Errore nella registrazione');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} /> {/* Mostra il logo */}
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>Registrati</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrati</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Hai già un account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Accedi</Text>
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

export default Register;
