/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './source/App';
import App from './source/components/Map/index'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
