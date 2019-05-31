var Hapi=require('hapi');
require("dotenv").config();
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:3001
});

server.route({
    method:"GET",
    path:"/",
    handler:(request,reply)=>{
        return "Welcome to API Server";
    }
})

server.route({
    method:"GET",
    path:"/api/books",
    handler:(request,reply)=>{

        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query('SELECT * from Books', function (error, books, fields) {
                if (error) reject(error);
                resolve(books);
              });
               
              connection.end();
        })
        
    }
})

server.start((err)=>{
    if(err) throw err;
    console.log("Server is started")
})
