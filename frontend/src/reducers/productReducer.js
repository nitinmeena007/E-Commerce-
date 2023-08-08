import { createReducer } from '@reduxjs/toolkit';
import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS 
} from '../constants/productConstants';

let initialState = {};

export const productReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(ALL_PRODUCT_REQUEST,(state = {products:[]},action)=>{
            return {
                loading:true,
                products:[]
            }
        })
        .addCase(ALL_PRODUCT_SUCCESS,(state = {products:[]},action)=>{
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        })
        .addCase(ALL_PRODUCT_FAIL,(state = {products:[]},action)=>{
            return {
                loading: false,
                error: action.payload
            }
        })
        .addCase(CLEAR_ERRORS,(state = {products:[]},action)=>{
            return {
                ...state,
                error: null
            }
        })
        .addDefaultCase((state = {products:[]},action)=>{
            return state
        })
        
});


export const productDetailsReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(PRODUCT_DETAILS_REQUEST,(state = {product:{}},action)=>{
            return {
                loading:true,
                ...state
            }
        })
        .addCase(PRODUCT_DETAILS_SUCCESS,(state = {product:{}},action)=>{
            return {
                loading: false,
                product: action.payload
            }
        })
        .addCase(PRODUCT_DETAILS_FAIL,(state = {product:{}},action)=>{
            return {
                loading: false,
                error: action.payload
            }
        })
        .addCase(CLEAR_ERRORS,(state = {product:{}},action)=>{
            return {
                ...state,
                error: null
            }
        })
        .addDefaultCase((state = {product:{}},action)=>{
            return state
        })
        
});