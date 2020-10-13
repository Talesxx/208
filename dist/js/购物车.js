"use strict";

;

(function () {
  var username = localStorage.getItem("username");
  var loginStatus = parseInt(localStorage.getItem("loginStatus"));
  console.log(loginStatus);

  if (loginStatus == 1) {
    $(".header_wrap .fr a").fadeOut().remove();
    $(".header_wrap .fr").html("<a href=\"#\" >".concat("尊敬的" + username, "</a> | <a href=\"#\">\u6CE8\u9500</a>  | <a href=\"#\">\u6D88\u606F\u4E2D\u5FC3</a> "));
    $(".header_wrap .fr a").eq(1).on("click", function () {
      localStorage.setItem("loginStatus", "0");
      localStorage.removeItem("userCar");
      location.reload();
    });
  }
})();

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
      var str = " <div class=\"car_header clear\">\n        <div class=\"fl car-check\"><i class=\"iconfont\" data-all=\"all\" data-switch=\"0\">&#xe7fa;</i>\u5168\u9009</div>\n        <div class=\"fl car-img\">&nbsp;</div>\n        <div class=\"fl car-name\">\u5546\u54C1\u540D\u79F0</div>\n        <div class=\"fl car-price\">\u5355\u4EF7</div>\n        <div class=\"fl car-num\">\u6570\u91CF</div>\n        <div class=\"fl car-total\">\u5C0F\u8BA1</div>\n        <div class=\"fl car-action\">\u64CD\u4F5C</div>\n    </div>";

      for (var id in car) {
        for (var _i in car[id]) {
          var peizhi = car[id][_i]["peizhi"];
          var color = car[id][_i]["color"];
          var num = car[id][_i]["num"];
          str += "\n                    <div class=\"car_itme clear\" data-id=\"".concat(id, "\" data-color=\"").concat(color, "\" data-peizhi=\"").concat(peizhi, "\">\n                    <div class=\"fl car-check\"><i class=\"iconfont\" data-switch=\"0\">&#xe7fa;</i>&nbsp;</div>\n                    <div class=\"fl car-img\"><img src=\"../img/").concat(odata[id]["imgsrc"], "/img/").concat(odata[id]["img"][0], "\" alt=\"\"></div>\n                    <div class=\"fl car-name\">").concat(odata[id]["name"] + "  " + odata[id]["color"][color] + "  " + odata[id]["Configuration"][peizhi], "</div>\n                    <div class=\"fl car-price\">").concat(odata[id]["price"][peizhi], "</div>\n                    <div class=\"fl car-num\">&nbsp;<div><button>-</button><input type=\"number\" value=\"").concat(num, "\"><button>+</button></div>\n                    </div>\n                    <div class=\"fl car-total car-total-price orange\">").concat(odata[id]["price"][peizhi] * num, "</div>\n                    <div class=\"fl car-action\">x</div>\n                    </div>");
        }
      }

      str += " <div class=\"car_footer clear\" id=\"car_footer\">\n                <a href=\"\u5217\u8868\u9875.html\"><div class=\"fl car-check bgorange\">\u7EE7\u7EED\u8D2D\u7269</div></a>\n                <div class=\"fl car-img\">\u5DF2\u9009\u62E9<span>0</span> \u4EF6\u5546\u54C1</div>\n                <div class=\"fl car-name\">&nbsp;</div>\n                <div class=\"fl car-price\">&nbsp;</div>\n              \n                <div class=\"fl car-total  orange\">\u5408\u8BA1: <span id=\"zjg\">0</span>\u5143</div>\n                <div class=\"fl car-action  bgorange\">\u53BB\u652F\u4ED8</div>\n            </div>";
      $(".car").html(str);
      $(".car-action").click(function () {
        removeShop(car, $(this).parent().data("id"), $(this).parent().data("peizhi"), $(this).parent().data("color"));
        init();
        console.log(car);
        save(car);
      });
      $(".car-num input").on("input", function () {
        $(this).val(parseInt($(this).val()));

        if ($(this).val() >= 1) {} else {
          $(this).val(1);
        }

        numShop(car, $(this).parent().parent().parent().data("id"), $(this).parent().parent().parent().data("peizhi"), $(this).parent().parent().data("color"), $(this).val());
        $(this).parent().parent().parent().find(".car-total").text($(this).val() * $(this).parent().parent().parent().find(".car-price").text());
        zongjia();
        save(car);
      });
      $(".car-num button:first-child").click(function () {
        var input = $(this).siblings().filter("input");
        input.val(+input.val() - 1);
        input.trigger("input");
      });
      $(".car-num button:last-child").click(function () {
        var input = $(this).siblings().filter("input");
        input.val(+input.val() + 1);
        input.trigger("input");
      });
      $(".car-check i").not($(".car-check i")[0]).click(function () {
        $(this).toggleClass("bgorange");

        if ($(".car-check i").not($(".car-check i")[0]).not(".bgorange").length == 0) {
          $(".car-check i").addClass("bgorange");
        } else {
          $(".car-check i").eq(0).removeClass("bgorange");
        }

        zongjia();
      });
      $(".car-check i").eq(0).click(function () {
        $(this).toggleClass("bgorange");
        $(".car-check i").not($(".car-check i")[0]).attr("class", $(this).attr("class"));
        zongjia();
      });

      function zongjia() {
        var zjg = 0;
        $(".car-check .bgorange").parent().siblings().filter(".car-total-price").each(function () {
          console.log($(this).text());
          zjg += Number($(this).text());
        });
        console.log(zjg);
        $("#zjg").text(zjg);
      }
    }

    init();
  });
})();

function save(car) {
  if (localStorage.getItem("loginStatus") == 1) {
    localStorage.setItem("userCar", JSON.stringify(car));
    axios({
      method: "put",
      url: "http://localhost:3000/userCat/" + localStorage.getItem("UID"),
      data: {
        //根据url中的id进行修改
        username: localStorage.getItem("username"),
        "car": car
      }
    }).then(function (data) {
      //成功的回调函数，返回的是增加的数据
      console.log(data);
    });
  } else {
    localStorage.setItem("temporaryCar", JSON.stringify(car));
  }
}

function numShop(car, id, peizhi, color, num) {
  for (var i in car[id]) {
    if (car[id][i]["color"] == color && car[id][i]["peizhi"] == peizhi) {
      car[id][i]["num"] = num;
    }
  }
}

function removeShop(car, id, peizhi, color) {
  for (var i in car[id]) {
    if (car[id][i]["color"] == color && car[id][i]["peizhi"] == peizhi) {
      car[id].splice(i, 1);
    }
  }
}