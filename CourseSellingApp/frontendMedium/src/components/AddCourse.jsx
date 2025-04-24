import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import Card from '@mui/material/Card';
import { useState } from 'react';

function AddCourse() {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

  return (
   <div style={{
    marginTop :"30px"
   }}>
     <Card variant="outlined" style={{ width: 400, padding: 20, margin: "auto" }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
        onChange={(e)=> {
             setTitle(e.target.value)
        }}
         label="Title" variant="outlined" />
        <TextField 
         onChange={(e)=> {
           setDescription(e.target.value)
        }}
        label="Description" variant="outlined" />
        <Button
        onClick={()=>{
            function callback2(data){  
                alert("Course added !")
                console.log(data);
            }
            function callback1(res){
                 res.json().then(callback2);
            }
            
            fetch("http://localhost:3000/admin/courses",{
                method:"POST",
                body:JSON.stringify({ 
                    title: title,
                    description: description,
                    imageLink:"", 
                    published:true
                }),
                headers: {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }

            }) .then(callback1)
             
        }}
        variant="contained">Add Course</Button>
      </Box>
    </Card>
   </div>
  );
}

export default AddCourse;
