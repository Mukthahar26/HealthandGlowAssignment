export const filter_and_sorting_Types={
    FILTER_SORTING_SUCCESS: "FILTER_SORTING_SUCCESS",
    FILTER_SORTING_FAILED: "FILTER_SORTING_FAILED"
}

const initial ={
    data:[],
    error: null
}

export default filter_and_sorting_Reducer=(state=initial, action)=>{
    switch(action.type){
        case filter_and_sorting_Types.FILTER_SORTING_SUCCESS:
            return{
                data: {...state.data, ...action.data},
                error: null
            }
        case filter_and_sorting_Types.FILTER_SORTING_SUCCESS:
            return{
                data: {...state.data},
                error: action.error
            }
        default:
            return state;
    }

}