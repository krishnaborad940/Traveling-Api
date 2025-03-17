const passport=require('passport');
const Admin = require('../Modle/adminModel');
const User = require('../Modle/userModel');
let JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt


var opts1 = {
   jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey :'User'
}


passport.use(new JwtStrategy(opts1, async function(payload, done) {
   let checkEmail=await User.findOne({email:payload.UserData.email})
   if(checkEmail){
    return done(null,checkEmail)
   }else{
    return done(null,false)
   }
}));



 


passport.serializeUser(async(user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    let findId=await Admin.findById(id)
    if(findId){
        return done(null,findId)
    }else{
        return done(null,false)
    }
})

module.exports=passport