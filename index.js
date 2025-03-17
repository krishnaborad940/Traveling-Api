const express=require('express')

const port=8001;

const db=require('./config/db')
const app=express();
const passport = require('./config/passport-jwt')
// const passport1 = require('./config/passpoert-jwt2')

const stratergy = require('passport-jwt')
const session=require('express-session');
const path=require('path')

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',  // React frontend ka URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.urlencoded())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/uploads/Car',express.static(path.join(__dirname,'uploads/Car')))
app.use('/uploads/Flight',express.static(path.join(__dirname,'uploads/Flight')))
app.use('/uploads/Hotel',express.static(path.join(__dirname,'uploads/Hotel')))




app.use(session({
    name:'travels',
    secret:'tb',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use(passport1.initialize())
// app.use(passport1.session())

app.use('/',require('./routes/adminRoutes'))
app.use('/user',require('./routes/UserRoutes'))


app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }
    console.log("port is connected:-"+port)
})