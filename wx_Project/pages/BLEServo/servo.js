//ble.js
//获取应用实例
import bleComm from '../../utils/bleComm.js';

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

  servo: function (e) {
    console.log('slider 发生 change 事件，携带值为', e.detail.value)
    var msg = e.detail.value.toString();
    console.log('msg',msg);
    bleComm.writeValue(msg);
  },
})