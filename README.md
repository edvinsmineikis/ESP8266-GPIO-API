# Introduction
This project is made for the ESP8266 NodeMCU to control GPIO pins over HTTP, it works as an API endpoint.

# How to start?
1. Clone this project.
2. Enter the _main_ folder and create a file named _wifi_credentials.h_, enter your WiFi SSID and password as such:
    ```
    #define SSID "your ssid"
    #define PASSWORD "your password"
    ```
3. Open the _main.ino_ with Arduino IDE, upload the sketch to your ESP, and it is ready to use.
4. To find the local IP of your ESP, check your router's DHCP clients list or reserve an address for your ESP's MAC address.
5. You can now send POST requests to the IP address of your ESP8266 and it will reply. Check out the _blink.py_ Python script for an example.

# Commands list
* In responses from ESP, a non-zero _status_ value represents an error with parsing JSON.
* For _analogRead_ of _A0_, specify pin as _0_.
## pinMode
* Value _0_ means _INPUT_
* Value _1_ means _OUTPUT_
* Value _2_ means _INPUT_PULLUP_

POST
```
{
    "cmd": "pinMode",
    "pin": 2,
    "value": 1
}
```
Reply
```
{
    "status": 0
}
```

## digitalRead
POST
```
{
    "cmd": "digitalRead",
    "pin": 2
}
```
Reply
```
{
    "status": 0,
    "value": 1
}
```
## analogRead
POST
```
{
    "cmd": "analogRead",
    "pin": 0
}
```
Reply
```
{
    "status": 0
    "value": 768
}
```
## digitalWrite
* Value _0_ means _LOW_
* Value _1_ means _HIGH_

POST
```
{
    "cmd": "digitalWrite",
    "pin": 2,
    "value": 1
}
```
Reply
```
{
    "status": 0
}
```
## analogWrite
POST
```
{
    "cmd": "analogWrite",
    "pin": 4,
    "value": 137
}
```
Reply
```
{
    "status": 0
}
```