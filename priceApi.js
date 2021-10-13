const rp = require('request-promise');
const fs = require('fs')
const cheerio = require('cheerio');

const stocks = ['IGN1L.VS', 'SAB1L.VS', 'LHV1T.TL', 'CPA1T.TL', 'MSFT'];
//const stocks = ['BTC-USD'];

let url = 'https://finance.yahoo.com/quote/';
let res = '';
stocks.forEach(stock => {
	rp(url + stock)
  .then(function(html){
  	const $ = cheerio.load(html);

  	const open = $('#quote-market-notice').children()[0].children[0].data.indexOf('Market open.') > -1;
    const price = $('#quote-market-notice').parent().children()[0].children[0].data;
    const change = $('#quote-market-notice').parent().children()[1].children[0].data;

    res += stock + ' ' + price + ' ' + change + ' ' + (open ? 'OPEN' : 'CLOSED') + '\n';
    fs.writeFile('latest_price.txt' , res, function (err,data) {
      if (err) {
        return console.log(err);
      }
    });
  })
  .catch(function(err){
    //handle error
  });

});
