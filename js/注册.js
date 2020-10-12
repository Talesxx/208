if ( localStorage.getItem("loginStatus")==1) {
    console.log(localStorage.getItem("loginStatus"));
    location.href="小米.html";
}
$("#btn_zhuce").on(
    "click",function () {
        if( /^[a-zA-Z]{1}[a-z0-9A-Z]*$/.test($("#user").val())&&/^.{6,16}$/.test($("#password").val())){
            $("#btn_zhuce").css({
                "pointerEvents":"none",
                "cursor":"not-allowed"
            });
           let user= $("#user").val();
            $.get(
                "http://jx.xuzhixiang.top/ap/api/reg.php",
                {
                    "username":user,
                    "password":$("#password").val()
                },function (data) {
                    $("#type_text").text(data.msg);
                    $("#btn_zhuce").css({
                        "pointerEvents":"initial",
                        "cursor":"pointer"
                    });
                    if(data.code){
                        location.href="小米.html";
                        localStorage.setItem("username",user);
                        localStorage.setItem("loginStatus","1");
                    }
                }
            )
        }else{
            $("#type_text").text("用户名或密码不符合规范");
        }
    }
)