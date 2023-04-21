import requests
import json
import time

def querySensor(url, data):
    resp = requests.post(url, json.dumps(data), timeout=5)
    if resp.status_code == 200:
        return json.loads(resp.text)
    
# Define your ESP IP here
url = "http://192.168.0.100/"

data = {
    "cmd": "pinMode",
    "pin": 2, # Pin 2 is built-in LED
    "value": 1
}

print(querySensor(url, data))

while True:
    data = {
        "cmd": "digitalWrite",
        "pin": 2,
        "value": 1
    }
    print(querySensor(url, data))
    time.sleep(1)

    data = {
        "cmd": "digitalWrite",
        "pin": 2,
        "value": 0
    }
    print(querySensor(url, data))
    time.sleep(1)
