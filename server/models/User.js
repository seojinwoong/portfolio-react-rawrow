const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    userId: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    role : {
        type: Number,
        default: 0 // 0 : 일반회원, 1: 관리자
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        default: 0 // 0 : 남자, 1: 여자
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    },
    cart: {
        type: Array,
        default: []
    },
    purchaseHistory: {
        type: Array,
        default: []
    }
});

userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }