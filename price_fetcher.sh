#!/bin/bash

git pull

node priceApi.js

git commit -am "new price"

git push
