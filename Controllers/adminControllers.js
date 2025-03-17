const Admin = require('../Modle/adminModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Hotel = require('../Modle/HotelModel')
const Car = require('../Modle/CarModel')
const Flight = require('../Modle/FlightModel')

module.exports.register = async (req, res) => {
    try {
        if (!req.body.password || !req.body.confirmpassword) {
            return res.status(400).json({ msg: "Password fields are required" });
        }

        let checkEmail = await User.findOne({ email: req.body.email });

        if (!checkEmail) {
            if (req.body.password === req.body.confirmpassword) {
                const checkpass = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({ username, email, password });
                await newUser.save();
                let addUser = await User.create({
                    ...req.body,  
                    password: checkpass,  // 👈 Save hashed password
                });

                return res.status(200).json({ msg: 'Added successfully', data: addUser });
            } else {
                return res.status(400).json({ msg: "Password and Confirm Password do not match" });
            }
        } else {
            return res.status(400).json({ msg: "Email already exists" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
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