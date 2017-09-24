#include <Microduino_Matrix.h>

uint8_t Addr[MatrixPix_X][MatrixPix_Y] = {  //1x1
  {64}      //点阵IIC地址
};

Matrix display = Matrix(Addr, TYPE_COLOR);

#define my_Serial Serial //定义串口通讯为Serial

static const uint8_t logoA[] PROGMEM = {   //低位在前 逐行
  0x00, 0x00, 0x14, 0x2A, 0x2A, 0x2A, 0x00, 0x00  
};

String msg = ""; //定义一个字符串
int matrix;
uint8_t x, y, color, sta;

uint8_t setcolor[6][3]
{
  {155, 0, 0},
  {155, 155, 0},
  {50, 255, 130},
  {0, 155, 155},
  {0, 0, 155},
  {155, 0, 155}
};

void showMatrix(int data)
{
  if (data == -1)
    display.clearDisplay();
  else
  {
    x = data / 1000;
    y = data / 100 % 10;
    color = data % 100 / 10;
    sta = data % 10;
    if (sta)
      display.setLedColor(x, y, setcolor[color][0], setcolor[color][1], setcolor[color][2]);
    else
      display.setLedColor(x, y, 0, 0, 0);
  }
}

void setup() {
  my_Serial.begin(9600);
  delay(5000);
  Wire.begin();
  display.setBrightness(255);
  display.clearDisplay();
  display.setColor(0, 255, 0);
  display.drawBMP(0, 0, 8, 8, logoA);  //x,y,w,h,data
  delay(2000);
  display.clearDisplay();
}

void loop() {
  if (my_Serial.available() > 0)  //如果串口有数据输入
  {
    msg = my_Serial.readStringUntil('\n');
    matrix = msg.toInt();
    showMatrix(matrix);
  }
}
