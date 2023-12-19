//userController
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { hashPassword } = require('../password')
const { createToken } = require('../jwt')
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
    let { username, password, firstName, lastName, email, gender } = req.body
    try {
        //let hashedPassword = await bcrypt.hash(password, 10)
        const UserExist = await User.findOne({ email })

        if (UserExist) { 
            return res.status(403).json('user exist') }

        let hashedPassword = await hashPassword(password)
        console.log(hashedPassword)
        const user = await User.create({ username, password: hashedPassword, firstName, lastName, email, gender })
        console.log(user)
        if (!user) {
            return res.status(404).json('user not found')
        }

          return res.status(200).json( user)

    } catch (error) {
        console.log(error)
        return res.status(404).json('error')
    }

}

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({})
        return res.status(200).json({
            success: true,
            message: 'all users',
            users: users
        })
    } catch (error) {
        return res.status(404).json('error')
    }




}

const getUserbyName = async (req, res) => {
    console.log(req.params.username)

    const { username } = req.params
    const User = db.users.find(u => u.username === username)

    if (!User) {
        res.status(404).json('user not found')
    }
    res.status(200).json({
        success: true,
        message: 'user found',
        user: User
    })
}



module.exports = { getAllUsers, getUserbyName, createUser }