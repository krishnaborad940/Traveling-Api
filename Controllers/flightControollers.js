const Flight = require("../Modle/FlightModel")

const fs=require('fs')
const path=require('path')

module.exports.addFlight=async(req,res)=>{
    // console.log(req.body)
    let newImg=''
    if(req.file){
        newImg=await Flight.ImgPath+'/'+req.file.filename
    }
    req.body.Image=newImg
    let addFlights=await Flight.create(req.body)
    if(addFlights){
        return res.status(200).json({msg:'data added successfully',data:addFlights})
    }
}

module.exports.showFlight=async(req,res)=>{
 let showAllFlight=await Flight.find()
 if(showAllFlight){
    return res.status(200).json({data:showAllFlight})
 }
}

module.exports.DeleteFlight=async(req,res)=>{
   console.log(req.query.delid)
let findDelId=await Flight.findById(req.query.delid)

   try{
    let imagepath= path.join(__dirname,'..',findDelId.Image)
    fs.unlinkSync(imagepath);
   }catch(err){
    console.log("image not found")
   }
   
    let deleteImage=await Flight.findByIdAndDelete(req.query.delid)
    if(deleteImage){
        return res.status(200).json({msg:'deleted data',data:deleteImage})
}
   }


   module.exports.EditFlight=async(req,res)=>{
    let showEditData=await Flight.findById(req.params.id)
    if(showEditData){
       return res.status(200).json({data:showEditData})
    }
   }

   
   module.exports.updateFlight=async(req,res)=>{
    // console.log(req.params.id)
    // console.log(req.body)
    let showEditData=await Flight.findById(req.params.id)
    if(showEditData){
      try{
        let delepath=path.join(__dirname,'..',showEditData.Image)
        fs.unlinkSync(delepath)
      }catch(err){
        console.log("iamge not found")
      }
      let newImg=''
      newImg=await Flight.ImgPath+'/'+req.file.filename
      req.body.Image=newImg
      let editDetails=await Flight.findByIdAndUpdate(req.params.id,req.body)
      if(editDetails){
        let details=await Flight.findById(req.params.id)
        return res.status(200).json({msg:'updated successfully',data:details})
    }
      
    }else{
        req.body.Image=showEditData.Image
        let editDetails=await Flight.findByIdAndUpdate(req.params.id,req.body)
        if(editDetails){
            let details=await Flight.findById(req.params.id)
            return res.status(200).json({msg:'updated successfully',data:details})
        }
    }
   }