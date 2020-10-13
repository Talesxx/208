if (localStorage.getItem("loginStatus") == 1) {
    location.href = "小米.html";
}
$("#submit_btn").on(
    "click", function () {
        console.log(1);
        if (/^[a-zA-Z]{1}[a-z0-9A-Z]*$/.test($("#user").val()) && /^.{6,16}$/.test($("#password").val())) {
            $("#submit_btn").css({
                "pointerEvents": "none",
                "cursor": "not-allowed"
            });
            let username = $("#user").val();
            $.get(
                "http://jx.xuzhixiang.top/ap/api/login.php?",
                {
                    "username": username,
                    "password": $("#password").val()
                }, function (data) {
                    $("#type_text").text(data.msg);

                    if (data.code == 1) {
                        localStorage.setItem("username", username);//设置用户名
                        localStorage.setItem("loginStatus", "1");//设置登录状态
                        $("#type_text").text("转跳中...");
                        //获取用户购物车
                        $.get("http://127.0.0.1:3000/userCat", {
                            "username": username
                        }, function (data) {
                            data=data[0];
                            var car;
                            if (data) {
                                car = data["car"];
                            } else {
                                car = JSON.parse(localStorage.getItem("temporaryCar"));
                                if (!car) {
                                    car = {};
                                }
                            }
                            console.log(data);
                            localStorage.setItem("UID",data["id"]);
                            localStorage.setItem("userCar", JSON.stringify(car));
                            location.href = "小米.html";
                        });
                    } else {
                        $("#submit_btn").css({
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