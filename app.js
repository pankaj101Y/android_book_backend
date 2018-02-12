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
 * output : {serverId:" null in case of any failure"
 *           id:" same id as provided in req"
 * }
 */

app.post("/addBook",function(req,res){
    console.log(req);
    res.send({severId:"serverID",id:"id"});
});


app.listen(port,function(){
    console.log(`server running on ${port}`);
});
