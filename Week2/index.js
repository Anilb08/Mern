const bodyParser = require('body-parser'); 
const express = require('express')
const app = express()
const port = 3000

// 1.create this is the middleware function

function middlewar1(req,res,next){
   console.log("from inside middleWare "+req.headers.counter);  
   next();
}

//2. register a middleware
// app.use(middlewar1); 

// it also returns and add the middleware like above middleware function do 
app.use(bodyParser.json())

function sumCount(counter){
    let sum = 0 ;
    for(let i=0; i<counter; i++){
        sum = sum + i; 
    }
    return sum;
}

function handleFirstRequest(req,res){
    // console.log(req.body);
    var counter = req.body.counter
    if(counter < 100000){
        // var counter = req.query.counter;
    let calculatedSum = sumCount(counter);

     var answerObject = {
        sum: calculatedSum,
     };
    }

    res.status(200).send(answerObject);
}
app.post('/handleSum',handleFirstRequest)

function started(){
    console.log(`Example app listening on port ${port}`)
}
app.listen(port,started)

 




// const fs = require("fs");  // The fs module allows you to interact with the file system, such as reading, writing, or deleting files.

// function callbackFn(err,data){
//     console.log(data);
//  }
 
//  fs.readFile("a.txt","utf-8",callbackFn);