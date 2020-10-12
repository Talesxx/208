var search = location.search;
if (search) {
    search = search.replace(/^\?/, "");
    var arr = search.split("&")
    for (let index in arr) {
        if (arr[index].split("=")[0] == "id") {
            var id = arr[index].split("=")[1];
        }
    }
    if (!isNaN(id)) {
        $.get("../json/shop.json", function (data) {
            console.log(data[id]);
            $("#top_name").text(data[id]["name"]);//头部名
            $("#shop_name").text(data[id]["name"]);//名字
            $(".sale-desc").text(data[id]["js"]);//介绍
            $(".price-info").text(data[id]["price"][0] + "元");//价格
            $(".total-price").text("总计: " + data[id]["price"][0] + "元");//价格
            $("#itme_text").html(`${data[id]["name"]} ${data[id]["color"][0]}<span class="right">${data[id]["price"][0]}元</span>`);
            $(".company-info").text(data[id]["shop"]);//商店
            let str = "";
            for (let index in data[id]["color"]) {
                str += `<a class="btn_select" date-color="${index}">${data[id]["color"][index]}</a>`;
            }
            $(".commodity_body .color").html(str);//颜色
            $(".commodity_body .color a").eq(0).addClass("btn_anxia");
            str = "";
            for (let index in data[id]["Configuration"]) {
                str += `<a class="btn_select" date-peizhi="${index}">${data[id]["Configuration"][index]}</a>`;
            }
            $(".commodity_body .peizhi").html(str);//配置
            $(".commodity_body .peizhi a").eq(0).addClass("btn_anxia");
            str = "";
            for (let index in data[id]["img"]) {
                str += ` <img src="../img/${data[id]["imgsrc"]}/xqimg/${data[id]["img"][index]}" alt="">`;
            }
            $(".lunbo_img").html(str);//轮播图片
            str = "";
            for (let index in data[id]["xqimg"]) {
                str += ` <img src="../img/${data[id]["imgsrc"]}/xqimg/${data[id]["xqimg"][index]}" alt="">`;
            }
            $("#xq").html(str);//介绍图片

        });
    }

} else {

    location.href="404.html"

}
