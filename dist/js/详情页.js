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

  $.get("/json/shop.json", function (data) {
    console.log(data[id]);
    $("#top_name").text(data[id]["name"]);
    $("#shop_name").text(data[id]["name"]);
    $(".sale-desc").text(data[id]["js"]);
    $(".company-info").text(data[id]["shop"]);
    var str = "";

    for (var _index in data[id]["color"]) {
      str += "<a class=\"btn_select\" date-color=\"".concat(_index, "\">").concat(data[id]["color"][_index], "</a>");
    }

    $(".commodity_body .color").html(str);
  });
} else {}