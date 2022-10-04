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
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case SIGNUP_USER:
            return { ...state, signUpData: true }
        case CHECK_ID:
            return { ...state }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case FIND_MEMBER_INFO: 
            return { ...state, findResult: action.payload }
        case CHANGE_PWD: 
            return { ...state }
        case ADD_TO_CART:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart: action.payload.cartInfo
                }
            }
        case GET_CART_ITEMS: 
            return { ...state, cartDetail: action.payload }
        case REMOVE_CART_ITEM: 
            return { 
                ...state, 
                cartDetail: action.payload.productInfo,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case REMOVE_ALL_CART: 
            return { 
                ...state, 
                userData: {
                    ...state.userData,
                    cart: []
                }
            }
        case ON_SUCCESS_BUY:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData, cart: action.payload.cart
                }
            }
        default:
            return state;
    }
}