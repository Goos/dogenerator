var fs = require('fs');
var doge = require('./lib/dogescript/index.js');

function parseDir (path) {
    fs.readdir(path, function (err, files) {
        if (err) return console.log(err);

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.substr(file.length - 3, 3) !== "djs") {
                continue;
            }

            var fullPath = path + file;
            (function(file, fullPath){fs.stat(fullPath, function (err, stats) {
                if (stats.isDirectory()) {
                    parseDir(fullPath+"/");
                } else {
                    fs.readFile(fullPath, "utf8", function (err, data) {
                        if (err) return console.log(err);
                        
                        var script = doge(data, true);
                        var fname = file.substr(0, file.length - 3) + "js";
                        fs.writeFile("./javascript/"+fname, script);
                    });
                }
            });})(file, fullPath);
        }
    });
}

parseDir('./dogescript/');