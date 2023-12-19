const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const { validate, loginValidation } = require('../validate')

router.post('/login', validate(loginValidation), authController.login)
router.post('/logout', authController.logout)


module.exports = router