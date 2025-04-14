const express = require('express');
const jwt = require('jsonwebtoken');
const mongoos = require('mongoos');
const app = express();

app.use(express.json());


const secretKey = "Aniiiii@#$123"

// define mongo db schema

// for user 
const userSchema = new mongoos.Schema({
    username : String,
    password : String,
    purchasedCourse : [{type: mongoos.Schema.Types.ObjectId, ref:'course' }]
});


// for admin 
const adminSchema = new mongoos.Schema({
    username : String,
    password : String
})


const courseSchema = new mongoos.Schema({
    title:String,
    description: String,
    pirce: Number,
    imageLink : String,
    published : Boolean
})



// models 
const User = mongoos.model('User', userSchema);
const Admin = mongoos.model('Admin',adminSchema);
const Course = mongoos.mnodel('Course',courseSchema);



// authenticate jwt 
const authenticateJwt = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,secretKey, (err)=>{
            if(err){
                res.sendStatus(403);
            }else{
                req.user = user;
                next();
            }
        })
    } else{
        res.sendStatus(401);
    }
}


// conect to mongodb 
mongoose.connect('mongodb://localhost:27017/course-selling-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
// admin signup 
app.post('/admin/signup', async (req,res) => {
      const {username,password} =  req.body;
      const isAdminExist = await Admin.findOne({username});
      if(isAdminExist){
        res.json({message: "Admin exist allready"});
      } else{
       const newAdmin =  Admin({username,password});
       await newAdmin.save();
       const token = jwt.sign({username,role:Admin},secretKey,{expiresIn :'1h'});
       res.json({message: 'Admin created successfully!'});
      }
})


//Admin Login 
app.post('/admin/login', async (req,res) => {
    const {username,password} = req.headers;
    const admin = await Admin.findOne({username,password});
    if(admin){
        const token = jwt.sign({username,role:Admin},secretKey,{expiresIn:'1h'});
        res.json({message: 'Admin logged successfully',token})
    }
    else{
        res.status(401).json({message: 'Admin username or password is incorrect'})
    }
})



// create course 
app.post('/admin/courses',authenticateJwt, async (req,res)=>{
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'Course created successfully',courseId:course.id});
})



