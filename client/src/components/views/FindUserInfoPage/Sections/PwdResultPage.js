import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePwd } from '../../../../_actions/user_actions';
import { Link } from 'react-router-dom'

function PwdResultPage() {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.findResult.user);
    const [Pwd1, setPwd1] = useState('');
    const [Pwd2, setPwd2] = useState('');
    const [IsPwdChangeSuccess, setIsPwdChangeSuccess] = useState(false);
    const inputHandler = (e) => {
        let inputTarget = e.target.attributes.getNamedItem('data-pwdNum').value;

        if (inputTarget == 1) setPwd1(e.target.value);
        else setPwd2(e.target.value);
    };
    const checkFormSubmitHandler = (e) => {
        e.preventDefault();
        if ( Pwd1 !== Pwd2 ) {
            alert("입력하신 비밀번호가 일치하지 않습니다.");
            return false;
        } else {
            let dataToSubmit = {
                userKey: userInfo._id,
                changePwd: Pwd1
            };
            dispatch(changePwd(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    setIsPwdChangeSuccess(true);
                } else {
                    alert('비밀번호 변경과정에서 오류가 발생했습니다.');
                    console.log('오류내용', response.payload.err.errMsg);
                }
            })
        }
    }
    return (
            <>
            {
                IsPwdChangeSuccess === true 
                ?
                (
                    <>
                    <h2 className="page-title">비밀번호 변경성공</h2>
                    <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                        비밀번호가 변경되었습니다. 변경된 정보로 로그인해주세요.
                    </p>
                    
                    <div className='go-link-wrap'>
                        <Link to="/login" className='go-link-page'>로그인하러 가기</Link>
                        <Link to="/"  className='go-link-page'>메인으로</Link>
                    </div>
                </>
                )
                : 
                (
                    <>
                    <h2 className="page-title">비밀번호 재설정</h2>

                    <form className="info-input-wrapper pwd-change-form" onSubmit={checkFormSubmitHandler}>
                        <p className="row">
                            <label>회원님 아이디</label>
                            <span className='main-c ml10'>{userInfo.userId}</span>
                        </p>
                        <p className="row">
                            <label>재설정 비밀번호</label>
                            <input type="password" value={Pwd1} onChange={inputHandler} data-pwdNum="1" required/>
                        </p>
                        <p className="row">
                            <label>비밀번호 재확인</label>
                            <input type="password" value={Pwd2} onChange={inputHandler} data-pwdNum="2" required/>
                        </p>
        
                        <button className="submit-info">OK</button>
                    </form>
                    </>
                )
            }
        </>
    )
}

export default PwdResultPage
