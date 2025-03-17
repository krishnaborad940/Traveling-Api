const express=require('express');

const routes=express.Router();

const HotelCtl=require('../Controllers/HotelControoler');
const Hotel=require('../Modle/HotelModel')

routes.post('/',Hotel.UploadImage,HotelCtl.addHotel)


routes.get('/showHotel',HotelCtl.showHotel)

routes.delete('/DeleteHotel',HotelCtl.DeleteHotel)

routes.get('/EditHotel/:id',HotelCtl.EditHotel)

routes.put('/updateHotel/:id',Hotel.UploadImage,HotelCtl.updateHotel)




module.exports=routes;