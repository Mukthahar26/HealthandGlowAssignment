import React, { Component } from 'react'
import combineReducers from './combineReducer';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import drawerNavigation from './navigators/drawerNavigation'
import thunk from 'redux-thunk'

const RootStack = createStackNavigator();


export class App extends Component {

    render() {
        return (
            <Provider store={createStore(combineReducers, applyMiddleware(thunk))}>
                <NavigationContainer>
                  <RootStack.Navigator headerMode="none">
                    <RootStack.Screen name="home" component={drawerNavigation} />
                  </RootStack.Navigator>
                </NavigationContainer>        
            </Provider>
        )
    }
}

export default App
