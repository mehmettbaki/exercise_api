//json web token 
const jwt = require('jsonwebtoken');
require('dotenv').config()


const createToken = (user) => {
    return jwt.sign({username:user.username}, process.env.JWT_SECRET, { expiresIn: '1800s' })
}


const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json('please login')

try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    console.log(req.user.username)

    next()
} catch (error) {
    return res.status(403).json('login error')
}
}



module.exports = { authenticateToken, createToken }