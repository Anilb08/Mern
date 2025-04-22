const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


const secretKey = "Secret@#1234";   // secrete key plays an very important role here becaus using this only we can encreept and decreept securly
                                       // the token but the point is without using secrete key the token will encreept and decreept easily using some algo
                                       // and our security will break in that case. so therefore to avoid this conflict we have to provide our own secrete key 
                                       // using this secrete key our token is generated and cannot be converted using algo.

const generateJwt = (user) => {   // it encapsulate some how the users identity in a random string 
    const payload = {username: user.username}; // here we could give the more credential but for now username is enough becuas username is unique and in real world the users id is to used here to generete the jwt token 
    return jwt.sign(payload,secretKey,{expiresIn: '1h'});  // it generates the token using jwt library
};


const authenticateJwt = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        jwt.verify(token,secretKey,(err,user)=> {
            if(err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


app.post('/admin/signup',(req,res) => {
    const admin = req.body;
    const  existingAdmin = ADMINS.find(a => a.username === admin.username);
    if(existingAdmin){
        res.status(403).json({message: 'Admin already exists'});
    } else{
        ADMINS.push(admin);
        const token = generateJwt(admin);
        res.json({message :'Admin created successfully',token});
    }
});


app.post('/admin/login',(req,res) => {
    const {username, password} = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if(admin) {
        const token = generateJwt(admin);
        res.json({message : 'Logged in successfully', token});
    } else{
        res.status(403).json({message : 'Admin authentication failed'});
    }
});


app.post('/admin/courses', authenticateJwt, (req,res) => {
    console.log(req.user.username)
    const course = req.body;
    course.id =     COURSES.length +1; 
    COURSES.push(course);
    res.json({message :'Course created successfully ', courseId : course.id});
});

app.put('/admin/courses/:courseId', authenticateJwt, (req,res) => {
    const courseId = parseInt(req.params.courseId);
    const courseIndex = COURSES.findIndex(c => c.id === courseId);
    if(courseIndex > -1){
        const updatedCourse = {...COURSES[courseIndex], ...req.body};
        COURSES[courseIndex] = updatedCourse;
        res.json({message : 'Course updated successfully'});
    }else{
        res.status(404).json({message : 'Course not found '});
    }
} );

 
app.get('/admin/courses',authenticateJwt, (req,res) => {
    res.json({courses : COURSES});
}); 



app.post('/users/signup', (req,res) => {
    const user = req.body;
    const existingUser = USERS.find(u => u.username === user.username);
    if(existingUser) {
        res.status(403).json({message : 'User already exists'});
    }else{
        USERS.push(user);
        const token = generateJwt(user);
        res.json({message : 'User created successfully',token});
    }
});


app.post('/users/login', (req,res) => {
    const {username ,password} = req.headers;
    const user = USERS.find(u => u.username === username && u.password === password);
    if(user) {
        const token = generateJwt(user);
        res.json({message : 'Logged in successfully ',token});
    } else{
        res.status(403).json({message : 'User authentication failed'});
    }
});


app.get('/users/courses', authenticateJwt, (req,res) => {
    res.json({courses: COURSES}); 
})



app.listen(3000, () => console.log('Server running on port 3000'));
