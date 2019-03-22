$(document).ready(function () {
    //layui组件
    layui.use(['element', 'table', 'layer', 'form'], function () {
        var element = layui.element;
        var table = layui.table;
        var form = layui.form;
        var url = 'combo_ajax';
        var auth = 1;
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
        $.ajax({
            type: "POST",
            url: '/strategy/combo_strategy/',
            data: {},//数据，这里使用的是Json格式进行传输
            success: function (data) {//返回数据根据结果进行相应的处理
                console.log(data);
                var db = data;
                var option = '';
                if (db.length != 0 && db != null && db != undefined) {
                    $.each(db, function (i) {
                        option += '<li class="dropdown sendAjax"><a data-toggle="dropdown" data-stoppropagation="true" style="">' + i.replace('ai', '').replace('db', '') + '</a><ul class="dropdown-menu R_aside last" role="menu" aria-labelledby="dLabel" style="">';
                        for (var k = 0; k < db[i].length; k++) {
                            var dbName = db[i][k].zh_name;
                            if (db[i][k].zh_name == null || db[i][k].zh_name == '' || db[i][k].zh_name == undefined) {
                                dbName = db[i][k].en_name
                            }
                            option += '<li class="changeStrategy" data-value="' + i + '/' + db[i][k].en_name + '">' + dbName + '</li>'
                        }
                        option += '</ul></li>'
                    });
                } else {
                    option = '<li>空</li>'
                }
                $('.current .dropdown-menu').html(option);
                form.render();
                $('.current .changeStrategy').on('click', function () {
                    var value = $(this).attr('data-value');
                    var strname = $(this).html();
                    var index = value.indexOf('/');
                    var sec = value.substring(index + 1);
                    var fir = value.substring(0, index);
                    $('.layui-tab').hide();
                    $('.layui-tab-title li').eq(0).click();
                    $('.current').hide();
                    $('.layui-icon-loading').show();
                    $('.preformance_indicators .start').html('');
                    $('.preformance_indicators .end').html('');
                    black(fir, sec);
                    toAjax(fir, sec, url, auth, strname);
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
                    var value = $('.changeStrategy').eq(0).attr('data-value');
                    var strname = $('.changeStrategy').eq(0).html();
                    var index = value.indexOf('/');
                    var sec = value.substring(index + 1);
                    var fir = value.substring(0, index);
                    black(fir, sec);
                    toAjax(fir, sec, url, auth, strname);
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

        function compare(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }

        function CompareDate(t1, t2, t3) {
            var date = new Date();
            var a = t1.split(":");
            var b = t2.split(":");
            var c = t3.split(":");
            if (date.setHours(a[0], a[1]) < date.setHours(b[0], b[1]) && date.setHours(b[0], b[1]) < date.setHours(c[0], c[1])) {
                return 'ok';
            }

        }

        function compareCode(property) {
            function del(num) {
                var index = num.lastIndexOf('.');
                return num.substring(0, index)
            }

            return function (a, b) {
                var value1 = del(a[property]);
                var value2 = del(b[property]);
                return value1 - value2;
            }
        }

        function stockColor(num) {
            if (parseFloat(num) > 0) {
                return '<span style="color: #c00; display: inline-block; width: 100px;">' + parseFloat(num).toFixed(2) + '%</span>'
            } else if (parseFloat(num) < 0) {
                return '<span style="color: #3DA642; display: inline-block; width: 100px;">' + parseFloat(num).toFixed(2) + '%</span>'
            } else {
                return '<span style="color: #333; display: inline-block; width: 100px;">0%</span>'
            }
        }

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

        //黑名单

        function black(fir, sec) {
            $.ajax({
                type: "GET",
                url: '/strategy/black_list_strategy_data' + '/' + fir + '/' + sec,
                data: {},
                success: function (data) {
                    console.log(data);
                    if (data.result == 'ok') {
                        var public = data.data;
                        $('.public').show();
                        var option = '';
                        public.sort(compareCode('windcode'));
                        for (var i = 0; i < public.length; i++) {
                            public[i].stock_drop = parseFloat(public[i].stock_drop);
                            option += '<li class="clearfix">\n' +
                                '<div class="expand expand1"></div>\n' +
                                '<div class="clearfix eventTitle">\n' +
                                '    <p class="fl"><span>' + public[i].windcode + '</span></p>\n' +
                                '    <p class="fl"><span>' + public[i].security_name + '</span></p>\n' +
                                '    <p class="fl">跌幅: ' + stockColor(public[i].stock_drop) + '</p>\n' +
                                '    <p class="fl">事件个数: <span>' + public[i].event.length + '</span></p>\n' +
                                '</div>\n' +
                                '<table id="black' + i + '" lay-filter="black">\n' +
                                '    <tbody>';
                            for (var j = 0; j < public[i].event.length; j++) {
                                option += '<tr>\n' +
                                    '        <td>' + public[i].event[j].datetime + '</td>\n' +
                                    '        <td style="text-align: left"><span class="negative">负</span><span>' + public[i].event[j].event_type + '</span></td>\n' +
                                    '        <td><div title="' + public[i].event[j].info_origin + '" class="ellipsis1">' + public[i].event[j].info_origin + '</div></td>\n' +
                                    '    </tr>';
                            }
                            option += '</tbody></table></li>';
                        }
                        $('.tableList').html(option);
                    } else {
                        $('.public').hide();
                    }
                }
            });
        }

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
                    var part1 = data.strategy_info;
                    var part3 = data.performance;
                    var part2 = data.command;
                    var part4 = data.portfolio_data;
                    var strategy_info = part1.strategy_info;
                    var trading_configs = part1.trading_configs;
                    var security_pool = part1.security_pool;
                    var order_router = part1.order_router;
                    var training_index = part1.trading_index;
                    var training_common_index = part1.trading_common_index;
                    var account = part1.account;
                    var rootNet = part1.rootNet;
                    var A6 = part1.A6;
                    var HS = part1.HS;
                    var CATS = part1.CATS;
                    var algo_conf = part1.algo_conf;
                    var default_replacement = part1.default_replacement;
                    var performance_index = part1.performance_index;
                    var security_pool_index = part1.security_pool_index;
                    var benchmark = part1.bench_mark;
                    var mail_receivers = part1.mail_receivers;
                    var strategy_overall = part3.strategy_overview;
                    var today_trading = part3.today_trading;
                    var asset_overcview = part3.asset_overcview;
                    var sopt_day_holding = part3.sopt_day_holding;
                    var rate_return = part3.rate_return;
                    var preformance_indicators = part3.preformance_indicators;
                    var cumulative_trade = part3.cumulative_trade;
                    var command_buy = part2.command_buy;
                    var command_sell = part2.command_sell;
                    var target_holding = part2.target_holding;
                    var command_date = part2.command_date;
                    var future_day_holding = part3.future_day_holding;
                    if (!part4) {
                        var rate_return_new = [];
                        var per_ind = [];
                        $('.rate_return_new').hide();
                        $('.per_ind').hide();
                    } else {
                        var rate_return_new = part4.rate_return;
                        var per_ind = part4.per_ind;
                        $('.rate_return_new').show();
                        $('.per_ind').show();
                    }
                    if (default_replacement.length > 0) {
                        strategy_info[0]['default_replacement'] = default_replacement[0].windcode;
                    } else {
                        strategy_info[0]['default_replacement'] = '';
                    }
                    //表格创建
                    table.render({
                        elem: '#strategy_info'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: strategy_info
                        , limit: strategy_info.length
                        , cols: [[
                            {field: 'stra_code', title: '策略代码', align: 'center', width: 200, unresize: true}
                            , {field: 'stra_type', title: '策略类型', align: 'center', unresize: true}
                            , {field: 'business', title: '业务类型', align: 'center', unresize: true}
                            , {field: 'rrr', title: '最低日回报率', align: 'center', unresize: true}
                            , {field: 'rfr', title: '无风险利率', align: 'center', unresize: true}
                            , {field: 'mmf', title: '货币基金', align: 'center', unresize: true}
                            , {field: 'disable', title: '禁用标识', align: 'center', unresize: true}
                            , {
                                field: 'default_replacement',
                                title: '默认替换标的',
                                align: 'center',
                                unresize: true
                            }
                            , {field: 'report_env', title: '发布环境', align: 'center', unresize: true}
                            , {
                                field: 'start_report_time',
                                title: '策略发布日',
                                align: 'center',
                                unresize: true
                            }
                        ]]
                    });
                    table.render({
                        elem: '#security_pool'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: security_pool
                        , limit: security_pool.length
                        , cols: [[
                            {field: 'parent', title: '父节点', align: 'center', unresize: true}
                            , {field: 'windcode', title: '万得代码', align: 'center', unresize: true}
                            , {field: 'security_type', title: '证券类型', align: 'center', unresize: true}
                            , {field: 'priority', title: '顺序', align: 'center', unresize: true}
                            , {field: 'level', title: '层级', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#training_configs1'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: trading_configs
                        , limit: trading_configs.length
                        , cols: [[
                            {field: '父节点', title: '父节点', align: 'center', unresize: true}
                            , {field: '目标函数', title: '目标函数', align: 'center', width: 180, unresize: true}
                            , {field: '训练开始日期', title: '训练开始日期', align: 'center', unresize: true}
                            , {field: '训练结束日期', title: '训练结束日期', align: 'center', unresize: true}
                            , {field: '学习率', title: '学习率', align: 'center', unresize: true}
                            , {field: '神经层数', title: '神经层数', align: 'center', unresize: true}
                            , {field: '步数', title: '步数', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#training_configs2'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: trading_configs
                        , limit: trading_configs.length
                        , cols: [[{field: '神经元数', title: '神经元数', align: 'center', unresize: true}
                            , {field: '训练次数', title: '训练次数', align: 'center', unresize: true}
                            , {field: 'batch_size', title: 'batch_size', align: 'center', unresize: true}
                            , {field: '样本数量', title: '样本数量', align: 'center', unresize: true}
                            , {
                                field: 'input_keep_prob',
                                title: 'input_keep_prob',
                                align: 'center',
                                width: 180,

                                unresize: true
                            }
                            , {
                                field: 'output_keep_prob',
                                title: 'output_keep_prob',
                                align: 'center',
                                width: 180,

                                unresize: true
                            }
                            , {field: '交易参与率', title: '交易参与率', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#training_configs3'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: trading_configs
                        , limit: trading_configs.length
                        , cols: [[{
                            field: 'marked_max_participation_ratio',
                            title: '市场最大参与率',
                            align: 'center',

                            unresize: true
                        }
                            , {field: '加载模型', title: '是否加载模型', align: 'center', unresize: true}
                            , {field: '保存模型', title: '保存模型', align: 'center', unresize: true}
                            , {
                                field: 'target_position_avg_count',
                                title: 'target_position_avg_count',
                                align: 'center',
                                width: 200,

                                unresize: true
                            }
                            , {field: '正在训练中', title: '是否训练', align: 'center', unresize: true}
                            , {field: '收益风险平衡因子', title: '风险平衡因子', align: 'center', unresize: true}
                            , {field: '禁用标识', title: '是否禁用', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#order_router'
                        , width: 340

                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: order_router
                        , limit: order_router.length
                        , cols: [[
                            {field: 'exchange_id', title: '交易所代码 ', align: 'center', unresize: true}
                            , {field: 'sys_id', title: '系统代码', align: 'center', unresize: true}
                            , {field: 'security_type', title: '证券类型', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#training_index'
                        , width: 340
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: training_index
                        , limit: training_index.length
                        , cols: [[
                            {field: 'parent', title: '父节点', align: 'center', unresize: true}
                            , {field: 'training_index', title: '训练因子', align: 'center', unresize: true}
                            , {field: 'priority', title: '顺序', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#training_common_index'
                        , width: 340
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: training_common_index
                        , limit: training_common_index.length
                        , cols: [[
                            {field: 'parent', title: '父节点', align: 'center', unresize: true}
                            , {field: 'windcode', title: '万得代码', align: 'center', unresize: true}
                            , {field: 'training_index', title: '训练因子', align: 'center', unresize: true}
                            , {field: 'priority', title: '顺序', align: 'center', unresize: true}
                        ]]
                    });
                    if (fir == 'aimockdb') {
                        $('.account').show();
                        $('.A6').hide();
                        $('.HS').hide();
                        $('.rootNet').hide();
                        $('.CATS').hide();
                        table.render({
                            elem: '#account'
                            , width: 1040

                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: account
                            , limit: account.length
                            , cols: [[
                                {field: 'sys_id', title: '系统代码', align: 'center', unresize: true}
                                , {field: 'security_type', title: '证券类型', align: 'center', unresize: true}
                                , {field: 'quota', title: '额度', align: 'center', unresize: true}
                                , {field: 'ccy', title: '币种', align: 'center', unresize: true}
                                , {field: 'cost_type', title: '成本计算方法', align: 'center', unresize: true}
                            ]]
                        });
                    } else {
                        $('.account').hide();
                        table.render({
                            elem: '#rootNet'
                            , width: 1040

                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: rootNet
                            , limit: rootNet.length
                            , cols: [[
                                {
                                    field: 'acct_id',
                                    title: '账户ID',
                                    align: 'center',

                                    unresize: true
                                }
                                , {
                                    field: 'password',
                                    title: '密码',
                                    align: 'center',

                                    width: 200,
                                    unresize: true
                                }
                                , {
                                    field: 'security_type',
                                    title: '证券类型',
                                    align: 'center',

                                    unresize: true
                                }
                                , {field: 'trade_id', title: '柜员号', align: 'center', unresize: true}
                                , {field: 'quota', title: '额度', align: 'center', unresize: true}
                                , {field: 'ccy', title: '币种', align: 'center', unresize: true}
                                , {
                                    field: 'cost_type',
                                    title: '成本计算方法',
                                    align: 'center',

                                    unresize: true
                                }
                            ]]
                        });
                        table.render({
                            elem: '#A6'
                            , width: 1040

                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: A6
                            , limit: A6.length
                            , cols: [[
                                {field: 'acct_id', title: '账户ID', align: 'center', unresize: true}
                                , {
                                    field: 'password',
                                    title: '密码',
                                    align: 'center',

                                    width: 200,
                                    unresize: true
                                }
                                , {
                                    field: 'security_type',
                                    title: '证券类型',
                                    align: 'center',

                                    unresize: true
                                }
                                , {
                                    field: 'trade_id',
                                    title: '柜员号',
                                    align: 'center',

                                    unresize: true
                                }
                                , {field: 'quota', title: '额度', align: 'center', unresize: true}
                                , {field: 'ccy', title: '币种', align: 'center', unresize: true}
                                , {
                                    field: 'cost_type',
                                    title: '成本计算方法',
                                    align: 'center',

                                    unresize: true
                                }, {
                                    field: 'fundid',
                                    title: '资产单元',
                                    align: 'center',

                                    unresize: true
                                }, {
                                    field: 'projectid',
                                    title: '产品编号',
                                    align: 'center',

                                    unresize: true
                                }
                            ]]
                        });
                        table.render({
                            elem: '#HS'
                            , width: 1040

                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: HS
                            , limit: HS.length
                            , cols: [[
                                {field: 'acct_id', title: '账户ID', align: 'center', unresize: true}
                                , {
                                    field: 'password',
                                    title: '密码',
                                    align: 'center',

                                    width: 200,
                                    unresize: true
                                }
                                , {
                                    field: 'security_type',
                                    title: '证券类型',
                                    align: 'center',

                                    unresize: true
                                }
                                , {
                                    field: 'trade_id',
                                    title: '柜员号',
                                    align: 'center',

                                    unresize: true
                                }
                                , {field: 'quota', title: '额度', align: 'center', unresize: true}
                                , {field: 'ccy', title: '币种', align: 'center', unresize: true}
                                , {
                                    field: 'cost_type',
                                    title: '成本计算方法',
                                    align: 'center',

                                    unresize: true
                                }
                            ]]
                        });
                        table.render({
                            elem: '#CATS'
                            , width: 1040

                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: CATS
                            , limit: CATS.length
                            , cols: [[
                                {field: 'acct_id', title: '账户ID', align: 'center', unresize: true}
                                , {
                                    field: 'password',
                                    title: '密码',
                                    align: 'center',

                                    width: 200,
                                    unresize: true
                                }
                                , {
                                    field: 'security_type',
                                    title: '证券类型',
                                    align: 'center',

                                    unresize: true
                                }
                                , {field: 'trade_id', title: '柜员号', align: 'center', unresize: true}
                                , {field: 'quota', title: '额度', align: 'center', unresize: true}
                                , {field: 'ccy', title: '币种', align: 'center', unresize: true}
                                , {
                                    field: 'cost_type',
                                    title: '成本计算方法',
                                    align: 'center',

                                    unresize: true
                                }
                            ]]
                        });
                        var n = strategy_info[0].business;
                        switch (n) {
                            case 'rootNet':
                                $('.A6').hide();
                                $('.HS').hide();
                                $('.rootNet').show();
                                break;
                            case 'A6':
                                $('.rootNet').hide();
                                $('.HS').hide();
                                $('.A6').show();
                                break;
                            case 'HS':
                                $('.A6').hide();
                                $('.rootNet').hide();
                                $('.HS').show();
                                break
                        }
                    }
                    table.render({
                        elem: '#algo_conf'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: algo_conf
                        , limit: algo_conf.length
                        , cols: [[
                            {field: 'windcode', title: '万 得 代&nbsp;码', align: 'center', unresize: true}
                            , {
                                field: 'algo_type',
                                title: '交 易&nbsp;类&nbsp;型',
                                align: 'center',
                                width: 90,

                                unresize: true
                            }
                            , {field: 'start', title: '执行开始时间', align: 'center', unresize: true}
                            , {field: 'end', title: '执行结束时间', align: 'center', unresize: true}
                            , {field: 'price_type', title: '挂单价格类型', align: 'center', unresize: true}
                            , {field: 'frequency', title: '挂单频率（秒）', align: 'center', unresize: true}
                            , {field: 'price_limit_type', title: '成交价限制', align: 'center', unresize: true}
                            , {field: 'handicap', title: '盘口价格代码', align: 'center', unresize: true}
                            , {
                                field: 'recheck_interval',
                                title: '重检时间间隔',
                                align: 'center',

                                unresize: true
                            }
                            , {
                                field: 'volume_limit',
                                title: '成 交 占&nbsp;比',
                                align: 'center',

                                unresize: true
                            }
                            , {field: 'send_mail', title: '是否发邮件', align: 'center', unresize: true}
                            , {field: 'least_qty', title: '最 小 手&nbsp;数', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#performance_index'
                        , width: 515

                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: performance_index
                        , limit: performance_index.length
                        , cols: [[
                            {
                                field: 'performance_index',
                                title: '绩效指标',
                                align: 'center',
                                width: 360,

                                unresize: true
                            }
                            , {
                                field: 'priority',
                                title: '顺序',
                                align: 'center',
                                width: 155,

                                unresize: true
                            }
                        ]]
                    });
                    table.render({
                        elem: '#security_pool_index'
                        , width: 515

                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: security_pool_index
                        , limit: security_pool_index.length
                        , cols: [[
                            {field: 'windcode', title: '万得代码', align: 'center', unresize: true}
                            , {field: 'parent', title: '父节点', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#benchmark'
                        , width: 635

                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: benchmark
                        , limit: benchmark.length
                        , cols: [[
                            {field: 'benchmark_index', title: '基准指数', align: 'center', unresize: true}
                            , {field: 'name', title: '指数名称', align: 'center', unresize: true}
                            , {field: 'priority', title: '顺序', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#mail_receivers'
                        , width: 395

                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: mail_receivers
                        , limit: mail_receivers.length
                        , cols: [[
                            {field: 'env', title: '发布环境', align: 'center', width: '30%', unresize: true}
                            , {
                                field: 'receiver',
                                title: '接收人',
                                align: 'center',
                                width: '70%',

                                unresize: true
                            }
                        ]]
                    });
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
                            , {field: 'total_asset', title: '总资产', align: 'center', edit: 'text', unresize: true}
                            , {field: 'position_asset', title: '持仓市值', align: 'center', edit: 'text', unresize: true}
                            , {field: 'cash', title: '现金', align: 'center', edit: 'text', unresize: true}
                            , {field: 'security_type', title: '标的类型', align: 'center', unresize: true}
                        ]]
                    });
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
                        $('#cumulative_trade_total').html('<tr><td></td><td>' + totalLine.windname + '</td><td></td><td>' + totalLine.trade_amount + '</td><td>' + totalLine.mkt_amount + '</td></tr>')
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
                        ]]
                    });
                    $('#cumulative_trade_total td').width(227);
                    if (strategy_info[0].stra_type == "AI_LONG") {
                        $('#cumulative_trade_total').show();
                        $('.future_day_holding').hide();
                        $('.sopt_day_holding1').show();
                        if (sopt_day_holding.length == 0) {
                            $('.sopt_day_holding2').hide();
                        } else {
                            $('.sopt_day_holding2').show();
                        }
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
                        $('.future_day_holding').show();
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
                        }
                    }
                    table.render({
                        elem: '#command_buy'
                        , width: 560
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: command_buy
                        , limit: command_buy.length
                        , cols: [[
                            {field: 'sys_name', title: '交易系统', align: 'center', unresize: true}
                            , {field: 'windcode', title: '万得代码', align: 'center', width: 95, unresize: true}
                            , {field: 'trade_code', title: '交易代码', align: 'center', unresize: true}
                            , {field: 'security_name', title: '标的名称', align: 'center', width: 100, unresize: true}
                            , {field: 'order_share', title: '委托数量', align: 'center', unresize: true}
                            , {
                                field: 'index_screen',
                                title: '量化指标',
                                align: 'center',
                                unresize: true,
                                templet: function (d) {
                                    var title = d['index_screen'].index_screen_name;
                                    var num = d['index_screen'].total_val;
                                    if (title.length == 0) {
                                        title = '';
                                    }
                                    if (num == '' || num == null || num == undefined) {
                                        num = 0;
                                    }
                                    return '<div title="' + title + '">' + num + '</div>'
                                }
                            }
                        ]]
                    });
                    table.render({
                        elem: '#command_sell'
                        , width: 560
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: command_sell
                        , limit: command_sell.length
                        , cols: [[
                            {field: 'sys_name', title: '交易系统', align: 'center', unresize: true}
                            , {field: 'windcode', title: '万得代码', align: 'center', width: 95, unresize: true}
                            , {field: 'trade_code', title: '交易代码', align: 'center', unresize: true}
                            , {field: 'security_name', title: '标的名称', align: 'center', width: 100, unresize: true}
                            , {field: 'order_share', title: '委托数量', align: 'center', unresize: true}
                            , {
                                field: 'index_screen',
                                title: '量化指标',
                                align: 'center',
                                unresize: true,
                                templet: function (d) {
                                    var title = d['index_screen'].index_screen_name;
                                    var num = d['index_screen'].total_val;
                                    if (title.length == 0) {
                                        title = '';
                                    }
                                    if (num == '' || num == null || num == undefined) {
                                        num = 0;
                                    }
                                    return '<div title="' + title + '">' + num + '</div>'
                                }
                            }
                        ]]
                    });
                    table.render({
                        elem: '#target_holding'
                        , width: 440
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: target_holding
                        , limit: target_holding.length
                        , cols: [[{field: 'windcode', title: '万得代码', align: 'center', unresize: true}
                            , {field: 'trade_code', title: '交易代码', align: 'center', unresize: true}
                            , {field: 'security_name', title: '标的名称', align: 'center', unresize: true, width: 120}
                            , {field: 'target_ratio', title: '目标市值占比', align: 'center', width: 100, unresize: true}
                            , {
                                field: 'index_screen',
                                title: '量化指标',
                                align: 'center',
                                unresize: true,
                                templet: function (d) {
                                    var title = d['index_screen'].index_screen_name;
                                    var num = d['index_screen'].total_val;
                                    if (title.length == 0) {
                                        title = '';
                                    }
                                    if (num == '' || num == null || num == undefined) {
                                        num = 0;
                                    }
                                    return '<div title="' + title + '">' + num + '</div>'
                                }
                            }
                        ]]
                    });

                    var hisCols = indicate(per_ind, sec, strname);
                    var nowCols = indicate(preformance_indicators, sec, strname);
                    table.render({
                        elem: '#per_ind'
                        , width: 1140
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: per_ind
                        , limit: per_ind.length
                        , cols: [hisCols]
                    });
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

                    if (sopt_day_holding.length == 0) {
                        $('.sopt_day_holding2').hide()
                    } else {
                        $('.sopt_day_holding2').show()
                    }
                    if (preformance_indicators.length > 0) {
                        if (command_date == '' || command_date == null || command_date == undefined) {
                            for (var i in preformance_indicators) {
                                $('.least').show();
                                $('.needHide').hide();
                                $('.least .changeTxt').html('指令日期:');
                                $('.least .end').html(preformance_indicators[i].end_day);
                            }
                        } else {
                            for (var i in preformance_indicators) {
                                $('.least').show();
                                $('.needHide').hide();
                                $('.least .changeTxt').html('指令日期:');
                                $('.least .end').html(command_date);
                            }
                        }
                    } else {
                        $('.least').hide();
                    }

                    element.on('tab(strategy)', function (data) {
                        if (data.index == 0) {
                            if (strategy_info[0].stra_type != "AI_PAIRS") {
                                if (preformance_indicators.length > 0) {
                                    if (command_date == '' || command_date == null || command_date == undefined) {
                                        $('.least').show();
                                        $('.needHide').hide();
                                        $('.least .changeTxt').html('指令日期:');
                                        for (var i in preformance_indicators) {
                                            $('.least .end').html(preformance_indicators[i].end_day);
                                        }
                                    } else {
                                        $('.least').show();
                                        $('.needHide').hide();
                                        $('.least .changeTxt').html('指令日期:');
                                        for (var i in preformance_indicators) {
                                            $('.least .end').html(command_date);
                                        }
                                    }
                                } else {
                                    $('.least').hide();
                                }
                            } else {
                                $('.needHide').hide();
                                $.ajax({
                                    type: "GET",
                                    dataType: "json",
                                    url: '/strategy/pair_trade_data/' + fir + '/' + sec + '/' + 'default',
                                    data: {},
                                    success: function (data) {
                                        if (data.result == 'ok') {
                                            console.log(data);
                                            $('.changeTxt').html('交易时间:');
                                            $('.end').html(data.trade_data.pairs_name_data.online_trade_date);
                                        }
                                    }
                                });
                            }
                        } else {
                            if (preformance_indicators.length > 0) {
                                for (var i in preformance_indicators) {
                                    $('.least').show();
                                    $('.needHide').show();
                                    $('.least .changeTxt').html('结束日期:');
                                    $('.least .start').html(preformance_indicators[i].start_day);
                                    $('.least .end').html(preformance_indicators[i].end_day);
                                }
                            } else {
                                $('.least').hide();
                            }
                        }
                    });
                    if (trading_configs.length == 0) {
                        $('.training_configs').hide();
                    } else {
                        $('.training_configs').show();
                    }
                }
            });
        }

        $(".current .dropdown").click(function () {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).children().css('display', "hidden");
            } else {
                $(this).addClass("open");
                $(this).children().css('display', "block");
            }
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
        //点击打印
        $('.print').on('click', function () {
            $('.print').hide();
            $('.sendEmail').hide();
            $('.pannel').hide();
            $('.layui-tab-title').hide();
            $('.layui-tab-item').show();
            $('.layui-tab-item').eq(2).hide();
            $('.layui-tab').css('paddingTop', '40px');
            $('.layui-table-body').css('maxHeight', 'unset');
            if ($('.layui-tab-item').eq(2).hasClass('layui-show')) {
                $('.layui-tab-item').eq(2).removeClass('layui-show');
                window.print();
                $('.layui-tab-item').eq(2).addClass('layui-show');
            } else {
                window.print();
            }
            $('.print').show();
            $('.sendEmail').show();
            $('.pannel').show();
            $('.layui-tab-title').show();
            $('.layui-tab-item').hide();
            $('.layui-tab').css('paddingTop', 'unset');
            $('.layui-table-body').css('maxHeight', '280px');
        });
        //刷新舆情
        // setInterval(function () {
        //     if (new Date().getSeconds() == 15) {
        //         if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "15:05") == 'ok') {
        //             var dbname = $('.nowStrategy .server').attr('data-server');
        //             var strategyname = $('.nowStrategy .strName').attr('data-strname');
        //             $.ajax({
        //                 type: "GET",
        //                 url: '/strategy/current_ajax/' + dbname + '/' + strategyname,
        //                 data: {},
        //                 success: function (data) {
        //                     console.log(data);
        //                     var part2 = data.command;
        //                     var public = part2.sentiment_events;
        //                     if (public.length > 0) {
        //                         var option = '';
        //                         public.sort(compareCode('windcode'));
        //                         for (var i = 0; i < public.length; i++) {
        //                             public[i].stock_drop = parseFloat(public[i].stock_drop);
        //                             option += '<li class="clearfix">\n' +
        //                                 '<div class="expand expand1"></div>\n' +
        //                                 '<div class="clearfix eventTitle">\n' +
        //                                 '    <p class="fl"><span>' + public[i].windcode + '</span></p>\n' +
        //                                 '    <p class="fl"><span>' + public[i].security_name + '</span></p>\n' +
        //                                 '    <p class="fl">跌幅: ' + stockColor(public[i].stock_drop) + '</p>\n' +
        //                                 '    <p class="fl">事件个数: <span>' + public[i].event.length + '</span></p>\n' +
        //                                 '</div>\n' +
        //                                 '<table id="black' + i + '" lay-filter="black">\n' +
        //                                 '    <tbody>';
        //                             for (var j = 0; j < public[i].event.length; j++) {
        //                                 option += '<tr>\n' +
        //                                     '        <td>' + public[i].event[j].datetime + '</td>\n' +
        //                                     '        <td style="text-align: left"><span class="negative">负</span><span>' + public[i].event[j].event_type + '</span></td>\n' +
        //                                     '        <td title="共出现次数: ' + public[i].event[j].event_count.all_count + ' 影响次数: ' + public[i].event[j].event_count.drop_count + '">' + public[i].event[j].corr.toFixed(2) + '%</td>\n' +
        //                                     '    </tr>';
        //                             }
        //                             option += '</tbody></table></li>';
        //                         }
        //                         $('.tableList').html(option);
        //                     }
        //                 }
        //             });
        //         }
        //     }
        // }, 1000);
    });
});