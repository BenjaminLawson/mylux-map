#!/usr/bin/env python

import csv
import json

luxlist = []
with open('mylux_all_users.csv', 'rb') as csvfile:
    luxreader = csv.reader(csvfile, delimiter=';', quotechar='"')
    luxreader.next() # skip first line
    for row in luxreader:
        coords = row[2].split(',')
        lat = float(coords[0])
        lng = float(coords[1])
        if lat != 0.0 and lng != 0.0 and row[1].lower() != 'none':
            lux = int(row[1])
            luxlist.append({'lat': lat, 'lng': lng, 'lux': lux, 'time': row[4]})
print json.dumps(luxlist)
