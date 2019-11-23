let deviceId = null;
let serviceId = null;
let characteristicId = null;
const characteristicUUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";
const serviceUUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
let promiseResolve = null;
import common from './common.js';
const bleComm = {

  connectDevice: function () {
    return bleComm.open().then(res => {
      return bleComm.getStatus();
    }).then(res => {
      return bleComm.startScan();
    }).then(res => {
      return bleComm.getDevices();
    }).then(res => {
      return bleComm.foundDevice();
    }).then(res => {
      return bleComm.stopScan();
    }).then(res => {
      return bleComm.connect();
    }).then(res => {
      return bleComm.getServices();
    }).then(res => {
      return bleComm.getCharacteristics();
    })
    // .then(res => {
    //   return bleComm.registerNotify();
    // })
  },

  open: function (e) {
    return new Promise((resolve, reject) => {
      console.log("open");
      wx.openBluetoothAdapter({
        success: (res) => {
          console.log("openAdapter", res);
          resolve(res);
        },
        fail: (err) => {
          console.log("fail");
          reject(err);
        }
      });
    })
  },
  getStatus: function (e) {
    return new Promise((resolve, reject) => {
      wx.getBluetoothAdapterState({
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  startScan: function (e) {
    return new Promise((resolve, reject) => {
      wx.startBluetoothDevicesDiscovery({
        // services: [serviceUUID],
        allowDuplicatesKey: true,
        interval: 1,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  getDevices: function (e) {
    return new Promise((resolve, reject) => {
      wx.getBluetoothDevices({
        success: (res) => {
          console.log("getDevices", res)
          resolve(res);
        }, fail: (err) => {
          reject(err);
        }
      })
    })
  },
  foundDevice: function (res) {
    return new Promise((resolve, reject) => {
      wx.onBluetoothDeviceFound(
        (res) => {
          for (var i = 0; i < res.devices.length; i++) {
            var device = res.devices[i];
            var blename = device.name
            console.log(Math.abs(device.RSSI));
            if (blename.indexOf("BBC") != -1&&Math.abs(device.RSSI) < 50) {
              deviceId = device.deviceId;
              resolve(res);
            }
          }
        }, (err) => {
          reject(err);
        })
    })
  },
  stopScan: function (e) {
    return new Promise((resolve, reject) => {
      wx.stopBluetoothDevicesDiscovery({
        success: (res) => {
          resolve(e);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  connect: function (e) {
    return new Promise((resolve, reject) => {
      wx.createBLEConnection({
        deviceId: deviceId,
        success: (res) => {
          resolve(deviceId);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },
  getServices: function (e) {
    return new Promise((resolve, reject) => {
      wx.getBLEDeviceServices({
        deviceId: deviceId,
        success: (res) => {
          for (var i = 0; i < res.services.length; i++) {
            if (res.services[i].uuid == serviceUUID) {
              serviceId = res.services[i].uuid;
              resolve(res);
            }
          }
        }
      })
    })
  },
  getCharacteristics: function (e, f) {
    return new Promise((resolve, reject) => {
      wx.getBLEDeviceCharacteristics({
        deviceId: deviceId,
        serviceId: serviceId,
        success: (res) => {
          for (var i = 0; i < res.characteristics.length; i++) {
            if (res.characteristics[i].uuid == characteristicUUID) {
              characteristicId = res.characteristics[i].uuid;
              resolve(res);
            }
          }
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  },
  registerNotify: function (e) {
    return new Promise((resolve, reject) => {
      wx.notifyBLECharacteristicValueChange({
        state: true,
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        success: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);

        }
      })
    })
  },
  writeValue: function (string) {
    return new Promise((resolve, reject) => {
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: common.stringToArrayBuffer(string),
        success: (res) => {
          promiseResolve = resolve;
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  },
  writeNumberValue: function (number) {
    return new Promise((resolve, reject) => {
      let buffer = new ArrayBuffer(1)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, number & 0xFF)
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: buffer,
        success: (res) => {
          promiseResolve = resolve;
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  },

  writeNumberArrayValue: function (number,num) {
    return new Promise((resolve, reject) => {
      let buffer = new ArrayBuffer(num)
      let dataView = new DataView(buffer)
      for (var i = 0; i < num; i++) {
        dataView.setUint8(i, number[i] & 0xFF)
      }
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: buffer,
        success: (res) => {
          promiseResolve = resolve;
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  },

  closeBLE: function (e) {
    return new Promise((resolve, reject) => {
      wx.closeBluetoothAdapter({
        success: function (res) {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  },

  disConnect: function (e) {
    return new Promise((resolve, reject) => {
      wx.closeBLEConnection({
        deviceId: deviceId,
        success: function (res) {
          deviceId = null;
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }
}

wx.onBLECharacteristicValueChange((characteristic) => {
  promiseResolve(common.arrayBufferToString(characteristic.value));
  promiseResolve = null;
})

export default bleComm;