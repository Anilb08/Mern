import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';





function Register(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")

   return <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 100,
   }}>
   
    <div style={{
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       justifyContent: "center",
       padding: 70,
       gap: 2,
       border: "2px solid black",   // Blue border
       borderRadius: "12px",          // Rounded corners
                     // Optional shadow for elevation
       width: "fit-content",        // Size to fit content
       
    }}>
        <div>
        <h1>Register to the website</h1>
       
        </div >
       
        <div>
        <TextField
         id="email1"
          label="Email"
        variant="outlined"
         onChange={e => setEmail(e.target.value)}
        />
        </div>
        <br/>
        <div>
        <TextField 
        id="password1"
        label="Password"
        variant="outlined"
        onChange={e => setPassword(e.target.value) }
           />
        </div>
        <br/>
        <Button variant="contained"
         onClick={()=> {
            function callback2(data){  
                localStorage.setItem("token",data.token)
                console.log(data);
            }
            function callback1(res){
                 res.json().then(callback2)
            }
            fetch("http://localhost:3000/admin/signup",{
                method:"POST",
                body:JSON.stringify({
                    username : email,
                    password : password
                }),
                headers: {
                    "Content-Type":"application/json"
                }

            }) .then(callback1)
             
         }}
        >Register</Button>
        Already a user? <a href="/login">Login</a>
        
    </div>
   </div>
}
export default Register;