const express = require('express');
const router = express.Router();

//authentication middleware
// const authMiddleware = require('./middleware/authMiddleware')
const authMiddleware= require('../middleware/authMiddleware')

// user controllers
const{register,login,checkUser} = require('../controller/userController')

// register user
router.post("/register",register)

// login user
router.post("/login",login);

// check route
router.get("/check",authMiddleware,checkUser);

module.exports=router
