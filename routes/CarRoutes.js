const express=require('express');

const routes=express.Router();

const CarCtl=require('../Controllers/CarControlllers');
const Car=require('../Modle/CarModel')

routes.post('/',Car.UploadImage,CarCtl.addCar)


routes.get('/showCar',CarCtl.showCar)

routes.delete('/DeleteCar',CarCtl.DeleteCar)

routes.get('/EditCar/:id',CarCtl.EditCar)

routes.put('/updateCar/:id',Car.UploadImage,CarCtl.updateCar)




module.exports=routes;