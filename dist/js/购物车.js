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
      console.log(1);
      location.reload();
    });
  }
})();