const passport = require('passport');
const Admin = require('../Modle/adminModel');
const User = require('../Modle/userModel');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// 🔵 Admin JWT Strategy
const adminOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'admin'
};

passport.use( new JwtStrategy(adminOpts, async function (payload, done) {
    try {
        let checkAdmin = await Admin.findOne({ email: payload.admindata.email });
        if (checkAdmin) {
            return done(null, checkAdmin);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

// 🔵 User JWT Strategy
const userOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'User'
};

passport.use('user-rule', new JwtStrategy(userOpts, async function (payload, done) {
    try {
        let checkUser = await User.findOne({ email: payload.UserData.email });
        if (checkUser) {
            return done(null, checkUser);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

// 🔵 Serialize & Deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let findAdmin = await Admin.findById(id);
    if (findAdmin) {
        return done(null, findAdmin);
    } else {
        let findUser = await User.findById(id);
        if (findUser) {
            return done(null, findUser);
        } else {
            return done(null, false);
        }
    }
});

module.exports = passport;
