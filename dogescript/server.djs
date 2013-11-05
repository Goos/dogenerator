so ./dogemes as doge
so express
so fs

very indexpage is plz fs.readFileSync with './index.html' 'utf8'

very app is plz express
very parser is plz express.bodyParser
plz app.use with parser

such index much req res
    plz res.writeHead with 200 {'Content-Type': 'text/html'}
    plz res.end with indexpage
wow

such image much req res
    very file is plz req.param with 'filename'
    such callbark much err img
        rly err is null
            plz res.writeHead with 200 {'Content-Type': 'image/jpeg'}
            plz res.end with img 'binary'
        wow
        rly err not null
            plz res.writeHead with 404 {'Content-Type': 'text/html'}
            plz res.end with indexpage
        wow
    wow
    very path is __dirname + '/../images/' + file
    plz fs.readFile with path callbark
wow

such upload much req res
    very words is req.body.words
    words is plz words.split with '\n'
    very path is req.files.image.path
    
    such callbark much err path
        very rpath is '/' + path
        plz res.redirect with rpath
        plz res.end
    wow

    plz doge.woof with path words callbark
wow

plz app.get with '/' index
plz app.get with '/:filename' image
plz app.post with '/' upload

plz app.listen with 3000