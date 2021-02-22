function show_filters() {
    show_price_range();
    show_order_by();
}

function show_order_by() {

}

function show_price_range() {

    print_range_inp("#options-bar");

    $.ajax({
        type: "GET",
        url: "module/shop/controller/controller_shop.php",
        data: { "op": "get_range_prices" },
        dataType: "JSON"
    }).done(function(response) {
        // console.log(response);
        set_price_range(response);

    }).fail(function(response) {
        var price = { "min": "0", "max": "9999999" }
        set_price_range(price);

    });


}

function set_price_range(price) {
    $('.noUi-handle').on('click', function() {
        $(this).width(50);
    });
    var rangeSlider = document.getElementById('slider-range');
    var moneyFormat = wNumb({
        decimals: 2,
        thousand: '',
        prefix: '€'
    });
    noUiSlider.create(rangeSlider, {
        start: [price.min, price.max],
        step: 1,
        range: {
            'min': [price.min],
            'max': [price.max]
        },
        format: moneyFormat,
        connect: true
    });

    // Set visual min and max values and also update value hidden form inputs
    rangeSlider.noUiSlider.on('update', function(values, handle) {
        document.getElementById('slider-range-value1').innerHTML = values[0];
        document.getElementById('slider-range-value2').innerHTML = values[1];
        document.getElementsByName('min-value').value = moneyFormat.from(
            values[0]);
        document.getElementsByName('max-value').value = moneyFormat.from(
            values[1]);
    });
}

$(document).ready(function() {
    show_filters();
});