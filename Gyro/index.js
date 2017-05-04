var express = require('express');
var app = express();
var http = require('http');
var router = require('./app/index');
var ws = require('./ws/index');

app.use(express.static(__dirname + '/src'));
router(app);

var server = http.createServer(app);
var io = require('socket.io')(server);
ws(io)
server.listen(3000);