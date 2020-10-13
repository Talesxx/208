;


$.get("http://localhost:3000/commodity").then((data) => {
    let str = "";
    for (let index in data) {
        
        str += `  <a href="../html/详情页.html?id=${data[index]["id"]}">
                    <li>
                 <img src="../img/${data[index]["imgsrc"]}/img/${data[index]["img"][0]}" alt="">
                <p>${data[index]["name"]}</p>
                </li>
                </a>`;
    }
    $("#phone").html(str);
});


