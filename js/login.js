;
(function(){
    var  username= localStorage.getItem("username");
    var loginStatus=parseInt(localStorage.getItem("loginStatus"));
    console.log(loginStatus);
    if (loginStatus==1) {

        $(".nav_wrap .right a").fadeOut().remove();
        $(".nav_wrap .right").html(`<a href="#" >${"尊敬的"+username}</a> | <a href="#">注销</a>  | <a href="#">消息中心</a> `);
        $(".nav_wrap .right a").eq(1).on("click",function () {
            localStorage.setItem("loginStatus","0");
            console.log(1);
           location.reload();
        });
    }
})();