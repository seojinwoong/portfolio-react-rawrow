import React, { useState } from 'react';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import './Sections/ProductUploadPage.css';
import { parseCurrency } from '../../utils/utils';
import { PRODUCT_SERVER } from '../../Config';

// fontawesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function ProductsUploadPage(props) {
    let [SizeQuantity, setSizeQuantity] = useState(1);
    const [Images, setImages] = useState([]);
    const [ProductName, setProductName] = useState('');
    const [ProductCategory, setProductCategory] = useState(1);
    const [ProductPrice, setProductPrice] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [ProductCaution, setProductCaution] = useState('');
    const [ProductSize, setProductSize] = useState([
        {size: 'S', sizeAmouts: ''}
    ]);

    const sizeHandler = (idx, event) => {
        let copy = [...ProductSize];
        copy[idx].size = event.target.value;
        setProductSize(copy);
    }
    const sizeQuantityHandler = (idx, event) => {
        let copy = [...ProductSize];
        copy[idx].sizeAmouts = parseCurrency(event.target.value);
        setProductSize(copy);
    }

    const btnClickHandler = (type) => {
        if (type == 'plus') {
            if (SizeQuantity < 6) {
                setSizeQuantity(++SizeQuantity);
                setProductSize([...ProductSize, {size:'S', sizeAmouts:''}]);
            }
        }
        else {
            setSizeQuantity(--SizeQuantity);
            let copy = [...ProductSize];
            copy.splice(-1,1);
            setProductSize(copy);
        }
    }
    const inputHandler = (e) => {
        let inputElement = e.target.attributes.getNamedItem('data-element').value;
        switch (inputElement) {
            case "p-name" : 
                setProductName(e.target.value);
                break;
            case "p-category" : 
                setProductCategory(e.target.value);
                break;
            case "p-price" : 
                setProductPrice(parseCurrency(e.target.value));
                break;
            case "p-description" : 
                setProductDescription(e.target.value);
                break;
            case "p-caution" : 
                setProductCaution(e.target.value);
                break;
        }
    }

    const showSizeSelection = () => {
        let returnHtml = [];
        for (let i = 0; i < SizeQuantity; i++) {
            returnHtml.push(<p className="size-section">
                            <select className="common-input select-size" onChange={(e)=>{sizeHandler(i, e)}} value={ProductSize[i].size}>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="Free">????????? ??????</option>
                            </select>
                            <input type="text" 
                            className="common-input p-quantity" 
                            placeholder='?????? ???????????? ???????????? ??????????????????'
                            value={ProductSize[i].sizeAmouts}
                            onChange={(e)=>{sizeQuantityHandler(i, e)}}
                            />
                            <span className="ea">EA</span>
                        </p>
                        );
        }
        return returnHtml;
    }

    const setFiles = (newImages) => {
        setImages(newImages);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        for (let i = 0; i< ProductSize.length; i++) {
            const current = ProductSize[i].size;
            let flag = false;
            for (let j = i+1; j < ProductSize.length; j++) {
                if (current == ProductSize[j].size) {
                    flag = true;
                    break;
                }
            }
            if(flag) {
                alert('????????? ???????????? ????????? ??? ????????????.');
                return false;
            }
        }

        // ??? ??????
        const body = {
            writer: props.user.userData._id,
            title: ProductName,
            category: ProductCategory,
            price: ProductPrice,
            description: ProductDescription,
            caution: ProductCaution,
            size: ProductSize,
            images: Images
        }

        axios.post(`${PRODUCT_SERVER}`, body)
            .then(response => {
                if (response.data.success) {
                    alert('?????? ???????????? ??????????????????.');
                } else {
                    alert('?????? ???????????? ??????????????????.');
                }
                window.location.replace('/product/upload');
            })
    }

    return (
        <div className="container" id="productsUploadPage">
            <h2 className="page-title">???????????????</h2>

            <form onSubmit={submitHandler}>
                 <article className="row">
                    <label>???????????? ?????????</label>
                    <FileUpload refreshFunction={setFiles}></FileUpload>
                </article>
                
                <article className="row">
                    <label>?????????</label>
                    <input type="text" className="common-input" data-element="p-name" onChange={inputHandler} value={ProductName} required/>
                </article>

                <article className="row">
                    <label>?????? ????????????</label>
                    <select className="common-input" data-element="p-category" onChange={inputHandler} value={ProductCategory}>
                        <option value="1">??????</option>
                        <option value="2">??????</option>
                        <option value="3">??????</option>
                    </select>
                </article>

                <article className="row">
                    <label>??????</label>
                    <input type="text" className="common-input" data-element="p-price" onChange={inputHandler} value={ProductPrice} required/>
                </article>

                <article className="row">
                    <label>?????? ??????</label>
                    <textarea className="common-input" data-element="p-description" onChange={inputHandler} value={ProductDescription}></textarea>
                </article>

                <article className="row">
                    <label>?????? ????????????</label>
                    <textarea className="common-input" data-element="p-caution" onChange={inputHandler} value={ProductCaution}></textarea>
                </article>

                <article className="row">
                    <label>???????????? ??????</label>
                    <div className='size-select-wrapper'>
                        {showSizeSelection()}

                        <span onClick={()=>{btnClickHandler('plus')}}><FontAwesomeIcon icon={faPlusCircle} className="plus-size-btn size-btn"/></span>
                        {
                            SizeQuantity > 1
                            && <span onClick={()=>{btnClickHandler('minus')}}><FontAwesomeIcon icon={faMinusCircle} className="minus-size-btn size-btn"/></span>
                        }
                    </div>
                </article>

                <button className="submit-btn">?????? ?????????</button>
            </form>
        </div>
    )
}

export default ProductsUploadPage
