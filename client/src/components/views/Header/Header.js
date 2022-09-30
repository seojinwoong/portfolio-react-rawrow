import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./Sections/Header.css";
import EventTopRolling from "./Sections/EventTopRolling";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../../../_actions/user_actions';
import { Link } from "react-router-dom";

import LogoImg from '../../../images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faSearch, faUser, faShoppingCart, faBars, faTimes, faUserPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = memo((props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.user);

  const [SearchValue, setSearchValue] = useState('');
  const [IsSearchTermShow, setIsSearchTermShow] = useState(false);
  const [IsMobileMenuShow, setIsMobileMenuShow] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    if(location.pathname === "/") logoRef.current.classList.add('mainpage');
  }, []);

  const logoutHandler = () => {
    // dispatch(logoutUser()).then(response => {
    //   if (response.payload.success) {
    //     window.location.replace("/");
    //   } else {
    //     alert('로그아웃이 실패하였습니다.');
    //   }
    // })
  };

  const checkSearchValue = () => {
    if (SearchValue.trim() !== "") {
      navigate(`/searchResult/${SearchValue}`);
      setSearchValue('');
    }
  };

  const searchTextHandler = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const keyPressFn = useCallback((e) => { 
    if (e.key === 'Enter') checkSearchValue(); 
  }, []); // Enter key 눌렀을때 submit 이벤트

  const toggleSearchTerm = useCallback(() => {
    setIsSearchTermShow((prev) => !prev);
  }, []);
  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuShow((prev) => !prev);
  }, []);

  return (
    <div className="header-wrapper">

      {/* EventTopRolling */}
      <EventTopRolling />
      {/* // EventTopRolling */}

      {/* nav-bar */}
      <div className="nav-bar clearfix">
        <h1 className="logo" ref={logoRef}><Link to="/"><img src={LogoImg} alt="RAWROW 로고"/></Link></h1>
        
        <nav className={IsMobileMenuShow ? 'nav-menu active' : 'nav-menu'}>
          <Link to="/shop/1">BAG</Link>
          <Link to="/shop/2">EYE</Link>
          <Link to="/shop/3">WEAR</Link>
        </nav>

          <section className="right-menu">
            {
              user.userData && user.userData.isAdmin 
              && (
                  <Link className='menu-list' to="/product/upload">
                    <i>상품업로드</i>
                    <FontAwesomeIcon icon={faShoppingBag} className="mo-ico"/>
                  </Link>
              )
            }
            {
              user.userData && user.userData.isAuth
              ? ( 
                <>
                  <Link className='menu-list' to="/user/cart">
                    <i>CART</i>
                    <FontAwesomeIcon icon={faShoppingCart} className="mo-ico"/>
                  </Link>
                  <span className='menu-list' onClick={logoutHandler}>
                    <i>LOGOUT</i>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mo-ico"/>
                  </span>
                </>
                )
              : (
                <>
                  <Link className='menu-list' to="/login">
                    <i>LOGIN</i>
                    <FontAwesomeIcon icon={faUser} className="mo-ico"/>
                  </Link>
                  <Link className='menu-list' to="/register">
                    <i>SIGNUP</i>
                    <FontAwesomeIcon icon={faUserPlus} className="mo-ico"/>
                  </Link>
                </>
                )
            }

            <span className='menu-list' onClick={toggleSearchTerm}>
              <i>SEARCH</i>
              <FontAwesomeIcon icon={faSearch} className="mo-ico"/>
            </span>
            <span className='menu-list mo-hamburger'>
                <FontAwesomeIcon icon={IsMobileMenuShow ? faTimes : faBars} className="mo-ico" onClick={toggleMobileNav}/>
            </span>
          </section>
      </div>
      {/* // nav-bar */}

      {/* search-bar-wrap */}
        <section className={IsSearchTermShow ? 'search-bar-wrap active' : 'search-bar-wrap'} >
          <div className="search-form">
            <input type="text" 
            placeholder="검색어를 입력하세요" 
            onChange={searchTextHandler} 
            onKeyPress={keyPressFn} 
            value={SearchValue}/>
            <FontAwesomeIcon icon={faSearch} className="search-submit" onClick={checkSearchValue}/>
            <FontAwesomeIcon icon={faTimes} className="search-close" onClick={toggleSearchTerm}/>
          </div>
        </section>
      {/* // search-bar-wrap */}

      <div className={IsMobileMenuShow ? 'white-shadow active' : 'white-shadow'}></div>
    </div>
  );
});

export default Header;
