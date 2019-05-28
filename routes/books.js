var express=require('express')
var router=express.Router();
var mysql=require("mysql")

router.route("/")
    .get((req,res)=>{
        var connection = mysql.createConnection({
            host     : "localhost",
            user     : "root",
            password : "4emc9122",
            database : "training"
          });
          connection.connect();
 
          connection.query('SELECT * from Books', function (error, books, fields) {
            if (error) throw error;
            res.send(books)
          });
           
          connection.end();
        
    })
    .post((req,res)=>{
        var newBook=req.body;
        books.push(newBook);
        res.send(books);
    })

router.route("/:id")
    .put((req,res)=>{
        var id=req.params.id;
        var bookToBeupdated=books.filter((book)=>{
            return book.id==id
        })
        bookToBeupdated[0].title="Oracle Pro"
        res.send(bookToBeupdated)
    })
    .delete((req,res)=>{
        var id=req.params.id;

        var latestBooks=books.filter((book)=>{
            return book.id!=id
        })

        res.send(latestBooks)
    })

module.exports=router;