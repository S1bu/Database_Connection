const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();

const { veryfyToken } = require('../middleware/AuthenticateUser');
// const {users, books,authors,orders} = require('../model')


//----import all model objects----
const { users } = require("../model");
const { orders } = require("../model");
const { books } = require("../model");
const { bookauthors } = require("../model")

//--------------------------------------
//----------------------------------------------------
//-----------routing to USERS-----------------------
//fetch all user
routes.get("/users", (req, res) => {
  users.fetchUsers(req, res);
});
//fetch 1 user
routes.get("/user/:id", (req, res) => {
  users.fetchUser(req, res);
});
//register user
routes.post("/register", bodyParser.json(), (req, res) => {
  users.register(req, res);
});
//update user
routes.patch("/users/:id", bodyParser.json(), (req, res) => {
  users.updateUser(req, res);
});
//delete user
routes.delete("/user/:id", (req, res) => {
  users.deleteUser(req, res);
});
//login a user 
routes.post("/login", bodyParser.json(), (req, res) => {
    users.login(req, res);
  });
//--------------------------------------------------
//-----------routing to ORDERS-----------------------
//get all order
routes.get("/orders", (req, res) => {
  orders.fetchOrders(req, res);
});
//getting one order
routes.get("/order/:id", (req, res) => {
  orders.fetchOrder(req, res);
});
//delete user
routes.delete("/order/:id", (req, res) => {
  orders.deleteOrder(req, res);
});
//update user
routes.patch("/orders/:id", bodyParser.json(), (req, res) => {
  orders.updateOrder(req, res);
});
//---------------------------------------------------
//-----------routing to BOOKS-----------------------
// routes.get('/books',verifyToken,)
//get all order
routes.get("/books", (req, res) => {
  books.fetchBooks(req, res);
});
// getting one order
routes.get("/book/:id", (req, res) => {
  books.fetchBook(req, res);
});
// delete user
routes.delete("/book/:id", (req, res) => {
  books.deleteBook(req, res);
});
// update user
routes.patch("/book/:id", bodyParser.json(), (req, res) => {
  books.updateBook(req, res);
});
//---------------------------------------------------
//-----routing to bookaurthor------
routes.get("/bookauthors",(req, res) => {
  bookauthors.fetchBookAuthors(req, res);
});


module.exports = {
  express,
  routes,
}