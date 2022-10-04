import React, { useState, useEffect } from "react";
import axios from 'axios';
import LoadingIcon from "../../utils/LoadingIcon";
import './Sections/SearchResultPage.css';
import { Link, useParams } from 'react-router-dom';

// fontawesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function SearchResultPage(props) {
  const { searchText } = useParams();
  const [ProductArray, setProductArray] = useState([]);
  const [Limit, setLimit] = useState(8);
  const [Skip, setSkip] = useState(0);
  const [IsNextData, setIsNextData] = useState(false);
  const [PageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
      searchTerm: searchText
    }
    getProducts(body);
  }, [searchText]);

  const loadMoreItems = () => {
    let newSkip = Skip + Limit;
    let body = {
      skip: newSkip,
      limit: Limit,
      searchTerm: searchText,
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
                setIsNextData(response.data.isNextDataExist);
                setPageLoad(false);
            } else {
                alert('상품들을 가져오는데 실패했습니다.');
            }
        })
  }

  return (
    <div className="search-result-page">
      <h2 className="page-title result-title">검색결과</h2>
      <h3 className="search-value mb20">검색내용 : {searchText}</h3>

      {
        ( PageLoad === false && ProductArray.length == 0 ) &&
        <p className="no-data-wrap">
          <FontAwesomeIcon icon={faExclamationTriangle} className='notify-ico'/>
          <span className="no-data">검색결과가 없습니다.</span>       
        </p>
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
        IsNextData &&
        <p className="more-btn-wrap" onClick={loadMoreItems}>더보기</p>
      }
      {PageLoad && <LoadingIcon/>}
    </div>
  );
}

export default SearchResultPage;
