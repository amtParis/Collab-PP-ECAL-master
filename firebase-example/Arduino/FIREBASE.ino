
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Set these to run example.
#define FIREBASE_HOST "esptest-73b9b.firebaseio.com"
#define FIREBASE_AUTH "f0sNTB9rQY7WHqLTTkT8vfKW5d2nrWlIOZPGil0f"
#define WIFI_SSID "*****"
#define WIFI_PASSWORD "*****"


void setup() {
  Serial.begin(115200);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.set("RED_LED", 0);
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  pinMode(D1, OUTPUT); 
}


int val = 0;

void loop() {
val = Firebase.getInt("RED_LED");
if(val == 1){
  digitalWrite(LED_BUILTIN, LOW);
  digitalWrite(D1, HIGH);   
  }else{
     digitalWrite(LED_BUILTIN, HIGH);
     digitalWrite(D1, LOW);   
    }
delay(10);
}
