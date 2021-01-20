import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import homeNavigator from './homeNavigator'


const Drawer = createDrawerNavigator();


export default class drawerNavigation extends React.Component {
    constructor(props){
        super(props);
        
    }
  render(){
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={homeNavigator} />
        </Drawer.Navigator>
      );
  }
}