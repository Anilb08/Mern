const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3001

function calSum(counter){
    let sum = 0; 
    for(let i=0; i<counter; i++){
        sum += i; 
    }
    return sum;
}

function calMul(counter){
    let mul = 1; 
    for(let i=1; i<counter; i++){
        mul = mul*i; 
    }
    return mul;
}

app.use(bodyParser.json())

app.post('/sum', (req,res) => {
    const counter = req.body.counter
    if(counter < 100){
        const sumis = calSum(counter)
        const mulis = calMul(counter)
        finalResult = {
            sum : sumis,
            mul : mulis
        }
    }
    else{
        res.status(411).send("counter should less than 100")
    }
     
   

    res.send(finalResult);
})




function started(){
    console.log(`yeah this app is running on port ${port}`)
}
app.listen(port,started)