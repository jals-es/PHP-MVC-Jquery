function show_content() {
    var type = localStorage.getItem('shop_filter');
    var filter_id = localStorage.getItem('shop_filter_id');
    $("#content-shop").empty();
    switch (type) {
        case "prod":
            console.log("entra al prod");
            get_prod(filter_id);
            break;
        case "catego":
            get_catego(filter_id);
            break;
        case "search":
            console.log("entra al search");
            make_search(filter_id);
            break;
        default:
            console.log("entra al default");
            all_shop(0);
            break;
    }
}

function all_shop(offset) {
    var limit = 12;
    $.ajax({
        type: "POST",
        url: "module/shop/controller/controller_shop.php?op=all_prod",
        data: { "offset": offset, "limit": limit },
        dataType: "JSON"
    }).done(function(response) {
        // console.log(response);

        // set_catego(response);
        set_all_prods(response, limit, offset);

        show_prod();

        // slider();

    }).fail(function(response) {
        no_result();
        // window.location.href = "?page=503";
        // console.log(response);
    });
}

function set_all_prods(response, limit, offset) {
    var i = 0;
    $("<div></div>").attr({ "id": "all_shop_content" }).appendTo("#content-shop");
    for (row in response) {
        if (row != 0) {
            $("<div></div>").attr({ "class": "prod_content" }).appendTo("#all_shop_content")
                .html('<div class="img-prod"><img src="view/img/uploads/' + response[row].img + '" alt="Generic placeholder image"></div>' +
                    '<h4>' + response[row].name + '</h4>' +
                    '<h5>' + response[row].precio + '€</h5>' +
                    '<p><a id="' + response[row].cod_prod + '" class="btn btn-default ver" role="button">Ver &raquo;</a></p>');
            i++;
        }
    }
    set_paginacio(response[0].total, limit, offset);
}

function set_paginacio(total, limit, offset) {
    $("<div></div>").attr({ "class": "paginacio" }).appendTo("#content-shop");
    var pag = Math.ceil(total / limit);
    var i = 1;
    var prods = 0;

    // alert(pag);
    console.log(offset);
    $("<span>&#60;&#60;</span>").attr({ "class": "btn_nav", "id": "nav-arrere", "data-offset": offset }).appendTo(".paginacio");
    while (i <= pag) {
        if (offset >= prods && offset < prods + limit) {
            $("<span>" + i + "</span>").attr({ "class": "btn_paginacio btn_active", "data-offset": prods }).appendTo(".paginacio");
        } else {
            $("<span>" + i + "</span>").attr({ "class": "btn_paginacio", "data-offset": prods }).appendTo(".paginacio");
        }

        prods = prods + limit;
        i++;
    }
    $("<span>&#62;&#62;</span>").attr({ "class": "btn_nav", "id": "nav-avant", "data-offset": offset }).appendTo(".paginacio");

    $(".btn_paginacio").on("click", function() {
        var offset = this.getAttribute("data-offset");
        $('.loader_bg').fadeToggle();
        setTimeout(function() {
            $("#content-shop").empty();
            all_shop(offset);
            $('.loader_bg').fadeToggle();
        }, 500);
    });

    $(".btn_nav").on("click", function() {
        btn_nav(this.id, this.getAttribute("data-offset"), limit, pag);
    });

}

function btn_nav(action, offset, limit, pag) {

    if (action == "nav-arrere") {
        offset = parseInt(offset) - parseInt(limit);
    } else {
        offset = parseInt(offset) + parseInt(limit);
    }

    if (offset < 0) {
        offset = 0;
    } else if (offset > pag * limit - 1) {
        offset = pag * limit - limit;
    }

    $('.loader_bg').fadeToggle();
    setTimeout(function() {
        $("#content-shop").empty();
        all_shop(offset);
        $('.loader_bg').fadeToggle();
    }, 500);
}

