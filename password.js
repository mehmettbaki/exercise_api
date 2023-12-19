const bcrypt = require('bcrypt')


const hashPassword = async (password)=>{

    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        return null
    }
}

const comparePassword = async (password, hashedPassword)=>{
try {
    const isOK = await bcrypt.compare(password, hashedPassword)
    console.log(isOK)
    return isOK
} catch (error) {
    return false
}

}


module.exports = {hashPassword, comparePassword}