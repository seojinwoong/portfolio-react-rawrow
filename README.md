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
![paypal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)


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
  
 ![ezgif com-gif-maker](https://user-images.githubusercontent.com/42455534/196251621-3ffc51ea-e42e-46a1-b3bc-a09a56e6719f.gif)
  
  
  #### 2. 상품업로드 기능
  관리자정보로 로그인을 하면 상품업로드 페이지에 접근할 수 있습니다. 상품사진, 상품 가격, 사이즈정보 등을 입력하면 DB에 저장되어 목록들을 확인할 수 있습니다.
  
  ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/42455534/196253389-53461e4e-f794-424f-9209-ff575503b863.gif)
  
  #### 3. 상품구매 기능
  Paypal 결제모듈을 이용하여 결제기능을 구현해보았습니다. 
  
  ![ezgif com-gif-maker](https://user-images.githubusercontent.com/42455534/196254704-b02765a6-1fc5-47de-b87f-b32eab8774c4.gif)


  
  
  
  

  
  
  
  
  
  
 
  
