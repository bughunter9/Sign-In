const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");
const https = require("https");
const dotenv = require('dotenv').config();
const app = express();
app.use(express.static("public"));



app.use(bodyParser.urlencoded({extended: true
}));

app.listen(process.env.PORT || 4000, function() { console.log("Welcome to server 4000.");
});

app.get("/", function(req, res) {res.sendFile(__dirname + "/index.html")
});



app.post("/", function(req, res) {
  var first = req.body.fName;
  var last = req.body.lName;
  var mail = req.body.email;

 var data = {
    members: [{
      email_address: mail,
      status: "subscribed",
      merge_fields: {
        FNAME: first,
        LNAME: last
      }
    }]
  }

var jsonData = JSON.stringify(data);

var url = "https://us19.api.mailchimp.com/3.0/lists/00a24e79ef";
var options = {
  method: "post",
  auth: "human:process.env.API_KEY"
}

var play = https.request(url, options, function(response) {
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
  play.on("data", function(data) {
    console.log(JSON.parse(data));
  })
})
  play.write(jsonData);
  play.end();

});

app.post("/failure",function(req,res){
  res.redirect("/")
})
