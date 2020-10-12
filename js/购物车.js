;
(function(){
    var  username= localStorage.getItem("username");
    var loginStatus=parseInt(localStorage.getItem("loginStatus"));
    console.log(loginStatus);
    if (loginStatus==1) {

        $(".header_wrap .fr a").fadeOut().remove();
        $(".header_wrap .fr").html(`<a href="#" >${"尊敬的"+username}</a> | <a href="#">注销</a>  | <a href="#">消息中心</a> `);
        $(".header_wrap .fr a").eq(1).on("click",function () {
            localStorage.setItem("loginStatus","0");
            console.log(1);
           location.reload();
        });
    }
})();