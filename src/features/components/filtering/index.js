import React, { Component } from 'react'
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors } from './../../../utils/colors'



export class Filtering extends Component {

    constructor(props){
        super(props);
        this.state={
            buckets:[],
            currentSelectedItem:null,
            data:{},
            isMultiSelected: false
        }
    }

    componentDidMount(){
        let { filterList, data } = this.props;
        if(filterList.length>0){
            this.setState({
                buckets: filterList[0].buckets,
                currentSelectedItem: filterList[0].name,
                isMultiSelected: filterList[0].isForMultiSelection,
                data: {...data}
            })
        }
    }

    checkandInsert=(subItem)=>{
        let { data, currentSelectedItem, isMultiSelected } = this.state;
        if(data.hasOwnProperty(currentSelectedItem)){
            console.log("step 1")
            let index =data[currentSelectedItem].indexOf(subItem)
            console.log("step 2", index)
            if(index!==-1){
                data[currentSelectedItem].splice(index,1)
                console.log("step 2", data)
                this.setState({ data })
            }else{
                if(!isMultiSelected){
                    data[currentSelectedItem].splice(0,1)
                    let arr = this.state.data[currentSelectedItem]
                    arr = [...arr, subItem]
                    console.log("step 4", arr)
                    data[currentSelectedItem]= arr;
                    this.setState({ data })
                }else{
                    console.log("step 3", this.state.data[currentSelectedItem])
                    let arr = this.state.data[currentSelectedItem]
                    arr = [...arr, subItem]
                    console.log("step 4", arr)
                    data[currentSelectedItem]= arr;
                    this.setState({ data })
                }
            }
        }else{
            let arr = []
            arr.push(subItem);
            data[currentSelectedItem]= arr
            console.log("step 2", data, arr)
            this.setState({ data })
        }
    }
    

    render() {
        let { visible, close, filterList=[], selected } = this.props;
        let { buckets, currentSelectedItem, data, isMultiSelected } = this.state;
        console.log("uuuuuuuuuuuuuuuu :", data);
        return (
            <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
              close();
            }}
          >
              <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> close()}>
                        <Icon style={{color: colors.ORANGE, fontSize: wp(7)}} type="Entypo" name="cross" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{fontSize:wp(3.5)}}>Filter By</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({ data:{}})}>
                        <Text style={{fontSize:wp(3.5), color:colors.ORANGE}}>Clear All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.filterContainer}>
                    <View style={styles.col1}>
                        <FlatList
                            data={filterList}
                            renderItem={({item})=>{
                                console.log("eeeeeeeeeeeeeeeee :", item)
                                return(
                                    <TouchableOpacity onPress={()=> this.setState({ buckets: item.buckets, isMultiSelected: item.isForMultiSelection, currentSelectedItem: item.name })} style={{...styles.items, backgroundColor: currentSelectedItem===item.name ? colors.SILVER : 'white'}}>
                                        <Text style={styles.item}>{item.text}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={item=> item.text}
                        />
                    </View>
                    <View style={styles.col2}>
                        <FlatList
                            data={buckets}
                            renderItem={({item})=>{
                                let check =  data[currentSelectedItem] && data[currentSelectedItem].indexOf(item.key)!==-1 ? true : false
                                return(
                                    <TouchableOpacity onPress={()=> this.checkandInsert(item.key)} style={{...styles.subItems}}>
                                        <Text style={styles.item}>{item.text}({item.docCount})</Text>
                                        { check ? <Icon style={{...styles.check,color: colors.ORANGE}} type="AntDesign" name="checkcircle" /> : <Icon style={{...styles.check,color: colors.SILVER}} type="AntDesign" name="checkcircle" />}
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={item=> item.key}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{
                    close();
                    selected(data);
                }} style={styles.apply}>
                    <Text style={{color:'white', fontSize:wp(3.5)}}>Apply</Text>
                </TouchableOpacity>
              </View>
          </Modal>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        elevation: 10,
        padding: wp(0.5),
        paddingTop: hp(1),
        paddingBottom: hp(1),
        alignItems:'center'
    },
    filterContainer:{
        flex:1,
        flexDirection:'row'
    },
    col1:{
        flex:30,
        backgroundColor: 'white',
    },
    col2:{
        flex:70,
        borderLeftWidth:1.5,
        borderLeftColor:colors.SILVER,
        backgroundColor: 'white'
    },
    items:{
        padding: wp(2.5),
        backgroundColor:'white'
    },
    subItems:{
        padding: wp(2.5),
        backgroundColor:'white',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems: 'center'
    },
    item:{
        fontSize: wp(3)
    },
    check:{
        fontSize: wp(3.5)
    },
    apply:{
        backgroundColor: colors.ORANGE,
        padding: wp(3),
        justifyContent:'center',
        alignItems:'center'
    }
});

const mapStateToProps=({ filter_and_sorting_Reducer })=>{
    let { data: {filterList=[]} } = filter_and_sorting_Reducer
    return { filterList }
}
export default connect(mapStateToProps)(Filtering)
