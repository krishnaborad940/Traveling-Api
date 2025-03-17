const Hotel = require("../Modle/HotelModel")
const fs=require('fs')
const path=require('path')

module.exports.addHotel=async(req,res)=>{
    let newImg=''
    if(req.file){
        newImg=await Hotel.ImgPath+'/'+req.file.filename
    }
    req.body.Image=newImg
    let addHotel=await Hotel.create(req.body)
    if(addHotel){
        return res.status(200).json({msg:'data added successfully',data:addHotel})
    }
    return res.status(200).json({msg:'added successfully'})
}

module.exports.showHotel=async(req,res)=>{
 let showAllHotel=await Hotel.find()
 if(showAllHotel){
    return res.status(200).json({data:showAllHotel})
 }
}

module.exports.DeleteHotel=async(req,res)=>{
   console.log(req.query.delid)
let findDelId=await Hotel.findById(req.query.delid)

   try{
    let imagepath= path.join(__dirname,'..',findDelId.Image)
    fs.unlinkSync(imagepath);
   }catch(err){
    console.log("image not found")
   }
   
    let deleteImage=await Hotel.findByIdAndDelete(req.query.delid)
    if(deleteImage){
        return res.status(200).json({msg:'deleted data',data:deleteImage})
}
   }

 module.exports.EditHotel=async(req,res)=>{
       let showEditData=await Hotel.findById(req.params.id)
       if(showEditData){
          return res.status(200).json({data:showEditData})
       }
      }
   
      
      module.exports.updateHotel=async(req,res)=>{
       // console.log(req.params.id)
       // console.log(req.body)
       let showEditData=await Hotel.findById(req.params.id)
       if(showEditData){
         try{
           let delepath=path.join(__dirname,'..',showEditData.Image)
           fs.unlinkSync(delepath)
         }catch(err){
           console.log("iamge not found")
         }
         let newImg=''
         newImg=await Hotel.ImgPath+'/'+req.file.filename
         req.body.Image=newImg
         let editDetails=await Hotel.findByIdAndUpdate(req.params.id,req.body)
         if(editDetails){
           let details=await Hotel.findById(req.params.id)
           return res.status(200).json({msg:'updated successfully',data:details})
       }
         
       }else{
           req.body.Image=showEditData.Image
           let editDetails=await Hotel.findByIdAndUpdate(req.params.id,req.body)
           if(editDetails){
               let details=await Hotel.findById(req.params.id)
               return res.status(200).json({msg:'updated successfully',data:details})
           }
       }
      }