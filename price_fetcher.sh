#!/bin/bash
cd /home/pi/stonks/stocks

git pull

/home/pi/.nvm/versions/node/v10.24.1/bin/node priceApi.js

git commit -am "new price"

git push
