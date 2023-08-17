const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./db/Users");
const Products = require('./db/Products')
require("./db/config");
const Jwt = require('jsonwebtoken')   
const jwtKey ='e-comm'

app.use(cors());   
                                                          
app.use(express.json());
app.post("/signup", async (req, res) => {
  let data = new User(req.body);
  let result = await data.save();

   result = result.toObject()
   delete result.password
   console.log(result)
  
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
     if(err){
      res.send({result:"something went wrong"})
     }
      res.send({result,auth:token})
    })
});
                                                                         
app.post("/login", async (req, res) => {              
  console.log(req.body);                          
  if (req.body.email && req.body.password) {                       
    let user = await User.findOne(req.body).select("-password"); 
                                                                                                     
    if (user) {  
      Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
       if(err){
        res.send({result:"something went wrong"})
       }
        res.send({user,auth:token})
      })

                              
    } else {                                           
      res.send("Oopppss,you are not in our team");
    } 
  } else {                                         
    res.send("enter both email and password ");
  }
});

app.post('/add-products',verification,async(req,res)=>{           
      const result = new Products(req.body) 
       let data =await result.save()
      //  data=data.toObject()
        res.send(data)
})

app.get('/products',verification,async(req,res)=>{
   let result = await Products.find()

   if(result.length>0){
    res.send(result)
   }else{
    res.send({product:'No products found'})
   }
    
})
app.delete('/products/:id',verification,async(req,res)=>{

let data=await Products.deleteOne({_id:req.params.id})
res.send(data)
})
app.get('/products/:id',verification,async(req,res)=>{
  let result = await Products.findOne({_id:req.params.id})
   if(result){
    res.send(result)
   }else{
    send({result:"No Record found"})
   }
}
  ) 
  
  app.put('/products/:id',verification,async(req,res)=>{
    let result = await Products.updateOne(
      {_id:req.params.id},
          {$set:req.body}
      )
      res.send(result)
  })

  app.get('/search/:key',verification,async(req,res)=>{
  let result = await Products.find({
    "$or" :[
      {name:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}

    ]
  })
  res.send(result)
  
  })
  function verification(req,res,next){
    let token = req.headers['authorization']
   if(token){
       token = token.split(' ')[1]
       console.log("key is",token)
       Jwt.verify(token,jwtKey,(err,valid)=>{
        if(err){
          res.status(401).send({result:'please provide valid token '})
        }else{
          next()
        }
       })
   }else{
   res.status(403).send({result:'please add token with header'})
   }
  }

app.listen(5001, console.log("liveee bitchhh"));
