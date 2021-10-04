const rp = require('request-promise');
const cheerio = require('cheerio');

const stocks = ['IGN1L.VS', 'SAB1L.VS', 'LHV1T.TL', 'CPA1T.TL', 'MSFT'];

let url = 'https://finance.yahoo.com/quote/';

stocks.forEach(stock => {
	console.log(stock);
	rp(url + stock)
  .then(function(html){
  	const $ = cheerio.load(html);

  	const open = $('#quote-market-notice').children()[0].children[0].data.indexOf('Market open.') > -1;

  	console.log(stock + ' - ' + $('#quote-market-notice').parent().children()[0].children[0].data + ' ' + $('#quote-market-notice').parent().children()[1].children[0].data + ' ' + (open ? 'OPEN' : 'CLOSED'));
  
  })
  .catch(function(err){
    //handle error
  });
});
