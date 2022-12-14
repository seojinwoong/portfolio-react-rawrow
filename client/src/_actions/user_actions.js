import axios from 'axios';
import {
    AUTH_USER,
    SIGNUP_USER,
    CHECK_ID,
    LOGIN_USER,
    LOGOUT_USER,
    FIND_MEMBER_INFO,
    CHANGE_PWD,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    REMOVE_ALL_CART,
    ON_SUCCESS_BUY
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../components/Config';

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);
    
    return {
        type: AUTH_USER,
        payload: request
    }
} 

export function signUpUser(memberInfo) {
    const request = axios.post(`${USER_SERVER}/signUp`, memberInfo)
        .then(response => response.data);
    
    return {
        type: SIGNUP_USER,
        payload: request
    }
} 

export function checkId(compareId) {
    const request = axios.post(`${USER_SERVER}/checkId`, compareId)
        .then(response => response.data);
    
    return {
        type: CHECK_ID,
        payload: request
    }
} 

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
                .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function findMemberInfo(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/findMemberInfo`, dataToSubmit)
    .then(response => response.data);

    return {
        type: FIND_MEMBER_INFO,
        payload: request
    }
}

export function changePwd(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/changePwd`, dataToSubmit)
    .then(response => response.data);

    return {
        type: CHANGE_PWD,
        payload: request
    }
}

export function addToCart(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/addToCart`, dataToSubmit)
    .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart){
    const request = axios.get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
    .then(response => {
        userCart.forEach(cartItem => {
            response.data.forEach((productDetail, idx) => {
                if (cartItem.id === productDetail._id) {
                    response.data[idx].quantity = cartItem.sizes;
                }
            });
        });
        return response.data;
    });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId){
    const request = axios.get(`${USER_SERVER}/removeFromCart?id=${productId}`)
    .then(response => {
        response.data.cart.forEach(item => {
            response.data.productInfo.forEach((product, idx) => {
                if (item.id === product._id) {
                    response.data.productInfo[idx].quantity = item.sizes
                }
            })
        });
        return response.data;
    });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function removeAllCart(){
    const request = axios.get(`${USER_SERVER}/removeAllCart`)
     .then(response => response.data);

    return {
        type: REMOVE_ALL_CART,
        payload: request
    }
}

export function onSuccessBuy(data){
    const request = axios.post(`${USER_SERVER}/successBuy`, data)
     .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}