import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Navbar() {
  
const [userEmail, setUserEmail] = useState(null);
const [isLoading, setLoading] = useState(true);


    useEffect(() => {
      function callback2(data){  
       if(data.username){
         setUserEmail(data.username)
         setLoading(true);
       }
    }
    function callback1(res){
         res.json().then(callback2)
    }
    fetch("http://localhost:3000/admin/me",{
        method:"GET",
        headers: {
          "Authorization":"Bearer "+localStorage.getItem("token")
        }

    }) .then(callback1)
    },[])

    if(userEmail){

      return <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "2px solid #ddd",
        backgroundColor: "#f8f8f8",
        width: "100%",
      }}
    >
      
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        Course Selling App
      </div>

      <div>
        {userEmail}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={()=>{
          localStorage.setItem("token",null);
          window.location=("http://localhost:5173/signup")
        }}>Logout</Button>
      </div>
    </div>
    }


    
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "2px solid #ddd",
        backgroundColor: "#f8f8f8",
        width: "100%",
      }}
    >
      
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        Course Selling App
      </div>

      
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={()=>{
            window.location= "http://localhost:5173/signup"
        }}>Signup</Button>
        <Button variant="contained"
        onClick={()=>{
            window.location= "http://localhost:5173/login"
        }}
        >Login</Button>
      </div>
    </div>
  );
}

export default Navbar;
