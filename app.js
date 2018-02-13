const express = require('express');
const app = express();

const port=process.env.PORT||3000;

/*
* inputs:{
*   email:"",
*   password:""
*   }
*
 * output : "failure" or  mongo id
* */
app.post("/register",function(req,res){
    console.log(req);
    res.send("id");
});


/**
 *inputs:{
 * name:"",
 * author:"",
 * tag:""
 * id:"a number"
 * }
 *
 * serverId:" null in case of any failure"
 *
 */

app.post("/addBook",function(req,res){
    console.log(req);
    res.send("serverID");
});


/*
* inputs :{
* name:"",
* author:"",
* tag:"",
* serverId:""
* }
*
* output:" "failure" or "success""
* */
app.post("/updateBook",function(req,res){
    console.log(req);
    res.send("success");
});


app.post("/getBooks",function (req, res) {
    console.log(req);
    //[{name:"book",author:"author",tag:"tag",serverId:"serverId"}]
    res.send("esdrffd");
});

app.listen(port,function(){
    console.log(`server running on ${port}`);
});
