//var tgt_date = new Date("2016-08-07T09:00:00"); // 2016.08.07 am 9:00
var tgt_date = Date.parse("2015-08-07T09:00:00".replace(/\r?\n|\r/g, "")); // remove new line character
var id_arr = ["123", "456"];  // as many as you like - no comma after final entry
var pw_arr = ["eud", "6dt"];  // the corresponding passwords;

$(document).ready(function () {
    // get login id from sesseionStorage
    if (typeof (Storage) != "undefined") {
        if (sessionStorage.login_id) {
            $(".fheader_span_login").text("로그인: " + sessionStorage.login_id);
        }
    }

    // show dialog box for login
    $('.fheader_login').click(function () {
        if (typeof (Storage) != "undefined") { // already logged in
            if (sessionStorage.login_id) {
                var yes_no = confirm("로그아웃하겠습니까?");
                if (yes_no == true) logout();
                return;
            }
        }
        // show login dialog
        append_login();
        blur_background('.cover', 25);
        blur_background('.other', 25);
    });
});

function append_login() {
    // add empty login div at the end of body
    $("body").append("<div id=\"login_outer\" hidden></div>");
    $("#login_outer").append("<div id=\"login_inner\"></div>");

    // fill login div
    var login_id = "<input type=\"text\" class=\"input_login\" id=\"input_id\" placeholder=\"학번을 입력하세요.\"/>"; // background for modal
    var login_pw = "<input type=\"password\" class=\"input_login\" id=\"input_pw\" placeholder=\"키워드를 입력하세요\"/>"; // content for modal
    var login_sm = "<input type=\"submit\" class=\"submit_login\" id=\"submit_login\" value=\"로그인\"/><br />";
    var login_sp = "<span class=\"span_login\" id=\"span_login\"></span>";
    var login_html = login_id + login_pw + login_sm + login_sp + login_sp;
    $("#login_inner").html(login_html);

    // get current date
    var cur_date = new Date($.now());

    // before the target date, update to inform mode
    if (cur_date < tgt_date) {
        $("#input_pw").prop("disabled", true);
        $("#submit_login").val("정보 알려주기");
    }

    // bind event handler
    $("#submit_login").bind("click", submit_login);

    // show
    $("#login_outer").fadeIn(1500);
}

// when click submit button
function submit_login() {
    // get current date
    var cur_date = new Date($.now());

    // show login or info
    if (cur_date < tgt_date) { // before the target date, show login info
        var result = inform_pw();
    }
    else { // after the target date, show login
        var result = login();
    }

    // in case of exact id
    if (result == true) {
        setTimeout(
            function () {
                $("#login_outer").fadeOut(1500);
                blur_background('.cover', 0);
                blur_background('.other', 0);
                setTimeout(
                    function () {
                        $("#login_outer").remove();
                    },
                    1500);
            },
            1000);
    }
}

function inform_pw() {
    // clicked when already informed
    var submit_text = $("#submit_login").val();
    if (submit_text == "확인") {
        return true;
    }

    // inform
    var id = $("#input_id").val();
    for (var i = 0; i < id_arr.length; i++) {
        if (id == id_arr[i]) { // in case of success
            $("#input_id").prop("disabled", true);
            $("#input_pw").val(pw_arr[i]);
            $("#input_pw").prop("type", "text");
            $("#submit_login").val("확인");
            //$("#submit_login").hide();
            $("#span_login").text("위의 키워드를 꼭 기억하세요!");
            return false;
        }
    }

    // in case of fail
    $("#span_login").text("다시 시도하세요!");
    $("#input_id").val("");
    return false;
}

function login() {
    var id = $("#input_id").val();
    var pw = $("#input_pw").val();

    for (var i = 0; i < id_arr.length; i++) {
        if ((id == id_arr[i]) && (pw == pw_arr[i])) { // in case of success
            $("#span_login").text("로그인: " + id);
            $(".fheader_span_login").text("로그인: " + id);
            sessionStorage.login_id = id; // store id at sesseion storage
            return true;
        }
    }

    // in case of fail
    $("#span_login").text("다시 시도하세요!");
    $("#input_id").val("");
    $("#input_pw").val("");
    return false;
}

function logout() {
    // delete session storage
    sessionStorage.clear();

    // initialize element for login
    $("#input_id").val("");
    $("#input_pw").val("");
    $("#span_login").text("");
    $(".fheader_span_login").text("");
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

