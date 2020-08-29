var id_arr = ["student", "administrator"];  // as many as you like - no comma after final entry
var kw_arr = ["vangelis", "shine_a_light"];  // as many as you like - no comma after final entry
var time_out_duration = 1500; // 1.5s

$(document).ready(function () {
    if (sessionStorage.login != undefined) {
        $(".fheader_span_login").text(sessionStorage.login);
        toggle_body(true);
    }
    else {
        toggle_body(false);
    }

    // favicon for all pages
    $('head').append('<link rel="icon" href="https://ironbell87.github.io/structural_mechanics_II/images/ironbell_icon.png">');

    // prohibit context menu, drag, and select for normal user
    // <body oncontextmenu='return false' onselectstart='return false' ondragstart='return false'>
    $('body').on('contextmenu', function () {
        if (sessionStorage.login != "administrator") return false;
    });
    $('body').on('drag', function () {
        if (sessionStorage.login != "administrator") return false;
    });
    $('body').on('selectstart', function () {
        if (sessionStorage.login != "administrator") return false;
    });

    // show dialog box for login
    $('body').on('click', '.fheader_login', function (event) {
        // already logged in
        if (sessionStorage.login != undefined) {
            var yes_no = confirm("이미 로그인되어 있습니다. 로그아웃하겠습니까?");

            // logout
            if (yes_no == true) {
                // delete session storage
                sessionStorage.removeItem("login");

                // initialize element for login
                $("#input_login").val("");
                $("#span_login").text("");
                $(".fheader_span_login").text("");
                toggle_body(false);
            }
            return;
        }

        // show login dialog
        append_login();
        blur_background('.cover', 25);
        blur_background('.other', 25);
    });

    // for ENTER, click submit button
    $('body').on('keyup', '#input_login', function (event) {
        if (event.keyCode == 13) $("#submit_login").click();
    });

    // login
    $('body').on('click', '#submit_login', function (event) {
        // get input keyword
        var m_input = $("#input_login");
        var kw = m_input.val();

        // login success / fail
        for (var i = 0; i < kw_arr.length; i++) {
            if (kw == kw_arr[i]) { // in case of success
                sessionStorage.login = id_arr[i]; // "로그인: OK";
                $("#span_login").text(sessionStorage.login);
                $(".fheader_span_login").text(sessionStorage.login);
                $("#login_outer").fadeOut(time_out_duration / 3);
                blur_background('.cover', 0);
                blur_background('.other', 0);
                toggle_body(true);
                return;
            }
        }

        // in case of fail
        $("#span_login").text("다시 시도하세요!");
        m_input.val("");
        m_input.focus();
    });
});

function append_login() {
    // add empty login div at the end of body
    $("#login_outer").remove();
    $("body").append("<div id=\"login_outer\" hidden></div>");
    $("#login_outer").append("<div id=\"login_inner\"></div>");

    // fill login div
    var login_kw = "<input type='password' class='input_login' id='input_login' placeholder='키워드를 입력하세요' autofocus/>"; // content for modal
    var login_sm = "<input type='submit' class='submit_login' id='submit_login' value='로그인'/><br />";
    var login_sp = "<span class='span_login' id='span_login'></span>";
    var login_html = login_kw + login_sm + login_sp;
    $("#login_inner").html(login_html);

    // show login dialog box
    $("#login_outer").fadeIn(time_out_duration);
}

function toggle_body(p_toggle) {
    if (p_toggle == true) { // show
        $('#pre_view').slideDown(time_out_duration / 3);
        $('#main_view').slideDown(time_out_duration);
        $('#re_view_quiz').slideDown(time_out_duration);
    }
    else { // hide
        $('#pre_view').slideUp(time_out_duration / 3);
        $('#main_view').slideUp(time_out_duration);
        $('#re_view_quiz').slideUp(time_out_duration);
    }
}

function blur_background(p_target, p_degree) {
    var filterVal = 'blur(' + p_degree + 'px)';
    $(p_target)
      .css('filter', filterVal)
      .css('webkitFilter', filterVal)
      .css('mozFilter', filterVal)
      .css('oFilter', filterVal)
      .css('msFilter', filterVal)
      .css('transition', '-webkit-filter 1.5s');
}