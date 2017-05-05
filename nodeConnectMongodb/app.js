var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var mgd = require('./mongodb.js');

http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST':
            update(req, res);
            break;
        case 'GET':
            get(req, res);
            break;
        default:
            break;
    }
}).listen(8080);

function update(req, res) {
    var pathname = url.parse(req.url).pathname;
    var postData = '';
    /*接收评论*/
    if (pathname == '/postComment') {
        req.addListener('data', function(data) {
            postData += data;
        });
        req.addListener('end', function() {
            var json = querystring.parse(postData);
            mgd(function(c) {
                c.insert('comment', json, function() {
                    var json = {}
                    json.code = 1;
                    // res.writeHead('Content-Type:application/json;charset=UTF-8');
                    res.write(JSON.stringify(json));
                    res.end();
                });
            });

        })
    }
}

function get(req, res) {
    var pathname = url.parse(req.url).pathname;

    /*主页*/
    if (pathname === '/') {
        fs.readFile('test.html', function(err, file) {
            res.end(file);
        })
    }

    /*获取评论列表*/
    if (pathname == '/comment') {
        mgd(function(c) {
            c.find('comment', {}, function(data) {
                var json = {};
                if (data.length != 0) {
                    json.code = 1;
                    json.data = data;
                } else {
                    json.code = 0;
                    json.data = null;
                }
                json = JSON.stringify(json)
                    //res.writeHead('Content-Type:application/json;charset=UTF-8');
                res.write(json);
                console.log(0)
                res.end();
            })

        })
    }

}