import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signUpUser, checkId } from '../../../_actions/user_actions';
import './Sections/SignUpPage.css';

// fontawesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [IdConfirm, setIdConfirm] = useState(0);
  const [MemberId, setMemberId] = useState('');
  const [MemberPwd, setMemberPwd] = useState('');
  const [MemberPwd2, setMemberPwd2] = useState('');
  const [MemberName, setMemberName] = useState('');
  const [MemberAddress, setMemberAddress] = useState('');
  const [MemberEmail, setMemberEmail] = useState('');
  const [MemberGender, setMemberGender] = useState(0);
  const [Phone1, setPhone1] = useState('010');
  const [Phone2, setPhone2] = useState('');
  const [Phone3, setPhone3] = useState('');

  const phoneInputHandler = useCallback((e) => {
    let phoneInput = e.target.attributes.getNamedItem('data-phone').value;
    let maxLength = e.target.attributes.getNamedItem('data-maxlength').value;
    if (e.target.value.length > maxLength) e.target.value = e.target.value.slice(0, maxLength);

    if (phoneInput == 2) { 
      setPhone2(e.target.value); 
    } else if (phoneInput == 3) { setPhone3(e.target.value); }
  }, [Phone2, Phone3]);

  const idConfirmHandler = useCallback(() => {
    if (MemberId.trim() != "") {
      dispatch(checkId({id: MemberId})).then(response => {
        if (response.payload.success) {
          if (response.payload.result == 'possible') setIdConfirm(3);
          else setIdConfirm(2);
        } else {
          alert('아이디 중복검사 하는 과정을 실패하였습니다.');
        }
      })
    } else {
      setIdConfirm(1);
    }
  }, [MemberId]);

  const idHandler = useCallback((e) => {
    setMemberId(e.target.value);
  }, []);
  
  const pwdHandler = useCallback((e) => {
    setMemberPwd(e.target.value);
  }, []);
  
  const pwdHandler2 = useCallback((e) => {
    setMemberPwd2(e.target.value);
  }, []);
  
  const nameHandler = useCallback((e) => {
    setMemberName(e.target.value);
  }, []);
  
  const addressHandler = useCallback((e) => {
    setMemberAddress(e.target.value);
  }, []);
  
  const phoneSelectHandler = useCallback((e) => {
    setPhone1(e.target.value);
  }, []);
  
  const emailHandler = useCallback((e) => {
    setMemberEmail(e.target.value);
  }, []);
  
  const genderHandler = useCallback((e) => {
    setMemberGender(e.target.value);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (IdConfirm != 3) {
      alert('아이디 중복확인 검사를 통과해주세요');
      document.querySelector('#memberId').focus();
      return false;
    } 

    if (MemberPwd !== MemberPwd2) {
      alert('비밀번호가 일치하지 않습니다.');
      document.querySelector('#memberPwd2').focus();
      return false;
    }
    
    const body = {
      userId: MemberId,
      password: MemberPwd,
      name: MemberName,
      address: MemberAddress,
      phone: Phone1 + '-' + Phone2 + '-' + Phone3,
      email: MemberEmail,
      gender: MemberGender
    };

    dispatch(signUpUser(body)).then(response => {
      if (response.payload.success) {
        navigate('/signUp/success');
      } else {
        alert('회원가입 과정에서 오류가 발생했습니다.')
        console.log('오류내용 : ', response.payload.err);
      }
    })


  }
  return (
    <div className="container">
      <h2 className="page-title">회원가입</h2>

      <form className="signup-form" onSubmit={submitHandler}>
        <p className="row">
          <label htmlFor="memberId">아이디 <FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <input type="text" id="memberId" className="common-input" placeholder='아이디를 입력해주세요.' required onChange={idHandler} value={MemberId} autoComplete='on'/>
          <button type="button" className="confirm-btn" onClick={idConfirmHandler}>중복확인</button>
          {IdConfirm === 1 && <span className="info-text not-allow">아이디를 입력해주세요.</span>}
          {IdConfirm === 2 && <span className="info-text not-allow">이미 존재하는 아이디입니다.</span>}
          {IdConfirm === 3 && <span className="info-text allow">사용 가능한 아이디입니다.</span>}
        </p>
        <p className="row">
          <label htmlFor="memberPwd">비밀번호 <FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <input type="password" id="memberPwd" className="common-input" placeholder="비밀번호를 입력해주세요.(최소 5자 이상)" minLength='5' required onChange={pwdHandler} value={MemberPwd} autoComplete='on'/>
        </p>
        <p className="row">
          <label htmlFor="memberPwd2">비밀번호 확인<FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <input type="password" id="memberPwd2" className="common-input" placeholder="비밀번호를 입력해주세요." required onChange={pwdHandler2} value={MemberPwd2} autoComplete='on'/>
        </p>
        <p className="row">
          <label htmlFor="memberName">이름<FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <input type="text" id="memberName" className="common-input" required onChange={nameHandler} value={MemberName} autoComplete='on'/>
        </p>
        <p className="row">
          <label htmlFor="memberAddress">주소<FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <input type="text" id="memberAddress" className="common-input" required onChange={addressHandler} value={MemberAddress} autoComplete='on'/>
        </p>
        <p className="row">
          <label>휴대전화<FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <select className="common-input phone phone-1" required onChange={phoneSelectHandler} value={Phone1}>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>
          <span className='dash'>-</span>
          <input type="number" className="common-input phone phone-2" onChange={phoneInputHandler} data-maxlength="4" data-phone="2" value={Phone2} required autoComplete='on'/>
          <span className='dash'>-</span>
          <input type="number" className="common-input phone phone-3" onChange={phoneInputHandler} data-maxlength="4" data-phone="3" value={Phone3} required autoComplete='on'/>
        </p>
        <p className="row">
          <label htmlFor="memberEmail">이메일<FontAwesomeIcon icon={faStarOfLife} className="require"/></label>
          <input type="email" id="memberEmail" className="common-input" required onChange={emailHandler} value={MemberEmail} autoComplete='on'/>
        </p>
        <p className="row">
          <label>성별</label>
          <span className="radio-row common-input">
            <input type="radio" name="gender" value="0" id="0" className="mr5" checked={MemberGender == 0 ? 'checked' : ''} onChange={genderHandler}/>
            <label htmlFor="0" className="gender-txt mr10">남자</label>
            <input type="radio" name="gender" value="1" id="1" className="mr5" checked={MemberGender != 0 ? 'checked' : ''} onChange={genderHandler}/>
            <label htmlFor="1" className="gender-txt">여자</label>
          </span>
        </p>

        <button className="submit-btn">회원가입</button>
      </form>
    </div>
  );
};


export default SignUpPage;
