const {sign,verify} = require('jsonwebtoken')
require('dotenv').config()

function createToken(user){
    return sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass
    },process.env)
}

// function veryfyToken(res, res, next){
//     const token = req.headers["authorization"].
// }

module.exports = {
    createToken
}