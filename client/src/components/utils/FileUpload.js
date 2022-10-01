import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import './FileUpload.css';
import { PRODUCT_SERVER } from '../Config';

// fontawesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0]);

    axios.post(`${PRODUCT_SERVER}/image`, formData, config)
        .then(response => {
            if ( response.data.success ) {
                setImages([...Images, response.data.filePath]);
                props.refreshFunction([...Images, response.data.filePath])
            } else {
                alert('파일을 저장하는데 실패했습니다');
            }
        })
  };

  const imgDeleteHandler = (image) => {
    const currentIdx = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIdx,1);
    setImages(newImages);
    props.refreshFunction(newImages);
  }

  return (
    <div className="dropzone-wrapper">
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={{ display: 'inline-block'}}>
              <input {...getInputProps()} />
              <div className="tooltip-wrapper">
                <FontAwesomeIcon icon={faFileUpload} className="upload-ico"/>
                <span className="tooltiptext">사진업로드</span>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {Images.length > 0 &&
      <div className="uploaded-img-wrap">
        {Images.map((el, idx)=>(
          <div className='uploaded-img' onClick={()=>{imgDeleteHandler(el)}} key={idx}>
            <img src={`http://localhost:5000/${el}`} alt="업로드 이미지"/>
            <span className="delete-img"><FontAwesomeIcon icon={faTimes}/></span>
          </div>
        ))}
      </div>
      }
    </div>
  );
}

export default FileUpload;
