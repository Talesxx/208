; (function () {
    $(".shopcat").hover(
        function () {
            $("#min_car").finish().slideDown();
            $.get("http://127.0.0.1:3000/commodity/").then(
                data => {
                    console.log(1);2
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
                        let str = ``;
                        for (let id in car) {
                            for (let i in car[id]) {
                                let peizhi = car[id][i]["peizhi"];
                                let color = car[id][i]["color"];
                                let num = car[id][i]["num"];
                                str += `
                                <li><a href="详情页.html?id=${id}"><img src="../img/${odata[id]["imgsrc"]}/img/${odata[id]["img"][0]}" alt=""></a><p>${odata[id]["name"] + "  " + odata[id]["color"][color] + "  " + odata[id]["Configuration"][peizhi]}</p></li>
                    `
                            }
                        }
                        if (str.trim()=="") {
                            str +=`  <li><p>你的购物车还是空快去购物吧</p></li>`
                        }
                        $("#min_car ul").html(str);
                    }
                    init();

                });
        },function () {
            $("#min_car").finish().slideUp();
        }
    )

})();