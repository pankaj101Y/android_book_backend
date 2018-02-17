// app.js
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
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
var {findbook}= require('./search');
const port=process.env.PORT||3000;
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
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
    res.send(body);
    hash(body.password,function(err,hash){
        body.password= hash;
        save(body,function(err,data){
            if(err)
                return    res.send({id:null});
            if(data)
                return  res.send({id:data._id});
            else
                return res.send({id:null});
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
    var body =req.body;
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
    if(req.body.name)
        body.name= req.body.name;
    if(req.body.author)
        body.author= req.body.author;
    if(req.body.tag)
        body.tag= req.body.tag;
    var bookid= req.body.serverId;
    editbook(bookid,body,function(err,data){
        if(err)
            res.send({status:"failure"});
        if(data)
            res.send({status:'success'});
        else
            res.send({status:"failure"});
    });
});


app.get("/getBooks",function (req, res) {
    allbook(function(err,data){
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
    var search = req.body.query;
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
    console.log(`server running on ${port}'`);
});
