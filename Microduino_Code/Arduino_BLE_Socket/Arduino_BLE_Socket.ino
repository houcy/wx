#include <Microduino_Key.h>

#define PIN_KEY       4     //KEY引脚
#define PIN_LED       5    // LED引脚
#define PIN_RELAY     6    //继电器引脚

DigitalKey key(PIN_KEY);

#define my_Serial Serial1 //定义串口通讯为Serial

String msg = ""; //定义一个字符串
boolean keystatus;

void setup() {
  Serial.begin(115200);
  my_Serial.begin(9600);
  pinMode(PIN_RELAY, OUTPUT);
  pinMode(PIN_LED, OUTPUT);

  key.begin(INPUT_PULLUP);
}

void loop() {
  if (my_Serial.available() > 0)  //如果串口有数据输入
  {
    msg = my_Serial.readStringUntil('\n'); //获取换行符前所有的内容
    if (msg == "ON")
    {
      keystatus=true;
      my_Serial.print("ON");
      digitalWrite(PIN_RELAY, HIGH);
      Serial.println("---------Is OK------");
    }
  }

  if (key.readEvent() == SHORT_PRESS)
  {
    keystatus = !keystatus;
    if (keystatus)
    {
      digitalWrite(PIN_RELAY, HIGH);
      my_Serial.print("ON");
    }
    else
    {
      digitalWrite(PIN_RELAY, LOW);
      my_Serial.print("OFF");
    }
  }

  delay(15);
}
