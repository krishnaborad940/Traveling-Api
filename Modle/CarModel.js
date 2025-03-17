const mongoose=require('mongoose');
const multer=require('multer')
const ImagePath='/uploads/Car'
const path=require('path')
const CarSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
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
    Price:{
        type:String,
        required:true
    },
    CarType:{
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

CarSchema.statics.UploadImage=multer({storage:iamgeStorage}).single('Image')
CarSchema.statics.ImgPath=ImagePath

let Car=mongoose.model("Car",CarSchema)

module.exports=Car