const Users = require('./Users')
const Orders = require('./Orders')
const Books = require('./Books')
const bookAuthors = require('./BookAuthors')

// Export all objects
module.exports = {
    Users: new Users()
}