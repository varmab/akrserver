var express = require('express');
var app = express();
var path = require('path')

var books = require("./routes/books")
var students = require("./routes/students")

var bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

	
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "akrivia.com"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });


app.all('/api/*', function (req, res, next) {
    const auth = { login: "akrivia", password: "pass1234" } // change this

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (!login || !password ||
        login !== auth.login ||
        password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm="nope"') // change this
        res.status(401).send('Request is not authorized. You must pass credentials')
        return
    }
    else {
        next();
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public/about.html"))
})

app.get("/books", (req, res) => {
    res.sendFile(path.join(__dirname, "public/books.html"))
})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public/contact.html"))
})

app.use("/api/books", books)
app.use("/api/students", students)

app.listen(8000, function () {
    console.log("Server is started")
})