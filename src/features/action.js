import { filter_and_sorting_Types } from './../Reducers/filter_and_sorting_Reducer'
import { ProductList_Types } from './../Reducers/productList_Reducer'
import asyncFetch from './../connectivity/asyncFetch'
import { endpoints } from './../connectivity/endpoints'
import { Response } from './../utils/response'


let { PRODUCTLIST_REQUEST, PRODUTLIST_SUCCESS, PRODUCTLIST_FAILED } = ProductList_Types
let { FILTER_SORTING_SUCCESS, FILTER_SORTING_FAILED } = filter_and_sorting_Types
let { products } = endpoints
let { productList } = products

let getRequest={
    method: 'GET'
 }

export const getProductListAction=(sorting="", filterParam="")=>async(dispatch, getState)=>{
    try{
        let url = `${productList}?app=web&version=3.0.2&tag=loreal-paris&page=0:20${sorting}${filterParam}`;
        dispatch({type: PRODUCTLIST_REQUEST })
        let response = await asyncFetch(url, getRequest)
        let { message, data } = response;
        console.log("url and response :", url, response);
        if(message===Response.SUCCESSMESSAGE){
            dispatch({type:PRODUTLIST_SUCCESS, data: {productList:data.products} })
            if(data.aggregations.length>0){
                if(sorting==="" && filterParam===""){
                    dispatch({type:FILTER_SORTING_SUCCESS, data: {filterList:data.aggregations, sorting: data.sorts} })
                }
            }else dispatch({type:FILTER_SORTING_FAILED, error: "Filter Data not found" })
        }else dispatch({type:PRODUCTLIST_FAILED, error: message });
    }catch(e){
        dispatch({type:PRODUCTLIST_FAILED, error: error.message });
    }
}