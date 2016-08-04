var id_arr = ["123", "456"];  // as many as you like - no comma after final entry
var sc_arr = ["90", "30"];
var exam_name = "중간고사";
var average = "24.5";

$(document).ready(function () {
    $('.fheader_score').click(function () {
        //var tgt_date = new Date("2016-08-07T09:00:00"); // 2016.08.07 am 9:00
        var tgt_date = Date.parse("2015-08-07T09:00:00".replace(/\r?\n|\r/g, "")); // remove new line character
        var cur_date = new Date($.now());

        // before the target date, no score to show
        if (cur_date < tgt_date) {
            alert("확인할 점수가 없습니다!");
            return;
        }
        else {
            // show dialog box for login
            if (typeof (Storage) !== "undefined") {
                if (sessionStorage.login_id) {
                    // get id
                    var idx = get_idx();
                    append_score(idx);

                    // blur and show score
                    blur_background('.cover', 25);
                    blur_background('.other', 25);
                    return;
                }
            }
            alert("먼저 로그인하세요!");
        }
    });
});

function submit_score() {
    $("#score_outer").fadeOut(1500);
    blur_background('.cover', 0);
    blur_background('.other', 0);
    setTimeout(
        function () {
            $("#score_outer").remove();
        },
        1500);
}

function get_idx() {
    // get user id
    var ids = $(".fheader_span_login").text(); // "로그인: " + p_id
    var ids = ids.split(" ");
    var id = ids[ids.length-1];

    // get index of user id
    for (var idx = 0; idx < id_arr.length; idx++) {
        if (id == id_arr[idx]) {
            return idx;
        }
    }
}

function append_score(p_idx) {
    // append empty div
    $("body").append("<div id=\"score_outer\" hidden></div>");
    $("#score_outer").append("<div id=\"score_inner\"></div>");

    // add list
    $("#score_inner").append("<ul></ul>");
    var score_class = "<li>과목: 건축구조해석 (Structural analysis)</li>"; // background for modal
    var score_id = "<li>학번: " + id_arr[p_idx] + "</li>"; // content for modal
    var score_exa_name = "<li>시험: " + exam_name + "</li>";
    var score_score = "<li>점수: " + sc_arr[p_idx] + "</li>";
    var score_avg = "<li>평균: " + average + "</li>";
    var score_pad = "<li></li>";
    var score_html = score_class + score_id + score_exa_name + score_score + score_avg + score_pad;
    $("#score_inner").html(score_html);

    // append submit button
    $("#score_inner").append("<input type=\"submit\" class=\"submit_score\" id=\"submit_score\" value=\"확인\"/>");

    // bind event handler
    $("#submit_score").bind("click", submit_score);

    // show
    $("#score_outer").fadeIn(1500);
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



