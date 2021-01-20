import { Icon } from 'native-base';
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from './../../../utils/colors'


export class Card extends Component {
    render() {
        let { item={}, index } = this.props;
        let { skuImageUrl, inWishList, skuDiscPercentage, skuName, defaultPrice, listPrice, skuAverageRating } = item
        console.log("dfffffffffffffffff :", index%2)
        let style= (index%2)===0 ? { borderRightWidth: 1, borderRightColor: '#e5e5e5' }: { backgroundColor: 'white' }
        return (
            <View style={{flex:1, marginBottom:'8%', marginTop:'8%', ...style}}>
                <TouchableOpacity activeOpacity={0.8} style={{...styles.container }}>
                <View style={styles.offerFavorite}>
                {skuDiscPercentage ? <Text style={styles.offer}>{skuDiscPercentage}% OFF</Text> : null}
                <View style={{flex:50, alignItems:'flex-end'}}>
                    {inWishList ? <Icon style={styles.fav} type="AntDesign" name="heart" />
                    : <Icon style={styles.fav} type="AntDesign" name="hearto" />}
                </View>
                </View>
                <View style={styles.product}>
                    <Image
                        style={styles.image}
                        source={{uri: skuImageUrl }}
                        resizeMode='contain'
                    />
                    <Text style={styles.productName}>{skuName}</Text>
                </View>
                <View style={styles.bottom}>
                <View style={styles.priceContainer}>
                    <Text style={{...styles.price, color:colors.RED, marginRight:wp(2)}}>₹ {listPrice}</Text>
                    {defaultPrice==listPrice ? <Text style={{...styles.price, textDecorationLine: 'line-through', color:'grey'}}>₹ {defaultPrice}</Text> : null}
                </View>
                {skuAverageRating ? <View style={styles.rating}>
                    <Icon style={styles.star} type="Entypo" name="star" />
                    <Text style={styles.star}>{skuAverageRating}</Text>
                </View> : null}
                </View>
            </TouchableOpacity>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        padding: wp(3),
        paddingTop:0,
        paddingBottom:0,
        backgroundColor:'white'
    },
    image:{
        width: wp(30),
        height: wp(30),
    },
    offerFavorite:{
        flexDirection:'row',
        marginBottom:hp(2)
    },
    offer:{
        backgroundColor:colors.RED,
        fontSize:wp(3),
        padding: wp(0.5),
        paddingLeft: wp(1.5),
        paddingRight: wp(1.5),
        color:'white'
    },
    fav:{
        color: colors.RED,
        fontSize: wp(5)
    },
    product:{
        flex:1,
        alignItems:'center'
    },
    productName:{
        fontSize:wp(3),
        color: 'black',
        marginTop: hp(0.5)
    },
    priceContainer:{
        flexDirection:'row',
        marginTop:hp(0.8),
        alignSelf:'auto'
    },
    price:{
        fontSize: wp(3)
    },
    bottom:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rating:{
        flexDirection:'row',
        alignItems:'center'
    },
    star:{
        fontSize: wp(3.5),
        color: 'orange'
    }
});


export default Card
