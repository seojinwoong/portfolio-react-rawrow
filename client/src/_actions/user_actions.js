import axios from 'axios';
import {
    AUTH_USER,
    SIGNUP_USER
} from './types';
import { USER_SERVER } from '../components/Config';

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

