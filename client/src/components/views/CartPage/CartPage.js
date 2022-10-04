import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCartItems,
  removeCartItem,
  removeAllCart,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import { comma, uncomma } from "../../utils/utils";
import CartList from "./Sections/CartList";
import Paypal from "../../utils/Paypal";
import "./Sections/CartPage.css";

const CartPage = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [CartDetail, setCartDetail] = useState([]);
  const [Total, setTotal] = useState(0);

  const calculateMoney = (data) => {
    let total = 0;
    for (let cart of data) {
      let totalAmount = cart.quantity.reduce((a, b) => a + b.amount, 0);
      total += totalAmount * Number(uncomma(cart.price));
    }
    setTotal(total);
  };

  useEffect(() => {
    let cartItems = [];

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, user.userData.cart)).then(
          (response) => {
            setCartDetail(response.payload);
            calculateMoney(response.payload);
          }
        );
      }
    }
  }, [user.userData]);

  const removeCartFn = useCallback((productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (!response.payload.productInfo.length) window.location.reload();
    });
  }, []);

  const removeAllCartFn = () => {
    let isConfirmRemmove = window.confirm(
      "장바구니에 있는 모든 상품을 삭제하시겠습니까?"
    );
    if (isConfirmRemmove) {
      dispatch(removeAllCart()).then((response) => {
        if (response.payload.success) window.location.reload();
        else
          alert("장바구니 상품을 전체삭제하는 과정에서 오류가 발생했습니다.");
      });
    }
  };

  const transactionSuccess = (data) => {
    dispatch(onSuccessBuy({ paymentData: data, cartDetail: CartDetail }))
      .then((response) => {
        if (response.payload.success) { navigate('/user/purchaseHistory') }
        else {
          alert("제품 구매과정에서 오류가 발생했습니다.");
        }
    });
  };

  return (
    <div id='cartPage'>
      <div className='container'>
        <h2 className='page-title'>장바구니</h2>

        <CartList cartData={CartDetail} removeCart={removeCartFn} />

        <button
          className={
            CartDetail.length === 0 ? "remove-all disabled" : "remove-all"
          }
          onClick={removeAllCartFn}
        >
          장바구니 상품 전체삭제
        </button>

        <div className='calculate-all'>
          <p className='tit-box'>
            <span className='tit'>PRICE</span>
            <span className='tit'>SHIPPING</span>
            <span className='tit'>TOTAL</span>
          </p>
          <p className='con-box'>
            <span className='con'>{comma(Total)}원</span>
            <span className='con'>+ 0원</span>
            <span className='con'>{comma(Total)}원</span>
          </p>
        </div>
        {CartDetail.length !== 0 && (
          <div className='paypal-wrapper'>
            <Paypal total={Total} onSuccess={transactionSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
