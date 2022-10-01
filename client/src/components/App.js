import React from 'react';
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
import NotFoundPage from './views/NotFoundPage/NotFoundPage';

const AuthMainPage = Auth(MainPage, null);
const AuthSignUpPage = Auth(SignUpPage, false);
const AuthSignUpSuccessPage = Auth(SignUpSuccessPage, false);
const AuthLoginPage = Auth(LoginPage, false);
const AuthProductUploadPage = Auth(ProductUploadPage, true, true);
const AuthShopPage = Auth(ShopPage, null);
const AuthProductDetailPage = Auth(ProductDetailPage, null);
const AuthCartPage = Auth(CartPage, true);

const App = () => {
  return (
      <div className="all-page">
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
              <Route path="/*" element={<NotFoundPage/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
