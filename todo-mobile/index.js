import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';
import App from './src/App';

enableScreens();

registerRootComponent(App);