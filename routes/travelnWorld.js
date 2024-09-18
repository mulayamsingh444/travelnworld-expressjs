const express = require('express');
const { register, quote, contactUs, deleteRegisteredUser, getQuoteUsers, deleteQuoteUser, getContactUsUsers, deleteContactUsUser, getRegisteredUsers } = require('../controller/travelnworld.js');

const travelnWorldRouter = express.Router();

module.exports = travelnWorldRouter;

travelnWorldRouter
.post('/register', register)
.get('/register', getRegisteredUsers)
.delete("/register/:id", deleteRegisteredUser)

.post('/quote', quote)
.get("/quote", getQuoteUsers)
.delete("/quote/:id", deleteQuoteUser)

.post('/contact-us', contactUs)
.get("/contact-us", getContactUsUsers)
.delete("/contact-us/:id", deleteContactUsUser)

travelnWorldRouter.use("*", (req, res)=>{
    res.sendStatus(404);
  })

