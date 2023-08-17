const Users = require('./Users')
const Orders = require('./Orders')
const Books = require('./Books')
const bookAuthors = require('./BookAuthors')
//Import all models objects
// routes.get()

// Export all objects
module.exports = {
    users: new Users(),
    orders: new Orders(),
    books: new Books(),
    authors: new bookAuthors()
}