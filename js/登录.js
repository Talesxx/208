if ( localStorage.getItem("loginStatus")==1) {
    location.href="小米.html";
}
$("#submit_btn").on(
    "click",function () {
        console.log(1);
        if( /^[a-zA-Z]{1}[a-z0-9A-Z]*$/.test($("#user").val())&&/^.{6,16}$/.test($("#password").val())){
            $("#submit_btn").css({
                "pointerEvents":"none",
                "cursor":"not-allowed"
            });
           let user= $("#user").val();
            $.get(
                "http://jx.xuzhixiang.top/ap/api/login.php?",
                {
                    "username":user,
                    "password":$("#password").val()
                },function (data) {
                    console.log(data);
                    $("#type_text").text(data.msg);
                    $("#submit_btn").css({
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