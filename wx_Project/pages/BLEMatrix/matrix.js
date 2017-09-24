//index.js
var mycolor;

import bleComm from '../../utils/bleComm.js';
import common from '../../utils/common.js';

Page({
  data: {
    objectArray: [
      { id: 63, color: 0, bk: false }
    ],
    sscolor: [
      'bt-red-bk',
      'bt-yellow-bk',
      'bt-blue-bk',
      'bt-cyan-bk',
      'bt-green-bk',
      'bt-purple-bk'
    ],
    radiocolor: [
      '#ed4d46',
      '#f5ad32',
      '#2bbcb0',
      '#56c7df',
      '#2692ca',
      '#8D1CB7'
    ],
    items: [
      { name: 0, value: '红', checked: 'true' },
      { name: 1, value: '黄' },
      { name: 2, value: '绿' },
      { name: 3, value: '青' },
      { name: 4, value: '蓝' },
      { name: 5, value: '紫' },
    ]
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
    for (let i = 62; i >= 0; i--) {
      this.data.objectArray = [{ id: i, color: 0, bk: false }].concat(this.data.objectArray)
      this.setData({
        objectArray: this.data.objectArray,
      })
    }
    mycolor = 0;
    console.log(this.data.objectArray);
    console.log(this.data.sscolor);
  },

  listClick: function (event) {
    var id = parseInt(event.currentTarget.id);
    var x = id % 8;
    var y = parseInt(id / 8);
    this.data.objectArray[id].bk = !this.data.objectArray[id].bk;
    this.data.objectArray[id].color = mycolor;
    var msg;
    if (this.data.objectArray[id].bk)
      msg = x * 1000 + y * 100 + mycolor * 10 + 1;
    else
      msg = x * 1000 + y * 100 + mycolor * 10 + 0;
    console.log('(', x, ',', y, ',', mycolor, ')', msg);
    this.setData({
      objectArray: this.data.objectArray,
    })
    bleComm.writeValue(msg.toString());
  },

  clear: function () {
    for (let i = 63; i >= 0; i--) {
      this.data.objectArray[i].bk = false;
      this.data.objectArray[i].color = 0;
    }
    this.setData({
      objectArray: this.data.objectArray,
    })
    console.log("-1")
    bleComm.writeValue("-1");
  },

  radioChange: function (e) {
    //console.log('radio value ', e.detail.value);
    mycolor = parseInt(e.detail.value);
  }
})