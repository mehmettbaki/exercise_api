// productController
const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            message: 'all products',
            products: products
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json('error')
    }
}

const createProduct = async (req, res) => {
    const { product_name, detail, price } = req.body

    try {
        const product =  await Product.create({product_name, detail, price})
        
        return res.status(200).json({
            success: true,
            message: 'Product created succesfully',
            product: product})

    } catch (error) {
        console.log(error)
        return res.status(404).json('error')
    }

}

module.exports = { getAllProducts, createProduct } 