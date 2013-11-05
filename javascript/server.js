var doge = require('./dogemes');
var express = require('express');
var fs = require('fs');

var indexpage = fs.readFileSync('./index.html', 'utf8');

var app = express();
var parser = express.bodyParser();
app.use(parser);

function index(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(indexpage);
}

function image(req, res) {
    var file = req.param('filename');

    function callbark(err, img) {
        if (err === null) {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            res.end(img, 'binary');
        }
        if (err !== null) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end(indexpage);
        }
    }
    var path = __dirname + '/../images/' + file
    fs.readFile(path, callbark);
}

function upload(req, res) {
    var words = req.body.words
    words = words.split('\n');
    var path = req.files.image.path

        function callbark(err, path) {
            var rpath = '/' + path
            res.redirect(rpath);
            res.end();
        }

    doge.woof(path, words, callbark);
}

app.get('/', index);
app.get('/:filename', image);
app.post('/', upload);

app.listen(3000);