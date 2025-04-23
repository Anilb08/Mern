import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import AddCourse from './components/AddCourse';

function App() {
  return (
    
    <div>
     
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login/>} />
       
        </Routes>
      </Router>

    </div>
  
    
  )
}

export default App
