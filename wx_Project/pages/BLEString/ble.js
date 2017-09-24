//ble.js
//获取应用实例
import bleComm from '../../utils/bleComm.js';
import common from '../../utils/common.js';

var extraLine = [];

Page({
  data: {
    motto: '',
    msg: '',
  },

  onUnload: function () {
    bleComm.disConnect();
    extraLine = [];
  },
  onHide: function () {
    bleComm.disConnect();
    extraLine = [];
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
      var news = common.arrayBufferToString(characteristic.value);
      extraLine.push(news)
      console.log(news);
      this.setData({
        motto: extraLine.join('\n'),
        scrollTop: this.data.scrollTop + 30
      })
    })
  },

  bindKeyInput: function (result) {
    this.setData({
      msg: result.detail.value
    });
  },

  sendData: function () {
    bleComm.writeValue(this.data.msg);
  }
})

