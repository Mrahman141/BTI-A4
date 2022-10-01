var express = require("express");
const { type } = require("os");
var app = express();
var path = require("path");

var data_service = require("./data-service");


app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

 // setup another route to listen on /about
app.get("/about", function (req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employees", function (req,res){
    
    data_service.getAllEmployees().then((emp)=>{
        res.json(emp);
    }).catch((mesg)=>{
        console.log(mesg);
    })

});

app.get("/managers", function (req,res){
    data_service.getManagers().then((mang)=>{
        res.json(mang);
    }).catch((mesg)=>{
        console.log(mesg);
    })
});

app.get("/departments", function (req,res){

    data_service.getDepartments().then((dept)=>{
        res.json(dept);
    }).catch((mesg)=>{
        console.log(mesg);
    })

});


// setup http server to listen on HTTP_PORT
data_service.initialize().then(()=>{
    app.listen(HTTP_PORT, onHttpStart);
  }).catch((mesg)=>{
    console.log(mesg);
  });
