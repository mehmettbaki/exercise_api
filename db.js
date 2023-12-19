const mongoose = require('mongoose')
require('dotenv').config()

const connectdb = async () => {

    try {
        await mongoose.connect(`mongodb+srv://usermehmet:${process.env.MONGO_PASSWORD}@dbname.bamd1su.mongodb.net/?retryWrites=true&w=majority`);
        console.log('mongodb bağlandık')

    } catch (error) {
        console.log(error)
        console.log('db connection has been failed.')
    }

}

module.exports = connectdb