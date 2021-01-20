import React, { Component } from 'react'
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export class Sorting extends Component {
    render() {
        let { visible, close, sortingList=[], selected, sortText } = this.props;
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              close();
            }}
          >
              <View style={styles.container}>
                <View style={styles.subContainer}>
                    {
                        sortingList.map((item, index)=>{
                            let sortParam = `&sort=${item.key}:${item.order}`
                            return(
                                <TouchableOpacity onPress={()=>{ close(); selected(item.text, sortParam); }} style={styles.sortList}>
                                    <Text style={{...styles.item, fontWeight: sortText===item.text ? 'bold' : '500'}}>{item.text}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity activeOpacity={0.8} onPress={()=> close()} style={{...styles.sortList, backgroundColor:'#e6e6e6'}}>
                        <Text style={styles.item}>Close</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </Modal>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-end',
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    subContainer:{
        backgroundColor:'white'
    },
    sortList:{
        backgroundColor:'white',
        padding: wp(2.5),
        alignItems:'center'
    },
    item:{
        fontSize: wp(3),
        color: 'black'
    }
});

const mapStateToProps=({ filter_and_sorting_Reducer })=>{
    let { data: {sorting=[]} } = filter_and_sorting_Reducer
    let sortingList = []
    sorting.map((item, index)=>{
        item.orders.length>1 ? item.orders.map((sub)=>{
            sortingList.push(sub)
        }) : sortingList.push(...item.orders)
    })
    return { sortingList }
}
export default connect(mapStateToProps)(Sorting)
