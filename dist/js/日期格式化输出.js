"use strict";

var dateUtil = {
  //1 判断某年份是否为闰年
  isLeapYear: function isLeapYear(year) {
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      return true;
    }

    return false;
  },
  //2 将日期格式化输出
  format: function format(date, s) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    return year + s + month + s + day;
  },
  //3 获得某个月份的天数
  getDays: function getDays(year, month) {
    switch (month) {
      case 2:
        if (isLeapYear(year)) {
          return 29;
        }

        return 28;

      case 4:
      case 6:
      case 9:
      case 11:
        return 30;

      default:
        return 31;
    }
  },
  //4.判断两个日期相差的天，时 ，分，秒
  getDiff: function getDiff(date1, date2) {
    //两个日期相减，得到的是毫秒数
    var ss = Math.abs((date1 - date2) / 1000);
    var day = Math.floor(ss / 24 / 3600);
    var hour = Math.floor(ss / 3600 % 24);
    var minute = Math.floor(ss / 60 % 60);
    var second = Math.floor(ss % 60);
    var milliseconds = Math.abs(Math.floor((date1 - date2) % 1000));
    return [day, hour, minute, second, milliseconds];
  },
  //5 获得N天以后的日期
  getNDate: function getNDate(n) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + n);
    return oDate;
  }
};