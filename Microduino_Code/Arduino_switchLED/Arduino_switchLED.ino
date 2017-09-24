#include <Microduino_ColorLED.h> //引用彩灯库

ColorLED strip = ColorLED(1, 6);

#define my_Serial Serial //定义串口通讯为Serial

String msg = ""; //定义一个字符串

void setup(void) {
  my_Serial.begin(9600);
  strip.begin();
}

void loop(void) {
  //每收到一次信号，向通信另一端反馈一次
  if (my_Serial.available() > 0)  //如果串口有数据输入
  {
    msg = my_Serial.readStringUntil('\n'); //获取换行符前所有的内容
    if (msg == "true")
      strip.setPixelColor(0, 0XFF00FF);
    else if (msg == "false")
      strip.setPixelColor(0, 0X000000);
    strip.show();
  }
  delay(10);
}