function get_prod(id_prod) {
    $.ajax({
        type: "GET",
        url: "module/shop/controller/controller_shop.php?op=prod&id=" + id_prod,
        dataType: "JSON"
    }).done(function(response) {
        // console.log(response);

        var content = "";
        var ingredientes = "";
        var ingre = "";
        for (row in response) {
            switch (row) {
                case "ingredientes":
                    ingredientes = response[row].split(":");
                    for (ing in ingredientes) {
                        if (ing == 0) {
                            ingre = ingredientes[ing];
                        } else {
                            ingre += ", " + ingredientes[ing];
                        }
                    }
                    content += '<br><span>' + row + ': <span id =' + row + '>' + ingre + '</span></span>';
                    break;
                case "img":
                    content += '<br><span><img src="view/img/uploads/' + response[row] + '"></span>';
                    break;
                default:
                    content += '<br><span>' + row + ': <span id =' + row + '>' + response[row] + '</span></span>';
                    break;
            }
        }

        $("<div class='prod-info'></div>").appendTo('#content-shop')
            .html(content);
        $("<div class='button_action go_shop' data-tr='Back'></div>").appendTo('#content-shop');
        change_lang();
        show_shop();
        set_visita(response.cod_prod);

    }).fail(function(response) {
        no_result();
        // window.location.href = "?page=503";
        // console.log(response);
    });
}

function set_visita(id_prod) {
    $.ajax({
        type: "POST",
        url: "module/shop/controller/controller_shop.php?op=visit_prod",
        data: { "id_prod": id_prod },
        dataType: "JSON"
    }).done(function(response) {

        // console.log(response);

    }).fail(function(response) {

        console.log(response);

    });
}

function get_catego(type) {
    $.ajax({
        type: "GET",
        url: "module/shop/controller/controller_shop.php?op=catego&id=" + type,
        dataType: "JSON"
    }).done(function(response) {
        // console.log(response);

        set_catego(response);

        slider();

        show_prod();

    }).fail(function(response) {
        no_result();
        // window.location.href = "?page=503";
        // console.log(response);
    });
}

function set_catego(response) {
    var i = 0;
    var catego = "";
    for (row in response) {
        if (response[row].type !== catego) {
            catego = response[row].type;
            $("<div id='slider-" + catego + "' class='slider-shop'></div>").appendTo('#content-shop')
                .html("<h2 class='slider-title'>" + catego + "</h2><div id='slider-" + catego + "-content' class='owl-carousel owl-theme'></div>");
        }
        if (response[row].type == catego) {
            $('<div></div>').attr({ 'class': 'item' }).appendTo("#slider-" + catego + "-content")
                .html('<img src="view/img/uploads/' + response[row].img + '" alt="Generic placeholder image">' +
                    '<h4>' + response[row].name + '</h4>' +
                    '<h5>' + response[row].precio + '€</h5>' +
                    '<p><a id="' + response[row].cod_prod + '" class="btn btn-default ver" role="button">Ver &raquo;</a></p>');
            i++;
        }
    }
}

function slider() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 10,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: true,
        autoplayHoverPause: true,
        items: 3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
}

function show_prod() {
    console.log("carga show prod");
    $('.ver').on('click', function() {
        var id_prod = this.id;
        localStorage.setItem('shop_filter', 'prod');
        localStorage.setItem('shop_filter_id', id_prod);
        $('.loader_bg').fadeToggle();
        setTimeout(function() {
            show_content();
            $('.loader_bg').fadeToggle();
        }, 500);

    });
}

function show_shop() {
    $('.go_shop').on('click', function() {
        localStorage.removeItem('shop_filter');
        localStorage.removeItem('shop_filter_id');
        $('.loader_bg').fadeToggle();
        setTimeout(function() {
            show_content();
            $('.loader_bg').fadeToggle();
        }, 500);
    });
}

function no_result(message) {
    var message = "No se encuentran resultados con estos parametros de busqueda.";
    $('<h1 class="no_result_error">' + message + '</h1>').appendTo('#content-shop');
}

function make_search(content) {
    console.log("se dispone a hacer el ajax");
    $('<div class="shop_title">Buscando por "' + content + '"</div>').appendTo("#content-shop");
    $.ajax({
        type: "POST",
        url: "module/shop/controller/controller_shop.php?op=search",
        data: { "content": content },
        dataType: "JSON"
    }).done(function(response) {
        console.log("realiza el ajax");
        console.log(response);
        if (response.length == 1) {
            console.log("solo 1 producto");
            localStorage.setItem('shop_filter', 'prod');
            localStorage.setItem('shop_filter_id', response[0].cod_prod);
            show_content();
        } else {
            console.log("varios productos");
            set_catego(response);

            show_prod();

            slider();
        }

    }).fail(function(response) {

        console.log(response);
        no_result();

    });
}

$(document).ready(function() {
    show_content();
});