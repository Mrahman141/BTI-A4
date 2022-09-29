
// http://localhost:8080

var express = require("express"); // Include express.js module
var app = express();

var data_service = require("data-service");

var path = require("path"); // include moduel path to use __dirname, and function path.join()

var HTTP_PORT = process.env.PORT || 8080;  // || : or

// Static Files
 app.use(express.static('public'));
// Specific folder example
 //app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))


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


app.get("/employees", function (req,res){

    res.send("Not Done E");

});

app.get("/managers", function (req,res){

    res.send("Not Done M");

});

app.get("/departments", function (req,res){

    res.send("Not Done D");

});


//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);