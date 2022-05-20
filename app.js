const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');



const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
    // res.send("This is running");
})

app.listen(4000, function(){
    console.log("This is running on port 4000");
})