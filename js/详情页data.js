(function () {
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
        $.get("http://127.0.0.1:3000/commodity", function (data) {
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

            //轮播图
            (function(){
                let index=0;
                let  num= $(".lunbo_img img").length;
                let str="";
                for (let  i=0; i < num;i ++) {
                    str+="<li></li>";
                }
                $(".lunbo_index").html(str);
                 function init(){
                     if (index<0) {
                       
                        index=$(".lunbo_img img").length-1;
                     }
                     if (index>$(".lunbo_img img").length-1) {
                        index=0;
                     }
                     console.log($(".lunbo_img img"));
                     $(".lunbo_img img").fadeOut(500);
                     $(".lunbo_img img").eq(index).finish().fadeIn(500);
                     $(".lunbo_index li").removeClass("activation_lunbo_index");
                     $(".lunbo_index li").eq(index).addClass("activation_lunbo_index");
                 }
             
                 for (let  j =0;j<$(".lunbo_index li").length;j++) {
                     $(".lunbo_index li").eq(j).click(function(){
                         index=j;
                         $(".lunbo_img img").fadeOut(500);
                         $(".lunbo_img img").eq(index).fadeIn(500);
                         $(".lunbo_index li").removeClass("activation_lunbo_index");
                         $(".lunbo_index li").eq(index).addClass("activation_lunbo_index");
                     });
                 }
             
             
                 function start() {
                     let lbtime=setInterval(function name() {
                        index++;
                         init();
                     },2000
                     );
                     $(".lunbo_img").prop({"lbtime":lbtime});
                 }
                 start();
                 function stop() {
                     clearInterval( $(".lunbo_img").prop("lbtime"));
                 }
                 function next() {
                     index++;
                     init();
                 }
                 function per(){
                     index--;
                     init();
                 }
                 $(".lf_btn").click(function() {
                     per();
                 });
                 $(".rg_btn").click(function() {
                     next();
                 });
                 $(".lunbo").mouseover(function () {
                     stop();
                 });
                 $(".lunbo").mouseout(function () {
                     start();
                 });
             
             
             })();
            
        
        });
    }

} else {
    location.href="404.html";
}

})();




