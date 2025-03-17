const Car = require("../Modle/CarModel")
let path=require('path')
const fs=require('fs')

module.exports.addCar=async(req,res)=>{
    let newImg=''
    if(req.file){
        newImg=await Car.ImgPath+'/'+req.file.filename
    }
    req.body.Image=newImg
    let addCar=await Car.create(req.body)
    if(addCar){
        return res.status(200).json({msg:'data added successfully',data:addCar})
    }
    return res.status(200).json({msg:'added successfully'})
}

module.exports.showCar=async(req,res)=>{
 let showAllCar=await Car.find()
 if(showAllCar){
    return res.status(200).json({data:showAllCar})
 }
}

module.exports.DeleteCar=async(req,res)=>{
   console.log(req.query.delid)
let findDelId=await Car.findById(req.query.delid)

   try{
    let imagepath= path.join(__dirname,'..',findDelId.Image)
    fs.unlinkSync(imagepath);
   }catch(err){
    console.log("image not found")
   }
   
    let deleteImage=await Car.findByIdAndDelete(req.query.delid)
    if(deleteImage){
        return res.status(200).json({msg:'deleted data',data:deleteImage})
}
   }

 module.exports.EditCar=async(req,res)=>{
       let showEditData=await Car.findById(req.params.id)
       if(showEditData){
          return res.status(200).json({data:showEditData})
       }
      }
   
      
      module.exports.updateCar=async(req,res)=>{
       // console.log(req.params.id)
       // console.log(req.body)
       let showEditData=await Car.findById(req.params.id)
       if(showEditData){
         try{
           let delepath=path.join(__dirname,'..',showEditData.Image)
           fs.unlinkSync(delepath)
         }catch(err){
           console.log("iamge not found")
         }
         let newImg=''
         newImg=await Car.ImgPath+'/'+req.file.filename
         req.body.Image=newImg
         let editDetails=await Car.findByIdAndUpdate(req.params.id,req.body)
         if(editDetails){
           let details=await Car.findById(req.params.id)
           return res.status(200).json({msg:'updated successfully',data:details})
       }
         
       }else{
           req.body.Image=showEditData.Image
           let editDetails=await Car.findByIdAndUpdate(req.params.id,req.body)
           if(editDetails){
               let details=await Car.findById(req.params.id)
               return res.status(200).json({msg:'updated successfully',data:details})
           }
       }
      }