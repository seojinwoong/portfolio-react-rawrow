import React, { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../hoc/auth';

// components
import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import MainPage from './views/MainPage/MainPage';
import SignUpPage from './views/SignUpPage/SignUpPage';
import SignUpSuccessPage from './views/SignUpPage/Sections/SignUpSuccess';
import LoginPage from './views/LoginPage/LoginPage';
import ProductUploadPage from './views/ProductUploadPage/ProductUploadPage';
import ShopPage from './views/ShopPage/ShopPage';
import ProductDetailPage from './views/ProductDetailPage/ProductDetailPage';
import CartPage from './views/CartPage/CartPage';
import PurchaseHistoryPage from './views/PurchaseHistoryPage/PurchaseHistoryPage';
import SearchResultPage from './views/SearchResultPage/SearchResultPage';
import FindUserInfoPage from './views/FindUserInfoPage/FindUserInfoPage';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

const AuthMainPage = Auth(MainPage, null);
const AuthSignUpPage = Auth(SignUpPage, false);
const AuthSignUpSuccessPage = Auth(SignUpSuccessPage, false);
const AuthLoginPage = Auth(LoginPage, false);
const AuthProductUploadPage = Auth(ProductUploadPage, true, true);
const AuthShopPage = Auth(ShopPage, null);
const AuthProductDetailPage = Auth(ProductDetailPage, null);
const AuthPurchaseHistoryPage = Auth(PurchaseHistoryPage, true);
const AuthSearchResultPage = Auth(SearchResultPage, null);
const AuthCartPage = Auth(CartPage, true);
const AuthFindUserInfoPage = Auth(FindUserInfoPage, false);

const App = () => {
  const allPage = useRef(null);

  useEffect(() => {
    allPage.current.classList.add('active');
  }, [])

  return (
      <div className="all-page" ref={allPage}>
        <Header/>
        <div className='page-content'>
          <Routes>
              <Route exact path="/" element={<AuthMainPage/>} />
              <Route exact path="/signUp" element={<AuthSignUpPage/>} />
              <Route exact path="/signUp/success" element={<AuthSignUpSuccessPage/>} />
              <Route exact path="/login" element={<AuthLoginPage />} />
              <Route exact path="/product/upload" element={<AuthProductUploadPage />} />
              <Route exact path="/shop/:pCategory" element={<AuthShopPage />} />
              <Route exact path="/product/:productId" element={<AuthProductDetailPage />} />
              <Route exact path="/user/cart" element={<AuthCartPage />} />
              <Route exact path="/user/purchaseHistory" element={<AuthPurchaseHistoryPage />} />
              <Route exact path="/searchResult/:searchText" element={<AuthSearchResultPage />} />
              <Route exact path="/findUserInfo/:findWhat" element={<AuthFindUserInfoPage />} />
              <Route path="/*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
