const express = require('express');
const { register, quote, contactUs } = require('../controller/travelnworld.js');

const travelnWorldRouter = express.Router();

module.exports = travelnWorldRouter;

travelnWorldRouter
.post('/register', register)
.post('/quote', quote)
.post('/contact-us', contactUs)

travelnWorldRouter.use("*", (req, res)=>{
    res.sendStatus(404);
  })

