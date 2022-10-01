import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import CartList from './Sections/CartList';
import './Sections/CartPage.css';

const CartPage = ({user}) => {
  const dispatch = useDispatch();
  const [CartDetail, setCartDetail] = useState([]);

  useEffect(() => {
    let cartItems = [];

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
      }
      dispatch(getCartItems(cartItems, user.userData.cart))
        .then(response => setCartDetail(response.payload));
    }

  }, [user.userData]);

  const removeCartFn = useCallback((productId) => {
    dispatch(removeCartItem(productId))
      .then(response => {
        if (!response.payload.productInfo.length) window.location.reload();
      });
  }, []);

  return (
    <div id="cartPage">
      <div className="container">
        <h2 className='page-title'>장바구니</h2>

        <CartList cartData={CartDetail} removeCart={removeCartFn}/>

        <button className='remove-all'>장바구니 상품 전체삭제</button>

        <div className='calculate-all'>
            <p className='tit-box'>
              <span className='tit'>PRICE</span>
              <span className='tit'>SHIPPING</span>
              <span className='tit'>TOTAL</span>
            </p>
            <p className='con-box'>
              <span className='con'>554,000원</span>
              <span className='con'>+ 0원</span>
              <span className='con'>554,000원</span>
            </p>
        </div>
        
        <button className='purchase-btn'>전체주문</button>
      </div>
    </div>      
  )
}

export default CartPage