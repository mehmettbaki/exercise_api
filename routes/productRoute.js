const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const { authenticateToken } = require('../jwt')
const { route } = require('./userRoute')
const { validate, createProductValidation } = require('../validate')

router.get('/products', authenticateToken, productController.getAllProducts)
router.post('/products', authenticateToken, validate(createProductValidation), productController.createProduct)


module.exports = router