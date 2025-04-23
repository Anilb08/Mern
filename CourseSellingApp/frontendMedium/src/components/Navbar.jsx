import { Button } from "@mui/material";
import Register from "./Register";

function Navbar() {
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
