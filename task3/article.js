const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

const url = 'https://www.jianshu.com/p/914adcf4f399';

function replaceText(text) {
    return text.replace(/\n/g, "").replace(/\s/g, "");
}

function filterArticle(html) {
    let $ = cheerio.load(html);

    let data = {};

    let article = $('.article').html();

    data.title = $('h1.title').text();

    let content = replaceText($('.show-content-free p').text());

    data.ch_number = content.match(/[\u4e00-\u9fa5]/g).length;
    data.en_number = content.match(/[a-zA-Z]/g).length;

    let en_reg = /[-,.?:;'"!`\(\)\[\]]|(-{2})|(\.{3})/g;
    let ch_reg = /[，。？：；‘’！“”—……、（）【】{}《》]|(－{2})/g;


    data.punc_number = content.match(en_reg).length + content.match(ch_reg).length;
    console.log(data, content.match(en_reg), content.match(ch_reg), content.length)
}

https.get(url, (res) => {
    let html = '';

    res.on('data', (data) => {
        html += data;
    });

    res.on('end', () => {
        filterArticle(html);
    });


}).on('error', () => console.log('error'))