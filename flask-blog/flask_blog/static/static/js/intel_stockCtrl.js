$(function () {

    var pattern = /(\d{6}).[Ss][HhZz]|[\u4e00-\u9fa5]{1,4}/;

    // 智能投顾
    var pred_result_all;
    var pred_result;
    var day_num = 0;
    var text_pool = [["预测下跌(T+0)：当日收盘价较上一个交易日收盘价下跌超过-0.5%",
        "预测下跌(T+1)：下一个交易日收盘价较上一个交易日收盘价下跌超过-0.5%",
        "预测下跌(T+2)：下下个交易日收盘价较上一个交易日收盘价下跌超过-0.5%"],
        ["预测平盘(T+0)：当日收盘价较上一个交易日收盘价涨跌幅在-0.5% - 0.5%之间",
            "预测平盘(T+1)：下一个交易日收盘价较上一个交易日收盘价涨跌幅在-0.5% - 0.5%之间",
            "预测平盘(T+2)：下下个交易日收盘价较上一个交易日收盘价涨跌幅在-0.5% - 0.5%之间"],
        ["预测上涨(T+0)：当日收盘价较上一个交易日收盘价上涨大于0.5%",
            "预测上涨(T+1)：下一个交易日收盘价较上一个交易日收盘价上涨大于0.5%",
            "预测上涨(T+2)：下下个交易日收盘价较上一个交易日收盘价上涨大于0.5%"]];

    var text_pool_ind = [["弱于行业(T+0)：当日涨跌幅低于所在wind二级行业涨跌幅", "弱于行业(T+1)：下一个交易日涨跌幅低于下一个交易日所在wind二级行业涨跌幅", "弱于行业(T+2)：下下个交易日涨跌幅低于下下个交易日所在wind二级行业涨跌幅"], [], ["强于行业(T+0)：当日涨跌幅高于所在wind二级行业涨跌幅", "强于行业(T+1)：下一个交易日涨跌幅高于下一个交易日所在wind二级行业涨跌幅", "强于行业(T+2)：下下个交易日涨跌幅高于下下个交易日所在wind二级行业涨跌幅"]];

    function drawcard() {
        day_num = 0;
        $("#sole_title").attr("href", "https://gupiao.baidu.com/stock/" + pred_result.combineCode + ".html");


        $("#sole_title").html(pred_result.wind_name + "&nbsp;&nbsp;<span class='p_card_wind'>(" + pred_result.stock_num + ")</span>");


        if (pred_result.predict_res == null || pred_result.accuracy == null || pred_result.precision_p == null || pred_result.precision_n == null || pred_result.accuracy == 0) {
            $("#sole_border").addClass("hide");
            $("#no_data_hint").html("回测期间异常");
        } else {

            $(".p_sidenav>span").html("T日=" + pred_result.date);

            $("#no_data_hint").html("");
            $("#sole_border").removeClass();
            $("#sole_border").addClass("border_" + pred_result.predict_res);
            $("#sole_img").removeClass();
            $("#sole_img").addClass("img_sole_" + pred_result.predict_res);
            $("#sole_perc").html(text_pool[pred_result.predict_res][day_num]);
            $("#sole_pred").html("预测涨跌平准确率" + pred_result.accuracy + "%");


            $("#sole_info_up").html(pred_result.start_date + "至" + pred_result.end_date + "，共" + pred_result.TP_count + "个交易日，模型针对该个股预测涨(涨幅大于0.5%)实际涨幅大于0.5%的正确率");
            $("#sole_info_down").html(pred_result.start_date + "至" + pred_result.end_date + "，共" + pred_result.TN_count + "个交易日，模型针对该个股预测涨(涨幅大于0.5%)实际涨幅大于0.5%的正确率");


            //$("#sole_up").html(pred_result.precision_p+"<span>%</span>");
            //$("#sole_down").html(pred_result.precision_n+"<span>%</span>");
        }


        // 板块
        $("#rel_title").html(pred_result.ind_name + "&nbsp;&nbsp;<span class='p_card_wind'>(" + pred_result.ind_code + ")</span>");

        // 对返回数据的判定：如果为null，则进行提示是没有相应的数据的
        var result_pl = pred_result.result_pl

        if (result_pl == 'ok') {

            if (pred_result.pl_accuracy == 0) {

                $("#rel_border").addClass("hide");
                $("#no_data_hint_pl").html("回测期间异常");
            } else {
                $("#no_data_hint_pl").html("");
                $("#rel_border").removeClass();
                $("#rel_border").addClass("border_" + pred_result.pl_predict_res);
                $("#rel_img").removeClass();
                $("#rel_img").addClass("img_rel_" + pred_result.pl_predict_res);
                $("#rel_perc").html(text_pool_ind[pred_result.pl_predict_res][day_num]);
                $("#rel_pred").html(pred_result.pl_accuracy + "%预测准确率");

            }

        } else if (result_pl == 'fail') {
            $("#rel_border").addClass("hide");
            $("#no_data_hint_pl").html("暂无数据");
        } else if (pred_result.pl_accuracy == null) {
            $("#rel_border").hide();
            $("#no_data_hint_pl").html("暂无数据");

        }
        $("#date_range").html(pred_result.start_date + "---" + pred_result.end_date);
        $("#date_sum").html("共计" + pred_result.ALL_count + "天的历史数据。");

    }

    var t_val = '0';


    // 切换选择
    $(".p_sidenav>div").click(function () {
        var select = $(this).attr("value");

        $(".p_sidenav>div").removeClass("p_selected");
        $(".p_sidenav>div>img").attr("src", '/s/imgs/doc/select@2x.png');
        $(this).addClass("p_selected");
        $(".p_selected>img").attr("src", '/s/imgs/doc/selected@2x.png');

        pred_result = pred_result_all[select];
        day_num = select;
        drawcard();
    });


    if (getUrlParam("code")) {
        var searchCode = getUrlParam("code");
        $('#search_pred').val(searchCode);
        setTimeout("$('#pred').click();", 0);

    }

    $('#pred').on('click', function () {



        $(".p_selected>img").attr("src", '/s/imgs/doc/select@2x.png');
        $(".p_selected").removeClass("p_selected");
        $("#option_day_0").addClass("p_selected");
        $("#option_day_0>img").attr("src", '/s/imgs/doc/selected@2x.png')

        $(".p_sidenav>span").html("T日=?");

        var input_val = $('#search_pred').val();
        $(".upH1_pred").parent().addClass("T-left");
        $(".p_result").addClass("hide");
        $("#no_data_hint").html("");
        $("#sole_img").removeClass();
        $("#sole_border").removeClass();
        $("#sole_perc").html("无数据");
        $("#sole_pred").html("无数据");
        $("#sole_info_up").html("无数据");
        $("#sole_info_down").html("无数据");
        $("#sole_up").html("无数据");
        $("#sole_down").html("无数据");

        $("#no_data_hint_pl").html("");
        $("#rel_border").removeClass();
        $("#rel_img").removeClass();
        $("#rel_perc").html("无数据");
        $("#rel_pred").html("无数据");


        if (pattern.test(input_val)) {
            $.ajax({
                type: "post",
                url: "/data",
                async: true,
                dataType: "json",
                data: {
                    input_val: input_val,
                    t_val: t_val,
                },
                success: function (result) {

                    //console.log(result)
                    pred_result_all = result.intelData;
                    pred_result = result.intelData[0];

                    $("#iframe_change").attr("src", "https://gupiao.baidu.com/stock/" + pred_result.combineCode + ".html");


                    if (pred_result.stock_num == null) {
                        $("#wrong_data_hint").html("无对应股票代码，请检查您的输入！");

                    } else if (pred_result.wind_name.indexOf("ST") >= 0) {
                        $("#wrong_data_hint").html("ST股票不提供预测！");

                    } else if (pred_result.pre_statu == 1) {
                        $("#wrong_data_hint").html("次新股不提供预测！");

                    } else {
                        $(".pre_index_info").addClass("hide");
                        $("#daily_rank").addClass("hide");
                        $(".title-Sec2").addClass("hide");
                        $(".subtitle-Sec2").addClass("hide");
                        $(".input_pred").addClass("up-input_pred");
                        $(".upH1_pred").removeClass("hide");
                        $(".p_result").removeClass("hide");
                        $("#pred_form").addClass("up-pred_form");
                        $("#wrong_data_hint").html("");
                        drawcard();
                    }


                },
                error: function (xhr, status, error) {
                    if (!input_val) {
                        alert('请输入万得代码11111');
                    }
                }
            });
        }


    })

    //提示语
    function iswarn(warnword) {
        if (warn == true) {
            $('#remInder').show();
            $('#remInder').html(warnword)
            $('#search').attr('disabled', true);
        } else {
            $('#remInder').hide();
        }
    }

    // 点击更改input的value
    $(".selectChange").click(function () {
        if ($(this).is(':checked')) {
            this.value = '1';
        } else {
            this.value = '0';
        }
        searchNum = '0';
    });

    //监听input change事件
    $('#search1').change(function () {
        searchNum = '0';
    });


    //rank option
    var rankList = [0];
    //rank option
    var sideList = [0];

// 画侧边栏
    $(".p_sidenav").append("<div class='p_selected' id='option_day_0' value=" + sideList[0] + "><img src='/s_v1.5/imgs/doc/selected@2x.png'>T+" + sideList[0] + "日</div>");

    for (var i = 1; i < sideList.length; i++) {
        $(".p_sidenav").append("<div value=" + sideList[i] + "><img src='/s/imgs/doc/select@2x.png'>T+" + sideList[i] + "日</div>");
    }

// 画选项
    for (var i = 0; i < rankList.length; i++) {
        $("#dailyrank_opt").append("<option value=" + rankList[i] + ">T+" + rankList[i] + "日排名</option>");
    }


// 切换选择
    $("#dailyrank_opt").change(function () {
        var selectValue = $("#dailyrank_opt").val();
        //console.log(selectValue);
        $(".col-md-6>table>tbody>tr").addClass("hide");
        $("#uprank").removeClass("hide");
        $("#downrank").removeClass("hide");
        $(".rank_T" + selectValue).removeClass("hide");

    });


    $("#search_pred").keypress(function (event) {

        if (event.keyCode == 13) {

            $("#pred").click();

        }


    });

    $(".img_Sup").mouseover(function () {
        $(this).next(".extra_info").css({"background": "#bfbfbf", "opacity": "1", "color": "rgba(255,255,255,1)"});
        //console.log(1);
    });

    $(".img_Sup").mouseout(function () {
        $(this).next(".extra_info").css({"background": "transparent", "opacity": "0", "color": "rgba(255,255,255,0)"});
        //console.log(2);
    });


});