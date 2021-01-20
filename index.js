/**
 * @format
 */

import 'react-native-gesture-handler';
import React,{ Component } from 'react'
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

export default class Root extends Component {
    render() {
        return(
            <App />
        )
    }
}


AppRegistry.registerComponent(appName, () => Root);
