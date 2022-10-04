import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function IdResultPage() {
    const userId = useSelector(state => state.user.findResult.user.userId);
    return (
        <>
            <h2 className="page-title">아이디 찾기 결과</h2>
            <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                회원님의 아이디는 <span className="main-c">{userId}</span>입니다.
            </p>
            
            <div className='go-link-wrap'>
                <Link to="/login" className='go-link-page'>로그인하러 가기</Link>
                <Link to="/"  className='go-link-page'>메인으로</Link>
            </div>
        </>
    )
}

export default IdResultPage
