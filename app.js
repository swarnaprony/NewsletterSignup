const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/0f6d6ea1e4";

    const options = {
        method: "POST",
        auth:"swarna:ca1959eaca5d96e9423f8d4e17c49fd0-us17"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT || 4000, function () {
    console.log("This is running on port 4000");
});

//API Key
// ca1959eaca5d96e9423f8d4e17c49fd0-us17

//List ID/ Audience ID
//0f6d6ea1e4

