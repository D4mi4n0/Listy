import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import sadGif from '../../assets/addio-amici.gif'; // Assicurati che il percorso sia corretto

// Componente principale per confermare l'eliminazione dell'account
const ConfirmDeleteAccount = ({ navigation }) => {
  // Stato per memorizzare il testo di conferma inserito dall'utente
  const [confirmationText, setConfirmationText] = useState('');

  // Funzione per gestire l'eliminazione dell'account
  const handleDeleteAccount = async () => {
    // Controlla se il testo di conferma corrisponde alla frase richiesta
    if (confirmationText === 'Non ho nulla da fare') {
      try {
        // Richiesta per eliminare l'account tramite l'API
        await api.delete('/auth/delete-account');
        // Rimuove il token di autenticazione dalla memoria locale
        await AsyncStorage.removeItem('token');
        // Mostra un messaggio di successo
        Alert.alert('✅ Account eliminato con successo');
        // Naviga alla schermata di registrazione
        navigation.navigate('Register');
      } catch (error) {
        // Mostra un messaggio di errore in caso di problemi
        Alert.alert('Errore nell\'eliminazione dell\'account', error.response ? error.response.data.message : error.message);
      }
    } else {
      // Mostra un messaggio di errore se il testo di conferma non è corretto
      Alert.alert('La frase di conferma non è corretta.');
    }
  };

  // Funzione per tornare alla dashboard
  const goBackToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={sadGif} style={styles.gif} />
        <View style={styles.separator} />
        <Text style={styles.title}>Noooo... Mi lasci così? :'(</Text>
        <Text style={styles.description}>
          Sob, sob... A quanto pare non eravamo fatti per stare insieme. Però se proprio devi... Per confermare la cancellazione del tuo account, scrivi la frase "Non ho nulla da fare" e clicca su "Elimina Account".
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Scrivi qui la frase di conferma"
          value={confirmationText}
          onChangeText={setConfirmationText}
          required
        />
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Elimina Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={goBackToDashboard}>
          <Text style={styles.buttonText}>Oppure torna alla Listy :D</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stili per il componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#28837a',
  },
  gif: {
    width: '100%',
    height: 150,
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: '100%',
    fontFamily: 'Montserrat_400Regular',
  },
  deleteButton: {
    width: '100%',
    backgroundColor: '#000',
    color: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    fontSize: 16,
    fontFamily: 'Montserrat_500Medium',
    alignItems: 'center',
  },
  backButton: {
    width: '100%',
    backgroundColor: '#28837a',
    color: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    fontSize: 16,
    fontFamily: 'Montserrat_500Medium',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium',
  },
});

export default ConfirmDeleteAccount;
