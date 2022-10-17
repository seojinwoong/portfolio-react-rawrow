# 리액트를 활용한 쇼핑몰 프로젝트
#### 리액트를 중심으로, 프론트와 백엔드 모두 작업을 해본 쇼핑몰 프로젝트입니다.
[프로젝트 보러가기](https://stormy-hamlet-84446.herokuapp.com/)

![rawrowmovie](https://user-images.githubusercontent.com/42455534/196243737-84ef11df-f09e-4ff0-bf93-1c4129b36a00.gif)

## 사용한 기술스택
![JAVASCRIPT](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![REDUX](	https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![mongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)


## 구조 요약
  #### 🔳 Component
  
    • MainPage.js => 메인페이지.
    
    • SignUpPage.js => 회원가입페이지.
    
    • LoginPage.js => 로그인페이지.
    
    • FindUserInfoPage.js => 아이디/비밀번호 찾기페이지.
    
    • SearchResultPage.js => 상품검색결과 페이지.
    
    • ProductUploadPage.js => 상품업로드페이지. 관리자 계정으로만 접근가능한 페이지이며 상품사진과 상세정보를 입력하고 저장하면 실제 상품목록페이지에 반영이 됩니다. 
      
    • ShopPage.js => 상품목록페이지. 업로드한 상품목록이 나오는 부분입니다.
    
    • ProductDetailPage.js => 상품상세정보페이지. 업로드한 상품 상세정보가 나오는 부분입니다.
    
    • CartPage.js => 장바구니페이지. 장바구니에 담은 상품목록이 나오는 부분입니다. 삭제 또는 구매까지 할 수 있습니다.           
    
    • PurchaseHistoryPage.js => 상품구매내역페이지. 구매한 상품의 히스토리가 나옵니다.
    
    • auth.js => 로그인 여부, 유저권한을 체크하는 인증관련 hoc(higher-order component).
    
    • NotFoundPage.js => 404페이지.
    
  
  #### 🔳 redux
  
    • _reducers/user_reducer.js => 회원과 관련된 reducer 함수들을 정리한 파일입니다.
    
    • _actions/user_actions.js => 회원과 관련된 action 함수들을 정리한 파일입니다.
    • _actions/types.js => action의 타입명을 상수로 관리하는 파일입니다.
    
 #### 🔳 backend(server 폴더)
  
    • models => DB의 schema를 정의한 폴더입니다.
      (회원정보: User.js / 상품정보: Product.js / 결제정보: Payment.js)
    • routes => api 기능을 정의한 폴더입니다.
    
     
    
 
 ## 기능 소개
  #### 1. 회원의 페이지접근권한을 파악하는 hoc 컴포넌트
  페이지의 성격에 따라 회원만 접근가능한 페이지, 혹은 관리자만 접근가능한 페이지가 있습니다.
  로그인 여부, 유저권한 등을 체크하는 hoc컴포넌트를 만들어서 모든 페이지의 인증을 체크하도록 했습니다. 
  
 
  
  
  #### 2. 스켈레톤 UI와 lazy loading
  영화 정보를 불러오는 API요청을 한 후에 응답을 받고 그 data를 화면에 뿌려주기까지 일정시간이 걸리는데, 그 사이에 빈화면을 보여준다면
  사용자 입장에서 진행이 더디다는 느낌을 주게 됩니다. 그러한 점을 방지하고자 화면을 구성할 동안 로딩이 되는 스켈레톤 UI를 작업하였습니다.
  그리고 사용자가 페이지의 특정부분을 접근한 순간에 data를 받아오는 lazy loading 기능도 적용해 보았습니다.
  
  ![ezgif com-gif-maker](https://user-images.githubusercontent.com/42455534/196240732-47ed28e0-e287-4081-a706-d554053e5ea4.gif)

  
  
  
  

  
  
  
  
  
  
 
  
