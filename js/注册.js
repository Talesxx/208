if (localStorage.getItem("loginStatus") == 1) {
    console.log(localStorage.getItem("loginStatus"));
    location.href = "小米.html";
}
$("#btn_zhuce").on(
    "click", function () {
        if (/^[a-zA-Z]{1}[a-z0-9A-Z]*$/.test($("#user").val()) && /^.{6,16}$/.test($("#password").val())) {
            $("#btn_zhuce").css({
                "pointerEvents": "none",
                "cursor": "not-allowed"
            });
            let username = $("#user").val();
            //发往服务器注册
            $.get(
                "http://jx.xuzhixiang.top/ap/api/reg.php",
                {
                    "username": username,
                    "password": $("#password").val()
                }, function (data) {
                    //console.log(data);
                    $("#type_text").text(data.msg);
                    if (data.code == 1) {
                        $("#type_text").text("转跳中....");
                        localStorage.setItem("username", username);
                        localStorage.setItem("loginStatus", "1");
                        let car;
                        car = JSON.parse(localStorage.getItem("temporaryCar")?localStorage.getItem("temporaryCar"):"{}");
                        if (!car) {
                            car = {};
                        }
                        localStorage.setItem("userCar", JSON.stringify(car));
                       //发往js服务器创建car
                        $.post("http://127.0.0.1:3000/userCat", {
                            "username": username,
                            "car": car
                        }).then(function (data) {

                            console.log(data);
                            localStorage.setItem("UID",data["id"]);
                          location.href = "小米.html";
                        })
                    }else{//注册失败改为可点击
                        $("#btn_zhuce").css({
                            "pointerEvents": "initial",
                            "cursor": "pointer"
                        });
                    }
                }
            )
        } else {
            $("#type_text").text("用户名或密码不符合规范");
        }
    }
)