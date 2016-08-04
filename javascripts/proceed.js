var target_week_date = "2015-08-14T09:00:00";
var kw_arr = ["summer", "just", "poke", "couple", "autumn", "capital", "winehouse", "floyd", "tomwaits", "vangelis", "yes", "eagles", "jimi"];  // the corresponding passwords;

$(document).ready(function ()
{
    show_main_body();

    $('#submit_proceed').click(function ()
    {
        var m_show_hide = $('#main_view').css('display');
        if (m_show_hide == 'none') // if main_view is not shown
        {
            $("#span_proceed").text("며칠만 기다리세요!"); // "Wait a few days!"
        }
        else // m_show_hide == 'block' // if main_view is shown
        {
            var m_show_hide = $('#re_view').css('display');
            if (m_show_hide == 'none') // if re_view is not shown
            {
                $('#re_view').slideDown(2000);
                $("#submit_proceed").val("복습 퀴즈 결과");
            }
            else 
            {
                if ($("#submit_proceed").val() == "메인으로 가기")
                {
                    location.href = "../index.html";
                    return false;
                }

                // get score
                var total_num = $(".span_quiz").length;
                var exact_num = get_num_exac_quiz();
                var score = exact_num / total_num * 100;

                // get string
                var respond = "퀴즈 점수는 " + score.toFixed(1) + "점으로 ";
                if (score >= 60)
                {
                    respond = respond + "기준(60.0/100.0) 이상입니다. 축하합니다! 이번주 학습을 완료했습니다."
                    if (score == 100)
                    {
                        $("#submit_proceed").val("메인으로 가기");
                        $("#submit_proceed").css("background-color", "#ff6f6f"); // change the color
                    }
                }
                else
                {
                    respond = respond + "기준(60.0/100.0) 이하입니다. 아쉽지만, 학습을 다시하고 퀴즈를 다시 푸세요.";
                }
                $("#span_proceed").html(respond);
                $("#span_proceed").css("color", "#ff6f6f"); // change the color
            }
        }
        return false;
    });
});

function show_main_body()
{
    // show pre_view
    $('#pre_view').slideDown(1000);
    $('#proceed').slideDown(1000);

    // set date
    var tgt_date = Date.parse(target_week_date);
    var cur_date = new Date($.now());

    // after the target date, show main_view
    if (cur_date >= tgt_date)
    {
        $('#main_view').slideDown(2000);
        $('#re_view').slideUp(2000);
        $('#span_proceed').text(""); // set for next stage

        //$("#to_next").text("학습 결과");
        $("#submit_proceed").val("복습 퀴즈 풀이");
    }
}

function get_num_exac_quiz()
{
    var exact_num = 0;
    $(".span_quiz").each(function () {
        // ele = this;
        if ($(this).text() == "정답입니다!")
        {
            exact_num = exact_num + 1;
        }
    });
    return exact_num;
}

// validation of input values
function IsNumeric(e,v)
{
    // get prev input + current input
    var keyCode = e.which ? e.which : e.keyCode;
    var curInput = v + String.fromCharCode(keyCode);

    // preclude +/-/./+./-. for validation
    switch (curInput)
    {
        case "+": case "-": case ".": case "+.": case "-.":
            return true;
        default:
            break;
    }

    // check if it is Not a Number
    if (isNaN(curInput)) return false;
}
