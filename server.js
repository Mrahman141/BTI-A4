
// http://localhost:8080

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

app.use(express.static("/public/css/site.css"));


//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);