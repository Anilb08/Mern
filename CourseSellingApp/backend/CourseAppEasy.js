const express = require("express")
const app = express();
const port = 3000;
// when we want a middleware to use for all the routes we do app.use(cors()) at the top 
// but we want the middleware to used some routes we'll  write before the function
app.use(express.json()); // not undersatnd 


let ADMINS = [];
let USERS = [];
let COURSES = []; 

const adminAuthentication = (req,res,next) => {
   const {usersname, password } = req.headers;
   const admin = ADMINS.find(a => a.usersname === usersname && a.password === password);
   if(admin) {
    next();
   } else{
    res.status(403).json({message : 'Admin authentication failed'});
   }
}

const userAuthentication = (req,res,next) => {
    const {username, password} = req.headers;
    const user = USERS.find(u => u.username === username && u.password === password);
    if(user){
        req.user = user; // Add user object to the request // not undersatnd 
        next();
    }else{
        res.status(403).json({messege: 'User authentication failed'});
    }
}


// create admin 
app.post('/admin/signup',(req,res) => {
    const admin = req.body;
    const existingAdmin = ADMINS.find(a => a.username === username && a.password === password);
    if(existingAdmin){
        res.status(403).json({message : 'Admin already exists'});
    } else{
        ADMINS.push(admin);
        res.json({message : 'Admin created successfully '});
    }
})


app.post('/admin/login',adminAuthentication,(req,res) => {
    res.json({message : 'Logged in successfully'});
})


app.post('/admin/courses',adminAuthentication, (req,res) => {
    const course = req.body;
    course.id = Date.now();
    COURSES.push(course);
    res.json({message :'Course created successfully',courseId: course.id});
})  


// course update 
app.put('/admin/courses/:courseId',adminAuthentication, (req,res) => {
    const courseID = parseInt(req.params.courseId);
    const course = COURSES.find(c => c.id === courseId);
    if(course) {
        Object.assign(course, req.body);
        res.json({message:  'Course updated successfully'});
    } else{
        res.status(404).json({message : 'Course not found '});
    }
});

app.get('/admin/courses',adminAuthentication, (req,res) => {
      res.json({courses : COURSES});
})





// User Logic 

app.post('/users/signup',(req,res)=>{
    
    // const user = {
    //     username : req.body.username,
    //     password : req.body.password,
    //     purchasedCourses: []
    // }

    // this above line of code does the same work which this single line does 
    const user = {...req.body, purchasedCourses: []}; 


    const allreadyExistUser = USERS.find(u => u.username === username && u.password === password);
    if(allreadyExistUser){
        res.status(403).json({message: 'User is allready exist..'})
    } else {
        USERS.push(user);
        res.json({message :'User created successfully....'});
    }
})


app.post('/users/login',userAuthentication, (req,res) => {
    res.json({message: 'Logged in successfully'})
})


app.get('/users/courses',userAuthentication,(req,res)=> {
    res.json({courses: COURSES.filter(c => c.published)});

    // in this above line this code COURSES.filter(c => c.published)  does this thing 
    // let filteredCourses = [];
    // for(let i= 0; i<COURSES.length; i++){
    //     if(COURSES[i].published){
    //         filteredCourses.push(COURSES[i]);
    //     }
    // }
})


app.post('/users/courses/:courseId',userAuthentication, (req,res) =>{
    const courseID = Number(req.params.courseId);
    const course = COURSES.find(c => c.id === courseID && c.published);
    if(course){
        req.user.purchasedCourses.push(courseID);
        res.json({message: 'Course purchased successfully'});
    } else{
        res.status(404).json({message : 'Course not found or not available'});
    }
});



app.get('/users/purchasedCourses', userAuthentication, (req,res) => {
    //const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));

    // we can write above code line logic in that way also 
    // basicaly we are doing here is We need to extract the complete course object from COURSES 
    // which have ids which are present in req.user.purchasedCourses
    var purchasedCourseId = req.user.purchasedCourses; [1,4];
    var purchasedCourses = [];
    for(let i=0; i<COURSES.length; i++){
        if(purchasedCourseId.indexOf(COURSES[i].id) !== -1){
            purchasedCourses.push(COURSES[i]);
        }
    }
    res.json({purchasedCourses});
})












app.listen(port, ()=>{
    console.log(`Course App is running on port ${port}`)
})