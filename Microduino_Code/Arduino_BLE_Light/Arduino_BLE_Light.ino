#define my_Serial Serial //定义串口通讯为Serial

String msg = ""; //定义一个字符串
float light, lightC;

void setup() {
  //Serial.begin(115200);
  my_Serial.begin(9600);
}

void loop() {
  //每收到一次信号，向通信另一端反馈一次
  if (my_Serial.available() > 0)  //如果串口有数据输入
  {
    msg = my_Serial.readStringUntil('\n'); //获取换行符前所有的内容
  }

  light = analogRead(A0) / 1000.0;
  if (light > 1)
    light = 1;
  if (lightC - light > 0.1 || lightC - light < -0.1)
  {
    my_Serial.print(light);
    lightC = light;
  }

  delay(500);
}
