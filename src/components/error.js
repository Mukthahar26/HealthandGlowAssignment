import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from './../utils/colors'
export const Error=({message})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.error}>{message}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor:colors.RED,
        padding: wp(0.6)
    },
    error:{
        color: 'white',
        textAlign:'center',
        fontSize: wp(3)
    }
});


export default Error;