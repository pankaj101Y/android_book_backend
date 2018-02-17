const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var {hash ,compare}= require('./hashing.js');
var {
    findbyusername,
    save,
    findbyid,
    userupdate,
    bookadd,
    addtags,
    increasepopularity,
    bookpost,
    mybook,
    deletebook,
    editbook,
    findbookbyid,
    createwishlist,
    additem,
    findwishlist,
    removeitem,
    allbook
}= require('./db.js');
const {findbook}= require('./search');
const port=process.env.PORT||3000;


app.use(bodyParser.json());

/*
* inputs:{
*   email:"",
*   password:""
*   }
*
 * output : "failure" or  mongo id
* */
app.post("/register",function(req,res){
    var body= req.body;
    hash(body.password,function(err,hash){
        body.password= hash;
        save(body,function(err,data){
            if(err)
                return    res.send("failed");
            if(data)
                return  res.send(data._id);
            else
                return res.send("failed");
        });
    });
});


/**
 *inputs:{
 * name:"",
 * author:"",
 * tags:""
 * id:"a number"
 * }
 *
 * serverId:" null in case of any failure"
 *
 */

app.post("/addBook",function(req,res){
    var body ={};
    body.name=req.name;
    body.author=req.author;
    body.tags=req.tags;
    body.userid= req.userid;
    body.sqlid- req.id;
    bookadd(body,function(err,data){
        if(err)
            return   res.send({serverId:null});
        if(data)
            return  res.send({serverId:data._id});
        else
            return  res.send({serverId:null});
    });
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
    var body={};
    if(req.name)
        body.name= req.name;
    if(req.author)
        body.author= req.author;
    if(req.tag)
        body.tag= req.tag;
    var bookid= req.serverId;
    editbook(bookid,body,function(err,data){
        if(err)
            res.send("failure");
        if(data)
            res.send('success');
        else
            res.send("failure");
    });
});


app.get("/getBooks",function (req, res) {
    var userid = req.userid;
    bookpost(userid,function(err,data){
        if(err)
            res.send([]);
        else
            res.send(data);
    });
});



/*
* input:{query:"book name or something like that"}
*
* output :"array of books which best match to query"
*
* */

app.post("/searchBooks",function (req, res) {
    var search = req.query;
    allbook(function(err,data){
        findbook(search,data,function(err,data1){
            if(err)
                res.send([]);
            else
                res.send(data1);
        });
    });
});

app.listen(port,function(){
    console.log(`server running on ${port}`);
});
