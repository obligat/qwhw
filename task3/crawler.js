var http = require('https');
var url = 'https://www.jianshu.com/';

http.get(url, (res) => {
    var html = '';

    res.on('data', (data) => {
        html += data
    });

    res.on('end', () => console.log(html));

}).on('error', () => console.log('error'))