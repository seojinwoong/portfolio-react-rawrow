import React from 'react';
import { Link } from "react-router-dom";
import './Sections/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
        <p className="info-txt">
            <span className="eng-txt">OOPS! PAGE NOT FOUND</span>
            <span className='number'>404</span>
            <span className='txt'>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</span>
        </p>
        <Link to="/">메인 페이지로</Link>
    </div>
  )
}

export default NotFoundPage






