//ble.js
//获取应用实例
import bleComm from '../../utils/bleComm.js';
import common from '../../utils/angle.js';
var msg;
var lastTime = 0;

Page({
  data: {
    motto: '',
  },

  onUnload: function () {
    bleComm.disConnect();
    wx.stopAccelerometer();
    msg=false;
  },
  onHide: function () {
    bleComm.disConnect();
    wx.stopAccelerometer();
    msg = false;
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

  switchLed: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    msg = e.detail.value;
    wx.onAccelerometerChange((res) => {
      var nowTime = new Date().getTime();//记录当前时间
      // console.log(res.x)
      // console.log(res.y)
      // console.log(res.z)
      //var anglex = common.getAngle(res.x, res.y, res.z, 1);
      //var angley = common.getAngle(res.x, res.y, res.z, 2);
      //var anglez = common.getAngle(res.x, res.y, res.z, 0);
      if (nowTime - lastTime > 1000) {
      lastTime = nowTime;
      if (msg) {
        var angley = common.getAngle(res.x, res.y, res.z, 2);
        if (angley < -60) {
          wx.showModal({
            title: 'Welcome',
            content: 'LiBin请选择!',
            cancelText: '关灯',
            confirmText: '开灯',
            success: function (res) {
              if (res.confirm) {
                console.log('开灯')
                bleComm.writeValue("true");
              } else if (res.cancel) {
                console.log('关灯')
                bleComm.writeValue("false");
              }
            }
          })
        }
      }
      else {
        console.log('停止监听加速度')
        wx.stopAccelerometer();
      }
      }
    })
  },
})