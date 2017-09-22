#!/usr/bin/env python

import csv
import json
from datetime import datetime
from dateutil import parser

def parse_date(timestamp):
    return parser.parse(timestamp)
    # for fmt in ('%Y-%m-%d %H:%M:%S %z' ,'%Y-%m-%d %H:%M:%S %Z'): # utc offset, named timezone
    #     try:
    #         return datetime.strptime(timestamp, fmt)
    #     except ValueError:
    #         pass
    #raise ValueError('No valid date format found for ', timestamp)

def is_day_time(time):
    hour = time.hour
    return hour >= 6 and hour <= 18

# return: string corresponding to color
def color_for_lux_time(lux, timestamp):
    color = 'r'
    if is_day_time(parse_date(timestamp)):
        if lux > 100: # bright during day
            color = 'b' # blue
        else: # dark during day
            color = 'g' # gray
    else: # night
        if lux > 100:
            color = 'y'
        else:
            color = 'r'
    return color

def main():
    luxlist = []
    with open('mylux_all_users.csv', 'rb') as csvfile:
        luxreader = csv.reader(csvfile, delimiter=';', quotechar='"')
        luxreader.next() # skip first line
        for row in luxreader:
            coords = row[2].split(',')
            lat = float(coords[0])
            lng = float(coords[1])
            label = row[3]
            timestamp = row[4]
            if lat != 0.0 and lng != 0.0 and row[1].lower() != 'none':
                 lux = int(row[1])
                 color = color_for_lux_time(lux, timestamp)
                 luxlist.append({'lat': lat, 'lng': lng, 'lx': lux, 'tm': timestamp, 'lb': label, 'cl': color})
    print json.dumps(luxlist, ensure_ascii=False) # some foreign characters aren't ascii

if __name__ == "__main__":
    main()
