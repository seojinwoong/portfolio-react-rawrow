import React from 'react';
import snsNaver from '../../../images/i_blog.png';
import snsFacebook from '../../../images/i_facebook.png';
import snsInstagram from '../../../images/i_instagram.png';
import snsKakao from '../../../images/i_kakao.png';
import './Sections/Footer.css';
import { Link } from 'react-router-dom'

// fontawesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    const topScrollHandler = () => {
        window.scrollTo({top:0, left:0, behavior:'smooth'})
    };
    return (
        <div id="footerWrapper" className="footer-wrapper clearfix">
            <ul className="menu-lists sections">
                <li><Link to="/">ABOUT</Link></li>
                <li><Link to="/">POLICY</Link></li>
                <li><Link to="/">GUIDE</Link></li>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">STOCKLIST</Link></li>
                <li><Link to="/">LIFETIME WARRANTY</Link></li>
                <li><Link to="/">HELP</Link></li>
            </ul>

            <article className="customer-center-info sections">
                <p className="title">CUSTOMER CENTER</p>
                <span className="time">
                    업무시간 09:00 ~ 18:00<br/>
                    점심시간 12:00 ~ 13:00<br/>
                    토,일, 공휴일은 휴무입니다.<br/>
                </span>
                <p className="bottom-text">
                    가장 빠르고 정확한 문의<br/>
                    카카오톡 플러스친구 : 로우로우
                </p>
            </article>

            <article className="company-info sections">
                회사명: (주)로우로우<br/>
                대표자: 이의현<br/>
                주소: 04049 RAWROWCENTER 서울특별시 마포구 상수동 318-1<br/>
                사업자 등록번호: 105-87-83267 [사업자정보확인]<br/>
                통신판매업 신고: 2013-서울마포-10377<br/>
                전화: 02-324-8849<br/>
                팩스: 02-518-2892<br/>
                개인정보관리책임자: 이의현 contact@rawrow.com<br/>
            </article>

            <article className='copyright-and-sns sections'>
                <p className='copy'>
                    COPYRIGHT 2018<br/>
                    RAWROW. ALL RIGHTS<br/>
                    RESERVED.<br/>
                </p>
                <article className="sns-section mt20">
                    <Link to="/"><img src={snsKakao} alt="로우로우 카카오"/></Link>
                    <Link to="/"><img src={snsInstagram} alt="로우로우 인스타그램"/></Link>
                    <Link to="/"><img src={snsFacebook} alt="로우로우 페이스북"/></Link>
                    <Link to="/"><img src={snsNaver} alt="로우로우 네이버"/></Link>
                </article>
            </article>
            <span className="go-top-btn" onClick={topScrollHandler}>
                <FontAwesomeIcon icon={faChevronUp} className='up-ico'/>
            </span>
        </div>
    )
}

export default Footer
