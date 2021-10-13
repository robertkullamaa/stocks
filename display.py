#! /usr/bin/env python
# -*- coding: UTF-8 -*-

import drivers
import time
import requests 
import datetime

display = drivers.Lcd()
sleepSecond = 3
minute = 60
iteration = minute/sleepSecond


def PrintTime(data):
    display.lcd_display_string(data[0] + " " + data[1], 1)


def PrintCurrency(data):
    display.lcd_display_string(data[2] + " " + data[3], 2)


def PrintScreen(data):
    display.lcd_clear()
    PrintTime(data)
    PrintCurrency(data)


def GetCurrencyList():
    file1 = open('./latest_price.txt', 'r')
    Lines = file1.readlines()

    return Lines

try:
    while True:
        currencyList = GetCurrencyList()
        if currencyList:
            for i in range(int(iteration/len(currencyList))):
                for item in currencyList:
                    PrintScreen(item.split())
                    time.sleep(sleepSecond)
        else:
            display.lcd_clear()
            PrintTime()
            time.sleep(sleepSecond)

except KeyboardInterrupt:
    print("Cleaning up!")
    display.lcd_clear()
