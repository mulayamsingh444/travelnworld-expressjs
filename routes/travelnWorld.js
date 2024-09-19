const express = require('express');
const { register, quote, contactUs, deleteRegisteredUser, getQuoteUsers, deleteQuoteUser, getContactUsUsers, deleteContactUsUser, getRegisteredUsers, getRegisteredUser, getQuoteUser, getContactUsUser } = require('../controller/travelnworld.js');

const travelnWorldRouter = express.Router();

module.exports = travelnWorldRouter;

travelnWorldRouter
.post('/register', register)
.get('/register', getRegisteredUsers)
.get("/register/:id", getRegisteredUser)
.delete("/register/:id", deleteRegisteredUser)

.post('/quote', quote)
.get("/quote", getQuoteUsers)
.get("/quote/:id", getQuoteUser)
.delete("/quote/:id", deleteQuoteUser)

.post('/contact-us', contactUs)
.get("/contact-us", getContactUsUsers)
.get("/contact-us/:id", getContactUsUser)
.delete("/contact-us/:id", deleteContactUsUser)

travelnWorldRouter.use("*", (req, res)=>{
    res.sendStatus(404);
  })

