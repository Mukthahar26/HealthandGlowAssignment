import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from './../utils/colors'


const Loader = props => {
  const { loading } = props;
return (
        <View style={styles.contaier}>
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} animating={loading} color={colors.ORANGE} />
          </View>
        </View>
  )
}
const styles = StyleSheet.create({
  contaier:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  loading:{
    padding: wp(1),
    backgroundColor:'white',
    elevation:10
  }
});
export default Loader;