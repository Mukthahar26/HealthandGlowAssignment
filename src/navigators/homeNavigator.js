import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../features/home'
import { Icon } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HomeStack = createStackNavigator();


export class homeNavigator extends Component {

    header=()=>{
        return {
            header: () => {
              return<View style={styles.container}>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
              <TouchableOpacity style={styles.headerBtn}>
                  <Icon type="Entypo" name="menu" />
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.headerBtn, paddingLeft: wp(2)}}>
              <Image resizeMode="contain" style={{width:130 }} source={require("./../assets/home.png")} />
              </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row'}}>
                <Icon style={{marginRight: wp(4)}} type="EvilIcons" name="search" />
                <Icon type="EvilIcons" name="bell" />
              </View>
          </View>
            }
        }
    }
    render() {
        return(
            <HomeStack.Navigator>
                <HomeStack.Screen options={this.header} name="home" component={Home} />
            </HomeStack.Navigator>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        height: hp(7),
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        padding: wp(1.5),
        
    },
    headerBtn:{

    }
})



export default homeNavigator
