$(function () {
    // show or hide fixed header
    var scroll_top = $(document).scrollTop();
    $(window).scroll(function (e) {
        var scroll_loc = $(document).scrollTop() - scroll_top;
        if (scroll_loc < 240) {
            $(".fheader").slideUp(500); // hide fixed header
        }
        else {
            if ($(".fheader").length == 0) {
                append_header(); // add fixed header at the top of body
                $(".fheader").slideDown(500); // show fixed header
            }
            else {
                $(".fheader").slideDown(500); // show fixed header
            }
            $(".fheader_span_login").text(sessionStorage.login);
        }
        //lastScroll = newScroll; // for relative movement
    });

    $(".circle").click(function () {
        //var login_user = $("#span_login").text();

        //var login_user = $(".fheader_span_login").text();
        //if (login_user.indexOf("로그인") > -1) {
        if (sessionStorage.login != undefined) {
            var target = $(this).attr("href");
            location = target; // go to target
        }
        else {
            alert("먼저 로그인하세요!");
        }
    });
});

function append_header() {
    // remove
    $(".fheader").remove();

    // add empty fixed header at the top of body
    $("body").prepend("<div class='fheader' hidden></div>");

    // add empty login div at the end of body
    var header_logo = "<a class='fheader_github_logo' href='https://pages.github.com' target='_blank'></a>";
    var header_title = "<p class='fheader_title'>" + $("#project_title").text() + "</p>";
    var header_span_login = "<span class='fheader_span_login'></span>";
    var header_login = "<a class='fheader_login'></a>";
    var header_email = "<a class='fheader_email' href='mailto:ironbell@kyungnam.ac.kr'></a>";
    var header_html = header_logo + header_title + header_span_login + header_login + header_email;
    $(".fheader").html(header_html);
}
