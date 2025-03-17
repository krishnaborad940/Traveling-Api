const User = require("../Modle/userModel")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
module.exports.register=async(req,res)=>{
    let checkEmail=await User.findOne({email:req.body.email})

    if(!checkEmail){
        if(req.body.password==req.body.confirmpassword){
            const checkpass=await bcrypt.hash(req.body.password,10)
            if(checkpass){
                let addUser= await User.create(req.body)
                if(addUser){
                    return res.status(200).json({msg:'added succesfully',data:addUser})
                }else{
        return res.status(200).json({msg:"admindata is not add"})

                }
            }
        }else{
        return res.status(200).json({msg:"password and confirm password is not match"})

        }
    }else{
        return res.status(200).json({msg:"email is already exists"})
    }
    


   
}

module.exports.Login=async(req,res)=>{

    let checkEmail=await User.findOne({email:req.body.email})

    if(checkEmail){
        let userToken=await jwt.sign({UserData:checkEmail},'User')
        return res.status(200).json({msg:'login successfully',data:userToken})
    }else{

        return res.status(200).json({msg:'not email'})
    }
}


module.exports.allUser=async(req,res)=>{
    let allUsers=await User.find()
    return res.status(200).json({data:allUsers})
}