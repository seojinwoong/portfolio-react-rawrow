const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const async = require('async');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

router.post("/changePwd", (req, res) => {
  
  const pwd = req.body.changePwd;
  bcrypt.hash(pwd, saltRounds, (err, encryptedPW) => {
    if (err) return res.status(400).json({ success: false, err });
    User.findOneAndUpdate(
      { _id: req.body.userKey },
      { $set: { password: encryptedPW } },
      { new: false },
      (err, userInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
      }
    )
  });
});

router.post("/findMemberInfo", (req, res) => {
  let flag = req.body.flag;
  let info = {};
  if (flag == 1) info = { email: req.body.inputEmail, name: req.body.inputName }
  else if (flag == 2) info = { name: req.body.inputName, phone: req.body.inputPhone }
  else if (flag == 3) info = { userId: req.body.inputId, email: req.body.inputEmail, name: req.body.inputName }
  else if (flag == 4) info = { userId: req.body.inputId, phone: req.body.inputPhone, name: req.body.inputName }
  
  User.findOne(info, (err, user) => {
    if (err) return res.status(400).json({ success: false, err });
    if (!user) return res.json({ success: true, findSuccess: false, msg: '일치하는 계정 정보가 없습니다.' })
    return res.status(200).json({ success: true, findSuccess: true, user, flag })
  })
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
                    "cart.$": {
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

router.get('/removeFromCart', auth, (req, res) => {
  // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
  User.findOneAndUpdate(
      { _id: req.user._id },
      {
          "$pull": { "cart": {"id": req.query.id} }
      },
      { new: true },
      (err, userInfo) => {
          let cart = userInfo.cart;
          let array = cart.map(item => {
              return item.id
          });

          Product.find({ _id: {$in: array} })
          .populate('writer')
          .exec((err, productInfo) => {
              return res.status(200).json({
                  productInfo,
                  cart
              })
          })
      }
  )

  // 그 다음, product Collection에서 현재 남아있는 cart 상품들의 정보를 가져오기
}); 

router.get('/removeAllCart', auth, (req, res) => {
  // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
  User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { cart: [] } },
      { new: true },
      (err, userInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
      }
  )

  // 그 다음, product Collection에서 현재 남아있는 cart 상품들의 정보를 가져오기
}); 

router.post('/successBuy', auth, (req, res) => {
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
        productThumb: item.images[0],
        dateOfPurchase: Date.now(),
        name: item.title,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentData.paymentID
    });
  });

  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { purchaseHistory: history }, $set: { cart: [] } },
    { new: true },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, paymentInfo) => {
        if (err) return res.json({ success: false, err });

        let products = [];
        paymentInfo.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity })
        });

        async.eachSeries(products, (item, callback) => {
          let totalSold = item.quantity.reduce((a, b) => a + b.amount, 0);

          Product.update(
            { _id: item.id },
            {
              $inc: {
                "sold": totalSold
              }
            },
            { new: false },
            callback
          )
        }, (err) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).json({
            success: true,
            cart: userInfo.cart,
            cartDetail: []
          })
        })
      })
    }
  )
});


module.exports = router;