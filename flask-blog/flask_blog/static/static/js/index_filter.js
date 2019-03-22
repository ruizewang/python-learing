$(document).ready(function () {
    //layui组件
    layui.use(['table', 'layer', 'form', 'element'], function () {
        var element = layui.element;
        var table = layui.table;
        var form = layui.form;
        var arr = [];
        var other = {};
        var nowIndex = '';
        var num = 50;
        var buyCode = [];
        var sellCode = [];
        var timer = '';
        var signal = 0;
        var lengthList = [];

        function CompareDate(t1, t2, t3) {
            var date = new Date();
            var a = t1.split(":");
            var b = t2.split(":");
            var c = t3.split(":");
            if (date.setHours(a[0], a[1]) < date.setHours(b[0], b[1]) && date.setHours(b[0], b[1]) < date.setHours(c[0], c[1])) {
                return 'ok';
            }

        }

        function interval() {
            setInterval(function () {
                if (new Date().getSeconds() == 15) {
                    if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "15:05") == 'ok') {
                        buyCode = [];
                        sellCode = [];
                        for (var i = 0; i < $('.buy .layui-table-body td[data-field=wind_code] div').length; i++) {
                            buyCode.push($('.buy .layui-table-body td[data-field=wind_code] div').eq(i).html());
                        }
                        for (var i = 0; i < $('.sell .layui-table-body td[data-field=wind_code]').length; i++) {
                            sellCode.push($('.sell .layui-table-body td[data-field=wind_code] div').eq(i).html());
                        }
                        $.ajax({
                            type: "POST",
                            url: '/strategy/index_filter_chg_ajax/',
                            data: JSON.stringify({
                                "buy": buyCode,
                                "sell": sellCode
                            }),
                            success: function (data) {
                                console.log(data);
                                $('.layui-table-body td[data-field=real_time_data]>div>div').fadeOut();
                                for (var i = 0; i < $('.buy .layui-table-body td[data-field=wind_code] div').length; i++) {
                                    $.each(data.buy, function (x, y) {
                                        if ($('.buy .layui-table-body td[data-field=wind_code] div').eq(i).html() == x) {
                                            $('.buy .layui-table-body td[data-field=real_time_data]').eq(i).attr('data-content', y);
                                            $('.buy .layui-table-body td[data-field=real_time_data]>div>div').eq(i).html(y);
                                            if (parseFloat(y) > 0) {
                                                $('.buy .layui-table-body td[data-field=real_time_data]>div>div').eq(i).css('color', '#c00');
                                            } else if (parseFloat(y) < 0) {
                                                $('.buy .layui-table-body td[data-field=real_time_data]>div>div').eq(i).css('color', '#3DA642');
                                            } else {
                                                $('.buy .layui-table-body td[data-field=real_time_data]>div>div').eq(i).css('color', '#333');
                                            }
                                        }
                                    });
                                }
                                for (var i = 0; i < $('.sell .layui-table-body td[data-field=wind_code] div').length; i++) {
                                    $.each(data.sell, function (x, y) {
                                        if ($('.sell .layui-table-body td[data-field=wind_code] div').eq(i).html() == x) {
                                            $('.sell .layui-table-body td[data-field=real_time_data]').eq(i).attr('data-content', y);
                                            $('.sell .layui-table-body td[data-field=real_time_data]>div>div').eq(i).html(y);
                                            if (parseFloat(y) > 0) {
                                                $('.sell .layui-table-body td[data-field=real_time_data]>div>div').eq(i).css('color', '#c00');
                                            } else if (parseFloat(y) < 0) {
                                                $('.sell .layui-table-body td[data-field=real_time_data]>div>div').eq(i).css('color', '#3DA642');
                                            } else {
                                                $('.sell .layui-table-body td[data-field=real_time_data]>div>div').eq(i).css('color', '#333');
                                            }
                                        }
                                    });
                                }
                                $('.layui-table-body td[data-field=real_time_data]>div>div').fadeIn();
                            }
                        });
                    }
                }
            }, 1000)
        }

        function showTable(data) {
            $('form').show();
            var default_data = data.default_data.index_filter_data;
            table.render({
                elem: '#raise'
                , width: 1140
                , skin: 'nob'
                , even: true
                , size: 'lg'
                , data: default_data.buy_data
                , limit: num
                , cols: [[
                    {field: 'wind_code', title: '标的代码', align: 'center', unresize: true}
                    , {field: 'security_name', title: '标的名称', align: 'center', unresize: true}
                    , {
                        field: '2',
                        title: '强力推荐买入',
                        align: 'center',
                        unresize: true,
                        templet: function (d) {
                            return '<div title="' + d['2'] + '">' + d['2'].length + '</div>'
                        }
                    }
                    , {
                        field: '1',
                        title: '推荐买入',
                        align: 'center',
                        unresize: true,
                        templet: function (d) {
                            return '<div title="' + d['1'] + '">' + d['1'].length + '</div>'
                        }
                    }
                    , {field: 'trade_vol', title: '可交易额度(万元)', align: 'center', unresize: true}
                    , {field: 'avg_amount', title: '日均成交额(万元)', align: 'center', unresize: true}
                    , {
                        field: 'real_time_data',
                        title: '涨跌',
                        align: 'center',
                        unresize: true,
                        templet: function (d) {
                            if (parseFloat(d['real_time_data']) > 0) {
                                return '<div style="color: #c00">' + d['real_time_data'] + '</div>'
                            } else if (parseFloat(d['real_time_data']) < 0) {
                                return '<div style="color: #3DA642">' + d['real_time_data'] + '</div>'
                            } else {
                                return '<div style="color: #333">' + d['real_time_data'] + '</div>'
                            }
                        }
                    }
                    , {field: 'total_val', title: '总计', align: 'center', unresize: true}
                ]]
            });
            table.render({
                elem: '#fall'
                , width: 1140
                , skin: 'nob'
                , even: true
                , size: 'lg'
                , data: default_data.sell_data
                , limit: num
                , cols: [[
                    {field: 'wind_code', title: '标的代码', align: 'center', unresize: true}
                    , {field: 'security_name', title: '标的名称', align: 'center', unresize: true}
                    , {
                        field: '-2',
                        title: '强力推荐卖出',
                        align: 'center',
                        unresize: true,
                        templet: function (d) {
                            return '<div title="' + d['-2'] + '">' + d['-2'].length + '</div>'
                        }
                    }
                    , {
                        field: '-1',
                        title: '推荐卖出',
                        align: 'center',
                        unresize: true,
                        templet: function (d) {
                            return '<div title="' + d['-1'] + '">' + d['-1'].length + '</div>'
                        }
                    }
                    , {field: 'trade_vol', title: '可交易额度(万元)', align: 'center', unresize: true}
                    , {field: 'avg_amount', title: '日均成交额(万元)', align: 'center', unresize: true}
                    , {
                        field: 'real_time_data', title: '涨跌', align: 'center', unresize: true,
                        templet: function (d) {
                            if (parseFloat(d['real_time_data']) > 0) {
                                return '<div style="color: #c00">' + d['real_time_data'] + '</div>'
                            } else if (parseFloat(d['real_time_data']) < 0) {
                                return '<div style="color: #3DA642">' + d['real_time_data'] + '</div>'
                            } else {
                                return '<div style="color: #333">' + d['real_time_data'] + '</div>'
                            }
                        }
                    }
                    , {field: 'total_val', title: '总计', align: 'center', unresize: true}
                ]]
            });
            form.render();
        }

        $.ajax({
            type: "GET",
            url: '/strategy/index_filter_date_ajax/',
            data: {},
            success: function (data) {
                $('.current').show();
                $('.waiting').hide();
                console.log(data);
                var result = data.index_and_name;
                var option = '';
                if (data.index_filter_date != '' || data.index_filter_date != null || data.index_filter_date != undefined) {
                    $('.current h3 span').html(data.index_filter_date);
                    $('.current h3').show();
                }
                if (result.length > 0) {
                    option += '<div class="allIndex layui-collapse clearfix">';
                    for (var i = 0; i < result.length; i++) {
                        lengthList.push(result[i].indicators_mem.length);
                        option += '<div class="layui-colla-item fl"><h2 class="layui-colla-title">' + result[i].indicators + '</h2><div class="layui-colla-content layui-show"><div class="single">';
                        for (var j = 0; j < result[i].indicators_mem.length; j++) {
                            nowIndex += '<p class="fl">' + result[i].indicators_mem[j] + '</p>';
                            option += '<div><input class="layui-input" type="checkbox" title="' + result[i].indicators_mem[j] + '" name="' + result[i].indicators_mem[j] + '" lay-skin="primary" lay-filter="select" checked></div>';
                        }
                        option += '</div></div></div>';
                    }
                    option += '</div>';
                    $('.selectPart').append(option);
                    $('.nowIndex').append(nowIndex);
                    $('.countNum').html($('.nowIndex p').length - 1);
                    $('.nowIndex p').eq(0).height($('.nowIndex').height());
                    $('.layui-colla-content').height(lengthList.sort().reverse()[0] * 23);
                    element.render();
                    showTable(data);
                    timer = interval();
                }
            }
        });
        form.on('checkbox(selectAll)', function (data) {
            if (data.elem.checked == true) {
                $('.singleIndex input').prop('checked', true);
                $('.allIndex input').prop('checked', true);
            } else {
                $('.singleIndex input').prop('checked', false);
                $('.allIndex input').prop('checked', false);
            }
            form.render();
        });
        form.on('checkbox(select)', function () {
            if ($('.allIndex .layui-form-checkbox').length == $('.allIndex .layui-form-checked').length) {
                $('input[name=selectAll]').prop('checked', true);
            } else {
                $('input[name=selectAll]').prop('checked', false);
            }
            form.render();
        });
        $('.current>.showIndex').on('click', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $('form').hide();
                $(this).find('div').css('transform', 'rotate(0deg)');
            } else {
                $(this).addClass('open');
                $('form').show();
                $(this).find('div').css('transform', 'rotate(180deg)');
            }
        });
        $('.checkCode').on('click', function () {
            arr = [];
            other = {};
            nowIndex = '';
            for (var i = 0; i < $('.allIndex .layui-form-checked').length; i++) {
                arr.push($('.allIndex .layui-form-checked').eq(i).parent('div').find('input').attr('name'));
                nowIndex += '<p class="fl">' + $('.allIndex .layui-form-checked').eq(i).parent('div').find('input').attr('name') + '</p>';
            }
            for (var i = 0; i < $('.singleIndex .layui-form-checkbox').length; i++) {
                if ($('.singleIndex .layui-form-checkbox').eq(i).parent('div').find('input').attr('name') != 'selectAll') {
                    if ($('.singleIndex .layui-form-checkbox').eq(i).hasClass('layui-form-checked')) {
                        other[$('.singleIndex .layui-form-checkbox').eq(i).parent('div').find('input').attr('name')] = 1
                    } else {
                        other[$('.singleIndex .layui-form-checkbox').eq(i).parent('div').find('input').attr('name')] = 0
                    }
                }
            }
            if ($('.layui-form-checkbox').length == $('.layui-form-checked').length) {
                signal = 1;
            } else {
                signal = 0;
            }
            arr.sort();
            console.log(arr);
            console.log(other);
            console.log(signal);
            if (arr.length > 0) {
                clearInterval(timer);
                $('form').hide();
                $('.cover').show();
                $('.nowIndex').html('<p class="fl">当前指标:</p>' + nowIndex);
                $('.countNum').html($('.nowIndex p').length - 1);
                $('.nowIndex p').eq(0).height($('.nowIndex').height());
                $('.current>.showIndex').removeClass('open');
                $('form').hide();
                $('.current>.showIndex').find('p').html('展开');
                $('.current>.showIndex').find('div').css('transform', 'rotate(0deg)');
                $('.buy').hide();
                $('.sell').hide();
                $('.waiting').show();
                $.ajax({
                    type: "POST",
                    url: '/strategy/index_filter_data_ajax/',
                    data: JSON.stringify({
                        "date": $('.current h3 span').html(),
                        "index": arr,
                        "other": other,
                        "signal": signal
                    }),
                    success: function (data) {
                        $('.buy').show();
                        $('.sell').show();
                        $('.waiting').hide();
                        console.log(data);
                        showTable(data);
                        $('.cover').hide();
                    }
                });
                timer = interval()
            } else {
                layer.open({
                    title: '警告'
                    ,
                    content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择指标</p>'
                    ,
                    btn: ''
                    ,
                    time: 1000
                    ,
                    closeBtn: 0
                    ,
                    anim: 5
                    , resize: false
                });
            }
        });
    });
});