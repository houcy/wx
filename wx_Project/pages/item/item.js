const app = getApp()

var nextpage = [
  '../ibeacon/ibeacon',
  '../BLEString/ble',
  '../BLEFinger/finger',
  '../BLEShake/shake',
  '../BLEAngle/angle',
  '../BLELight/light',
  '../BLEServo/servo',
  '../BLEMatrix/matrix'
];

Page({
  data: {
    ibeacon: {
      index: 0,
      title: 'iBeacon',
      description: '设备超过一定距离，手机震动报警',
      device: 'BLE BM',
      use: '8.9',
      logo:'../images/ibeacon.png'
    },
    penetrate:
    {
      index: 1,
      title: 'Penetrate',
      description: '蓝牙与手机通讯-发送接收字符串',
      device: 'BLE OLED',
      use: '9.8',
      logo: '../images/String.png'
    },
    finger:
    {
      index: 2,
      title: 'Finger',
      description: '蓝牙与手机通讯-指纹开灯',
      device: 'BLE ColorLED',
      use: '9.5',
      logo: '../images/finger.png'
    },
    shock:
    {
      index: 3,
      title: 'Shake',
      description: '蓝牙与手机通讯-摇一摇开灯',
      device: 'BLE ColorLED',
      use: '9.2',
      logo: '../images/shake.png'
    },
    angle:
    {
      index: 4,
      title: 'Motion',
      description: '蓝牙与手机通讯-抬起开灯',
      device: 'BLE ColorLED',
      use: '9.2',
      logo: '../images/angle.png'
    },
    light:
    {
      index: 5,
      title: 'Light',
      description: 'Sensor-Light控制手机屏幕亮度',
      device: 'BLE Sensor-Light',
      use: '8.9',
      logo: '../images/light.png'
    },
    servo:
    {
      index: 6,
      title: 'Servo',
      description: '蓝牙与手机通讯控制舵机角度',
      device: 'BLE Servo',
      use: '9.0',
      logo: '../images/servo.png'
    },
    matrix:
    {
      index: 7,
      title: 'Matrix',
      description: '蓝牙与手机通讯控制8*8彩色点阵画图',
      device: 'BLE Matrix',
      use: '9.6',
      logo: '../images/matrix.png'
    },
  },

  onLoad: function () {

  },

  listClick: function (event) {
    console.log(event);
    var p = event.currentTarget.id
    wx.navigateTo({ url: nextpage[parseInt(p)] })
  }
})