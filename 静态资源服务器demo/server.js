var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
global.__hostname = __dirname;

http.createServer(function(req, res) {
    if (req.method === 'GET') {
        router(req, res);
    } else {
        res.writeHead('404');
        res.end(404);
    }
}).listen(8080);

function router(req, res) {
    var pathname = decodeURI(url.parse(req.url).pathname);
    //视图页
    if (pathname === '/') {
        return endFile(res, 'views.html');
    }

    //获取接口
    var realpath = pathname.split('/').slice(2).join('/');

    //判断是否为这样的格式/file/aaa/bbb/ccc.html
    var isFile = /\.\w+$/.test(path.basename(pathname)) && /^[\/]*file/.test(pathname);

    //小小地处理一下文件路径，让它访问位于JS_test这个文件夹下面的html文件
    realpath = path.join('Char-Ten.github.io', realpath);
    if (isFile) {        
        endFile(res, realpath);

    } else { //读取文件夹，以json输出。。。
        fs.readdir(realpath, function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return res.end('err');
            }
            endJson(res, data);
        })
    }

}

function endJson(res, json) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset="utf-8"' });
    res.end(JSON.stringify(json,4));
}

function endFile(res, openpath) {
    fs.readFile(openpath, function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('err');
        }
        var mime=require('./mime.json');
        var name=path.extname(openpath).replace('.','');
        if(mime[name]){
            res.writeHead(200, { 'Content-Type': mime[name]+';charset="utf-8"' });
        }else{
            res.writeHead(200, { 'Content-Type': mime['unknow']+';charset="utf-8"' });
        }
        res.end(data);
    })
}