import { useState } from "react"

function App() {

  const [todo,setTodo] = useState([
    {
      title: "Go to gym",
      description : "Hit gym from 7-9",
      id:1
    },
    {
      title: "Go to class",
      description : "go to class from 7-9",
      id:2
    }
  ])
 
  return (
  <div>
   {todo.map((todos) => {
    return <div>
        {todos.title}
        {todos.description}
        <br/> 
       </div>
   })}
  </div>
  )
}

export default App
