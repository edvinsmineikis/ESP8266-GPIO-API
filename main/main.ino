#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include "wifi_credentials.h"
#define TIMEOUT 5000

// SSID and PASSWORD shall be defined in wifi_credentials.h
const char* ssid = SSID;
const char* password = PASSWORD;

WiFiServer server(80);

unsigned long timerStart;

void setup() {
  delay(10);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    while (client.connected()) {

      // Wait TIMEOUT until data starts coming in
      timerStart = millis();
      while (!client.available()) {
        if (millis() - timerStart > TIMEOUT) {
          client.stop();
          return;
        }
      }
      
      // Wait TIMEOUT until incoming byte is {, then parse remaining stream as JSON
      // This basically works as a filter for headers that come with HTTP
      StaticJsonDocument<96> receivedJson;
      DeserializationError receivedError;
      timerStart = millis();
      while (1) {
        char c = client.read();
        // This delay prevents things from messing up due to processing speeds. If you get timeouts try increase this value.
        delay(1);
        if (client.peek() == 123) {
          DeserializationError receivedError = deserializeJson(receivedJson, client);
          break;
        }
        if (millis() - timerStart > TIMEOUT) {
          client.stop();
          return;
        }
      }

      // Prepare the response
      StaticJsonDocument<96> responseJson;
      if (receivedError) {
        responseJson["status"] = 1;
      } else {
        responseJson["status"] = 0;
        if (receivedJson["cmd"].as<String>() == "digitalRead") {
          int pin = receivedJson["pin"];
          responseJson["value"] = digitalRead(pin);
        }
        if (receivedJson["cmd"].as<String>() == "analogRead") {
          int pin = receivedJson["pin"];
          responseJson["value"] = analogRead(pin);
        }
        if (receivedJson["cmd"].as<String>() == "digitalWrite") {
          int pin = receivedJson["pin"];
          int value = receivedJson["value"];
          digitalWrite(pin, value);
        }
        if (receivedJson["cmd"].as<String>() == "analogWrite") {
          int pin = receivedJson["pin"];
          int value = receivedJson["value"];
          analogWrite(pin, value);
        }
        if (receivedJson["cmd"].as<String>() == "pinMode") {
          int pin = receivedJson["pin"];
          int value = receivedJson["value"];
          pinMode(pin, value);
        }
      }

      // Send response
      String response;
      serializeJson(responseJson, response);

      client.println("HTTP/1.1 200 OK");
      client.println("Content-Type: application/json");
      client.print("Content-Length: ");
      client.println(response.length() + 2);
      client.println("");
      client.println(response);

      client.stop();
    }
  }
}
