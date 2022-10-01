const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        maxlength: 50
    },
    category: {
        type: Number, //  1 : 가방, 2: 안경, 3: 의류
        default: 1
    },
    description: {
        type: String
    },
    caution: {
        type: String
    },
    price: {
        type: String,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    size: {
        type: Array
    }
}, { timestamps: true })

productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }