const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');
const async = require('async');

//=================================
//             User
//=================================

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        userId: req.user.userId,
        role: req.user.role,
        address: req.user.address,
        phone: req.user.phone,
        email: req.user.email,
        gender: req.user.gender === 0 ? "남" : '여',
        cart: req.user.cart,
        purchaseHistory: req.user.purchaseHistory,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
    });
});

router.post('/signUp', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

router.post('/checkId', (req, res) => {
    User.findOne({ userId: req.body.id }, (err, user) => {
        if (err) return res.status(400).json({ success: false, err });
        if (user) return res.status(200).json({ success: true, result: 'impossible' });
        else return res.status(200).json({ success: true, result: 'possible' })
    });
});

router.post("/login", (req, res) => {
    User.findOne({ userId: req.body.userId }, (err, user) => {
      if (!user)
        return res.json({
          loginSuccess: false,
          message: "해당 아이디는 존재하지 않습니다.",
        });
  
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
  
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
            userCode: user._id,
          });
        });
      });
    });
  });

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
  // 먼저, User collection에 해당 유저의 정보를 다 가져오기

  // req.body.productId; // 상품고유아이디
  // req.body.size; // 구매하려는 사이즈와 그 수량

  User.findOne({ _id: req.user._id }, 
      (err, userInfo) => {
          // 가져온 정보에서 카트에다 넣으려는 상품이 이미 들어 있는지 확인
          let flag = false;
          let itemIdx;
          userInfo.cart.forEach((item, idx) => {
              if(item.id === req.body.productId) {
                  flag = true;
                  itemIdx = idx;
              }
          });
          if (flag) {
            console.log('itemIdx', itemIdx);
            let inputSizes = req.body.sizes;
            let cartData = userInfo.cart[itemIdx].sizes;
            let newData = [];

            for (let i = 0; i < inputSizes.length; i++) {
              let isNew = true;
              for (let j = 0; j < cartData.length; j++) {
                if ( inputSizes[i].size === cartData[j].size ) {
                  newData.push({ size: cartData[j].size, amount: Number(inputSizes[i].amount) + Number(cartData[j].amount) });
                  cartData.splice(j,1);
                  isNew = false;
                } 
              }
              if (isNew) newData.push(inputSizes[i]);
            }
            newData = newData.concat(cartData);
            User.findOneAndUpdate(
              { _id: req.user._id, "cart.id": req.body.productId },
              {  
                $set: {
                    cart: {
                      id: req.body.productId,
                      sizes: newData,
                      date: Date.now()
                    } 
                  } 
              },
              { new: true },
              (err, userInfo) => {
                  if (err) return res.status(400).json({ success: false, err });
                  return res.status(200).json({ success: true, cartInfo: userInfo.cart });
              }
          )
          } else {
            User.findOneAndUpdate(
              { _id: req.user._id },
              {
                $push: {
                  cart: {
                    id: req.body.productId,
                    sizes: req.body.sizes,
                    date: Date.now()
                  }
                }
              },
              { new: true },
              (err, userInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, cartInfo: userInfo.cart });
              }
            )
          }
      })    
});



module.exports = router;