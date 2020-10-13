;
(function () {
    var username = localStorage.getItem("username");
    var loginStatus = parseInt(localStorage.getItem("loginStatus"));
    console.log(loginStatus);
    if (loginStatus == 1) {

        $(".header_wrap .fr a").fadeOut().remove();
        $(".header_wrap .fr").html(`<a href="#" >${"尊敬的" + username}</a> | <a href="#">注销</a>  | <a href="#">消息中心</a> `);
        $(".header_wrap .fr a").eq(1).on("click", function () {
            localStorage.setItem("loginStatus", "0");
            localStorage.removeItem("userCar");
            location.reload();
        });
    }
})();




; (function () {
    $.get("http://127.0.0.1:3000/commodity/").then(
        data => {
            let car;
            if (localStorage.getItem("loginStatus") == 1) {
                car = JSON.parse(localStorage.getItem("userCar"));
            } else {
                car = JSON.parse(localStorage.getItem("temporaryCar") ? localStorage.getItem("temporaryCar") : "{}");
            }
            //将商品数据转化为对象
            var odata = {};
            for (let i in data) {
                odata[data[i]["id"]] = data[i];
            }

            function init() {
                let str = ` <div class="car_header clear">
        <div class="fl car-check"><i class="iconfont" data-all="all" data-switch="0">&#xe7fa;</i>全选</div>
        <div class="fl car-img">&nbsp;</div>
        <div class="fl car-name">商品名称</div>
        <div class="fl car-price">单价</div>
        <div class="fl car-num">数量</div>
        <div class="fl car-total">小计</div>
        <div class="fl car-action">操作</div>
    </div>`;
                for (let id in car) {
                    for (let i in car[id]) {
                        let peizhi = car[id][i]["peizhi"];
                        let color = car[id][i]["color"];
                        let num = car[id][i]["num"];
                        str += `
                    <div class="car_itme clear" data-id="${id}" data-color="${color}" data-peizhi="${peizhi}">
                    <div class="fl car-check"><i class="iconfont" data-switch="0">&#xe7fa;</i>&nbsp;</div>
                    <div class="fl car-img"><img src="../img/${odata[id]["imgsrc"]}/img/${odata[id]["img"][0]}" alt=""></div>
                    <div class="fl car-name">${odata[id]["name"] + "  " + odata[id]["color"][color] + "  " + odata[id]["Configuration"][peizhi]}</div>
                    <div class="fl car-price">${odata[id]["price"][peizhi]}</div>
                    <div class="fl car-num">&nbsp;<div><button>-</button><input type="number" value="${num}"><button>+</button></div>
                    </div>
                    <div class="fl car-total car-total-price orange">${odata[id]["price"][peizhi] * num}</div>
                    <div class="fl car-action">x</div>
                    </div>`
                    }
                }
                str += ` <div class="car_footer clear" id="car_footer">
                <a href="列表页.html"><div class="fl car-check bgorange">继续购物</div></a>
                <div class="fl car-img">已选择<span>0</span> 件商品</div>
                <div class="fl car-name">&nbsp;</div>
                <div class="fl car-price">&nbsp;</div>
              
                <div class="fl car-total  orange">合计: <span id="zjg">0</span>元</div>
                <div class="fl car-action  bgorange">去支付</div>
            </div>`;
                $(".car").html(str);

                $(".car-action").click(function () {
                    removeShop(car, $(this).parent().data("id"), $(this).parent().data("peizhi"), $(this).parent().data("color"));
                    init();
                    console.log(car);
                    save(car);
                });
                $(".car-num input").on("input", function () {
                    $(this).val(parseInt($(this).val()));
                    if ($(this).val() >= 1) {
                    } else {
                        $(this).val(1);
                    }
                    numShop(car, $(this).parent().parent().parent().data("id"), $(this).parent().parent().parent().data("peizhi"), $(this).parent().parent().data("color"), $(this).val());
                    $(this).parent().parent().parent().find(".car-total").text($(this).val() * $(this).parent().parent().parent().find(".car-price").text());
                    zongjia();
                    save(car);
                });
                $(".car-num button:first-child").click(function () {
                    let input = $(this).siblings().filter("input");
                    input.val(+input.val() - 1);
                    input.trigger("input");
                });
                $(".car-num button:last-child").click(function () {
                    let input = $(this).siblings().filter("input");
                    input.val(+input.val() + 1);
                    input.trigger("input");
                });

                $(".car-check i").not($(".car-check i")[0]).click(
                    function () {
                        $(this).toggleClass("bgorange");
                        if ($(".car-check i").not($(".car-check i")[0]).not(".bgorange").length==0) {
                            $(".car-check i").addClass("bgorange");
                        }else{
                            $(".car-check i").eq(0).removeClass("bgorange");
                        }
                        zongjia();
                    });
                $(".car-check i").eq(0).click(function () {
                        $(this).toggleClass("bgorange");
                        $(".car-check i").not($(".car-check i")[0]).attr("class", $(this).attr("class"));
                        zongjia();
                });

                function zongjia() {
                    let zjg=0;
                    $(".car-check .bgorange").parent().siblings().filter(".car-total-price").each(function() {
                        console.log($(this).text());
                      zjg+= Number($(this).text());
                    });
                    console.log(zjg);
                    $("#zjg").text(zjg);
                }



            }
            init();






        });
})();



function save(car){
    if (localStorage.getItem("loginStatus") == 1) {
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
        localStorage.setItem("temporaryCar", JSON.stringify(car));
    }




}

function numShop(car, id, peizhi, color, num) {
    for (let i in car[id]) {
        if (car[id][i]["color"] == color && car[id][i]["peizhi"] == peizhi) {
            car[id][i]["num"] = num;
        }
    }
}


function removeShop(car, id, peizhi, color) {
    for (let i in car[id]) {
        if (car[id][i]["color"] == color && car[id][i]["peizhi"] == peizhi) {
            car[id].splice(i, 1);
        }
    }
}