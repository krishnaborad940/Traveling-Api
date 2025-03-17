const passport=require('passport');
const Admin = require('../Modle/adminModel');
let JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt


var opts = {
   jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey :'admin'
}


passport.use(new JwtStrategy(opts, async function(payload, done) {
   let checkEmail=await Admin.findOne({email:payload.admindata.email})
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