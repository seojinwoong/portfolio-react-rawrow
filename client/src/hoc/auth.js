/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        alert('회원만 이용가능한 페이지입니다. 로그인 해주세요.');
                        window.location.replace('/login');
                    } 
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) {
                        alert('접근 권한이 없습니다.');
                        window.location.replace('/');
                    } else {
                        if (option === false) {
                            alert('올바르지 않은 접근입니다.');
                            window.location.replace('/');
                        }
                    } 
                    //Logged in Status, but Try to go into log in page 
                }
            });
        }, []);

        return (
            <SpecificComponent {...props} user={user} /> 
        )
    }
    return AuthenticationCheck
}


