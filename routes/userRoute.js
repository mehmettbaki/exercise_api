const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { validate, UserCreateValidation } = require('../validate')


router.get('/users', userController.getAllUsers)
router.get('/users/:username', userController.getUserbyName)



router.post('/users', validate(UserCreateValidation), userController.createUser)

module.exports = router