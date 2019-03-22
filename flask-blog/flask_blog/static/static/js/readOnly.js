$(document).ready(function () {
    //layui组件
    layui.use(['form', 'element', 'table', 'layer', 'laydate'], function () {
        var element = layui.element;
        var form = layui.form;
        var table = layui.table;
        var laydate = layui.laydate;
        var url = 'current_ajax';
        var allResult = '';
        var mainW = $('body').width();
        if (mainW < 900) {
            $('#rate_return1, #rate_return2, #rate_return3, #rate_return4').width(mainW - 15).height(mainW * 0.5);
            $('#barchart1, #barchart2, #barchart3, #barchart4').width(mainW - 15).height(mainW * 0.5);
            $('#target_holding2, #sopt_day_holding2').width(mainW - 15).height(mainW + 250);
        }
        $('.tableBottom').css('marginTop', '30px');
        var footerH = $('.footer').height();
        $('.basecon').css('paddingBottom', footerH);

        //下拉框相关

        function indicate(obj, title, name) {
            var arr = [];
            var item = [];
            if (obj.length > 2) {
                $('.preformance_indicators').show();
                $.each(obj[0], function (x, y) {
                    if (x != '绩效指标' && x != title && x != '比较基准') {
                        item.push({field: x, title: x, align: 'center', unresize: true})
                    }
                });
                arr.push({field: '绩效指标', title: '绩效指标', align: 'center', unresize: true, width: 180});
                arr.push({field: title, title: name, align: 'center', unresize: true, width: 200});
                $.each(obj[0], function (x, y) {
                    if (x == '比较基准') {
                        arr.push({field: '比较基准', title: '比较基准', align: 'center', unresize: true});
                    }
                });
            } else {
                $('.preformance_indicators').hide();
            }
            return arr.concat(item);
        }

        $.ajax({
            type: "GET",
            url: '/strategy/get_oa_stra',
            data: {},//数据，这里使用的是Json格式进行传输
            success: function (data) {//返回数据根据结果进行相应的处理
                console.log(data);
                var db = data;
                var option = '';
                $.each(db, function (key) {
                    option += '<li class="dropdown sendAjax"><a data-toggle="dropdown" data-stoppropagation="true" style="">' + key + '</a><ul class="dropdown-menu R_aside" role="menu" aria-labelledby="dLabel">';
                    $.each(db[key], function (i) {
                        option += '<li class="dropdown sendAjax"><a data-toggle="dropdown" data-stoppropagation="true" style="">' + i.replace('ai', '').replace('db', '') + '</a><ul class="dropdown-menu R_aside last" role="menu" aria-labelledby="dLabel">';
                        for (var k = 0; k < db[key][i].length; k++) {
                            var dbName = db[key][i][k].strategy_name;
                            if (db[key][i][k].strategy_name == null || db[key][i][k].strategy_name == '' || db[key][i][k].strategy_name == undefined) {
                                dbName = db[key][i][k].strategy_id
                            }
                            option += '<li class="changeStrategy"data-user="' + key + '" data-value="' + i + '/' + db[key][i][k].strategy_id + '" data-auth="' + db[key][i][k].authority + '">' + dbName + '</li>'
                        }
                        option += '</ul></li>'
                    });
                    option += '</ul></li>'
                });
                $('.current .dropdown-menu').html(option);
                form.render();
                $(".current .dropdown").click(function () {
                    $(this).siblings().children('.dropdown-menu').css('display', "none");
                    $(this).children().css('display', "block");
                });
                $('body').on('click', function (e) {
                    if (e.target.className != 'loadName' && e.target.nodeName != 'A') {
                        $(".current .dropdown").removeClass("open");
                        $(".current .dropdown").children().css('display', "hidden");
                    }
                });
                $(".current .sendAjax>a").click(function () {
                    setTimeout('$(this).parent().addClass("open");', 1);
                });
                $('.current .changeStrategy').on('click', function () {
                    var user = $(this).attr('data-user');
                    var auth = $(this).attr('data-auth');
                    var value = $(this).attr('data-value');
                    var strname = $(this).html();
                    var index = value.indexOf('/');
                    var sec = value.substring(index + 1);
                    var fir = value.substring(0, index);
                    $('.layui-tab').hide();
                    $('.current').hide();
                    $('.layui-icon-loading').show();
                    $('.preformance_indicators .start').html('');
                    $('.preformance_indicators .end').html('');
                    toAjax(fir, sec, url, auth, strname);
                    $('.nowStrategy .userID').html(user);
                    if (fir == 'aimockdb') {
                        $('.nowStrategy .server').html('模拟');
                    } else if (fir == 'aidevdb') {
                        $('.nowStrategy .server').html('测试');
                    } else {
                        $('.nowStrategy .server').html('生产');
                    }
                    $('.nowStrategy .server').attr('data-server', fir);
                    $('.nowStrategy .strName').attr('data-strname', sec);
                    $('.nowStrategy .strName').html(strname);
                    $('.least .start').html('');
                    $('.least .end').html('');
                    form.render();
                });
                if ($('.changeStrategy').length != 0) {
                    var user = $('.changeStrategy').eq(0).attr('data-user');
                    var auth = $('.changeStrategy').eq(0).attr('data-auth');
                    var value = $('.changeStrategy').eq(0).attr('data-value');
                    var strname = $('.changeStrategy').eq(0).html();
                    var index = value.indexOf('/');
                    var sec = value.substring(index + 1);
                    var fir = value.substring(0, index);
                    toAjax(fir, sec, url, auth, strname);
                    $('.nowStrategy .userID').html(user);
                    if (fir == 'aimockdb') {
                        $('.nowStrategy .server').html('模拟');
                    } else if (fir == 'aidevdb') {
                        $('.nowStrategy .server').html('测试');
                    } else {
                        $('.nowStrategy .server').html('生产');
                    }
                    $('.nowStrategy .server').attr('data-server', fir);
                    $('.nowStrategy .strName').attr('data-strname', sec);
                    $('.nowStrategy .strName').html(strname);
                    $('.least .start').html('');
                    $('.least .end').html('');
                    form.render();
                }
            }
        });

        //下单
        $('.order').on('click', function () {
            var a = $('#nav-name').html();
            var b = a.indexOf('，');
            var oaNo = a.substring(0, b);
            var env = $('.server').attr('data-server');
            var email = $('.userID').html();
            var oldList = [];
            layer.open({
                title: '下单'
                ,
                area: '730px'
                ,
                btn: ['开始', '结束']
                ,
                content: '<form class="form layui-form orderForm" lay-filter="order"><div style="height: 30px"><input lay-skin="primary" class="layui-input" type="checkbox" name="selectAll" title="全选" value="" lay-filter="selectAll"></div><div class="formDiv1"></div><div class="formDiv2"></div><a style="display: none" href="javascript:;" class="orderSubmit1" lay-submit lay-filter="orderSubmit">开始</a><a style="display: none" href="javascript:;" class="orderSubmit2" lay-submit lay-filter="orderSubmit">结束</a></form>',
                success: function (index) {
                    $.ajax({
                        type: "GET",
                        url: '/strategy/order_stra/' + oaNo + '/' + env,
                        data: {},
                        success: function (data) {
                            console.log(data);
                            if (data.result == 'ok') {
                                var db = data.order_strategy;
                                console.log(db);
                                oldList = db;
                                var isAll = true;
                                var option = '';
                                var done = '';
                                for (var j = 0; j < db.length; j++) {
                                    $.each(db[j], function (key, value) {
                                        option += '<p style="text-align: left; font-size: 20px; color: #444; line-height: 24px; margin-bottom: 10px; width: 100%;">' + key + '</p><div class="clearfix">';
                                        done += '<p style="text-align: left; font-size: 20px; color: #444; line-height: 24px; margin-bottom: 10px; width: 100%;">' + key + '</p><div class="clearfix">';
                                        for (var i in value) {
                                            if (value[i] == 1) {
                                                done += '<div class="fl" style="width: 50%;"><input lay-skin="primary" class="layui-input" type="checkbox" name="' + i + '" title="' + i + '" value="1" lay-filter="takeOrder">'
                                                done += '<a href="javascript:;" class="openDetail fl" data-name="' + i + '" style="display: block; line-height: 18px; font-size: 16px; margin-right: 10px; color: #6995ee;">查看</a></div>'
                                            } else {
                                                isAll = false;
                                                option += '<div class="fl" style="width: 50%;"><input lay-skin="primary" class="layui-input" type="checkbox" name="' + i + '" title="' + i + '" value="0" lay-filter="takeOrder"></div>'
                                            }
                                        }
                                        option += '</div>'
                                        done += '</div>'
                                    });

                                }
                                $('.formDiv2').html(option);
                                $('.formDiv1').html(done);
                                if (isAll == true) {
                                    $('input[name=selectAll]').prop('checked', true);
                                } else {
                                    $('input[name=selectAll]').prop('checked', false);
                                }
                                form.render();
                                $('.openDetail').on('click', function () {
                                    var strategy = $(this).attr('data-name');
                                    window.open('/strategy/order?' + strategy)
                                });
                            }
                        }
                    });
                    form.on('checkbox(takeOrder)', function (data) {
                        if (data.elem.checked == true) {
                            data.elem.value = 1;
                            $(data.elem).prop('checked', true);
                        } else {
                            data.elem.value = 0;
                            $(data.elem).prop('checked', false);
                        }
                        if ($('.formDiv input[value=1]').length == $('.formDiv input[type=checkbox]').length) {
                            $('input[name=selectAll]').prop('checked', true);
                        } else {
                            $('input[name=selectAll]').prop('checked', false);
                        }
                        form.render();
                    });
                    form.on('checkbox(selectAll)', function (data) {
                        if (data.elem.checked == true) {
                            $('.formDiv input[type=checkbox]').val(1);
                            $('.formDiv input[type=checkbox]').prop('checked', true);
                        } else {
                            $('.formDiv input[type=checkbox]').val(0);
                            $('.formDiv input[type=checkbox]').prop('checked', false);
                        }
                        form.render();
                    });
                    $('.orderSubmit1').on('click', function () {
                        $('.formDiv input[type=checkbox]').prop('checked', true);
                        form.on('submit(orderSubmit)', function (data) {
                            var orderList = data.field;
                            for (var i in orderList) {
                                if (i == 'selectAll') {
                                    delete orderList[i]
                                }
                                for (var j in oldList) {
                                    if (i == j && orderList[i] == oldList[j]) {
                                        delete orderList[i]
                                    }
                                }
                            }
                            var allData = {
                                "email": email,
                                "oa": oaNo,
                                "list": orderList
                            };
                            console.log(allData);
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                data: JSON.stringify(allData),
                                // url: '/strategy/playOrder/',
                                url: '/strategy/playOrder_new/',
                                success: function (data) {
                                    console.log(data);
                                    if (data.result == "ok") {
                                        layer.open({
                                            title: '通知'
                                            ,
                                            content: '<i class="fl layui-icon layui-icon-ok-circle" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">下单成功</p>'
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
                                    } else {
                                        layer.open({
                                            title: '警告'
                                            ,
                                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">下单失败</p>'
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
                                }
                            })
                        })
                    });
                },
                yes: function (index) {
                    $('.orderSubmit1').click();
                    layer.close(index);
                    return false;
                },
                btn2: function (index) {
                    $('.orderSubmit').click('2');
                    layer.close(index);
                    return false;
                },
                cancel: function (index) {
                    layer.close(index);
                    return false;
                }
            });
        });

        //ajax方法
        function toAjax(fir, sec, url, auth, strname) {
            $.ajax({
                type: "GET",
                url: '/strategy/' + url + '/' + fir + '/' + sec,
                data: {},
                success: function (data) {
                    console.log(data);
                    allResult = data;
                    chartAjax(allResult, fir, sec, url, auth, strname);
                    var part3 = data.performance;
                    var part1 = data.strategy_info;
                    var part2 = data.command;
                    var strategy_overall = part3.strategy_overview;
                    var today_trading = part3.today_trading;
                    var asset_overcview = part3.asset_overcview;
                    var sopt_day_holding = part3.sopt_day_holding;
                    var rate_return = part3.rate_return;
                    var preformance_indicators = part3.preformance_indicators;
                    var cumulative_trade = part3.cumulative_trade;
                    var future_day_holding = part3.future_day_holding;
                    var strategy_info = part1.strategy_info;
                    var command_date = part2.command_date;
                    //表格创建
                    table.render({
                        elem: '#strategy_overall'
                        , width: 770
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: strategy_overall
                        , limit: strategy_overall.length
                        , cols: [[
                            {field: 'pctchange', title: '账户盈亏(%)', align: 'center', unresize: true}
                            , {field: 'account_earn', title: '账户盈亏', align: 'center', unresize: true}
                            , {
                                field: 'today_pctchange',
                                title: '今日盈亏(%)',
                                align: 'center',
                                unresize: true
                            }
                            , {
                                field: 'today_earn',
                                title: '今日盈亏',
                                align: 'center',
                                unresize: true
                            }
                        ]]
                    });
                    table.render({
                        elem: '#asset_overcview'
                        , width: 1140
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: asset_overcview
                        , limit: asset_overcview.length
                        , cols: [[
                            {field: 'trading_sys', title: '交易系统', align: 'center', unresize: true},
                            {field: 'pctchange', title: '系统盈亏(%)', align: 'center', unresize: true}
                            , {field: 'account_earn', title: '系统盈亏', align: 'center', unresize: true}
                            , {field: 'total_asset', title: '总资产(万)', align: 'center', edit: 'text', unresize: true}
                            , {field: 'position_asset', title: '持仓市值(万)', align: 'center', edit: 'text', unresize: true}
                            , {field: 'cash', title: '现金', align: 'center', edit: 'text', unresize: true}
                            , {field: 'security_type', title: '标的类型', align: 'center', unresize: true}
                        ]]
                    });

                    var nowCols = indicate(preformance_indicators, sec, strname);
                    table.render({
                        elem: '#preformance_indicators'
                        , width: 1140
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: preformance_indicators
                        , limit: preformance_indicators.length - 2
                        , cols: [nowCols]
                    });
                    if (auth != 0) {
                        $('.today_trading').show();
                        $('.sopt_day_holding1').show();
                        $('.sopt_day_holding2').show();
                        $('.future_day_holding').show();
                        $('.cumulative_trade').show();
                        table.render({
                            elem: '#today_trading1'
                            , width: 1140
                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: today_trading
                            , limit: today_trading.length
                            , cols: [[{field: 'code', title: '标的代码', align: 'center', unresize: true, width: 120}
                                , {field: 'code_name', title: '标的名称', align: 'center', unresize: true}
                                , {
                                    field: 'pctchange',
                                    title: '涨跌幅(%)',
                                    align: 'center',
                                    unresize: true
                                }
                                , {field: 'trade_volume', title: '交易数量', align: 'center', unresize: true}
                                , {field: 'trade_type', title: '交易类型', align: 'center', unresize: true}
                                , {
                                    field: 'trade_amount',
                                    title: '交易金额',
                                    align: 'center',
                                    unresize: true
                                }, {
                                    field: 'mkt_volume',
                                    title: '市场成交数量',
                                    align: 'center',
                                    unresize: true
                                }
                                , {
                                    field: 'currency',//字段
                                    title: '汇率涨跌幅',
                                    align: 'center',
                                    unresize: true,
                                    templet: function (d) {
                                        if (d['code_name'] != '现金') {
                                            var name = d['currency'].currency_name;//名字
                                            var direc = d['currency'].currency_direc;//方向
                                            return '<div title="' + direc + '">' + name + '%</div>'
                                        } else {
                                            return '<div></div>'
                                        }
                                    }
                                }
                            ]]
                        });
                        table.render({
                            elem: '#today_trading2'
                            , width: 1140
                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: today_trading
                            , limit: today_trading.length
                            , cols: [[{field: 'code', title: '标的代码', align: 'center', unresize: true, width: 120}
                                , {field: 'code_name', title: '标的名称', align: 'center', unresize: true}
                                , {
                                    field: 'mkt_vwap',
                                    title: '市场成交均价',
                                    align: 'center',
                                    unresize: true
                                }
                                , {
                                    field: 'mkt_amount',
                                    title: '市场成交金额',
                                    align: 'center',
                                    unresize: true
                                }
                                , {field: 'mkt_close', title: '收盘价', align: 'center', unresize: true}
                                , {
                                    field: 'slippage',
                                    title: '滑点(%%)',
                                    align: 'center',
                                    edit: 'text',
                                    unresize: true
                                }
                                , {
                                    field: 'trade_mkt_share',
                                    title: '成交占比(%)',
                                    align: 'center',
                                    unresize: true
                                },
                                {
                                    field: 'exe_ratio',
                                    title: '交易完成度(%)',
                                    align: 'center',
                                    edit: 'text',
                                    unresize: true
                                }
                            ]]
                        });
                        var totalCount1 = '';
                        var newSopt = sopt_day_holding;
                        for (var i = 0; i < newSopt.length; i++) {
                            if (newSopt[i]['code_name'] == '现金') {
                                totalCount1 = newSopt[i];
                                newSopt.splice(i, 1);
                                newSopt.push(totalCount1);
                            }
                        }
                        table.render({
                            elem: '#sopt_day_holding1'
                            , width: 640
                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: newSopt
                            , limit: newSopt.length
                            , cols: [[
                                {field: 'code', title: '标的代码', align: 'center', unresize: true}
                                , {field: 'code_name', title: '标的名称', align: 'center', width: 120, unresize: true}
                                , {
                                    field: 'position_asset',
                                    title: '持仓市值',
                                    align: 'center',
                                    edit: 'text',
                                    width: 100,
                                    unresize: true
                                }
                                , {field: 'position_nums', title: '持仓数量', align: 'center', edit: 'text', unresize: true}
                                , {field: 'position_ratio', title: '市值占比(%)', align: 'center', unresize: true}
                                , {
                                    field: 'currency',//字段
                                    title: '汇率涨跌幅',
                                    align: 'center',
                                    unresize: true,
                                    templet: function (d) {
                                        if (d['code_name'] != '现金') {
                                            var name = d['currency'].currency_name;//名字
                                            var direc = d['currency'].currency_direc;//方向
                                            return '<div title="' + direc + '">' + name + '%</div>'
                                        } else {
                                            return '<div></div>'
                                        }
                                    }
                                }
                            ]]
                        });
                        if (strategy_info[0].stra_type == "AI_LONG") {
                            $('#cumulative_trade_total').show();
                            $('.future_config').hide();
                            $('.sopt_day_holding1').show();
                            if (sopt_day_holding.length == 0) {
                                $('.sopt_day_holding2').hide();
                            } else {
                                $('.sopt_day_holding2').show();
                            }
                            $('.future_day_holding').hide();
                            $('.layui-tab-title li').eq(0).html('日初调仓报告');
                        } else {
                            $('#cumulative_trade_total').show();
                            var totalCount2 = '';
                            var futherH = future_day_holding;
                            for (var i = 0; i < futherH.length; i++) {
                                if (futherH[i]['code_name'] == '现金') {
                                    totalCount2 = futherH[i];
                                    futherH.splice(i, 1);
                                    futherH.push(totalCount2);
                                }
                            }
                            $('.layui-tab-title li').eq(0).html('日初调仓报告');
                            if (strategy_info[0].stra_type == "AI_PAIRS") {
                                $('#cumulative_trade_total').hide();
                                $('.sopt_day_holding1').hide();
                                $('.sopt_day_holding2').hide();
                                $('.future_day_holding').show();
                                $('.layui-tab-title li').eq(0).html('实时交易');
                                table.render({
                                    elem: '#future_day_holding'
                                    , width: 1140
                                    , skin: 'nob'
                                    , even: true
                                    , size: 'lg'
                                    , data: futherH
                                    , limit: futherH.length
                                    , cols: [[
                                        {field: 'code', title: '标的代码', align: 'center', unresize: true}
                                        , {field: 'code_name', title: '标的名称', align: 'center', unresize: true}
                                        , {field: 'positiont_type', title: '持仓类型', align: 'center', unresize: true}
                                        , {
                                            field: 'position_asset',
                                            title: '持仓市值',
                                            align: 'center',
                                            edit: 'text',
                                            unresize: true
                                        }
                                        , {
                                            field: 'position_nums',
                                            title: '持仓数量',
                                            align: 'center',
                                            edit: 'text',
                                            unresize: true
                                        }
                                        , {field: 'future_ratio', title: '保证金占比(%)', align: 'center', unresize: true}
                                    ]]
                                });
                            } else {
                                $('.sopt_day_holding1').show();
                                if (sopt_day_holding.length == 0) {
                                    $('.sopt_day_holding2').hide();
                                } else {
                                    $('.sopt_day_holding2').show();
                                }
                                $('.future_day_holding').show();
                                table.render({
                                    elem: '#future_day_holding'
                                    , width: 1140
                                    , skin: 'nob'
                                    , even: true
                                    , size: 'lg'
                                    , data: futherH
                                    , limit: futherH.length
                                    , cols: [[
                                        {field: 'code', title: '标的代码', align: 'center', unresize: true}
                                        , {field: 'code_name', title: '标的名称', align: 'center', unresize: true}
                                        , {
                                            field: 'position_asset',
                                            title: '持仓市值',
                                            align: 'center',
                                            edit: 'text',
                                            unresize: true
                                        }
                                        , {
                                            field: 'position_nums',
                                            title: '持仓数量',
                                            align: 'center',
                                            edit: 'text',
                                            unresize: true
                                        }
                                        , {field: 'future_ratio', title: '保证金占比(%)', align: 'center', unresize: true}
                                        , {
                                            field: 'currency',//字段
                                            title: '汇率涨跌幅',
                                            align: 'center',
                                            unresize: true,
                                            templet: function (d) {
                                                if (d['code_name'] != '现金') {
                                                    var name = d['currency'].currency_name;//名字
                                                    var direc = d['currency'].currency_direc;//方向
                                                    return '<div title="' + direc + '">' + name + '%</div>'
                                                } else {
                                                    return '<div></div>'
                                                }
                                            }
                                        }
                                    ]]
                                });
                                var trade_content = [];
                                for (var i = 0; i < cumulative_trade.length; i++) {
                                    trade_content.push(cumulative_trade[i]);
                                }
                                table.render({
                                    elem: '#cumulative_trade'
                                    , width: 1140
                                    , skin: 'nob'
                                    , even: true
                                    , size: 'lg'
                                    , data: trade_content
                                    , limit: trade_content.length
                                    , cols: [[
                                        {field: 'windcode', title: '标的代码', align: 'center', unresize: true}
                                        , {field: 'windname', title: '标的名称', align: 'center', unresize: true}
                                        , {field: 'trade_type', title: '交易类型', align: 'center', unresize: true}
                                        , {field: 'trade_amount', title: '交易金额', align: 'center', unresize: true}
                                    ]]
                                });
                            }
                        }
                        var totalLine = [];
                        var trade_content = [];
                        if (cumulative_trade.length > 0) {
                            for (var i = 0; i < cumulative_trade.length; i++) {
                                if (cumulative_trade[i].windname == '总计') {
                                    cumulative_trade.splice(cumulative_trade.length, 0, cumulative_trade[i]);
                                    cumulative_trade.splice(i, 1);
                                }
                            }
                            totalLine = cumulative_trade[cumulative_trade.length - 1];
                            $('#cumulative_trade_total').html('<tr><td></td><td>' + totalLine.windname + '</td><td></td><td>' + totalLine.trade_amount + '</td><td>' + totalLine.mkt_amount + '</td><td>' + totalLine.slippage + '</td><td>' + totalLine.exe_ratio + '</td></tr>')
                        } else {
                            $('#cumulative_trade_total').html('');
                        }
                        for (var i = 0; i < cumulative_trade.length - 1; i++) {
                            trade_content.push(cumulative_trade[i]);
                        }
                        table.render({
                            elem: '#cumulative_trade'
                            , width: 1140
                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: trade_content
                            , limit: trade_content.length
                            , cols: [[
                                {field: 'windcode', title: '标的代码', align: 'center', unresize: true}
                                , {field: 'windname', title: '标的名称', align: 'center', unresize: true}
                                , {field: 'trade_type', title: '交易类型', align: 'center', unresize: true}
                                , {field: 'trade_amount', title: '交易金额', align: 'center', unresize: true}
                                , {field: 'mkt_amount', title: '累计委托金额', align: 'center', unresize: true}
                                , {field: 'slippage', title: '滑点(%%)', align: 'center', unresize: true}
                                , {field: 'exe_ratio', title: '交易完成度(%)', align: 'center', unresize: true}
                            ]]
                        });
                        $('#cumulative_trade_total td').width(162);
                        $('.preformance_indicators').css('marginTop', '20px');
                    } else {
                        $('.today_trading').hide();
                        $('.sopt_day_holding1').hide();
                        $('.sopt_day_holding2').hide();
                        $('.future_day_holding').hide();
                        $('.cumulative_trade').hide();
                    }
                    if (preformance_indicators.length > 0) {
                        for (var i in preformance_indicators) {
                            $('.least').show();
                            $('.least .start').html(preformance_indicators[i].start_day);
                            $('.least .end').html(preformance_indicators[i].end_day);
                        }
                    } else {
                        $('.least').hide();
                    }
                }
            });
        }
    });
});