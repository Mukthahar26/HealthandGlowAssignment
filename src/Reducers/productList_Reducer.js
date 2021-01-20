export const ProductList_Types={
    PRODUCTLIST_REQUEST: "PRODUCTLIST_REQUEST",
    PRODUTLIST_SUCCESS: "PRODUTLIST_SUCCESS",
    PRODUCTLIST_FAILED: "PRODUCTLIST_FAILED",
    PRODUCTlIST_STOPLOAD: "PRODUCTlIST_STOPLOAD"
}




const initial ={
    loading: false,
    data:[],
    error: null
}


export default productList_reducer=(state=initial, action)=>{

    switch(action.type){
        case ProductList_Types.PRODUCTLIST_REQUEST:
            console.log("ddddddddddddddddddddddd")
            return{
                loading: true,
                data: {...state.data},
                error: null
            }
        case ProductList_Types.PRODUTLIST_SUCCESS:
            return{
                loading: false,
                data: {...state.data, ...action.data},
                error: null
            }
        case ProductList_Types.PRODUCTLIST_FAILED:
            return{
                loading: false,
                data: {...state.data},
                error: action.error
            }
        case ProductList_Types.PRODUCTlIST_STOPLOAD:
            return{
                loading: false,
                data: {...state.data},
                error: null
        }
        default:
            return state;
    }

}