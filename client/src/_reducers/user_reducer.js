import {
    AUTH_USER,
    SIGNUP_USER,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case AUTH_USER:
            return {...state, userData: action.payload }
        case SIGNUP_USER:
            return {...state, signUpData: action.payload }
        default:
            return state;
    }
}