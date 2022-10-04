import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./Sections/Header.css";
import EventTopRolling from "./Sections/EventTopRolling";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../_actions/user_actions';
import { Link } from "react-router-dom";

import LogoImg from '../../../images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faSearch, faUser, faShoppingCart, faBars, faTimes, faUserPlus, faCreditCard, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = memo((props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const [SearchValue, setSearchValue] = useState('');
  const [IsSearchTermShow, setIsSearchTermShow] = useState(false);
  const [IsMobileMenuShow, setIsMobileMenuShow] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    logoRef.current.classList.add('mainpage');
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        window.location.replace('/');
      } else {
        alert('로그아웃이 실패하였습니다.');
      }
    })
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
  }, [SearchValue]); // Enter key 눌렀을때 submit 이벤트

  const toggleSearchTerm = useCallback(() => {
    setIsSearchTermShow((prev) => !prev);
  }, []);
  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuShow((prev) => !prev);
  }, []);
  const mobileNavClose = useCallback(() => {
    setIsMobileMenuShow(false);
  }, []);

  return (
    <div className="header-wrapper">

      {/* EventTopRolling */}
      <EventTopRolling />
      {/* // EventTopRolling */}

      {/* nav-bar */}
      <div className="nav-bar clearfix">
        <h1 className="logo" ref={logoRef}><a href="/"><img src={LogoImg} alt="RAWROW 로고"/></a></h1>
        
        <nav className={IsMobileMenuShow ? 'nav-menu active' : 'nav-menu'}>
          <Link to="/shop/1" onClick={mobileNavClose}>BAG</Link>
          <Link to="/shop/2" onClick={mobileNavClose}>EYE</Link>
          <Link to="/shop/3" onClick={mobileNavClose}>WEAR</Link>
        </nav>

          <section className="right-menu">
            <div>
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
                    {
                      !user.userData.isAdmin 
                      && (
                        <>
                          <Link className='menu-list' to="/user/cart">
                            <i>
                              CART&nbsp;
                              {user.userData.cart && user.userData.cart.length > 0 && `(${user.userData.cart.length})` }  
                            </i>
                            <FontAwesomeIcon icon={faShoppingCart} className="mo-ico"/>
                            {user.userData.cart && user.userData.cart.length > 0 && <span className="cart-count">{user.userData.cart.length}</span> } 
                          </Link>
                          <Link className='menu-list' to="/user/purchaseHistory">
                              <i>주문내역</i>
                              <FontAwesomeIcon icon={faCreditCard} className="mo-ico"/>
                          </Link>
                        </>
                      ) 
                    }
                
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
                    <Link className='menu-list' to="/signUp">
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
            </div>
            {
                user.userData && user.userData.isAuth 
                && <span className='welcome-user-txt'><i>{user.userData.name}</i>님 반갑습니다.</span>
            }
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
