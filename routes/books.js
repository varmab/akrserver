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

        var connection = mysql.createConnection({
            host     : "localhost",
            user     : "root",
            password : "4emc9122",
            database : "training"
          });
          connection.connect();
 
          connection.query(`INSERT INTO Books(title,author) VALUES('${newBook.title}','${newBook.author}')`, 
                            function (error, book, fields) {
            if (error) throw error;
            res.send(book)
          });
           
          connection.end();
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