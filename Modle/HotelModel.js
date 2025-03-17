const mongoose=require('mongoose');
const multer=require('multer')
const ImagePath='/uploads/Hotel'
const path=require('path')
const HotelSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },  
    Price:{
        type:String,
        required:true
    },
     Rating:{
        type:String,
        required:true
    },
    MobileNo:{
        type:String,
        required:true
    },
  
    RoomType:{
        type:String,
        required:true
    },
    BreckFast:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{Timestamp:true})

let iamgeStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

HotelSchema.statics.UploadImage=multer({storage:iamgeStorage}).single('Image')
HotelSchema.statics.ImgPath=ImagePath

let Hotel=mongoose.model("Hotel",HotelSchema)

module.exports=Hotel