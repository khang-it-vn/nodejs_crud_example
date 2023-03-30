var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Student = require("../model/student");
var StudentService = require("../service/studentservice");
var VerifyToken = require('../util/verifyToken');
const jsonwebtoken = require("jsonwebtoken");
var config = require("../config/setting.json");

// return view homepage
router.get('/home',(req,res) => {
    res.render('admin');
})
// return list of contact 
router.get("/student-list",VerifyToken, async function (req, res) {
  var studentService = new StudentService();
  var students = await studentService.getStudentList();
  res.json(students);
});


// return view edit contact
router.get('/edit', async (req, res) => {
  const id = req.query.id;
  var studentService = new StudentService();
  var student = await studentService.getStudent(id);
  res.render('edit',{student});
})

//return view to insert contact
router.get('/student', (req, res) => {
    res.render('contact');
})

//insert contact
router.post("/insert-student",VerifyToken, async function (req, res) {
    var studentService = new StudentService();
  var student = new Student();
  student.Masv = req.body.Masv;
  student.Tensv = req.body.Tensv;
 
  var result = await studentService.insertStudent(student);
  res.json({ status: true, message: "add student successfull" });
});

router.put("/update-student",VerifyToken, async function (req, res) {
    var studentService = new StudentService();
  var student = new Student();
  student._id = new ObjectId(req.body.Id);
  student.Masv = req.body.Masv;
  student.Tensv = req.body.Tensv;

  await studentService.updateStudent(student);
  res.json({ status: true, message: "update successfull" });
});

router.delete("/delete-student",VerifyToken, async function (req, res) {
    var studentService = new StudentService();
  await studentService.deleteStudent(req.query.id);
//   console.log(req.query.id);
  res.json({ status: true, message: "Delete Successfull" });
});

router.get("/login",(req, res) => {
    res.render('login');
})

router.post("/auth/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    console.log(`${username} is trying to login ..`);
  
    if (username === "admin" && password === "admin") {//username === "admin" && password === "admin"
     var authorities = [];
     authorities.push("admin");
     authorities.push("customer");
     var claims = [];
     claims.push("product.view");
     claims.push("product.edit");
     claims.push("product.delete");
     return res.json({
      token: jsonwebtoken.sign({ user: "admin", roles: authorities,claims:claims }, config.jwt.secret, {expiresIn: 100000}),
     });
    }
  
    return res
     .status(403)
     .json({ message: "The username and password your provided are invalid" });
   });

module.exports = router;
