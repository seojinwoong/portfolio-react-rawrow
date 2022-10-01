import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Sections/ShopPage.css';
import LoadingIcon from "../../utils/LoadingIcon";
import { Link, useParams } from 'react-router-dom';

function ShopPage(props) {
  const { pCategory } = useParams();
  const [ProductArray, setProductArray] = useState([]);
  const [Limit, setLimit] = useState(16);
  const [Skip, setSkip] = useState(0);
  const [PostSize, setPostSize] = useState(0);
  const [PageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    let body = {
        skip: Skip,
        limit: Limit,
        category: pCategory
    }

    getProducts(body);
  }, [pCategory]);

  const loadMoreItems = () => {
    let newSkip = Skip + Limit;
    let body = {
      skip: newSkip,
      limit: Limit,
      category: pCategory,
      isLoadMore: true
    }
    getProducts(body);
    setSkip(newSkip);
  }

  const getProducts = (body) => {
    setPageLoad(true);
    axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                if (body.isLoadMore) {
                    setProductArray([...ProductArray, ...response.data.productInfo]);
                } else {
                    setProductArray(response.data.productInfo);
                }
                setPostSize(response.data.postSize);
                setPageLoad(false);
            } else {
                alert('상품들을 가져오는데 실패했습니다.');
            }
        })
  }

  return (
    <div className="shop-page">
      <h2 className="page-title shop-title">
        {pCategory == 1 ? 'BAG' : pCategory == 2 ? 'EYE' : 'WEAR'}
      </h2>
      
      {
        ( PageLoad === false && ProductArray.length == 0 ) &&
        <p className="no-data">상품이 존재하지 않습니다.</p>       
      }
      <ul className="product-lists-wrap">
          {
              ProductArray.map((el, idx) => (
                <li className="product-list">
                    <Link to={`/product/${el._id}`}>
                        <div className="img-thumb clearfix">
                            <img className='thumb' src={`http://localhost:5000/${el.images[0]}`} alt='상품 이미지'/>
                            {  el.images.length >= 2 && <img className='hover-thumb' src={`http://localhost:5000/${el.images[1]}`} alt='상품 이미지'/> }
                        </div>
                        <div className="product-cont">
                            <p className="p-name">{el.title}</p>
                            <p className='p-price'>{el.price}원</p>
                        </div>
                    </Link>
                </li>
              ))
          }
      </ul>
      {
        PostSize >= Limit &&
        <p className="more-btn-wrap" onClick={loadMoreItems}>더보기</p>
      }
      {PageLoad && <LoadingIcon/>}
    </div>
  );
}

export default ShopPage;
