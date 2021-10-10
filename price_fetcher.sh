#!/bin/bash
cd /home/pi/stonks/stocks

git pull

node priceApi.js

git commit -am "new price"

git push
