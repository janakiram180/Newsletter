const https = require("https");
const express =require("express");
const request = require("request");
const bodyParser = require("body-parser");
const e = require("express");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
var firstname=req.body.firstname;
var lastname=req.body.lastname;
var emailid=req.body.emailid;
var data={
    members:[
        {
            email_address:emailid,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }
        }
    ]
}
var jsonData =JSON.stringify(data);
const url = "https://us10.api.mailchimp.com/3.0/listshero/3cb03fdace";
const options={
    method:"POST",
    auth:"janakiram1:d5953833897ed7cde9182384a23bddef-us10",
}
const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/sucess.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
    console.log("The server is running port 3000");
})

//API KEY
// d5953833897ed7cde9182384a23bddef-us10
//list id
//3cb03fdace