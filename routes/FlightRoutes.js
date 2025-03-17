const express=require('express');

const routes=express.Router();

const FlightCtl=require('../Controllers/flightControollers');
const Flight=require('../Modle/FlightModel')

routes.post('/',Flight.UploadImage,FlightCtl.addFlight)


routes.get('/showFlight',FlightCtl.showFlight)

routes.delete('/DeleteFlight',FlightCtl.DeleteFlight)

routes.get('/EditFlight/:id',FlightCtl.EditFlight)

routes.put('/updateFlight/:id',Flight.UploadImage,FlightCtl.updateFlight)




module.exports=routes;