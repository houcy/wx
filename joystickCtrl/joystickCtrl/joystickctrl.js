import bleComm from '../utils/bleComm.js';
var speedF, speedD;
var speedCacheL=0, speedCacheR=0;
var touchLX, touchLY;
var touchRX, touchRY;

Page({

  data: {
    startX: '120',
    startY: '220',
    leftLooksL: '120',
    topLooksL: '220',
    rightLooksR: '120',
    topLooksR: '220',
    radius: '60',
  },

  onUnload: function () {
    bleComm.disConnect(); //断开蓝牙连接
    bleComm.closeBLE(); //关闭蓝牙服务
  },
  onHide: function () {
    bleComm.disConnect(); //断开蓝牙连接
    bleComm.closeBLE(); //关闭蓝牙服务
  },



  onShow: function (options) {
    wx.showLoading({
      title: '靠近连接',
      // mask: true
    })

    bleComm.connectDevice().then(res => {
      wx.showToast({
        title: '蓝牙连接成功',
        icon: 'success',
        duration: 300
      })
    });
  },

  map: function (x, in_min, in_max, out_min, out_max) {
    return Math.round(((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min));
  },

  ImageTouchMove: function (e) {
    var self = this;
    touchLX = self.data.startX;
    touchRY = self.data.startY;
    // console.log(e)
    // console.log(e.touches.length,"val:",e.touches)
    if (e.touches.length == 1) {
      if (e.touches[0].clientX < 333) {
        touchLY = e.touches[0].clientY - 30;
        touchRX = self.data.startX;
      } else {
        touchLY = self.data.startY;
        touchRX = 667 - e.touches[0].clientX - 30;
      }
    } else {
      if (e.touches[0].clientX < e.touches[1].clientX) {
        touchLY = e.touches[0].clientY - 30;
        touchRX = 667 - e.touches[1].clientX - 30;
      } else {
        touchLY = e.touches[1].clientY - 30;
        touchRX = 667 - e.touches[0].clientX - 30;
      }
    }
    touchLY = Math.round(touchLY);
    touchRX = Math.round(touchRX);
    //左摇杆限制位置 中心点220+—(大图半径90-小图半径30)
    if (touchLY < 160) {
      touchLY = 160;
    } else if (touchLY > 280) {
      touchLY = 280;
    }
    //右摇杆限制位置 中心点120+—(大图半径90-小图半径30)
    if (touchRX < 60) {
      touchRX = 60;
    } else if (touchRX > 180) {
      touchRX = 180;
    }
    // console.log("Move-->Left:", touchLX, ",", touchLY, "Right:", touchRX, ",", touchRY);
    self.setData({
      leftLooksL: touchLX,
      topLooksL: touchLY,
      rightLooksR: touchRX,
      topLooksR: touchRY,
    })
    speedF = self.map(touchLY, 160, 280, 99, 0);
    speedD = self.map(touchRX, 60, 180, 99, 0);
    var speed = (speedF * 100 + speedD);
    var _ychange = Math.abs(speedF - speedCacheL);
    var _xchange = Math.abs(speedD - speedCacheR);
    console.log(_ychange)
    if (_ychange > 10) {
      console.log('speed:', speed);
      bleComm.writeValue(speed.toString() + "#");//蓝牙发送数据
      speedCacheL = speedF;
    }
    if (_xchange > 10) {
      console.log('speed:', speed);
      bleComm.writeValue(speed.toString() + "#");//蓝牙发送数据
      speedCacheR = speedD;
    }

  },

  ImageReturn: function (e) {
    var self = this;
    // console.log(e.changedTouches.length)
    // console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    if (e.changedTouches[0].clientX < 333) {
      touchLX = self.data.startX;
      touchLY = self.data.startY;
    } else {
      touchRX = self.data.startX;
      touchRY = self.data.startY;
    }
    self.setData({
      leftLooksL: touchLX,
      topLooksL: touchLY,
      rightLooksR: touchRX,
      topLooksR: touchRY,
    })
    // console.log("Return-->Left:", touchLX, ",", touchLY, "Right:", touchRX, ",", touchRY);
    speedF = self.map(touchLY, 160, 280, 99, 0);
    speedD = self.map(touchRX, 60, 180, 99, 0);
    var speed = (speedF * 100 + speedD);
    console.log('speed:', speed);
    bleComm.writeValue(speed.toString() + "#");//蓝牙发送数据
  }
})