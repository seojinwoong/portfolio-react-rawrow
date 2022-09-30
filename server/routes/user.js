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

module.exports = router;