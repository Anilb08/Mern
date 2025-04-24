import { useEffect, useState } from "react"

function Courses(){
   const [courses,setCourses] = useState([]);
  
  useEffect(()=>{
        function callback2(data){  
            setCourses(data.courses);
         }
         function callback1(res){
              res.json().then(callback2)
         }
         fetch("http://localhost:3000/admin/courses/",{
             method:"GET",
             headers: {
               "Authorization":"Bearer "+localStorage.getItem("token")
             }
     
         }) .then(callback1)
    },[])
    return <div>
      Courses 
      {/* map to iterate */}
      {/* {courses.map(course => {
        return <Course course={course}/>
      })} */}
      {courses.map(course => {
       return <Course key={course.id} course={course} />; // or course._id
      })}
    </div>
}


function Course(props){
  return <div>
    {props.course.title}
    {props.course.description}
  </div>
}




export default Courses