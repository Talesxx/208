"use strict";

var search = location.search;

if (search) {
  search = search.replace(/^\?/, "");
  var arr = search.split("&");

  for (var index in arr) {
    if (arr[index].split("=")[0] == "id") {
      var id = arr[index].split("=")[1];
    }
  }

  if (!isNaN(id)) {
    $.get("../json/shop.json", function (data) {
      console.log(data[id]);
      $("#top_name").text(data[id]["name"]); //头部名

      $("#shop_name").text(data[id]["name"]); //名字

      $(".sale-desc").text(data[id]["js"]); //介绍

      $(".price-info").text(data[id]["price"][0] + "元"); //价格

      $(".total-price").text("总计: " + data[id]["price"][0] + "元"); //价格

      $("#itme_text").html("".concat(data[id]["name"], " ").concat(data[id]["color"][0], "<span class=\"right\">").concat(data[id]["price"][0], "\u5143</span>"));
      $(".company-info").text(data[id]["shop"]); //商店

      var str = "";

      for (var _index in data[id]["color"]) {
        str += "<a class=\"btn_select\" date-color=\"".concat(_index, "\">").concat(data[id]["color"][_index], "</a>");
      }

      $(".commodity_body .color").html(str); //颜色

      $(".commodity_body .color a").eq(0).addClass("btn_anxia");
      str = "";

      for (var _index2 in data[id]["Configuration"]) {
        str += "<a class=\"btn_select\" date-peizhi=\"".concat(_index2, "\">").concat(data[id]["Configuration"][_index2], "</a>");
      }

      $(".commodity_body .peizhi").html(str); //配置

      $(".commodity_body .peizhi a").eq(0).addClass("btn_anxia");
      str = "";

      for (var _index3 in data[id]["img"]) {
        str += " <img src=\"../img/".concat(data[id]["imgsrc"], "/xqimg/").concat(data[id]["img"][_index3], "\" alt=\"\">");
      }

      $(".lunbo_img").html(str); //轮播图片

      str = "";

      for (var _index4 in data[id]["xqimg"]) {
        str += " <img src=\"../img/".concat(data[id]["imgsrc"], "/xqimg/").concat(data[id]["xqimg"][_index4], "\" alt=\"\">");
      }

      $("#xq").html(str); //介绍图片
    });
  }
} else {
  location.href = "404.html";
}