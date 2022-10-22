/************************************************************************* * 
 * BTI325– Assignment 4 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part * 
 * of this assignment has been copied manually or electronically from any other source * 
 * (including 3rd party web sites) or distributed to other students. * 
 * Name: Mohammed Aminoor Rahman Student ID: 166562215 Date: October 20th, 2022 * 
 * Your app’s URL (from HEROKU) :      * 
 **************************************************************************/

var express = require("express");
const exphbs = require('express-handlebars');
const { type } = require("os");
var app = express();
const multer = require("multer");
var path = require("path");
const fs = require('node:fs');



var data_service = require("./data-service");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.engine('.hbs', exphbs.engine({ extname: '.hbs',
    helpers: {
        navLink: function(url, options){
            return '<li' + ((url == app.locals.activeRoute) ? ' class="active" ' : '') + '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
            return options.inverse(this);
            } else {
            return options.fn(this);
            }
        }
    }
}));
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
  
}

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});



app.get("/", function(req, res){
    res.render('home', {
        data: " ",
        layout: "main.hbs"
    });
});

 // setup another route to listen on /about
app.get("/about", function (req, res){
    res.render('about', {
        data: " ",
        layout: "main.hbs"
    });
});


app.get("/employees/add", function (req, res){
    res.render('addEmployee', {
        data: " ",
        layout: "main.hbs"
    });
});

app.get("/images/add", function (req, res){
    res.render('addImage', {
        data: " ",
        layout: "main.hbs"
    });
    
});

app.get("/employee/:value", function (req,res){

    
    data_service.getEmployeeByNum(req.params.value).then((mang)=>{
        res.json(mang);
    }).catch((mesg)=>{
        console.log(mesg);
    })

});

app.get("/employees", function (req,res){
    
    if(req.query.status){
        data_service.getEmployeesByStatus(req.query.status).then((emp)=>{
            res.json(emp);
        }).catch((mesg)=>{
            console.log(mesg);
        })

    }
    else if(req.query.department){

        data_service.getEmployeesByDepartment(req.query.department).then((emp)=>{
            res.json(emp);
        }).catch((mesg)=>{
            console.log(mesg);
        })


    }
    else if(req.query.manager){
        data_service.getEmployeesByManager(req.query.manager).then((emp)=>{
            res.json(emp);
        }).catch((mesg)=>{
            console.log(mesg);
        })
        
    }
    else{
        data_service.getAllEmployees().then((emp)=>{
            res.json(emp);
        }).catch((mesg)=>{
            console.log(mesg);
        })
    }

});


// app.get("/managers", function (req,res){
//     data_service.getManagers().then((mang)=>{
//         res.json(mang);
//     }).catch((mesg)=>{
//         console.log(mesg);
//     })
// });

app.get("/departments", function (req,res){

    data_service.getDepartments().then((dept)=>{
        res.json(dept);
    }).catch((mesg)=>{
        console.log(mesg);
    })

});

app.get("/images", function (req,res){

    fs.readdir("./public/images/uploaded", function(err,items){

        if(err){
            console.log("Error reading Directory");
        }
        else{
                res.render('images', {
                data: items,
                layout: "main.hbs"
            });

        }
        
    })
});

app.get('*', function(req, res){
    var text = 'Error:404 <br/> You are not supposed to be here. <br/> Why are you still here? <br/> If you like this page, then alright, you can stay here.';
    text += '<br/> Or you can go back Home and explore the Website.';
    text += "<a href='/'> Home </a>";

    res.send(text, 404);
});


const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });


app.post("/images/add", upload.single("imageFile"), (req,res) => {

    res.redirect("/images");

});

app.post("/employees/add", (req,res) => {


    data_service.addEmployee(req.body).then(()=>{
        res.redirect("/employees");
    }).catch(()=>{
        console.log('ERROR');
    })

});



// setup http server to listen on HTTP_PORT
data_service.initialize().then(()=>{
    app.listen(HTTP_PORT, onHttpStart);
  }).catch((mesg)=>{
    console.log(mesg);
  });
