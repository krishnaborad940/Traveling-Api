const express=require('express');

const routes=express.Router();

const adminCtl=require('../Controllers/adminControllers');
const passport = require('../config/passport-jwt');
const Flight = require('../Modle/FlightModel');
const Hotel = require('../Modle/HotelModel');

routes.post('/',adminCtl.register)

routes.post('/Login',adminCtl.Login)

routes.get('/showall',adminCtl.showall)

// Flight
routes.use('/flight',passport.authenticate('jwt',{failureRedirect:'/falier'}),require('./FlightRoutes'))
// car
routes.use('/car',passport.authenticate('jwt',{failureRedirect:'/falier'}),require('./CarRoutes'))

// Hotel
routes.use('/Hotel',passport.authenticate('jwt',{failureRedirect:'/falier'}),require('./HotelRoutes'))

routes.get('/falier',(req,res)=>{
    // console.log(err)
    return res.status(200).json({msg:'invalid token'})
})



module.exports=routes;