const Admin = require('../Modle/adminModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Hotel = require('../Modle/HotelModel')
const Car = require('../Modle/CarModel')
const Flight = require('../Modle/FlightModel')

module.exports.register = async (req, res) => {
    try{
        let checkemail=await Admin.findOne({email:req.body.email})
        if(!checkemail){
           if(req.body.password==req.body.confirmPassword){
            req.body.password=await bcrypt.hash(req.body.password,10)
                let addregister=await Admin.create(req.body)
            return res.status(400).json({msg:"register successfully",data:addregister})

            } 
        }else{
            return res.status(400).json({msg:"Email already exists"})

        }
    }catch(err){
        console.log("somthing went wrong")
            return res.status(400).json({msg:"Email already exists"})

    }
};


module.exports.Login=async(req,res)=>{

    let checkEmail=await Admin.findOne({email:req.body.email})

    if(checkEmail){
        // let checkpass=await bcrypt.compare(req.body.password,checkEmail.password)
        // if(checkpass){
            let adminToken=await jwt.sign({admindata:checkEmail},'admin')
    return res.status(200).json({msg:'login successfully',data:adminToken})

        // }
    }else{

        return res.status(200).json({msg:'not email'})
    }
}

module.exports.showall = async (req, res) => {
    try {
        let showAllHotels = await Hotel.find();
        let showAllCars = await Car.find();
        let showAllFlights = await Flight.find();

        return res.status(200).json({
            data: {
                hotels: showAllHotels,
                cars: showAllCars,
                flights: showAllFlights
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};