import React, { useState, useEffect } from 'react';
import { comma, uncomma } from '../../utils/utils';
import { Link } from 'react-router-dom';

const PurchaseHistoryPage = ({user}) => {
    const [purchaseList, setPurchaseList] = useState([]);
    useEffect(() => {
        if (user && user.userData && user.userData.purchaseHistory) {
            setPurchaseList(user.userData.purchaseHistory);
        }
    }, [user && user.userData && user.userData.purchaseHistory]);
    
  return (
    <div id='cartPage' className='purchase-page'>
        <div className='container'>
        <h2 className='page-title'>구매내역</h2>

        <div className='cart-product-list-wrap'>

            {
                purchaseList && purchaseList.length === 0
                ? (
                    <p className='no-datas'>구매내역이 없습니다.</p>
                ) 
                : 
                purchaseList && purchaseList.length > 0 && purchaseList.reverse().map((purchase, idx) => {
                    return purchase.map((item, idx) => {
                        let count = 0;
                        let dates = new Date(item.dateOfPurchase);
                        let year = dates.getFullYear();
                        let month = ('0' + (dates.getMonth() + 1)).slice(-2);
                        let date = ('0' + dates.getDate()).slice(-2);
                        let hours = ('0' + dates.getHours()).slice(-2);
                        let minutes = ('0' + dates.getMinutes()).slice(-2);
                        let seconds = ('0' + dates.getSeconds()).slice(-2);
                        
                        let fullDates = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

                        return (
                            <>
                                {
                                    idx === 0
                                    && <p className='purchase-date-tit'>구매일자 : {fullDates}</p>
                                }
                                <section className='cart-product-list' key={item.id}>
                                    <Link to={`/product/${item.id}`}><img className='cart-p-thumb' src={`http://localhost:5000/${item.productThumb}`} alt='상품 썸네일'/></Link>
                                    <div className='cart-p-detail'>
                                    <article className='left-info'>
                                        <p className='title'>{item.name}</p>
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
                                        <div>
                                            <p className='total-price'>총 {comma(count * uncomma(item.price))}원</p>
                                            <p className='shipping'>배송료 : 무료</p>
                                            <p className='shipping'>결제수단 : 페이팔</p>
                                        </div>
                                    </article>
                                    </div>
                                </section>
                            </>
                        )
                    })
                       
                })
            }
            </div>

        </div>
    </div>
  )
}

export default PurchaseHistoryPage