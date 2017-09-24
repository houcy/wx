//ble.js
//获取应用实例
import bleComm from '../../utils/bleComm.js';
import common from '../../utils/common.js';

Page({
  data: {
    motto: 'Hello',
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

  onShow: function () {
    wx.onBLECharacteristicValueChange((characteristic) => {
      var news = common.arrayBufferToString(characteristic.value);//接收蓝牙消息
      console.log(news);
      wx.getScreenBrightness({
        success: (result) => {
          wx.setScreenBrightness({
            value: parseFloat(news).toFixed(1)//设置屏幕亮度，字符串转化为数字
          })
        },
      })
    })
  },

  sendData: function () {
    bleComm.writeValue("on");
  }
})