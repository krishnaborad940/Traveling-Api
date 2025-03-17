const mongoose=require('mongoose');
const multer=require('multer')
const ImagePath='/uploads/Flight'
const path=require('path')
const FlightSchema=mongoose.Schema({
    Place:{
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
    class:{
        type:String,
        required:true
    },
    Food:{
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

FlightSchema.statics.UploadImage=multer({storage:iamgeStorage}).single('Image')
FlightSchema.statics.ImgPath=ImagePath

let Flight=mongoose.model("Flight",FlightSchema)

module.exports=Flight