import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';
import App from './src/App';

// Abilita l'uso delle schermate native per migliorare le prestazioni
enableScreens();

// Registra il componente principale dell'app in modo che venga eseguito quando l'app si avvia
registerRootComponent(App);
