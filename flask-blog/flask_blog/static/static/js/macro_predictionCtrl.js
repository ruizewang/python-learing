var now = 1;
var pre_day = 0;
var plate_Cat = 1;
var plate_ID = 1;


$(document).ready(function () {


    $('.block_table tbody>tr:even .block_accu').css("background", "#F7F7F6");

//标题切换
    $(".dropdown").click(function () {
        var now = $(this).attr('value');
        if (now != 1 && now != 2 && now != 5 && now != 6 && now != 7) {
            $(".dropdown-menu .dropdown-menu").css('display', "none");
            $(".dropdown-menu .dropdown").removeClass("open");
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).children().css('display', "hidden");
            } else {
                $(this).addClass("open");
                $(this).children().css('display', "block");
            }
            return false
        } else {
            $(".dropdown").children().css('display', "hidden");
        }
    });
    // $('body').on('click', function (e) {
    //     if (e.target.className != 'loadName' && e.target.nodeName != 'A') {
    //         $(".dropdown").removeClass("open");
    //         $(".dropdown").children().css('display', "hidden");
    //     }
    // });

    $(".sendAjax>a").click(function () {
        setTimeout('$(this).parent().addClass("open");', 1);
    });

    //最底层点击
    $(".sendAjax>ul>li").click(function () {
        if (pre_day != pre_day || plate_ID != $(this).attr("value") || plate_Cat != $(this).parent().parent().attr("value")) {
            rowindex = -1;
            $("#dailyData").removeClass("hide");
            now = $(this).parent().parent().attr("value");
            $("#hisData").click();
            $("#his_chart_title").html("板块:" + $(this).parents('.dropdown').children('a').html() + ' → ' + $(this).text() + '：');

            plate_Cat = $(this).parent().parent(".sendAjax").attr("value");


            plate_ID = $(this).attr("value");
            $(".list_selected").removeClass("list_selected");
            $(this).addClass("list_selected");
            $(".tab_selected").removeClass("tab_selected");


            //行业板块下属菜单
            switch (plate_Cat) {
                case '3':
                case '4':
                case '8':
                case '9':
                case '10':
                case '11':
                case '12':
                case '13':
                case '14':
                case '15':
                case '16':
                case '17':

                    var Cattext = $(this).parent().parent().parent().prev().text();
                    var text = $(this).parent().prev().text();
                    $(".plate_name").html(Cattext + " → " + text + " → " + $(this).text() + " 预测情况一览");
                    $(this).parents(".dropdown").addClass("tab_selected");
                    $(this).parent().parent(".sendAjax").removeClass("tab_selected").addClass("list_selected");
                    break;

                default:
                    //console.log("here");
                    var text = $(this).parent().prev().text();
                    $(".plate_name").html(text + " → " + $(this).text() + " 预测情况一览");
                    $(this).parents(".sendAjax").addClass("tab_selected");
                    break;
            }

            setAjax(pre_day, plate_Cat, plate_ID);

        } else {
            console.log('重复请求');
        }


    });


    //点击切换
    $("#hisData").click(function () {
        $("#hisData").css({"color": "red", "text-decoration": "underline"});
        $("#dailyData").css({"color": "black", "text-decoration": "none"});
        if (rowindex >= 0) {
            $("#dailyData").addClass("hide");
        }
        $("#chart_line_daily").addClass("hide");
        $("#chart_line_his").removeClass("hide");
    });
    $("#dailyData").click(function () {
        $("#dailyData").css({"color": "red", "text-decoration": "underline"});
        $("#hisData").css({"color": "black", "text-decoration": "none"});
        $("#chart_line_his").addClass("hide");
        $("#chart_line_daily").removeClass("hide");
        dailyChart.resize();

    });

    $("#allStock").click(function () {
        //sent ajax to all_stock

        if (now != $(this).attr("value")) {
            now = $(this).attr("value");
            plate_Cat = $(this).attr("value");
            plate_ID = 1;


            rowindex = -1;
            $("#dailyData").removeClass("hide");

            $(".plate_name").html('A股涨跌预测');
            $("#hisData").click();
            $("#his_chart_title").html('A股全市场：');


            $(".tab_selected").removeClass("tab_selected");
            $(this).addClass("tab_selected");
            $(this).addClass("tab_selected");
            $(".list_selected").removeClass('list_selected');

            $.ajax({
                url: "/get_plate",
                type: "POST",
                dataType: "json",
                data: {pre_day: pre_day, plate_Cat: plate_Cat, plate_ID: plate_ID},
                success: function (data) {

                    drawPage(data);
                    drawChart(data);
                }
            });
        } else {

        }

    });
});

function setAjax(preday, precat, preid) {

    $.ajax({
        url: "/get_plate",
        type: "POST",
        dataType: "json",
        data: {pre_day: preday, plate_Cat: precat, plate_ID: preid},
        success: function (data) {
            $("#dailyData").removeClass("hide");

            drawPage(data);
            drawChart(data);
        }
    });


}

function drawPage(data) {



    //barchart

    var baroption = packBarOption(data.industry_raf_nums, data.industry_real_time_nums);
    myBarChart.setOption(baroption);


    var stockList = $("#stockList").datagrid("loadData", data.industry_data, {
        fit: true,
        onLoadSuccess: function () {


            if (rowindex >= 0) {

                $(this).datagrid('selectRow', rowindex);
            }
            $(this).datagrid('getPanel').find('.easyui-tooltip').tooltip({
                showDelay: 500
                //...
            });
        }
        //     ,
        // onDblClickRow: function (index, row) {
        //     window.open('/intel?seq=10&code='+row.code);
        //
        // }

        , onClickRow: function (index, row) {
            rowindex = index;

            $("#hisData").click();
            $("#dailyData").addClass("hide");
            var platname = $('.plate_name').html();
            var eq = platname.indexOf('预测');
            if (eq > 0) {
                if (platname.indexOf('涨跌预测') > 0) {
                    var newName = platname.substring(0, eq - 2);
                } else {
                    var newName = platname.substring(0, eq);
                }
            }
            $("#his_chart_title").html(newName + ' → 个股：' + row.code_name + '(' + row.code + ')' + '：');

            $.ajax({
                url: '/get_acc',
                type: "POST",
                dataType: "json",
                data: {"code": row.code},
                success: function (data) {

                    // var myChart = echarts.init(document.getElementById('chart_line_his'));

                    var option_his = packChartOption(data.accuracy, data.one_stock_date);
                    myChart.setOption(option_his);


                }
            })
        }

    });

    stockList.datagrid('enableFilter');


}

function drawChart(data) {
    // line chart指定图表的配置项和数据
    if (rowindex >= 0) {
        $("#hisData").click();
        $("#dailyData").addClass("hide");
    }
    var option_his = packChartOption(data.industry_pic_data.industry_acc, data.industry_pic_data.industry_date);
    myChart.setOption(option_his);

    // line chart2指定图表的配置项和数据

    var option_daily = packChartOption(data.industry_pic_data.industry_every_acc, data.industry_pic_data.industry_every_date);
    dailyChart.setOption(option_daily);
}

function myrefresh() {
    // setAjax(pre_day,plate_Cat,plate_ID);
    //console.log("pre_day:" + pre_day + "plate_Cat:" + plate_Cat + "plate_ID:" + plate_ID);

    $.ajax({
        url: "/get_plate",
        type: "POST",
        dataType: "json",
        data: {pre_day: pre_day, plate_Cat: plate_Cat, plate_ID: plate_ID},
        success: function (data) {
            // $("#dailyData").removeClass("hide");
            drawPage(data);
        }
    });


// window.location.reload();
}
