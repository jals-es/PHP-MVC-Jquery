function get_content() {
    $(".login-page").empty();
    var type = sessionStorage.getItem("login_page");
    switch (type) {
        case "2":
            show_register();
            break;
        case "1":
        default:
            show_login();
            break;
    }
}

function show_login() {
    show_content();
}

function show_register() {
    show_content();
    $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
}

function show_content() {
    $('<div class="form"></div>').appendTo(".login-page")
        .html('<form class="register-form">' +
            '<input type="text" placeholder="name"/>' +
            '<input type="password" placeholder="password"/>' +
            '<input type="password" placeholder="repeat password"/>' +
            '<input type="text" placeholder="email address"/>' +
            '<button>create</button>' +
            '<p class="message">Already registered? <a href="#">Sign In</a></p>' +
            '</form>' +
            '<form class="login-form">' +
            '<input type="text" placeholder="username"/>' +
            '<input type="password" placeholder="password"/>' +
            '<button>login</button>' +
            '<p class="message">Not registered? <a href="#">Create an account</a></p>' +
            '</form>');

    $('.message a').on("click", function() {
        var type = sessionStorage.getItem("login_page");
        switch (type) {
            case "2":
                sessionStorage.setItem("login_page", "1");
                $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
                break;
            case "1":
            default:
                sessionStorage.setItem("login_page", "2");
                $('.form form').animate({ height: "toggle", opacity: "toggle" }, "slow");
                break;
        }
    });
}


$(document).ready(function() {
    get_content();
});