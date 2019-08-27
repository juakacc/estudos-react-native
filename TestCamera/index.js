/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppC from './AppC'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppC);
