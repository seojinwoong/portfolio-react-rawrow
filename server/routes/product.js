const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) { 
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        
    })
});

router.post("/", (req, res) => {
    // 받아온 정보들을 DB에 넣어준다.
    const product = new Product(req.body);
    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});

router.post('/products', (req, res) => {

    // product Collection에 들어 있는 모든 상품을 가져오기
    let limit = req.body.limit ? parseInt(req.body.limit) : 16;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let category = req.body.category ? parseInt(req.body.category) : 1;
    let searchTerm = req.body.searchTerm;

    if (searchTerm) {
        Product.find({ "title": {'$regex': searchTerm, '$options': 'i'} })
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            Product.find({ "title": {'$regex': searchTerm, '$options': 'i'}})
            .skip(skip + limit).limit(limit)
            .exec((err, nextData) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true,
                    productInfo,
                    isNextDataExist: nextData.length !== 0
                });
            })
        })
    } else {
        Product.find({ category: category })
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            Product.find({ category: category })
            .skip(skip + limit).limit(limit)
            .exec((err, nextData) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true,
                    productInfo,
                    isNextDataExist: nextData.length !== 0
                });
            });
        })
    }
});

router.get('/products_by_id', (req, res) => {
    let type = req.query.type;
    let productIds = req.query.id;

    if (type === 'array') {
        let ids = req.query.id.split(',');
        productIds = ids.map(item => item);
    }
  
    Product.find({ _id: {$in: productIds} })
      .populate('writer')
      .exec((err, product) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(product);
      })
  });


module.exports = router;