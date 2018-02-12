const express = require('express');
const app = express();

const port=process.env.PORT||3000;

/*
* inputs:{
*   email:"",
*   password:""
*   }
*
*   output: create mongoDB id
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
 * }
 *
 * output: mongo id of book added
 */

app.post("/addBook",function(req,res){
    console.log(req);
    res.send("id");
});


app.listen(port,function(){
    console.log(`server running on ${port}`);
});
