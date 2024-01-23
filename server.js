var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static("app/web"));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/web/index.html'));
});

app.use('/admin', express.static("app/admin"));
app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/admin/index.html'));
});

const publicPath = path.join(__dirname, 'app');

// Middleware để cung cấp các tệp tin tĩnh từ thư mục public
app.use(express.static(publicPath));

app.listen(8888, 'localhost');
console.log("MyProject Server is Listening on port 8888");