$(function () {
    // fill login id
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.login_id) {
            $(".fheader_span_login").text("로그인: " + sessionStorage.login_id);
        }
    }

    // show or hide fixed header
    var lastScroll = $(document).scrollTop();
    $(window).scroll(function (e) {
        var newScroll = $(document).scrollTop();
        var deltaScroll = newScroll - lastScroll;
        if (deltaScroll > 100) {
            append_header(); // add fixed header at the top of body
            $(".fheader").slideDown(500); // show fixed header
        }
        else {
            $(".fheader").slideUp(500); // hide fixed header
        }
        //lastScroll = newScroll; // for relative movement
    });

    $(".circle").click(function () {
        //var login_user = $("#span_login").text();
        var login_user = $(".fheader_span_login").text();
        //if (login_user.includes("로그인: ") == true) { // string.includes does not work in IE11(?)
        if (login_user.indexOf("로그인") > -1) {
            var target = $(this).attr("href");
            location = target; // go to target
        }
        else {
            alert("먼저 로그인하세요!");
        }
    });

    // show dialog box for login
    $('.fheader_login').click(function () {
        // prevent dual calling
        var title = $(document).find("title").text();
        if (title == "Structural analysis") {
            return;
        }

        alert("이미 로그인되어 있습니다. 만약 로그아웃하려면 처음으로 되돌아가야 합니다.");
        //if (typeof (Storage) !== "undefined") {
        //    if (sessionStorage.login_id) {
        //        alert("이미 로그인되어 있습니다. 만약 로그아웃하려면 처음으로 되돌아가야 합니다.");
        //        return;
        //    }
        //}

        //blur_background('.cover', 25);
        //blur_background('.other', 25);
        //$("#modal_outer").show();
    });

    // show dialog box for score
    $('.fheader_score').click(function () {
        // prevent dual calling
        var title = $(document).find("title").text();
        if (title == "Structural analysis") {
            return;
        }

        alert("점수를 확인하려면 처음으로 되돌아가야 합니다.");
        return;
    });
});

function append_header() {
    //// remove
    //$(".fheader_github_logo").remove();
    //$(".fheader_span_login").remove();
    //$(".fheader_login").remove();
    //$(".fheader_score").remove();
    //$(".fheader_email").remove();

    // add empty fixed header at the top of body
    $("body").prepend("<div class=\"fheader\" hidden></div>");

    // add empty login div at the end of body
    var header_logo = "<a class=\"fheader_github_logo\" href=\"https://pages.github.com\"></a>";
    var header_title = "<p class=\"fheader_title\">" + $("#project_title").text() + "</p>";
    var header_span_login = "<span class=\"fheader_span_login\"></span>";
    var header_login = "<a class=\"fheader_login\"></a>";
    var header_score = "<a class=\"fheader_score\"></a>";
    var header_email = "<a class=\"fheader_email\" href=\"mailto:ironbell@kyungnam.ac.kr\"></a>";
    var header_html = header_logo + header_title + header_span_login + header_login + header_score + header_email;
    $(".fheader").html(header_html);
}
