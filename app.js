const express=require('express')
//const bcrypt=require('bcrypt');
const mongoose=require('mongoose')
const url ='mongodb://localhost/Assignment8'
const app=express()

mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection

con.on('open',()=>{
    console.log('connected..')
})

app.use(express.json())

const ApiRouter = require('./routes/api')
app.use('/api',ApiRouter)

app.listen(9000,()=>{
    console.log('Server started')
})