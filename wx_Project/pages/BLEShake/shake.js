//ble.js
//获取应用实例
import bleComm from '../../utils/bleComm.js';

var lastTime = 0;//此变量用来记录上次摇动的时间
var x = 0,
  y = 0,
  z = 0,
  lastX = 0,
  lastY = 0,
  lastZ = 0;//此组变量分别记录对应x、y、z三轴的数值和上次的数值
var shakeSpeed = 110;//设置阈值

Page({
  data: {
    motto: '',
  },

  onUnload: function () {
    bleComm.disConnect();
  },
  onHide: function () {
    bleComm.disConnect();
  },

  onLoad: function () {
    wx.showLoading({
      title: '靠近连接',
      mask: true
    })
    bleComm.connectDevice().then(res => {
      wx.showToast({
        title: '蓝牙连接成功',
        icon: 'success',
        duration: 300
      })
    });
  },

  sendData: function () {
    wx.onAccelerometerChange(function (acceleration) {
      var nowTime = new Date().getTime();//记录当前时间
      //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
      if (nowTime - lastTime > 100) {
        var diffTime = nowTime - lastTime;//记录时间段
        lastTime = nowTime;//记录本次摇动时间，为下次计算摇动时间做准备
        x = acceleration.x;//获取x轴数值
        y = acceleration.y;//获取y轴数值
        z = acceleration.z;//获取z轴数值
        //加速度运行一定时间，即为我们想要的速度 v=at
        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
        console.log(speed)
        if (speed > shakeSpeed) {//如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
          console.log('OK')
          bleComm.writeValue("true");//蓝牙发送指令
          wx.stopAccelerometer();
          wx.vibrateLong();//手机震动
          wx.showToast({ //弹框提示
            title: '摇一摇OK',
            icon: 'success',
            duration: 500,
            //mask: true
          })
        }
        else {
          wx.hideToast();
        }
        lastX = x;//赋值，为下一次计算做准备
        lastY = y;//赋值，为下一次计算做准备
        lastZ = z;//赋值，为下一次计算做准备
      }
    })
  },
})