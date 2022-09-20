
// http://localhost:8080
var data_service = require("data-service");
var data_s = data_service();

var express = require("express"); // Include express.js module
var app = express();

var path = require("path"); // include moduel path to use __dirname, and function path.join()

var HTTP_PORT = process.env.PORT || 8080;  // || : or

// call this function after the http server starts listening for requests
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

 // setup another route to listen on /about
app.get("/about", function (req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/managers", function (req, res){
    var resText = "<h3> This is from route /managers. </h3> <br>";
    resText += "TODO: get all employees who have isManager==true";
    res.send(resText);
});


//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);