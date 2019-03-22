$(document).ready(function () {
    //layui组件
    layui.use(['table', 'layer'], function () {
        var table = layui.table;
        var pattern = /(\d{6}).[Ss][HhZz]|[\u4e00-\u9fa5]{1,4}|[0-9A-Z]{0,6}/;
        // 替代池
        var searchNum = '0';
        var colorList = ['#000000', 'rgb(85, 163, 213)', 'rgb(211, 61, 59)', 'rgb(148, 188, 106)', 'rgb(86, 148, 153)', 'rgb(182, 51, 96)'];
        var mainW = $('.leftmain').width() - 130;
        var width = 180;
        var tdW1 = '';
        var tdW2 = '';
        $('#replace_pool_pic_data').width(mainW);
        $('.table_data_ori').width(mainW - 130);
        if ($('body').width() < 900) {
            mainW = $('body').width() - $('body').width() * 0.02 - 30;
            $('.table_data_ori').width(mainW - 130);
            $('#replace_pool_pic_data').width(mainW);
            width = mainW / 4;
            tdW1 = mainW / 4 + 20;
            tdW2 = mainW / 4 + 50;
        }
        $('#search_btn_up').on('click', function () {
            $('#search_btn').click();
        });
        $('#search_btn').on('click', function () {
            var input_val = $('#search1').val();
            if (pattern.test(input_val)) {
                var forbid = $('#forbid').val();
                var stop = $('#stop').val();
                var st = $('#st').val();
                var gn = $('#gn').val();
                //console.log(forbid, stop, st)

                $(".searchRep").addClass("hide");
                $(".title-Sec").addClass("hide");
                $(".subtitle-Sec").addClass("hide");
                $(".input-bar").addClass("up-input");
                $(".btn-inverse").addClass("up-btn");
                $("#search_btn").addClass("hide");
                $(".loading").removeClass("hide");
                $("#search_btn_up").removeClass("hide");
                $(".upH1").removeClass("hide");
                $('html,body').animate({scrollTop: $('.leftmain').offset().top - 80}, 800);
                $.ajax({
                    type: "post",
                    url: "/replace",
                    async: true,
                    dataType: "json",
                    data: {
                        input_val: input_val,
                        forbid: forbid,
                        stop: stop,
                        st: st,
                        gn: gn
                    },
                    success: function (result) {
                        console.log(result);
                        //更新折线图
                        var table_data = result.table_data;
                        $('.table_data_ori .sec').html(result.table_data_ori[0].ori_security_code);
                        $('.table_data_ori .secName').html(result.table_data_ori[0].ori_security_name);
                        table.render({
                            elem: '#table_data'
                            , width: mainW
                            , skin: 'nob'
                            , size: 'lg'
                            , data: table_data
                            , limit: 5
                            , cols: [[
                                {
                                    field: 'cube',
                                    title: '',
                                    align: 'center',
                                    unresize: true,
                                    templet: '#cube',
                                    width: width
                                }
                                , {
                                    field: 'backup_security',
                                    title: '替代标的',
                                    align: 'center',
                                    unresize: true,
                                    width: tdW1
                                }
                                , {
                                    field: 'backup_security_name',
                                    title: '名称',
                                    align: 'center',
                                    unresize: true
                                }
                                , {field: 'corr', title: '相关度', align: 'center', unresize: true, width: tdW2}
                                , {
                                    field: 'avgAmount',
                                    title: '日均成交额(/万元)',
                                    align: 'center',
                                    unresize: true,
                                    width: tdW2
                                }
                                , {field: 'tradeVol', title: '可交易额度(/万元)', align: 'center', unresize: true, width: tdW2}
                            ]]
                        });
                        for (var i = 0; i < $('.layui-table-body tr').length; i++) {
                            $('.layui-table-body tr').eq(i).find('.cube').css('background', colorList[i + 1]);
                        }
                        var lineData = [];
                        for (var i = 0; i < result.replace_pool_pic_data.pic_data.length; i++) {
                            lineData.push({
                                name: result.replace_pool_pic_data.replace_pool_names[i],
                                type: 'line',
                                itemStyle: {
                                    color: colorList[i]
                                },
                                lineStyle: {
                                    color: colorList[i]
                                },
                                smooth: true,
                                data: result.replace_pool_pic_data.pic_data[i]
                            })
                        }
                        var option = {
                            grid: {
                                left: '0',
                                right: '0',
                                containLabel: true
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                },
                                extraCssText: 'text-align: left;'
                            },
                            legend: {
                                top: 20,
                                data: result.replace_pool_names
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: result.replace_pool_pic_data.pic_date
                                }],
                            yAxis: [
                                {
                                    type: 'value',
                                    splitLine: {
                                        show: false
                                    },
                                    scale: true
                                }],
                            series: lineData
                        };
                        var replace_pool_pic_data = echarts.init(document.getElementById('replace_pool_pic_data'));
                        replace_pool_pic_data.setOption(option, true);
                        $(".loading").addClass("hide");
                        $(".searchRep").removeClass("hide");
                    },
                    error: function (xhr, status, error) {
                        if (!input_val) {
                            alert('请输入万得代码');
                        }
                    }
                });
            }
        });
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
        $(".input-bar").keypress(function (event) {

            if (event.keyCode == 13) {
                $('#search_btn').click();

            }
        });
    })
});