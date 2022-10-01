import React, {memo} from 'react';
import { comma, uncomma } from '../../../utils/utils';
import { Link } from 'react-router-dom';

const CartList = memo(({cartData, removeCart}) => {
  return (
    <div className='cart-product-list-wrap'>
    {
        cartData && cartData.length === 0 
        ? (
            <p className='no-datas'>장바구니에 담긴 상품이 없습니다.</p>
        ) 
        : 
        cartData && cartData.map((item, idx) => {
            let count = 0;
            return (
                <section className='cart-product-list' key={item._id}>
                    <Link to={`/product/${item._id}`}><img className='cart-p-thumb' src={`http://localhost:5000/${item.images[0]}`} alt='상품 썸네일'/></Link>
                    <div className='cart-p-detail'>
                    <article className='left-info'>
                        <p className='title'>{item.title}</p>
                        <ul className='option-list'>
                        {
                            item.quantity.map(sizeDetail => {
                                count += sizeDetail.amount;
                                return <li key={sizeDetail.size}>[사이즈 : {sizeDetail.size}] {sizeDetail.amount}개</li>
                            })
                        }
                        </ul>
                        <p className="price">{item.price} 원</p>
                        <p className='mileage'>{comma(uncomma(item.price) * 0.05)} 마일리지</p>
                    </article>
                    <article className='right-info'>
                        <button className='delete-cart-p' onClick={() => removeCart(item._id)}>삭제</button>  
                        <div>
                            <p className='total-price'>{comma(count * uncomma(item.price))}원</p>
                            <p className='shipping'>배송료 : 무료</p>
                        </div>
                    </article>
                    </div>
                </section>
            )
        })
    }
    </div>
  )
});

export default CartList