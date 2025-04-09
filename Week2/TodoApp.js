const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); 
const port = 3000

app.use(cors());
app.use(bodyParser.json());

//get all todos 
app.get('/todos',(req,res)=> {
  fs.readFile("TodoApp.json","utf-8",(err,data) => {
    if(err) throw err
    res.json(JSON.parse(data))
  })
})


function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return i;
    }
    return -1;
  }
  
  function removeAtIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== index) newArray.push(arr[i]);
    }
    return newArray;
  }

// create new todo 
app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 100000),
        title: req.body.title,
        description: req.body.description
    };

    fs.readFile("TodoApp.json", "utf-8", (err, data) => {
        if (err) throw err;
        
        let todos = [];
        try {
            todos = JSON.parse(data);  // ✅ Just parse, no res.json
        } catch (e) {
            todos = []; // If file is empty or corrupt, fallback to empty array
        }

        todos.push(newTodo);

        fs.writeFile("TodoApp.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.status(201).json(newTodo);  // ✅ Properly respond only after write
        });
    });
});


// delete the todo 
app.delete('/todos/:id', (req, res) => {

  fs.readFile("TodoApp.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("TodoApp.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});


app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname, ("index.html")));
})


function started(){
    console.log(`yeah todo app is running on port ${port}`)
}
app.listen(port,started);