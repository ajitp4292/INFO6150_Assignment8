const express=require('express')
const router=express.Router()


const Api=require('../models/api')

router.get('/',async(req,res)=>{
   try{
const api=await Api.find()
res.json(api)
   }
   catch(err){
res.send('Error'+ err)
   }
})

// GET ONE
router.get('/:id',async(req,res)=>{
   try{
const api=await Api.findById(req.params.id)
res.json(api)
   }
   catch(err){
res.send('Error'+ err)
   }
})


/*router.get('/:email',async(req,res)=>{
   try{
const api=await Api.findOne(req.params.email)
res.json(api)
   }
   catch(err){
res.send('Error'+ err)
   }
})*/

router.post('/',async(req,res)=> {
const api= new Api({
    fullname:req.body.fullname,
    email:req.body.email,
    password:req.body.password
   
})
try{
   //const a1= await api.save()
   
   var pass=api.password
   var useremail=api.email
   var username=api.fullname
   var useremail_regex=/([\w\.]+)@([\w\.]+)\.(\w+)/
   var regfullname = /^[a-zA-Z]+$/;
   var passboolean
   var emailboolean
   var fullnameboolean
   //console.log(pass)
   if(regfullname.test(username)){
      fullnameboolean="TRUE"  
      console.log("fullname pass")
   }else{
      fullnameboolean="FALSE"
     // res.status(201).json({code:201,message:"fullname is invalid,only characters are allowed"})
      console.log("fullname fail")
   }
   
  if(useremail_regex.test(useremail)){
   emailboolean="TRUE"  
   console.log("email pass")
   }
   else{
   emailboolean="FALSE"
   //res.status(202).json({code:202,message:"Emailid is invalid"})
   console.log("email fail")
  }

  if (pass.match(/[a-z]/g) && pass.match(
   /[A-Z]/g) && pass.match(
   /[0-9]/g) && pass.match(
   /[^a-zA-Z\d]/g) && pass.length >= 8){
      
   console.log("password pass")
    passboolean="TRUE"
   }

     else{
      passboolean="FALSE"
      console.log("password failed")
     // res.status(203).json({code:203,message:"Password should have atleast one Uppercase and one Lowercase character,one digit,one Special character and minimum 8 characters"})
     }  

     if (fullnameboolean=="FALSE"){
      console.log("name")
      console.log(fullnameboolean)
       res.status(201).json({code:201,message:"fullname is invalid,only characters are allowed"})
            }

           else if (emailboolean=="FALSE"){
            console.log("email")
           res.status(202).json({code:202,message:"Emailid is invalid"})
           }

           else{if(passboolean=="FALSE"){
            console.log("password")
           res.status(203).json({code:203,message:"Password should have atleast one Uppercase and one Lowercase character,one digit,one Special character and minimum 8 characters"})
            }}


    if (passboolean=="TRUE" && emailboolean=="TRUE" && fullnameboolean=="TRUE"){
      const bcrypt=require('bcrypt');
      const salt=await bcrypt.genSalt(10)
      api.password=await bcrypt.hash(api.password,salt)
   const a1= await api.save()
   res.status(200).json({code:200,message:"User added Successfully",newUser:a1})
   
  }

  // res.json(a1)
   //res.status(200).json({code:200,message:"User added Successfully",newUser:a1})
}
catch(err){
  res.send('Error')
}


})

router.put('/:id',async(req,res)=>{
   var id=req.params.id;
   try{
   const api= await Api.findById(id)
   api.fullname=req.body.fullname
   api.password=req.body.password
   var usernm=api.fullname
   var userpass=api.password
   var regfullname = /^[a-zA-Z]+$/;
   var fullnameboolean
   var passboolean
   if(regfullname.test(usernm)){
      fullnameboolean="TRUE"  
      console.log("fullname pass")
   }else{
      fullnameboolean="FALSE"
     // res.status(201).json({code:201,message:"fullname is invalid,only characters are allowed"})
      console.log("fullname fail")
   }
   if (userpass.match(/[a-z]/g) && userpass.match(
      /[A-Z]/g) && userpass.match(
      /[0-9]/g) && userpass.match(
      /[^a-zA-Z\d]/g) && userpass.length >= 8){
         
      console.log("password pass")
       passboolean="TRUE"
      }
   
        else{
         passboolean="FALSE"
         console.log("password failed")
        // res.status(203).json({code:203,message:"Password should have atleast one Uppercase and one Lowercase character,one digit,one Special character and minimum 8 characters"})
        }
        
        if (fullnameboolean=="FALSE"){
         console.log("name")
         console.log(fullnameboolean)
          res.status(201).json({code:201,message:"fullname is invalid,only characters are allowed"})
               }
   
              else if (passboolean=="FALSE"){
               console.log("password")
               res.status(203).json({code:203,message:"Password should have atleast one Uppercase and one Lowercase character,one digit,one Special character and minimum 8 characters"})
              }
   
              
              if (passboolean=="TRUE" && fullnameboolean=="TRUE"){
   const a1= await api.save()
   res.status(200).json({code:200,message:"User updated Successfully",newUser:a1})
              }
   }
   catch(err){
      res.send("Error User is not in database")
   }
})

router.delete('/:id',async(req,res)=>{
   var id=req.params.id;
   try{
   const api= await Api.findById(id)
  
   const a1= await api.remove()
   res.status(200).json({code:200,message:"User deleted Successfully",deleteUser:a1})
   
   }
   catch(err){
      res.send("Error User is not in database")
   }
})
module.exports=router