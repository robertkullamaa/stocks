#! /usr/bin/env python
# -*- coding: UTF-8 -*-

import drivers
import time
import requests 
import datetime

display = drivers.Lcd()
sleepSecond = 4


def PrintTime(data):
    display.lcd_display_string(data[0] + " " + data[3], 1)


def PrintCurrency(data):
    display.lcd_display_string(data[2] + " " + data[1], 2)


def PrintScreen(data):
    display.lcd_clear()
    PrintTime(data)
    PrintCurrency(data)


def GetCurrencyList():
    while True:
        try:
            file1 = open('/home/pi/stonks/stocks/prices.txt', 'r')
            Lines = file1.readlines()
            print("readlines")
            return Lines
        except:
            print("An exception occurred")
            time.sleep(1)
    

try:
    while True:
        currencyList = GetCurrencyList()
        if currencyList:
            for item in currencyList:
                print(item)
                PrintScreen(item.split())
                time.sleep(sleepSecond)
            
        else:
            display.lcd_clear()
            PrintTime()
            time.sleep(sleepSecond)

except KeyboardInterrupt:
    print("Cleaning up!")
    display.lcd_clear()
except:
    display.lcd_clear()
    display.lcd_display_string("ERROR", 1)
