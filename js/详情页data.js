(function () {
    var search = location.search;
    if (search) {
        search = search.replace(/^\?/, "");
        var arr = search.split("&")
        for (let index in arr) {
            if (arr[index].split("=")[0] == "id") {
                var id = arr[index].split("=")[1];//商品id
            }
        }
        if (!isNaN(id)) {
            //轮播图以及数据展示
            $.get("http://127.0.0.1:3000/commodity/" + id, function (data) {
                $("#top_name").text(data["name"]);//头部名
                $("#shop_name").text(data["name"]);//名字
                $(".sale-desc").text(data["js"]);//介绍
                $(".price-info").text(data["price"][0] + "元");//价格
                $(".total-price").text("总计: " + data["price"][0] + "元");//价格
                $("#itme_text").html(`${data["name"]} ${data["color"][0]}${data["Configuration"][0]}<span class="right">${data["price"][0]}元</span>`);
                $(".company-info").text(data["shop"]);//商店
                let str = "";
                for (let index in data["color"]) {
                    str += `<a class="btn_select" data-color="${index}">${data["color"][index]}</a>`;
                }
                $(".commodity_body .color").html(str);//颜色
                $(".commodity_body .color a").eq(0).addClass("btn_anxia");
                str = "";
                for (let index in data["Configuration"]) {
                    str += `<a class="btn_select" data-peizhi="${index}">${data["Configuration"][index]}</a>`;
                }
                $(".commodity_body .peizhi").html(str);//配置
                $(".commodity_body .peizhi a").eq(0).addClass("btn_anxia");
                str = "";
                for (let index in data["img"]) {
                    str += ` <img src="../img/${data["imgsrc"]}/img/${data["img"][index]}" alt="">`;
                }
                $(".lunbo_img").html(str);//轮播图片
                str = "";
                for (let index in data["xqimg"]) {
                    str += ` <img src="../img/${data["imgsrc"]}/xqimg/${data["xqimg"][index]}" alt="">`;
                }
                $("#xq").html(str);//介绍图片

                //轮播图
                (function () {
                    let index = 0;
                    let num = $(".lunbo_img img").length;
                    let str = "";
                    for (let i = 0; i < num; i++) {
                        str += "<li></li>";
                    }
                    $(".lunbo_index").html(str);
                    function init() {
                        if (index < 0) {

                            index = $(".lunbo_img img").length - 1;
                        }
                        if (index > $(".lunbo_img img").length - 1) {
                            index = 0;
                        }
                        $(".lunbo_img img").finish().fadeOut(500);
                        $(".lunbo_img img").eq(index).finish().fadeIn(500);
                        $(".lunbo_index li").removeClass("activation_lunbo_index");
                        $(".lunbo_index li").eq(index).addClass("activation_lunbo_index");
                    }

                    for (let j = 0; j < $(".lunbo_index li").length; j++) {
                        $(".lunbo_index li").eq(j).click(function () {
                            index = j;
                            $(".lunbo_img img").finish().fadeOut(500);
                            $(".lunbo_img img").eq(index).fadeIn(500);
                            $(".lunbo_index li").removeClass("activation_lunbo_index");
                            $(".lunbo_index li").eq(index).addClass("activation_lunbo_index");
                        });
                    }


                    function start() {
                        let lbtime = setInterval(function name() {
                            index++;
                            init();
                        }, 2000
                        );
                        $(".lunbo_img").prop({ "lbtime": lbtime });
                    }
                    start();
                    function stop() {
                        clearInterval($(".lunbo_img").prop("lbtime"));
                    }
                    function next() {
                        index++;
                        init();
                    }
                    function per() {
                        index--;
                        init();
                    }
                    $(".lf_btn").click(function () {
                        per();
                    });
                    $(".rg_btn").click(function () {
                        next();
                    });
                    $(".lunbo").mouseover(function () {
                        stop();
                    });
                    $(".lunbo").mouseout(function () {
                        start();
                    });


                })();

                //购物车按钮实现
                (function () {
                    //价格和详情跟随变化
                    function price() {
                        let color = $(".color").find(".btn_anxia").text();
                        let Configuration = $(".peizhi").find(".btn_anxia").text();
                        let price = $(".peizhi").find(".btn_anxia").data("peizhi");
                        console.log(price);
                        console.log(data);
                        $("#itme_text").html(`${data["name"]} ${color}${Configuration}<span class="right">${data["price"][price]}元</span>`);
                        $(".total-price").text("总计: " + data["price"][price] + "元");//价格
                        $(".price-info").text(data["price"][price] + "元");//价格
                    }
                    $(".color").find(".btn_select").click(
                        function () {
                            $(".color").find(".btn_select").removeClass("btn_anxia");
                            $(this).addClass("btn_anxia");
                            price();
                        }
                    );
                    $(".peizhi").find(".btn_select").click(
                        function () {
                            $(".peizhi").find(".btn_select").removeClass("btn_anxia");
                            $(this).addClass("btn_anxia");
                            price();
                        }
                    );

                    //添加购物车按钮
                    $("#addcar").click(
                        function () {
                            let color = $(".color").find(".btn_anxia").data("color");
                            let peizhi = $(".peizhi").find(".btn_anxia").data("peizhi");
                            if (localStorage.getItem("loginStatus") == 1) {
                                var car = JSON.parse(localStorage.getItem("userCar"));
                                if (!car) {
                                    car = {};
                                }
                                addShop(car, id, peizhi, color);//添加到用户car中
                                localStorage.setItem("userCar", JSON.stringify(car));
                                axios({
                                    method: "put",
                                    url: "http://localhost:3000/userCat/"+localStorage.getItem("UID"),
                                    data: {
                                        //根据url中的id进行修改
                                        username: localStorage.getItem("username"),
                                        "car": car

                                    }
                                }).then((data) => {
                                    //成功的回调函数，返回的是增加的数据
                                    console.log(data);
                                });

                            } else {
                                let car = JSON.parse(localStorage.getItem("temporaryCar")?localStorage.getItem("temporaryCar"):"{}");
                                if (!car) {
                                    car = {};
                                }
                                addShop(car, id, peizhi, color);
                                localStorage.setItem("temporaryCar", JSON.stringify(car));
                            }
                        }
                    );


                })();
            });
        } else {
            console.log(id);
        }

    } else {
        location.assign("404.html");
    }

})();









function addShop(car, id, peizhi, color) {
    if (car[id] !== undefined) {
        var cz=true;
        for (let i in car[id]) {
            
            if(car[id][i]["color"]==color&&car[id][i]["peizhi"]==peizhi){
                cz=false;
                car[id][i]["num"]++;
            }
        }
        if(cz){
            car[id].push({
                peizhi,
                color,
                num:1
            })
        }
    } else {
        car[id] = [];
        car[id].push({
            peizhi,
            color,
            num:1
        })
       
    }
}