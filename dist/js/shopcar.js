"use strict";

;

(function () {
  $(".shopcat").hover(function () {
    $("#min_car").finish().slideDown();
    $.get("http://127.0.0.1:3000/commodity/").then(function (data) {
      console.log(1);
      2;
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
        var str = "";

        for (var id in car) {
          for (var _i in car[id]) {
            var peizhi = car[id][_i]["peizhi"];
            var color = car[id][_i]["color"];
            var num = car[id][_i]["num"];
            str += "\n                                <li><a href=\"\u8BE6\u60C5\u9875.html?id=".concat(id, "\"><img src=\"../img/").concat(odata[id]["imgsrc"], "/img/").concat(odata[id]["img"][0], "\" alt=\"\"></a><p>").concat(odata[id]["name"] + "  " + odata[id]["color"][color] + "  " + odata[id]["Configuration"][peizhi], "</p></li>\n                    ");
          }
        }

        if (str.trim() == "") {
          str += "  <li><p>\u4F60\u7684\u8D2D\u7269\u8F66\u8FD8\u662F\u7A7A\u5FEB\u53BB\u8D2D\u7269\u5427</p></li>";
        }

        $("#min_car ul").html(str);
      }

      init();
    });
  }, function () {
    $("#min_car").finish().slideUp();
  });
})();