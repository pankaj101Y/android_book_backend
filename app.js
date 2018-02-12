const express = require('express');
const app = express();

const port=process.env.PORT||3000;

app.post("/register",function(req,res){
    console.log(req);
    res.send("success");
});


app.listen(port,function(){
    console.log(`server running on ${port}`);
});
