const express = require('express');
const path= require('path');
const app = express();
const bcrypt = require('bcrypt');
require("./db/conn");
const Register=require('./models/registers');
const async = require('hbs/lib/async');
var expressValidator = require('express-validator');
var bodyParser=require('body-parser');
const passport = require('passport')

const initializePassport = require('./passport-config')



//const static_path=path.join(__dirname,"public");

//app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/signup",(req, res) => {

res.render("signup")
});

app.get("/login",(req, res) => {

  res.render("login")
  });
  



var adminPages = require('./routes/admin-pages.js');

app.use('/admin/pages', adminPages);
//app.get('/', function(req, res) {

  //  res.render('add-page',{

    //    title:'Home'


   // });
   // });



   


app.post("/signup", async(req, res) => {

 try{
     
      const password = req.body.password;
      const cpassword = req.body.re_password;
     if (password === cpassword){
         
           const userrigster = new Register({
            name : req.body.name,
            email : req.body.email,
           // userType : req.body.usertype,
            password:password ,
            repeatpassword:cpassword ,

           })


       const registered = await userrigster.save();
       res.status(201).render(index);

           

     }else {
              res.send("password are not matching")

     }

  }catch(error){
res.status(400).send(error);

  } 

    });

  
// Body Parser middleware
// 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


//setroutes
var pages = require('./routes/pages.js');
app.use('/u', pages);

var adminpages = require('./routes/admin-pages.js');
app.use('/uu', adminpages);



const port=process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});



