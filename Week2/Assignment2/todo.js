const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const port = 3004; 



const todos = []
app.use(bodyParser.json());

// find index 
function findIndex(arr,id){
    for(let i=0; i<arr.length; i++){
        if(arr[i].id === id){
            return i;
        }
    }
    return -1;
}

function removeTask(arr,index){
    let newArr = []
    for(let i=0; i<arr.length; i++){
        if( i !== index) newArr.push(todos[i]);
    }
    return -1;
}

let counter = 0; 
app.post('/todos',(req,res)=> {
    // id, title, description 
    const newTodo = {
        id : counter +1,
        title : req.body.title,
        description : req.body.description
    };
    todos.push(newTodo);
    res.status(201).json( newTodo);
});

app.get('/todos',(req,res) => {
    res.json(todos)
})


app.delete('/todos:id', (req,res) => {
    const index = findIndex(todos,parseInt(req.params.id));
    if(index === -1){
        res.status(404).send();
    }else{
        todos = removeTask(todos,index);
        res.status(200).send(); 
    }
     

})
function started(){
    console.log(`yeah the todo app is listening on port ${port}`)
}
app.listen(port, started)