var express=require("express");
var path=require("path")
var app=express();

app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/about.html"))
})

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/contact.html"))
})

app.listen(9000,()=>{
    console.log("Server is started")
})