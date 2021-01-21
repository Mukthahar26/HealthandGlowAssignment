import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductListAction } from './../action'
import { Error, Loader } from './../../components'
import { Card, Sorting, Filtering } from './../components'
import { Icon } from 'native-base';
import { colors } from './../../utils/colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


export class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            twoColumns: true,
            sortingVisible: false,
            filterVisible: false,
            sortParam: "",
            filterParam: "",
            filterSelectionArray: {},
            sortText: ""
        }
    }

    componentDidMount(){
       this.props.getProductListAction();
    }

    sorting=(sortText, sortParam)=>{
        let { filterParam } = this.state;
        this.setState({ sortParam, sortText })
        this.props.getProductListAction(sortParam, filterParam);
    }
    filtering=(filterSelectionArray)=>{
        let { sortParam } = this.state;
        let filterParam ="";
        this.setState({ filterSelectionArray })
        Object.keys(filterSelectionArray).map((item, index)=>{
            if(filterSelectionArray[item].length>0){
                filterParam+="&";
                filterParam = `${filterParam}${item}=${filterSelectionArray[item].join()}`
            }
        })
        this.setState({ filterParam, filterSelectionArray })
        this.props.getProductListAction(sortParam, filterParam);
    }
    render() {
        let { loading, error, productList } = this.props;
        let { twoColumns, sortingVisible, filterVisible, filterSelectionArray, sortText } = this.state;
        return (
            <View style={styles.container}>
                <Sorting visible={sortingVisible} sortText={sortText} close={()=> this.setState({ sortingVisible : false })} selected={(sortText, sortParam)=> this.sorting(sortText,sortParam)} />
                { filterVisible ? <Filtering data={filterSelectionArray} visible={filterVisible} close={()=> this.setState({ filterVisible : false })} selected={(data)=> this.filtering(data)} /> : null}
                {error ? <Error message={error} /> : null}
                <Text style={styles.productTitle}>L'Oreal Paris <Text style={{color:'silver'}}>- {productList.length} products</Text></Text>
                <View style={styles.filterContainer}>
                    <TouchableOpacity onPress={()=> this.setState({ twoColumns : !twoColumns })} style={styles.noofRowsbtn}>
                        <Icon style={styles.noofRows} type="MaterialCommunityIcons" name="view-agenda-outline" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({ sortingVisible: true })} style={styles.filter}>
                        <Text style={styles.filterText}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {
                        if(loading) ToastAndroid.show("Please Wait while loading", ToastAndroid.LONG)
                        else this.setState({ filterVisible: true })
                        }} style={styles.filter}>
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productListContainer}>
                {
                    loading ? <Loader /> 
                    : productList.length>0 ? twoColumns ? <FlatList
                    key={2}
                    numColumns={2}
                    //columnWrapperStyle={styles.row}
                    data={productList}
                    renderItem={({item, index})=> <View style={styles.row}>
                        <Card index={index} item={item} />
                        <View style={styles.borderLine}></View>
                    </View>}
                    keyExtractor={item=> item.skuId }
                /> : <FlatList
                key={1}
                data={productList}
                renderItem={({item, index})=> <>
                <Card index={index} item={item} />
                <View style={{...styles.borderLine, width: '95%'}}></View>
                </>}
                keyExtractor={item=> item.skuId }
            /> :<View style={styles.empty}><Text style={styles.emptymessage}>Selected products not available</Text></View>
                }
                </View>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    productTitle:{
        textAlign: 'center',
        paddingTop: hp(1.5),
        backgroundColor:'white',
        fontSize:wp(3.5)
    },
    borderLine:{
        borderWidth:0.6,
        borderColor:'#e5e5e5',
        width: '85%',
        alignSelf:'center'
    },
    filterText:{
        color: 'grey',
        fontSize: wp(3)
    },
    filterContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        paddingBottom: hp(2),
        borderBottomColor: colors.SILVER,
        borderBottomWidth:1,
        backgroundColor:'white'
    },
    noofRowsbtn:{
        marginTop: hp(2),
        marginRight:wp(2),
        borderWidth:1,
        borderColor: 'silver',
        justifyContent:'center',
        paddingLeft:wp(2),
        paddingRight:wp(2)
    },
    noofRows:{
        fontSize:wp(4),
        color: 'silver'
    },
    filter:{
        marginTop: hp(2),
        marginRight:wp(2),
        padding: wp(1.3),
        paddingLeft:wp(10),
        paddingRight:wp(10),
        borderWidth:1,
        borderColor: 'silver'
    },
    empty:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    emptymessage:{
        color: 'grey',
        fontSize:wp(3)
    },
    productListContainer:{
        flex:1,
        //marginTop:hp(1)
    },
    row: {
        flex: 1,
        justifyContent: "space-around",
    }
})


const mapStateToProps=({ productList_reducer, filter_and_sorting_Reducer })=>{
    let { data={}, error=null, loading } = productList_reducer
    let { data: {filterList=[]} } = filter_and_sorting_Reducer
    let { productList=[] } = data;
    return { productList, error, loading, filterList }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({ getProductListAction }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
