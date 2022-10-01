import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUpSuccess.css';
import { Link } from 'react-router-dom';

function SignUpSuccess({user}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.signUpData) {
            alert('올바르지 않은 접근입니다.');
            navigate('/');
        } 
    }, []);

    return (
        <>
            {
                user.signUpData ? (
                    <div className="register-success container">
                    <h2 className="page-title">회원가입완료</h2>
                
                    <p className="welcome">
                        RAWROW의 회원이 되신 것을 환영합니다.<br/>
                        회원이 되시면 <span>더 많고 다양한 혜택</span>을 얻으실 수 있습니다.
                    </p>
                
                    <p className='btn-wrapper'>
                        <Link to="/" className='go-main'>메인으로</Link>
                        <Link to="/login" className='go-login'>로그인하기</Link>
                    </p>
                </div>
                ) 
                : null
            }
        </>
       
    )
}

export default SignUpSuccess
