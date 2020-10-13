"use strict";

;
$.get("http://localhost:3000/commodity").then(function (data) {
  var str = "";

  for (var index in data) {
    str += "  <a href=\"../html/\u8BE6\u60C5\u9875.html?id=".concat(data[index]["id"], "\">\n                    <li>\n                 <img src=\"../img/").concat(data[index]["imgsrc"], "/img/").concat(data[index]["img"][0], "\" alt=\"\">\n                <p>").concat(data[index]["name"], "</p>\n                </li>\n                </a>");
  }

  $("#phone").html(str);
});