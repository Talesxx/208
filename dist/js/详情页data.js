"use strict";

(function () {
  var search = location.search;

  if (search) {
    search = search.replace(/^\?/, "");
    var arr = search.split("&");

    for (var index in arr) {
      if (arr[index].split("=")[0] == "id") {
        var id = arr[index].split("=")[1]; //商品id
      }
    }

    if (!isNaN(id)) {
      //轮播图以及数据展示
      $.get("http://127.0.0.1:3000/commodity/" + id, function (data) {
        $("#top_name").text(data["name"]); //头部名

        $("#shop_name").text(data["name"]); //名字

        $(".sale-desc").text(data["js"]); //介绍

        $(".price-info").text(data["price"][0] + "元"); //价格

        $(".total-price").text("总计: " + data["price"][0] + "元"); //价格

        $("#itme_text").html("".concat(data["name"], " ").concat(data["color"][0]).concat(data["Configuration"][0], "<span class=\"right\">").concat(data["price"][0], "\u5143</span>"));
        $(".company-info").text(data["shop"]); //商店

        var str = "";

        for (var _index in data["color"]) {
          str += "<a class=\"btn_select\" data-color=\"".concat(_index, "\">").concat(data["color"][_index], "</a>");
        }

        $(".commodity_body .color").html(str); //颜色

        $(".commodity_body .color a").eq(0).addClass("btn_anxia");
        str = "";

        for (var _index2 in data["Configuration"]) {
          str += "<a class=\"btn_select\" data-peizhi=\"".concat(_index2, "\">").concat(data["Configuration"][_index2], "</a>");
        }

        $(".commodity_body .peizhi").html(str); //配置

        $(".commodity_body .peizhi a").eq(0).addClass("btn_anxia");
        str = "";

        for (var _index3 in data["img"]) {
          str += " <img src=\"../img/".concat(data["imgsrc"], "/img/").concat(data["img"][_index3], "\" alt=\"\">");
        }

        $(".lunbo_img").html(str); //轮播图片

        str = "";

        for (var _index4 in data["xqimg"]) {
          str += " <img src=\"../img/".concat(data["imgsrc"], "/xqimg/").concat(data["xqimg"][_index4], "\" alt=\"\">");
        }

        $("#xq").html(str); //介绍图片
        //轮播图

        (function () {
          var index = 0;
          var num = $(".lunbo_img img").length;
          var str = "";

          for (var i = 0; i < num; i++) {
            str += "<li></li>";
          }

          $(".lunbo_index").html(str);

          function init() {
            if (index < 0) {
              index = $(".lunbo_img img").length - 1;
            }

            if (index > $(".lunbo_img img").length - 1) {
              index = 0;
            }

            $(".lunbo_img img").finish().fadeOut(500);
            $(".lunbo_img img").eq(index).finish().fadeIn(500);
            $(".lunbo_index li").removeClass("activation_lunbo_index");
            $(".lunbo_index li").eq(index).addClass("activation_lunbo_index");
          }

          var _loop = function _loop(j) {
            $(".lunbo_index li").eq(j).click(function () {
              index = j;
              $(".lunbo_img img").finish().fadeOut(500);
              $(".lunbo_img img").eq(index).fadeIn(500);
              $(".lunbo_index li").removeClass("activation_lunbo_index");
              $(".lunbo_index li").eq(index).addClass("activation_lunbo_index");
            });
          };

          for (var j = 0; j < $(".lunbo_index li").length; j++) {
            _loop(j);
          }

          function start() {
            var lbtime = setInterval(function name() {
              index++;
              init();
            }, 2000);
            $(".lunbo_img").prop({
              "lbtime": lbtime
            });
          }

          start();

          function stop() {
            clearInterval($(".lunbo_img").prop("lbtime"));
          }

          function next() {
            index++;
            init();
          }

          function per() {
            index--;
            init();
          }

          $(".lf_btn").click(function () {
            per();
          });
          $(".rg_btn").click(function () {
            next();
          });
          $(".lunbo").mouseover(function () {
            stop();
          });
          $(".lunbo").mouseout(function () {
            start();
          });
        })(); //购物车按钮实现


        (function () {
          //价格和详情跟随变化
          function price() {
            var color = $(".color").find(".btn_anxia").text();
            var Configuration = $(".peizhi").find(".btn_anxia").text();
            var price = $(".peizhi").find(".btn_anxia").data("peizhi");
            console.log(price);
            console.log(data);
            $("#itme_text").html("".concat(data["name"], " ").concat(color).concat(Configuration, "<span class=\"right\">").concat(data["price"][price], "\u5143</span>"));
            $(".total-price").text("总计: " + data["price"][price] + "元"); //价格

            $(".price-info").text(data["price"][price] + "元"); //价格
          }

          $(".color").find(".btn_select").click(function () {
            $(".color").find(".btn_select").removeClass("btn_anxia");
            $(this).addClass("btn_anxia");
            price();
          });
          $(".peizhi").find(".btn_select").click(function () {
            $(".peizhi").find(".btn_select").removeClass("btn_anxia");
            $(this).addClass("btn_anxia");
            price();
          }); //添加购物车按钮

          $("#addcar").click(function () {
            var color = $(".color").find(".btn_anxia").data("color");
            var peizhi = $(".peizhi").find(".btn_anxia").data("peizhi");

            if (localStorage.getItem("loginStatus") == 1) {
              var car = JSON.parse(localStorage.getItem("userCar"));

              if (!car) {
                car = {};
              }

              addShop(car, id, peizhi, color); //添加到用户car中

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
              var _car = JSON.parse(localStorage.getItem("temporaryCar"));

              if (!_car) {
                _car = {};
              }

              addShop(_car, id, peizhi, color);
              localStorage.setItem("temporaryCar", JSON.stringify(_car));
            }
          });
        })();
      });
    } else {
      console.log(id);
    }
  } else {
    location.assign("404.html");
  }
})();

function addShop(car, id, peizhi, color) {
  if (car[id] !== undefined) {
    if (car[id][peizhi] !== undefined) {
      if (car[id][peizhi][color] !== undefined) {
        car[id][peizhi][color]++;
      } else {
        car[id][peizhi][color] = 1;
      }
    } else {
      car[id][peizhi] = {};
      car[id][peizhi][color] = 1;
    }
  } else {
    car[id] = {};
    car[id][peizhi] = {};
    car[id][peizhi][color] = 1;
  }
}