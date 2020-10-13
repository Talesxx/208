"use strict";

;

(function () {
  $.get("http://127.0.0.1:3000/commodity/").then(function (data) {
    var car;

    if (localStorage.getItem("loginStatus") == 1) {
      car = JSON.parse(localStorage.getItem("userCar"));
    } else {
      car = JSON.parse(localStorage.getItem("temporaryCar") ? localStorage.getItem("temporaryCar") : "{}");
    } //将商品数据转化为对象


    var odata = {};

    for (var i in data) {
      odata[data[i]["id"]] = data[i];
    }

    function init() {
      var str = " <div class=\"car_header clear\">\n    <div class=\"fl car-check\"><i class=\"iconfont\" data-all=\"all\" data-switch=\"0\">&#xe7fa;</i>\u5168\u9009</div>\n    <div class=\"fl car-img\">&nbsp;</div>\n    <div class=\"fl car-name\">\u5546\u54C1\u540D\u79F0</div>\n    <div class=\"fl car-price\">\u5355\u4EF7</div>\n    <div class=\"fl car-num\">\u6570\u91CF</div>\n    <div class=\"fl car-total\">\u5C0F\u8BA1</div>\n    <div class=\"fl car-action\">\u64CD\u4F5C</div>\n</div>";

      for (var id in car) {
        for (var _i in car[id]) {
          var peizhi = car[id][_i]["peizhi"];
          var color = car[id][_i]["color"];
          var num = car[id][_i]["num"];
          str += "\n                <div class=\"car_itme clear\" data-id=\"".concat(id, "\" data-color=\"").concat(color, "\" data-peizhi=\"").concat(peizhi, "\">\n                <div class=\"fl car-check\"><i class=\"iconfont\" data-switch=\"0\">&#xe7fa;</i>&nbsp;</div>\n                <div class=\"fl car-img\"><img src=\"../img/").concat(odata[id]["imgsrc"], "/img/").concat(odata[id]["img"][0], "\" alt=\"\"></div>\n                <div class=\"fl car-name\">").concat(odata[id]["name"] + "  " + odata[id]["color"][color] + "  " + odata[id]["Configuration"][peizhi], "</div>\n                <div class=\"fl car-price\">").concat(odata[id]["price"][peizhi], "</div>\n                <div class=\"fl car-num\">&nbsp;<div><button>-</button><input type=\"number\" value=\"").concat(num, "\"><button>+</button></div>\n                </div>\n                <div class=\"fl car-total car-total-price orange\">").concat(odata[id]["price"][peizhi] * num, "</div>\n                <div class=\"fl car-action\">x</div>\n                </div>");
        }
      }

      str += " <div class=\"car_footer clear\" id=\"car_footer\">\n            <a href=\"\u5217\u8868\u9875.html\"><div class=\"fl car-check bgorange\">\u7EE7\u7EED\u8D2D\u7269</div></a>\n            <div class=\"fl car-img\">\u5DF2\u9009\u62E9<span>0</span> \u4EF6\u5546\u54C1</div>\n            <div class=\"fl car-name\">&nbsp;</div>\n            <div class=\"fl car-price\">&nbsp;</div>\n          \n            <div class=\"fl car-total  orange\">\u5408\u8BA1: <span id=\"zjg\">0</span>\u5143</div>\n            <div class=\"fl car-action  bgorange\">\u53BB\u652F\u4ED8</div>\n        </div>"; // $(".car").html(str);
    }
  });
})();