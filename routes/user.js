const express = require('express');
const { getAllusers, getCurrentUser, updateCurrentUser, deleteUser} = require("../controller/user.js");
const userRouter = express.Router();



module.exports = userRouter;

userRouter
.get('/', getAllusers)
.get('/user', getCurrentUser)
.patch('/user', updateCurrentUser);

userRouter.use("*", (req, res)=>{
    res.sendStatus(404);
  })

