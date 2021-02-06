function show_content() {
    var type = localStorage.getItem('shop_filter');
    var filter_id = localStorage.getItem('shop_filter_id');
    $("#content-shop").empty();
    switch (type) {
        case "prod":
            get_prod(filter_id);
            break;
        case "catego":
            get_catego(filter_id);
            break;
        default:
            all_shop();
            break;
    }
}

function all_shop() {
    $.ajax({
        type: "GET",
        url: "module/shop/controller/controller_shop.php?op=all_prod",
        dataType: "JSON"
    }).done(function(response) {
        // console.log(response);

        set_catego(response);

        show_prod();

        slider();

    }).fail(function(response) {
        no_result();
        // window.location.href = "?page=503";
        // console.log(response);
    });
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

    }).fail(function(response) {
        no_result();
        // window.location.href = "?page=503";
        // console.log(response);
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

$(document).ready(function() {
    show_content();
});