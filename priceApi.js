const rp = require('request-promise');
const fs = require('fs')
const cheerio = require('cheerio');

const stocks = ['IGN1L.VS', 'SAB1L.VS', 'AAPL', 'MSFT', 'LHV1T.TL'];
const stockNames = {
  'IGN1L.VS': 'IGN', 
  'SAB1L.VS': 'SAB', 
  'AAPL': 'AAPL', 
  'MSFT': 'MSFT', 
  'LHV1T.TL': 'LHV'
}
//const stocks = ['BTC-USD'];

let url = 'https://finance.yahoo.com/quote/';
let res = '';
let promises = [];
stocks.forEach(stock => {
	promises.push(rp(url + stock))
});
  
Promise.all(promises).then(values => {
  values.forEach((html, index) => {
    const $ = cheerio.load(html);

    const open = $('#quote-market-notice').children()[0].children[0].data.indexOf('Market open.') > -1;
    const price = $('#quote-market-notice').parent().children()[0].children[0].data;
    const change = $('#quote-market-notice').parent().children()[1].children[0].data;

    res += stockNames[stocks[index]] + ' ' + price + ' ' + change + ' ' + (open ? 'OPEN' : 'CLOSED') + '\n';
  });

  fs.writeFile('prices.txt' , res, function (err,data) {
    if (err) {
      return console.log(err);
    }
  });
});