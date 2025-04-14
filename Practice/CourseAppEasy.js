const express = require('express')
const app = express();
const port = 3000;

app.use(express.json());



let ADMINS = [];
let USERS = []; 
let COURSES  =[];


// Authenticate the perticular  route using middleware 
// for Admins
const authenticateAdmins = (req,res,next) => {
    const {username, password } = req.headers;
   const admin =  ADMINS.find(a => a.username === username && a.password === password);
   if(admin){
    next();
   } else{
    res.status(403).json({message : ' Sorry Admin credentials are UnAuthorized ! plz give the correct credentials'});
   }
}


// for Users 
const authenticateUsers = (req,res, next ) => {
   const {username, password} = req.headers;
   const user = USERS.find(u => u.username === username && u.password === password);
   if(user){
   req.user = user;
    next();
   } else{
    res.status(403).json({message : ' Sorry Users credentials are UnAuthorized ! plz give the correct credentials'});
   }
}


// signup admins 
app.post('/admin/signup',(req,res) => {
    const admin = req.body; 
    const adminExist = ADMINS.find(a => a.username === admin.username && a.password === admin.password);
    if(adminExist){
        res.json({message: 'Admin exist already'});
    } else{
        ADMINS.push(admin);
        res.json({message :'Admin created successfully'});
    }
})


// login admin 
app.post('/admin/login', authenticateAdmins, (req,res)=>{
     res.json({message: 'Admin Logged successfully'});
})


// create course 
app.post('/admin/courses', authenticateAdmins, (req,res)=> {
    const course = req.body; 
    course.id = Date.now();
    COURSES.push(course);
    req.json({message : 'Course created successfully!', courseId: course.id});
})


// update the course 
app.put('/admin/courses/:courseId', authenticateAdmins, (req, res)=> {
    const courseId = parseInt(req.params.courseId);
    const course = COURSES.find(c =>  c.id === courseId);
    if(course){
        Object.assign(course, req.body);
        res.json({message : 'course is updated successfully'});
    }else{
        res.status(403).json({message: 'plz provide the correct course id'})
    }

})



// users 

// user signup 
app.post('/user/signup', (req,res)=> {
    const user = req.body;
    const userExist =  USERS.find(u => u.username === user.username && u.password === user.password);
    if(userExist){
        res.status(403).json({message : 'user is already exist'})
    } else{
        USERS.push(user);
        res.json({message : 'user created successfully'});
    }
})









app.listen(port,()=> {
    console.log(`the application is running on port ${port}`)
})