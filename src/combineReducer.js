import { combineReducers } from 'redux'
import { productList_reducer, filter_and_sorting_Reducer } from './Reducers'

export default combineReducers({
    productList_reducer, 
    filter_and_sorting_Reducer
})