//authController
const { createToken } = require('../jwt')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { comparePassword} = require('../password')

const register = async (req, res) => {
    return res.json('not implemented')

}

const login = async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    try {

        const user = await User.findOne({ username: username })
        console.log(typeof(user))
        if (!user) { return res.status(200).json('please register before login') }
        console.log(user)
        const passwordTrue =await comparePassword(password, user.password)

        console.log(passwordTrue)

        if (!passwordTrue) { return res.status(403).json('user password false') }
        
        const token = await createToken(user)

        return res.status(200).json({
            success: true,
            message: 'user has been logged in succesfully',
            token: token
           })

    } catch (error) {
        console.log(error)
        return res.status(400).json('login error occurred')
    }



}

const logout = async (req, res) => {
    return res.json('not implemented')

}


module.exports = { register, login, logout }