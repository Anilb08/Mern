const express = require("express")
const bodyParser = require('body-parser');
const fs = require("fs")
const app = express()
const port = 3006

app.use(bodyParser.json());

app.get('/todos',(req,res)=> {
  fs.readFile("todos.json","utf-8", (err,data) =>{
       if(err) throw err
       res.json(JSON.parse(data));
  })
})

// create a new todo
app.post('/todos',(req,res) => {
    const newTodo = {
        id : Math.floor(Math.random() * 10000),
        title :  req.body.title,
        description : req.body.description
    }
     fs.readFile("todos.json","utf-8", (err,data) => {
        if(err) throw err
        const todo =  JSON.parse(data)
        todo.push(newTodo);
        fs.writeFile("todos.json",JSON.stringify(todo),(err) => {
            if(err) throw err
           res.status(201).json(newTodo)
        })
    })
})


// find index 
function findIndex(arr,id){
    for(let i=0; i<arr.length; i++){
        if(arr[i].id === id){
            return i;
        }
    }
    return -1;
}

// remove todo
function removeTodo(arr,index){
    let newArrr = [];
    for(let i=0; i<arr.length; i++){
        if(i !== index) newArrr.push(arr[i]);
    }
    return newArrr;
}

// delete a particular todo by id 
app.delete("/todos/:id", (req,res) => {
    fs.readFile("todos.json","utf-8",(err,data)=>{
        if(err) throw err
       let todo =  JSON.parse(data);
       const index = findIndex(todo,parseInt(req.params.id));
       if(index === -1){
        res.status(404).send()
       }else{
         todo = removeTodo(todo,index);
         fs.writeFile("todos.json", JSON.stringify(todo), (err) => {
            if(err) throw err
            res.status(200).send('Task deleted successfulyy.....');
         })
       }
       
    })
})


function started(){
    console.log(`yeah the hard todo is runnning on port ${port}`)
}
app.listen(port, started)