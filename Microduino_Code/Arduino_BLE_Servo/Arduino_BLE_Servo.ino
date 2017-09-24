#include <Servo.h>
Servo myservo;

#define my_Serial Serial //定义串口通讯为Serial

#define servoPin  9

String msg = ""; //定义一个字符串
uint8_t angle;

void setup() {
  //Serial.begin(115200);
  my_Serial.begin(9600);
  myservo.attach(servoPin);
}

void loop() {
  //每收到一次信号，向通信另一端反馈一次
  if (my_Serial.available() > 0)  //如果串口有数据输入
  {
    msg = my_Serial.readStringUntil('\n'); //获取换行符前所有的内容
    angle=msg.toInt();
    myservo.write(angle);
  }

  delay(10);
}
