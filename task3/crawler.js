const url = require('url')
const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'training'
});

connection.connect();


let urlText = '';
let data = {};

const server = http.createServer((req, res) => {

    let urlObj = url.parse(req.url, true);
    let html = '';

    urlText = urlObj.query.urlText;
    let pathname = urlObj.pathname;

    if (pathname == '/add') {
        console.log(urlText);

        https.get(urlText, (res) => {

            res.on('data', (data) => {
                html += data;
            });

            res.on('end', () => {
                filterArticle(html);
                connectionSql();
            })

        }).on('error', () => console.log('error'))
        res.end()
    }
    res.end()
}).listen(8000, 'localhost', () => {
    console.log('port 8000 is starting...')
})

function replaceText(text) {
    return text.replace(/\n/g, "").replace(/\s/g, "");
}

function filterArticle(html) {
    let $ = cheerio.load(html);

    let article = $('.article').html();

    data.title = $('h1.title').text();


    let content = replaceText($('.show-content-free p').text());

    let ch_number = content.match(/[\u4e00-\u9fa5]/g) ? content.match(/[\u4e00-\u9fa5]/g).length : 0;
    let en_number = content.match(/[a-zA-Z]/g) ? content.match(/[a-zA-Z]/g).length : 0;

    data.ch_number = ch_number;
    data.en_number = en_number;
    data.number = ch_number + en_number;

    let en_reg = /[-,.?:;'"!`\(\)\[\]]|(-{2})|(\.{3})/g;
    let ch_reg = /[，。？：；‘’！“”—……、（）【】{}《》]|(－{2})/g;


    let en_punc_number = content.match(en_reg) ? content.match(en_reg).length : 0;
    let ch_punc_number = content.match(ch_reg) ? content.match(ch_reg).length : 0;
    data.punc_number = en_punc_number + ch_punc_number;
    console.log(data)
}

function connectionSql() {

    let addSql = 'INSERT INTO file_content(title,number,ch_number,en_number,punc_number) VALUES(?,?,?,?,?)';
    let addSqlParams = [data.title, data.number, data.ch_number, data.en_number, data.punc_number];

    connection.query(addSql, addSqlParams, function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('INSERT ID:', result);
    });
}