import React, { useState, useEffect } from "react";
import './Sections/FindUserInfoPage.css';
import { findMemberInfo } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import IdResultPage from './Sections/IdResultPage';
import PwdResultPage from './Sections/PwdResultPage';
import { useParams } from 'react-router-dom';

function FindUserInfoPage() {
  
  const dispatch = useDispatch();
  const { findWhat } = useParams();

  const [FindWhat, setFindWhat] = useState(findWhat);
  const [FindMethod, setFindMethod] = useState('by_email');
  const [InputId, setInputId] = useState('');
  const [InputName, setInputName] = useState('');
  const [InputEmail, setInputEmail] = useState('');
  const [Phone1, setPhone1] = useState('010');
  const [Phone2, setPhone2] = useState('');
  const [Phone3, setPhone3] = useState('');
  const [FirstPage, setFirstPage] = useState(true); 
  const [Idresult, setIdresult] = useState(false);
  const [Pwdresult, setPwdresult] = useState(false);

  useEffect(() => {
    setInputEmail('');
    setPhone1('010');
    setPhone2('');
    setPhone3('');
  }, [FindMethod])

  useEffect(() => {
    setInputId('');
  }, [FindWhat])

  const dataInputHandler = (e) => {
    let inputElement = e.target.attributes.getNamedItem('data-element').value;

    switch (inputElement) {
        case "findMethid" : 
            setFindMethod(e.target.value);
            break;
        case "userId" : 
            setInputId(e.target.value);
            break;
        case "userName" : 
            setInputName(e.target.value);
            break;
        case "userEmail" : 
            setInputEmail(e.target.value);
            break;
        case "userPhone1" : 
            setPhone1(e.target.value);
            break;
        case "userPhone2" : 
            setPhone2(e.target.value);
            break;
        case "userPhone3" : 
            setPhone3(e.target.value);
            break;
    }
  };
  const tabClickHandler = (clicked) => {
    setFindWhat(clicked);
    setFindMethod('by_email');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    let dataToSubmit = { inputName: InputName };

    if ( FindWhat == 'findPwd' ) { // 비밀번호를 찾는다
      dataToSubmit.inputId = InputId;
    } 

    if ( FindMethod == 'by_email' ) { // 이메일 방식으로
      dataToSubmit.inputEmail = InputEmail;
    } else { // 휴대전화 방식으로
      dataToSubmit.inputPhone = Phone1 + '-' + Phone2 + '-' + Phone3;
    }

    if( FindWhat == 'findId' ) {
      if ( FindMethod == 'by_email' ) dataToSubmit.flag = 1; // 아이디찾기 이메일로
      else dataToSubmit.flag = 2; // 아이디찾기 핸드폰번호로
    } else {
      if ( FindMethod == 'by_email' ) dataToSubmit.flag = 3; // 비번찾기 이메일로
      else dataToSubmit.flag = 4; // 비번찾기 핸드폰번호로
    }

    dispatch(findMemberInfo(dataToSubmit)).then(response => {
      if(response.payload.success) {
        if (response.payload.findSuccess) {
          setFirstPage(false);
          if (response.payload.flag == 1 || response.payload.flag == 2) {
            setPwdresult(false);
            setIdresult(true);
          } else {
            setIdresult(false);
            setPwdresult(true);
          }
        } else {
          alert(`${response.payload.msg}`)
        }
      } else {
        alert('아이디/비번찾기 과정에서 오류가 발생했습니다.')
        console.log('오류내용 : ', response.payload.err.errMsg);
      }
    });
  }

  return (
    <div className="container findUserInfoPage">
      {
        FirstPage 
        && (
          <>
          <h2 className="page-title">
            {FindWhat == "findId" ? "아이디 찾기" : "비밀번호 찾기"}
          </h2>
    
          <p className="tab-menu">
            <span className={FindWhat == "findId" ? "tab active" : "tab"} onClick={()=>{tabClickHandler('findId')}}>
              아이디 찾기
            </span>
            <span className={FindWhat == "findPwd" ? "tab active" : "tab"} onClick={()=>{tabClickHandler('findPwd')}}>
              비밀번호 찾기
            </span>
          </p>
    
          <form className="find-form" onSubmit={submitHandler}>
              <div className="find-way-option">
                  <input type="radio" name="way" value="by_email" id="by_email" data-element="findMethid" checked={ FindMethod == 'by_email' && 'checked' } onChange={dataInputHandler}/>
                  <label htmlFor="by_email" className="mr20">이메일</label>
                  <input type="radio" name="way" value="by_phone" id="by_phone" data-element="findMethid" checked={ FindMethod == 'by_phone' && 'checked' } onChange={dataInputHandler}/>
                  <label htmlFor="by_phone">휴대전화</label>
              </div>
            
              <div className="info-input-wrapper">
                  {
                    FindWhat == "findPwd"
                    && (
                      <>
                        <p>아이디</p>
                        <input type="text" value={InputId} data-element="userId" onChange={dataInputHandler} required/>
                      </>
                    )
                  }
                  <p>이름</p>
                  <input type="text" value={InputName} data-element="userName" onChange={dataInputHandler} required/>
    
                  {
                    FindMethod == 'by_email' 
                    ? (
                      <>
                        <p>이메일로 찾기</p>
                        <input type="email" value={InputEmail} data-element="userEmail" onChange={dataInputHandler} required/>
                      </>
                    ) 
                    : (
                      <>
                        <p>휴대전화로 찾기</p>
                        <select className="phone" value={Phone1} data-element="userPhone1" onChange={dataInputHandler}>
                          <option value="010">010</option>
                          <option value="011">011</option>
                          <option value="016">016</option>
                          <option value="017">017</option>
                          <option value="018">018</option>
                          <option value="019">019</option>
                        </select>
                        <span className='dash'>-</span>
                        <input type="number" className="phone" data-element="userPhone2" value={Phone2} onChange={dataInputHandler} required/>
    
                        <span className='dash'>-</span>
                        <input type="number" className="phone" data-element="userPhone3" value={Phone3} onChange={dataInputHandler} required/>
                      </>
                    )
                  }
                  <button className="submit-info">OK</button>
              </div>
          </form>
        </>
        )
      }
      {
        Idresult && <IdResultPage/>
      }
      {
        Pwdresult && <PwdResultPage/>
      }

    </div>
  );
}

export default FindUserInfoPage;
