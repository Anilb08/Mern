const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = 3000;

app.use(express.json())

const secretKey = "aniii@345"

// generate the jwt 
const generateJWT = (user) => {
    const payload = {username : user.username};
    return jwt.sign(payload, secretKey, {expiresIn : '1h'});
}


const authenticateJwt = (req, res, next) => {
   const authHeader = req.headers.authorization;
   
   if(authHeader){
    const token = authHeader.split(" ")[1];

   jwt.verify(token,secretKey, (err)=> {
    if(err) throw err

    req.user = user; 
    next();
   })
   } else{
    res.sendStatus(403);
   }
}


