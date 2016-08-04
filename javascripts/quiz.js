var g_tolerance = 1.0e-2;
var test_ans_arr = [
    ["부정정구조물", 3, "잉여력"], // indeterminate
    ["적합조건식", 1.6429], // flexibility
    ["양단연속", 0, 5, -5], // slope
    [0.75, 0.6667, -9, -9, 25, -25] // moment
];  // as many as you like - no comma after final entry
var quiz_ans_arr = [
    [6, 5, 7, 2, 2, 7, 6, 7, 4, 3], // indeterminate
    [5, -2, 0.8889, 2.25, -0.03, 0.001, 30, -0.32, 0.09, 3.5556], // flexibility
    [2, "타단힌지", 2, 1, -1, 1, -1, 3.5, 4.8333, -0.3333], // slope
    [1, 1, 1, 0.5, 2, -2, -1, -1, 1, -1] // moment
];

$(document).ready(function ()
{
    $(".li_test").click(function () {
        // get the test element
        var test = $(this).parent().children().eq(1);
        test.slideToggle(400); // hide -> show or show -> hide
        return false;
    });

    $(".submit_test").click(function ()
    {
        // get the index of column
        var j_arr = $(this).attr('id').split("_");
        var j_idx = j_arr[j_arr.length - 1];

        // get the row of the array => [9800, 12, 0]; // get the index of row
        cur_arr = test_ans_arr[get_row_idx()];

        // comparison
        treat_answer(cur_arr, j_idx, "test");
    });

    $(".submit_quiz").click(function ()
    {
        // get the index of column
        var j_arr = $(this).attr('id').split("_");
        var j_idx = j_arr[j_arr.length - 1];

        // get the row of the array => [9800, 12, 0]; // get the index of row
        cur_arr = quiz_ans_arr[get_row_idx()];

        // comparison
        treat_answer(cur_arr, j_idx, "quiz");
    });

    $(".span_hint").click(function () {
        var hint_id = "#" + $(this).attr("hint_id");
        $(hint_id).toggle(400);
    });
});

function get_row_idx()
{
    var title = $(document).find("title").text();
    switch (title) {
        case "Statically indeterminate structures":
            var cur_idx = 0; break;
        case "Flexibility method":
            var cur_idx = 1; break;
        case "Slope deflection method":
            var cur_idx = 2; break;
        case "Moment distribution method":
            var cur_idx = 3; break;
        default:
            var cur_idx = 0; break;
    }
    return cur_idx;
}
function treat_answer(cur_arr, j_idx, p_type) // p_type = "test" / "quiz"
{
    // get id of the corresponding elements
    p_type = p_type + "_";
    var inp_quiz = "#input_" + p_type + j_idx;
    var sub_quiz = "#submit_" + p_type + j_idx;
    var span_quiz = "#span_" + p_type + j_idx;

    // get values
    var m_ans = cur_arr[j_idx - 1]; // exanser answer
    var m_inp = $(inp_quiz).val();  // input answer

    // in case of no input
    if (m_inp == "")
    {
        $(inp_quiz).focus();
        $(span_quiz).text("답을 입력하세요!");
        return false;
    }

    // comparison
    //  in case of exact answer
    if (comparison_value(inp_quiz, m_ans, m_inp)) {
        $(inp_quiz).val(m_ans);
        $(inp_quiz).prop("disabled", true); // disable input button
        $(inp_quiz).css("color", "#ff6f6f"); // change the color of input button
        $(sub_quiz).prop("disabled", true); // disable submit button
        $(sub_quiz).css("background-color", "#ff6f6f"); // change the color of submit button
        $(sub_quiz).css("cursor", "default"); // change the color of submit button
        $(span_quiz).text("정답입니다!"); // change the text of submit span
        $(span_quiz).css("color", "#ff6f6f"); // change the color of submit span
        if (p_type == "test_")
        {
            $("#test_" + j_idx).parent().children().eq(0).text("확인 질문 - 풀이 완료");
        }
        return true;
    }
    else // in case of wrong answer
    {
        $(inp_quiz).val("");
        $(inp_quiz).focus();
        $(span_quiz).text("오답입니다! 다시 풀어보세요!");
        return false;
    }
}

function comparison_value (inp_id, ex_ans, in_ans)
{
    var evnt_attr = $(inp_id).attr('onkeypress');
    if (typeof evnt_attr != "undefined") { // in case of number
    //if ($(inp_id).attr('onkeypress').includes("IsNumeric")) { // in case of number
        if (Math.abs(ex_ans - in_ans) < g_tolerance) { return true; }
        else { return false; }
    }
    else // in case of text
    {
        if (ex_ans == in_ans) { return true; }
        else { return false; }
    }
}