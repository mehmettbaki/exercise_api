const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
    product_name: String,
    detail: String,
    price: String

})

const Product = mongoose.model('Product', productSchema)

module.exports= Product