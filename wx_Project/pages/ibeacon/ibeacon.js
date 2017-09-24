//index.js
//获取应用实例
import ibeaconComm from '../../utils/ibeaconComm.js';

var app = getApp()
let UUID;
let RSSI;
let distance;
let proximity;

Page({
  data: {
    motto: '\n',
    mini: 'UUID\n',
    rssival: '',
    dist: '',
    proxval: '\n',
    rssi: 'RSSI',
    meter: 'METER',
    prox: 'PROXMITY',
    userInfo: {}
  },

  onUnload: function () {
    wx.hideLoading();
  },
  onHide: function () {
    wx.hideLoading();
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  sendData: function () {
    ibeaconComm.connectibeacon().then(res => {
      wx.onBeaconUpdate(
        (res) => {
          //console.log(res);
          for (var i = 0; i < res.beacons.length; i++) {
            var beacons = res.beacons[i];
            //console.log(beacons.accuracy);
            UUID = beacons.uuid;
            RSSI = beacons.rssi;
            distance = Math.floor(beacons.accuracy * 100);
            if (distance % 10 == 0)
              distance = distance / 100 + 0.01;
            else
              distance = distance / 100;
            proximity = beacons.proximity;
            if (beacons.accuracy > 8 || beacons.accuracy < 0) {
              wx.vibrateLong();
              wx.showLoading({ title: '超出范围', });
            }
            else {
              wx.hideLoading();
            }
          }
          this.setData({
            motto: UUID + '\n',
            mini: 'UUID\n',
            rssival: RSSI,
            dist: distance,
            proxval: proximity + '\n',
            rssi: 'RSSI',
            meter: 'METER',
            prox: 'PROXMITY'
          })
        })
    })
  },

})
