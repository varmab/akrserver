var express=require('express');
var app=express();

var bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var books=[
    {
        id:1,
        title:"JS Fundamentals",
        author:"John"
    },
    {
        id:2,
        title:"Angular Fundamentals",
        author:"David"
    },
    {
        id:3,
        title:"HTML/CSS Basics",
        author:"John"
    }
]

app.use(express.static("public"))

app.get("/",function(req,res){
    res.send("Hello World")
})

//Get all books
app.get("/api/books",(req,res)=>{
    res.send(books)
})

app.post("/api/books",(req,res)=>{
    var newBook=req.body;
    books.push(newBook);
    res.send(books);
})

app.put("/api/books/:id",(req,res)=>{
    var id=req.params.id;
    var bookToBeupdated=books.filter((book)=>{
        return book.id==id
    })
    bookToBeupdated[0].title="Oracle Pro"
    res.send(bookToBeupdated)
})

app.delete("/api/books/:id",(req,res)=>{
    var id=req.params.id;

    var latestBooks=books.filter((book)=>{
        return book.id!=id
    })

    res.send(latestBooks)
})

app.listen(8000,function(){
    console.log("Server is started")
})