var express = require('express');
var app = express();

app.use(express.static("app/web"));

app.get('/', function (req, res) {
    res.redirect('/');
});

app.get('/admin', function (req, res) {

});

app.listen(8888, 'localhost');
console.log("MyProject Server is Listening on port 8888");