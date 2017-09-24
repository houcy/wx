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

  switchLed: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var msg;
    if (e.detail.value)
      msg = 'true';
    else
      msg = 'false';
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        wx.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: '123456',
          authContent: 'Hello LiBin',
          success(res) {
            console.log('finger is ok', msg);
            bleComm.writeValue(msg);
          }
        })
      },
      fail(res) {
        console.log("不支持指纹");
        wx.showModal({
          title: '抱歉',
          content: '设备不支持指纹',
          cancelText: '取消',
          confirmText: '确认',
          success: function (res) {
          }
        })
      }
    })
  },
})
