;(function(){

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
           // $(".car").html(str);
        }

    });
})();