const rp = require('request-promise');
const fs = require('fs')
const cheerio = require('cheerio');

//const stocks = ['IGN1L.VS', 'SAB1L.VS', 'LHV1T.TL', 'CPA1T.TL', 'MSFT', 'BTC'];
const stocks = ['BTC-USD'];

let url = 'https://finance.yahoo.com/quote/';

stocks.forEach(stock => {
	rp(url + stock)
  .then(function(html){
  	const $ = cheerio.load(html);

  	const open = $('#quote-market-notice').children()[0].children[0].data.indexOf('Market open.') > -1;
    const price = $('#quote-market-notice').parent().children()[0].children[0].data;
    const change = $('#quote-market-notice').parent().children()[1].children[0].data;

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    const timestring = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    

    const res = timestring + ' ' + stock + ' - ' + price + ' ' + change + ' ' + (open ? 'OPEN' : 'CLOSED');

  	console.log(res);
    fs.writeFile('latest_price.txt' , res, function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });
  
  })
  .catch(function(err){
    //handle error
  });
});
