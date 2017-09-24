
const serviceUUID = "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0";

const ibeaconComm = {
  connectibeacon: function () {
    return ibeaconComm.start().then(res => {
      return ibeaconComm.getStatus();
    })
  },

  start: function (e) {
    return new Promise((resolve, reject) => {
      wx.startBeaconDiscovery({
        uuids: [serviceUUID],
        success: (res) => {
          // console.log(res);
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    })
  },

  getStatus: function (e) {
    return new Promise((resolve, reject) => {
      wx.getBeacons({
        success: (res) => {
          // console.log(res);
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
}

export default ibeaconComm;