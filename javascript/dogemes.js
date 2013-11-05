var Canvas = require('../lib/node-canvas');
var fs = require('fs');
var Image = Canvas.Image;
var font = '24px ComicSansMS';

function woof(path, words, callbark) {
    function bark(err, data) {
        if (err !== null) {
            callbark(err, null);
        }

        if (err === null) {
            var img = new Image();
            img.src = data;
            var w = img.width
            var h = img.height
            var canv = new Canvas(w, h);
            var context = canv.getContext('2d');
            context.textDrawingMode = 'glyph';
            context.font = font;
            context.drawImage(img, 0, 0, w, h, 0, 0, w, h);
            var bounds = new Array(0);
            var length = words.length + 2
            for (var i = 0; i < length; i += 1) {
                var word = words[i]
                if (word !== undefined) {
                    var prefix = rollword();
                    word = prefix + ' ' + word
                }
                if (word === undefined) {
                    word = 'wow';
                }
                var bound = wordbound(word, context);
                bounds.push(bound);
                var x = rollposition(1, w);
                var y = rollposition(1, h);
                var color = rollcolor();
                context.strokeStyle = color

                context.strokeText(word, x, y);
            }

            var comp = path.split('/');
            var pos = comp.length - 1
            var file = comp[pos]
            var outpath = __dirname + '/../images/' + file

            var out = fs.createWriteStream(outpath);
            var stream = canv.createJPEGStream({
                bufsize: 2048,
                quality: 80
            });
            stream.pipe(out);

            stream.on('end', finish);

            function finish() {
                callbark(null, file);
            }
        }
    }

    fs.readFile(path, bark);
}

function wordbound(word, context) {
    var measure = context.measureText(word);
    var bound = {
        'height': measure.height,
        'width': measure.width
    }
    return bound;
}

function rollposition(min, max) {
    var random = Math.random();
    random = random * max
    random = random + min
    random = Math.floor(random);
    return random;
}

function rollcolor() {
    var random = Math.random();
    random = random * 16777215
    var hexnum = Math.floor(random);
    var hexstr = hexnum.toString(16);
    var hex = '#' + hexstr
    return hex;
}

function rollword() {
    var words = new Array('wow', 'such', 'so', 'much', 'very');
    var num = rollposition(0, 4);
    var word = words[num];
    return word;
}

var dogeme = {
    'woof': woof
}

module.exports = dogeme