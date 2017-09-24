
const common = {
  getAngle: function (x, y, z, dir) {
    var temp = 0;
    var res = 0;
    switch (dir) {
      case 0://z
        temp = Math.sqrt(x * x + y * y) / z;
        res = Math.atan(temp);
        break;
      case 1://x
        temp = x / Math.sqrt(z * z + y * y);
        res = Math.atan(temp);
        break;
      case 2://y
        temp = y / Math.sqrt(x * x + z * z);
        res = Math.atan(temp);
        break;
    }
    return res * 1800 / 4.8 / 3.14;
  },

}
export default common;