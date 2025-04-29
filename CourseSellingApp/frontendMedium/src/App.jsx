import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import AddCourse from './components/AddCourse';
import Courses from './components/Courses';
import Course from './components/Course';

function App() {
  return (
    
    <div>
     
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login/>} />
       
        </Routes>
      </Router>

    </div>
  
    
  )
}

export default App
