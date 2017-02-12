var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var opt = {
    host: 'www.w3school.com.cn',
    path: '/media/media_mimeref.asp',
    method: 'GET',
    headers: {
        'Host': 'www.w3school.com.cn',
        'Referer': 'http://www.w3school.com.cn',
        'Content-Type': 'application/x-www-form-urlencoded;',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
    }
}
var str = '';
var request = http.request(opt, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
        str += chunk;
    });
    res.on('end', resEnd)
});
request.end();

function resEnd() {
    var json = {};
    var $ = cheerio.load(str);
    var key, value;
    $('table.dataintable').eq(1).find('tr').each(function() {
        key = $(this).find('td').eq(0).text().replace(/(^\s+|\s+$)/, '');
        value = $(this).find('td').eq(1).text();
        if (key && value) {
            json[key] = value;
        } else if (!key && value) {
            json['unknow'] = value;
        }
        json['json'] = 'application/json'
    });
    fs.writeFile('mime.json', JSON.stringify(json), function(err) {
        if (err) {
            return console.log('err');
        }
        console.log('success')
    })
}