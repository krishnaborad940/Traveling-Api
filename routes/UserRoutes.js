const express=require('express');

const routes=express.Router();

const UserCtl=require('../Controllers/UserConroller');
const passport = require('../config/passport-jwt');

routes.post('/',UserCtl.register)

routes.post('/Login',UserCtl.Login)


routes.get('/allUser',UserCtl.allUser)

// routes.get('/showall',adminCtl.showall)

routes.get('/falier',(req,res)=>{
    return res.status(200).json({msg:'invalid token'})
})



module.exports=routes;