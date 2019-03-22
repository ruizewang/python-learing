//循环表格数据
function loop(obj) {
    var text = '';
    for (var i = 0; i < obj.length; i++) {
        text += '<tr>';
        for (j = 0; j < obj[i].length; j++) {
            text += '<td>' + obj[i][j] + '</td>';
        }
        text += '</tr>';
    }
    return text;
}

//删除多余表格
function deleteEmptyRows(obj) {
    var cleanData = new Array();
    var hihi = new Array();

    $.each(obj, function (index, item) {
        for (var key in item) {
            if (item[key] == null || item[key] == undefined) {
                delete item;
                hihi.push(index);
                break
            }
            if (item[key] != '' || item[key] === 0) {
                break
            } else {
                delete item;
                hihi.push(index);
            }
        }
    });
    $.each(obj, function (index, item) {
        if (hihi.indexOf(index) == -1) {
            cleanData.push(item);
        }
    });

    return cleanData;
};
//表格初始数据
//获取当前时间
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}
var nowDate = year + "-" + month + "-" + day;
//console.log(nowDate);
var allD = {
    "training_configs": {
        "a": [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']],
        "b": [
            {
                "type": 'text',
                "width": 80
            },
            {
                "type": 'dropdown',
                "source": ["CumulativeReturn", "LegacyRiskAdjustedReturn", "SharpeRatio", "SortonoRatio", "RiskAdjustedReturn"],
                "width": 220
            },
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'dropdown', "source": ["1", "0"]},
            {"type": 'dropdown', "source": ["1", "0"]},
            {"type": 'text'},
            {"type": 'dropdown', "source": ["1", "0"]},
            {"type": 'text'},
            {"type": 'dropdown', "source": ["1", "0"]}],
        "c": ['父节点', '目标函数', '训练开始日期', '训练结束日期', '学习率', '神经层数', '步数', '神经元数', '训练次数', 'batch_size', '样本数量', 'input_keep_prob', 'output_keep_prob', '交易参与率', '市场最大参与率', '是否加载模型', '保存模型', 'target_position_avg_count', '是否训练', '风险平衡因子', '是否禁用'],
        "d": 'training_configs'
    },
    "security_pool": {
        "a": [[' ', ' ', ' ', ' ', ' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["A_STOCK_INDEX", "A_CLOSE_FUND", "FUTURE", "A_STOCK"]
            },
            {"type": 'text'},
            {"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["1", "0"]
            }],
        "c": ['父节点', '万得代码', '证券类型', '顺序', '层级', '是否训练'],
        "d": 'security_pool'
    },
    "training_index": {
        "a": [[' ', ' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'},
            {"type": 'text'}],
        "c": ['父节点', '训练因子', '顺序'],
        "d": 'training_index'
    },
    "training_common_index": {
        "a": [[' ', ' ', ' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'}],
        "c": ['父节点', '万得代码', '训练因子', '顺序'],
        "d": 'training_common_index'
    },
    "order_router": {
        "a": [[' ', ' ', ' ']],
        "b": [{
            "type": 'dropdown',
            "source": ["SH", "SZ", "CFE", "CZC", "SHF", "DCE", "WI"]
        },
            {
                "type": 'dropdown',
                "source": ["rootNet", "HS", "A6", "CATS"]
            },
            {
                "type": 'dropdown',
                "source": ["CASH", "FUTURE"]
            }],
        "c": ['交易所代码', '系统代码', '证券类型'],
        "d": 'order_router'
    },
    "account1": {
        "a": [['A6', 'CASH', '80000000', 'CNY', '0', '1']],
        "b": [{
            "type": 'dropdown',
            "source": ["rootNet", "HS", "A6", "CATS"]
        },
            {
                "type": 'dropdown',
                "source": ["CASH", "FUTURE"]
            },
            {"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["CNY"]
            },
            {
                "type": 'dropdown',
                "source": ["1", "0"]
            },
            {
                "type": 'text'
            }],
        "c": ['系统代码', '证券类型', '额度', '币种', '成本计算方法', '富裕度'],
        "d": 'account'
    },
    "account2": {
        "a": [['A6', 'CASH', '80000000', 'CNY', '0', '1'], ['A6', 'FUTURE', '20000000', 'CNY', '0', '0.1']],
        "b": [{
            "type": 'dropdown',
            "source": ["rootNet", "HS", "A6", "CATS"]
        },
            {
                "type": 'dropdown',
                "source": ["CASH", "FUTURE"]
            },
            {"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["CNY"]
            },
            {
                "type": 'dropdown',
                "source": ["1", "0"]
            },
            {
                "type": 'text'
            }],
        "c": ['系统代码', '证券类型', '额度', '币种', '成本计算方法', '富裕度'],
        "d": 'account'
    },
    "algo_conf": {
        "a": [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            // {'type': 'time', 'timeFormat': 'h:mm:ss', 'correctFormat': 'true'},
            // {'type': 'time', 'timeFormat': 'h:mm:ss', 'correctFormat': 'true'},
            {
                "type": 'dropdown',
                "source": ["0", "1", "2", "3", "4", "5"]
            },
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["1", "0"]
            },
            {"type": 'text'}],
        "c": ['万得代码', '交易类型', '开始时间', '结束时间', '价格类型', '挂单频率', '成交价限制', '盘口价格代码', '重检间隔', '成交占比', '发送邮件', '最小手数'],
        "d": 'algo_conf'
    },
    "performance_index": {
        "a": [[' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'}],
        "c": ['绩效指标', '顺序'],
        "d": 'performance_index'
    },
    "security_pool_index": {
        "a": [[' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'}],
        "c": ['父节点', '万得代码'],
        "d": 'security_pool_index'
    },
    "mail_receivers": {
        "a": [[' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'}],
        "c": ['发布环境', '接收人'],
        "d": 'mail_receivers'
    },
    "benchmark": {
        "a": [[' ', ' ', ' ', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'}],
        "c": ['父节点', '基准指数', '指数名称', '顺序'],
        "d": 'benchmark'
    },
    "agg_eod_position_his1": {
        "a": [[nowDate, 'A6', 'CASH', '0.00000', '0.00', '100000000.00', '0.00', '100000000.00', '0.00']],
        "b": [{"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["rootNet", "HS", "A6", "CATS"]
            },
            {
                "type": 'dropdown',
                "source": ["CASH", "FUTURE"]
            },
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'}],
        "c": ['交易日期', '系统代码', '证券类型', '涨跌幅', '系统盈利', '系统资产', '系统持仓金额', '现金', '调仓金额'],
        "d": 'agg_eod_position_his'
    },
    "agg_eod_position_his2": {
        "a": [[nowDate, 'A6', 'CASH', '0.00000', '0.00', '100000000.00', '0.00', '100000000.00', '0.00'], [nowDate, 'A6', 'FUTURE', '0.00000', '0.00', '20000000.00', '0.00', '20000000.00', '0.00']],
        "b": [{"type": 'text'},
            {
                "type": 'dropdown',
                "source": ["rootNet", "HS", "A6", "CATS"]
            },
            {
                "type": 'dropdown',
                "source": ["CASH", "FUTURE"]
            },
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'}],
        "c": ['交易日期', '系统代码', '证券类型', '系统盈亏(%)', '系统盈亏', '系统资产', '持仓市值', '现金', '调仓金额'],
        "d": 'agg_eod_position_his'
    },
    "future_config": {
        "a": [['1', '0.2', '0.05', '0', ' ']],
        "b": [{"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'},
            {"type": 'text'}],
        "c": ['对冲类型', '空头占比', '调仓富裕度', '距离调仓天数', '调仓条件'],
        "d": 'future_config'
    }
};

$(document).ready(function () {
    var ajaxGetPool = $.ajax();
    localStorage.setItem('where', 'aimockdb/Default');
    //layui控件
    layui.use(['form', 'layer', 'laydate', 'table', 'upload'], function () {
        var form = layui.form;
        var laydate = layui.laydate;
        var upload = layui.upload;
        var tableData = new Object();
        var strType = 'AI_LONG';
        var custom = [];
        var next1 = false;
        var next2 = false;
        var next3 = false;
        //验证
        form.verify({
            strategyName: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\\\s·]+$").test(value)) {
                    return '策略名不能有特殊字符';
                }
            }
            , rrr: [
                /^00?\.([0-9]{1,5}?)$/
                , '0到1之间的小数，最多小数点后5位'
            ]
            , amount: [
                /^(0|[1-9][0-9]*)$/
                , '大于0的正整数'
            ]
        });
        form.on('select(strategy_type)', function (data) {
            strType = data.value;
        });

        function toAjax(num, sec) {
            $.ajax({
                type: "GET",
                url: '/strategy/section' + num + '/' + sec,
                data: {},
                success: function (data) {
                    console.log(data);
                    var sType = $('.strategyType .layui-this').html();
                    if (data.status == '200') {
                        $.each(data, function (i) {
                            if (i == 'strategy_info') {
                                var strategy_info = data.strategy_info;
                                for (var key in strategy_info) {
                                    $.each($('.configBase .baseInput'), function (i) {
                                        if ($('.configBase .baseInput').eq(i).attr('name') == key) {
                                            $('.configBase .baseInput').eq(i).val(strategy_info[key]);
                                        }
                                    });
                                    $.each($('.no1').find('.baseInput'), function (i) {
                                        if ($('.no1').find('.baseInput').eq(i).attr('name') == key) {
                                            $('.no1').find('.baseInput').eq(i).val(strategy_info[key]);
                                        } else if (key == 'disable') {
                                            $('select[name=disable1]').val(strategy_info[key]);
                                        } else if (key == 'business') {
                                            $('select[name=business]').val(strategy_info[key]);
                                        }
                                    });
                                }
                            }
                            if (i == 'default_replacement') {
                                $('input[name=default_replacement]').val(data.default_replacement[0])
                            }
                            if (i == 'training_config') {
                                var title = 'training_configs';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('training_config');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columnSorting: true,
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 179,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 6
                                };
                                $('#training_config').html('');
                                var hot0 = new Handsontable(container, setting);
                                $(".btn0").click(function () {
                                    var sourceData = hot0.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload0'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot0.loadData(res.result)
                                    }
                                    , error: function (res) {
                                        console.log(res);
                                    }
                                });
                            }
                            if (i == 'security_pool') {
                                var title = 'security_pool';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('security_pool');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columnSorting: true,
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 188,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 6
                                };
                                $('#security_pool').html('');
                                var hot1 = new Handsontable(container, setting);
                                $(".btn1").click(function () {
                                    var sourceData = hot1.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                //上传组件
                                upload.render({
                                    elem: '#upload1'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        $('#security_pool').show();
                                        $('.waiting').hide();
                                        hot1.loadData(res.result);
                                        ajaxGetPool.abort();
                                    }
                                    , error: function (data) {
                                        console.log(data);
                                        //请求异常回调
                                    }
                                });
                                //获取数据
                                $('.getPool').on('click', function () {
                                    $('input[name=strategy_name]').removeAttr('lay-verify');
                                    $('input[name=strategy_name]').removeAttr('lay-verType');
                                    form.on('submit(formSubmit)', function (data) {
                                        $('#security_pool').hide();
                                        $('.waiting').show();
                                        ajaxGetPool.abort();
                                        if (data.field.trade_plate == '' || data.field.trade_plate == null || data.field.trade_plate == undefined) {
                                            data.field.trade_plate = [];
                                        }
                                        if (data.field.index_plate == '' || data.field.index_plate == null || data.field.index_plate == undefined) {
                                            data.field.index_plate = [];
                                        }
                                        if (data.field.concept_plate == '' || data.field.concept_plate == null || data.field.concept_plate == undefined) {
                                            data.field.concept_plate = [];
                                        }
                                        if (data.field.amount == "0") {
                                            data.field.amount = '';
                                        }
                                        if (data.field.stopdate == "0") {
                                            data.field.stopdate = '';
                                        }
                                        if (data.field.stock_count == "0") {
                                            data.field.stock_count = '';
                                        }
                                        var param_dict = {
                                            "list_date": data.field.list_date,
                                            "amount": [data.field.amount, data.field.amountdate],
                                            "stop_days": data.field.stopdate,
                                            "stock_count": data.field.stock_count,
                                            "industries": data.field.trade_plate,
                                            "aindex": data.field.index_plate,
                                            "concept": data.field.concept_plate,
                                            "custom": custom
                                        };
                                        //console.log(param_dict);
                                        ajaxGetPool = $.ajax({
                                            type: "POST",
                                            dataType: 'json',
                                            data: JSON.stringify(param_dict),
                                            url: 'getClassWindCode/',
                                            success: function (data) {
                                                //console.log(data);
                                                $('#security_pool').show();
                                                $('.waiting').hide();
                                                hot1.loadData(data.result);
                                                custom = [];
                                            }
                                        });
                                        return false;
                                    });
                                });
                            }
                            if (i == 'training_index') {
                                var title = 'training_index';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('training_index');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columnSorting: true,
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 188,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 7
                                };
                                $('#training_index').html('');
                                var hot2 = new Handsontable(container, setting);
                                $(".btn2").click(function () {
                                    var sourceData = hot2.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload2'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot2.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'training_common_index') {
                                var title = 'training_common_index';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('training_common_index');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columnSorting: true,
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 60,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 0
                                };
                                $('#training_common_index').html('');
                                var hot3 = new Handsontable(container, setting);
                                $(".btn3").click(function () {
                                    var sourceData = hot3.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload3'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot3.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'order_router') {
                                var title = 'order_router';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('order_router');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 150,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 3
                                };
                                $('#order_router').html('');
                                var hot4 = new Handsontable(container, setting);
                                $(".btn4").click(function () {
                                    var sourceData = hot4.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload4'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot4.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'algo_conf') {
                                var title = 'algo_conf';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('algo_conf');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 150,
                                    width: 1080,
                                    rowHeaderWidth: 20,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    colWidths: 60,
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#algo_conf').html('');
                                var hot6 = new Handsontable(container, setting);
                                $(".btn6").click(function () {
                                    var sourceData = hot6.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload6'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot6.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'account') {
                                var title = 'account2';
                                if (sType == 'AI_LONG') {
                                    title = 'account1';
                                }
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('account');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 150,
                                    width: 1080,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 3
                                };
                                $('#account').html('');
                                var hot7 = new Handsontable(container, setting);
                                $(".btn7").click(function () {
                                    var sourceData = hot7.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = 'account';
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload7'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot7.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'security_pool_index') {
                                var title = 'security_pool_index';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('security_pool_index');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 142,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#security_pool_index').html('');
                                var hot8 = new Handsontable(container, setting);
                                $(".btn8").click(function () {
                                    var sourceData = hot8.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload8'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot8.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'performance_index') {
                                var title = 'performance_index';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('performance_index');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columnSorting: true,
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 142,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#performance_index').html('');
                                var hot9 = new Handsontable(container, setting);
                                $(".btn9").click(function () {
                                    var sourceData = hot9.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload9'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot9.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'mail_receivers') {
                                var title = 'mail_receivers';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('mail_receivers');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 142,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#mail_receivers').html('');
                                var hot10 = new Handsontable(container, setting);
                                $(".btn10").click(function () {
                                    var sourceData = hot10.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload10'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot10.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'benchmark') {
                                var title = 'benchmark';
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('benchmark');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columnSorting: true,
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 142,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#benchmark').html('');
                                var hot11 = new Handsontable(container, setting);
                                $(".btn11").click(function () {
                                    var sourceData = hot11.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload11'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot11.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'future_hedging_agg') {
                                var title = 'agg_eod_position_his2';
                                if (sType == 'AI_LONG') {
                                    title = 'agg_eod_position_his1';
                                }
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('agg_eod_position_his');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 142,
                                    width: 1080,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#agg_eod_position_his').html('');
                                var hot12 = new Handsontable(container, setting);
                                $(".btn12").click(function () {
                                    var sourceData = hot12.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = 'agg_eod_position_his';
                                    tableData[name] = netData;
                                });
                                upload.render({
                                    elem: '#upload12'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot12.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                            if (i == 'future_hedging_config') {
                                var title = 'future_config';
                                if (sType != 'AI_LONG') {
                                    $('.statusHide').show();
                                } else {
                                    $('.statusHide').hide();
                                }
                                if (data[i] == '' || data[i] == null || data[i] == undefined) {
                                    data[i] = allD[title].a;
                                }
                                var container = document.getElementById('future_config');
                                var setting = {
                                    data: data[i],
                                    //thead类型
                                    columns: allD[title].b,
                                    rowHeaders: true,
                                    colHeaders: allD[title].c,
                                    stretchH: 'all',
                                    height: 150,
                                    width: 1080,
                                    autoWrapRow: true,
                                    autoColumnSize: {
                                        samplingRatio: 23
                                    },
                                    contextMenu: true,
                                    minSpareRows: 4
                                };
                                $('#future_config').html('');
                                var hot13 = new Handsontable(container, setting);
                                $(".btn13").click(function () {
                                    var sourceData = hot13.getSourceData();
                                    var netData = deleteEmptyRows(sourceData);
                                    var name = title;
                                    if (sType == 'AI_HEDGE' || sType == 'AI_PAIRS') {
                                        tableData[name] = netData;
                                    } else {
                                        delete tableData[name];
                                    }
                                });
                                upload.render({
                                    elem: '#upload13'
                                    , url: '/strategy/upcsv/'
                                    , accept: 'file'
                                    , done: function (res) {
                                        //console.log(res);
                                        hot7.loadData(res.result)
                                    }
                                    , error: function () {
                                        //请求异常回调
                                    }
                                });
                            }
                        });
                    } else {
                        layer.open({
                            title: '警告'
                            ,
                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请求的数据加载有误，请重试</p>'
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
                    form.render();
                }
            });
        }

        //上一步
        function prev(now) {
            if (now - 1 >= 0) {
                $('.section').hide();
                $('.section').eq(now - 1).show();
            }
        }

        //监听日期
        laydate.render({
            elem: '.start_report_time input'
            , value: new Date(new Date().getTime())
        });
        laydate.render({
            elem: '.list_date input'
            , value: new Date(new Date().getTime() - 365 * 2 * 24 * 3600 * 1000)
        });
        //判断是否重名
        $('input[name=strategy_name]').on('blur', function () {
            var val = $(this).val();
            if (val == '' || val == null || val == undefined) {
                console.log(val)
            } else {
                $.ajax({
                    type: "GET",
                    dataType: 'json',
                    async: false,
                    url: 'confirm/aimockdb/' + val,
                    data: {},
                    success: function (data) {
                        if (data.status == 400) {
                            layer.open({
                                title: '警告'
                                ,
                                content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请换个策略代码并重试</p>'
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
                            $('input[name=strategy_name]').val('');
                            return false
                        }
                    }
                });
            }
        });
        //点击下一步按钮
        $('.next1').on('click', function () {
            var now = 1;
            var where = localStorage.getItem('where');
            var val = $('input[name=strategy_name]').val();
            if (val == '' || val == null || val == undefined) {
                $('input[name=strategy_name]').attr('lay-verify', 'required|strategyName');
                $('input[name=strategy_name]').attr('lay-verType', 'tips');
            } else {
                $('input[name=strategy_name]').blur();
            }
            if (where == '' || where == null || where == undefined) {
                where = 'aimockdb/Default';
            }
            form.on('submit(formSubmit)', function (data) {
                //console.log(data.field);
                $('#security_pool').show();
                $('.waiting').hide();
                ajaxGetPool.abort();
                $('.section').hide();
                $('.section').eq(now).show();
                if (next1 == false) {
                    toAjax(2, where);
                }
                var top = $("body").offset().top - 65;
                $('body,html').animate({scrollTop: top}, 700);
                next1 = true;
                return false;
            });
        });
        $('.next2').on('click', function () {
            var strtype = $('.strategyType .layui-this').html();
            var now = 2;
            var where = localStorage.getItem('where');
            if (where == '' || where == null || where == undefined) {
                where = 'aimockdb/Default';
            }
            form.on('submit(formSubmit)', function (data) {
                //console.log(data.field);
                $('.section').hide();
                $('.section').eq(now).show();
                if (next2 == false || strtype == strType) {
                    toAjax(3, where);
                }
                var top = $("body").offset().top - 65;
                $('body,html').animate({scrollTop: top}, 700);
                next2 = true;
                return false;
            });
        });
        $('.next3').on('click', function () {
            var now = 3;
            var where = localStorage.getItem('where');
            if (where == '' || where == null || where == undefined) {
                where = 'aimockdb/Default';
            }
            form.on('submit(formSubmit)', function (data) {
                //console.log(data.field);
                $('.section').hide();
                $('.section').eq(now).show();
                if (next3 == false) {
                    toAjax(4, where);
                }
                var top = $("body").offset().top - 65;
                $('body,html').animate({scrollTop: top}, 700);
                next3 = true;
                return false;
            });
        });
        //点击上一步按钮
        $('.prev').on('click', function () {
            var now = $(this).parents('.section').index();
            prev(now);
            var top = $("body").offset().top - 65;
            $('body,html').animate({scrollTop: top}, 700);
        });
        //自定义数据
        $('.optimal').on('click', function () {
            layer.open({
                title: '自定义标的池'
                ,
                content: '<textarea class="customTxt" style="width: 320px; height: 200px;min-width: 320px; min-height: 200px; padding: 10px; background: #fff; border: 1px solid #004986;" placeholder="请输入万得代码，以逗号连接"></textarea>',
                success: function () {
                    $('.customTxt').val(custom);
                    $('.customTxt').focus();
                },
                yes: function (index, layero) {
                    var textareaTxt = $(layero.selector).find('textarea').val().replace(/\ +/g, "").replace(/[\r\n]/g, "").split(',');

                    custom = textareaTxt;
                    for (var i = 0; i < custom.length - 1; i++) {
                        for (var j = i + 1; j < custom.length; j++) {
                            if (custom[i] == custom[j]) {
                                custom.splice(j, 1);
                                j--;
                            }
                        }
                        if (custom[i] == '' || custom[i] == null || custom[i] == undefined) {
                            custom.splice(i, 1);
                            i--;
                        }
                    }
                    layer.close(index);
                    return false;
                }
            });
        });
        //点击预览
        $('#save').on('click', function () {
            $(".print").click();
            form.on('submit(formSubmit)', function (data) {
                var default_replacement = [];
                default_replacement.push([data.field.default_replacement]);
                tableData['default_replacement'] = default_replacement;
                var alldata = {
                    "strategy_name": data.field.strategy_name,
                    "table": tableData,
                    "strategy_info": {
                        "strategy_type": data.field.strategy_type,
                        "MMF": data.field.MMF,
                        "RRR": data.field.RRR,
                        "RFR": data.field.RFR,
                        "disable": data.field.disable1,
                        "report_env": data.field.report_env,
                        "start_report_time": data.field.start_report_time,
                        "user_id": data.field.user_id,
                        "business": data.field.business
                    }
                };
                console.log(alldata);
                var isSubmit = false;
                $.each(data.field, function (i) {
                    if (data.field[i] == '') {
                        isSubmit = true;
                    }
                });
                $('.strName span').html(data.field.strategy_name);
                info1 = '<tr><td class="clearfix"><p class="fl">策略代码</p><p class="fr">' + data.field.strategy_name + '</p></td></tr><tr><td class="clearfix"><p class="fl">策略类型</p><p class="fr">' + data.field.strategy_type + '</p></td></tr><tr><td class="clearfix"><p class="fl">最低日回报率</p><p class="fr">' + data.field.RRR + '</p></td></tr><tr><td class="clearfix"><p class="fl">无风险利率</p><p class="fr">' + data.field.RFR + '</p></td></tr><tr><td class="clearfix"><p class="fl">货币基金</p><p class="fr">' + data.field.MMF + '</p></td></tr><tr><td class="clearfix"><p class="fl">策略发布日</p><p class="fr">' + data.field.start_report_time + '</p></td></tr><tr><td class="clearfix"><p class="fl">发布环境</p><p class="fr">' + data.field.report_env + '</p></td></tr><tr><td class="clearfix"><p class="fl">禁用标识</p><p class="fr">' + data.field.disable1 + '</p></td></tr><tr><td class="clearfix"><p class="fl">默认替换标的</p><p class="fr">' + data.field.default_replacement + '</p></td></tr><tr><td class="clearfix"><p class="fl">业务类型</p><p class="fr">' + data.field.business + '</p></td></tr>';
                var config1 = '';
                var config2 = '';
                var config3 = '';
                for (var j = 0; j < alldata.table.training_configs.length; j++) {
                    config1 += '<tr>';
                    config2 += '<tr>';
                    config3 += '<tr>';
                    for (var i = 0; i < alldata.table.training_configs[j].length; i++) {
                        if (i >= 0 && i < 7) {
                            config1 += '<td>' + alldata.table.training_configs[j][i] + '</td>';
                        } else if (i > 6 && i < 14) {
                            config2 += '<td>' + alldata.table.training_configs[j][i] + '</td>';
                        } else if (i > 13 && i < 21) {
                            config3 += '<td>' + alldata.table.training_configs[j][i] + '</td>';
                        } else {
                            return false
                        }
                    }
                    config1 += '</tr>';
                    config2 += '</tr>';
                    config3 += '</tr>';
                }
                var sType = $('.strategyType .layui-this').html();
                info2 = loop(alldata.table.security_pool);
                info4 = loop(alldata.table.order_router);
                info5 = loop(alldata.table.training_index);
                info6 = loop(alldata.table.training_common_index);
                info8 = loop(alldata.table.algo_conf);
                info10 = loop(alldata.table.performance_index);
                info11 = loop(alldata.table.security_pool_index);
                info12 = loop(alldata.table.benchmark);
                info13 = loop(alldata.table.mail_receivers);
                if (sType == 'AI_LONG') {
                    info7 = loop(alldata.table.account);
                    info14 = loop(alldata.table.agg_eod_position_his);
                    $('.future_config').hide();
                } else {
                    $('.future_config').show();
                    info7 = loop(alldata.table.account);
                    info14 = loop(alldata.table.agg_eod_position_his);
                    info15 = loop(alldata.table.future_config);
                    $('.future_config tbody').html(info15);
                    $('.future_config tbody td').width(185);
                }
                $('.strategy_info tbody').html(info1);
                $('.training_configs .tbody1').html(config1);
                $('.training_configs .tbody2').html(config2);
                $('.training_configs .tbody3').html(config3);
                $('.training_configs tbody td').width(130);
                $('.security_pool tbody').html(info2);
                $('.security_pool tbody td').width(92);
                $('.order_router tbody').html(info4);
                $('.order_router tbody td').width(96);
                $('.training_index tbody').html(info5);
                $('.training_index tbody td').width(62);
                $('.training_common_index tbody').html(info6);
                $('.training_common_index tbody td').width(62);
                $('.account tbody').html(info7);
                $('.account tbody td').width(174);
                $('.algo_conf tbody').html(info8);
                $('.algo_conf tbody td').width(72);
                $('.performance_index tbody').html(info10);
                $('.performance_index tbody td').width(200);
                $('.security_pool_index tbody').html(info11);
                $('.security_pool_index tbody td').width(200);
                $('.benchmark tbody').html(info12);
                $('.benchmark tbody td').width(149);
                $('.mail_receivers tbody').html(info13);
                $('.mail_receivers tbody td').width(134);
                $('.agg_eod_position_his tbody').html(info14);
                $('.agg_eod_position_his tbody td').width(101);
                $('#strategy').hide();
                $('.preview').show();
                var top = $("body").offset().top - 65;
                $('body,html').animate({scrollTop: top}, 700);
                return false;
            });
        });
        //点击返回
        $('.return').on('click', function () {
            $('#strategy').show();
            $('.preview').hide();
            var top = $("body").offset().top - 65;
            $('body,html').animate({scrollTop: top}, 700);
        });
        //点击提交
        $('.toSubmit').on('click', function () {
            $('.toSubmit').hide();
            $('.submited').show();
            $(".print").click();
            form.on('submit(formSubmit)', function (data) {
                var default_replacement = [];
                default_replacement.push([data.field.default_replacement]);
                tableData['default_replacement'] = default_replacement;
                var alldata = {
                    "strategy_name": data.field.strategy_name,
                    "table": tableData,
                    "strategy_info": {
                        "strategy_type": data.field.strategy_type,
                        "MMF": data.field.MMF,
                        "RRR": data.field.RRR,
                        "RFR": data.field.RFR,
                        "disable": data.field.disable1,
                        "report_env": data.field.report_env,
                        "start_report_time": data.field.start_report_time,
                        "user_id": data.field.user_id,
                        "business": data.field.business
                    }
                };
                //console.log(tableData);
                var noonArr = [];
                $.each(tableData, function (key) {
                    for (var i = 0; i < tableData[key].length; i++) {
                        for (var j = 0; j < tableData[key][i].length; j++) {
                            if (key == 'algo_conf' || key == 'training_common_index') {
                                break
                            } else {
                                if (tableData[key][i][j] === " " || tableData[key][i][j] === "") {
                                    if (key == 'security_pool') {
                                        noonArr.push('标的池');
                                    } else if (key == 'training_configs') {
                                        noonArr.push('训练参数')
                                    } else if (key == 'order_router') {
                                        noonArr.push('订单路由')
                                    } else if (key == 'training_index') {
                                        noonArr.push('标的因子')
                                    } else if (key == 'training_common_index') {
                                        noonArr.push('市场因子')
                                    } else if (key == 'account') {
                                        noonArr.push('账户信息')
                                    } else if (key == 'algo_conf') {
                                        noonArr.push('算法参数')
                                    } else if (key == 'performance_index') {
                                        noonArr.push('绩效指标')
                                    } else if (key == 'security_pool_index') {
                                        noonArr.push('自定义基准指标')
                                    } else if (key == 'benchmark') {
                                        noonArr.push('绩效基准指标')
                                    } else if (key == 'mail_receivers') {
                                        noonArr.push('邮件接收者')
                                    } else if (key == 'agg_eod_position_his') {
                                        noonArr.push('交易系统初始配置')
                                    } else if (key == 'future_config') {
                                        noonArr.push('期货策略配置')
                                    }
                                    break
                                }
                            }
                        }
                    }
                });
                for (var i = 0; i < noonArr.length - 1; i++) {
                    for (var j = i + 1; j < noonArr.length; j++) {
                        if (noonArr[i] == noonArr[j]) {
                            noonArr.splice(j, 1);
                            j--;
                        }
                    }
                }
                if (noonArr.length != 0) {
                    layer.open({
                        title: '警告'
                        ,
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="text-align: center; line-height: 35px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: left; font-size: 16px; color: #101010; width: 270px;">下列表格:' + noonArr + '，有未完成行，请填写完整再提交</p>'
                        ,
                        btn: ''
                        ,
                        time: 3000
                        ,
                        closeBtn: 0
                        ,
                        anim: 5
                        , resize: false
                    });
                    $('.toSubmit').show();
                    $('.submited').hide();
                    return false;
                } else {
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        url: '/strategy/',
                        data: JSON.stringify(alldata),
                        success: function (data) {
                            //console.log(data);
                            if (data.status == 200) {
                                layer.open({
                                    title: '通知'
                                    ,
                                    content: '<i class="fl layui-icon layui-icon-ok-circle" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">' + data.msg + '</p>'
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
                                setTimeout(function () {
                                    window.location.href = 'current';
                                }, 1500)
                                return false;
                            } else {
                                layer.open({
                                    title: '警告'
                                    ,
                                    content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">' + data.msg + '</p>'
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
                                $('.toSubmit').show();
                                $('.submited').hide();
                                return false;
                            }
                        }
                    });
                }
                localStorage.setItem('where', '');
                return false;
            });
        });
        //下拉框相关
        $.ajax({
            type: "GET",
            url: '/strategy/section1/aimockdb/Default',
            data: {},
            success: function (data) {
                if (data.status == 200) {
                    var db = data.db;
                    var option = '';
                    console.log(db);
                    if (db.length != 0 && db != null && db != undefined) {
                        $.each(db, function (i) {
                            option += '<li class="dropdown sendAjax"><a data-toggle="dropdown" data-stoppropagation="true" style="">' + i.replace('ai', '').replace('db', '') + '</a><ul class="dropdown-menu R_aside" role="menu" aria-labelledby="dLabel" style="">';
                            for (var k = 0; k < db[i].length; k++) {
                                if (db[i][k].zh_name == null || db[i][k].zh_name == '' || db[i][k].zh_name == undefined) {
                                    db[i][k].zh_name = db[i][k].en_name
                                }
                                option += '<li class="changeStrategy" data-value="' + i + '/' + db[i][k].en_name + '">' + db[i][k].zh_name + '</li>'
                            }
                            option += '</ul></li>'
                        });
                    } else {
                        option = '<li>空</li>'
                    }
                    $('#strategy .strategyLoad .dropdown-menu').html(option);

                    $('#strategy .dropdown .changeStrategy').on('click', function () {
                        ajaxGetPool.abort();
                        $('#security_pool').show();
                        $('.waiting').hide();
                        var value = $(this).attr('data-value');
                        var index = value.indexOf('/');
                        var sec = value.substring(index + 1);
                        var fir = value.substring(0, index);
                        var secName=$(this).html();
                        var num = 1;
                        if (data.value != 0) {
                            toAjax(num, fir + '/' + sec);
                            localStorage.setItem('where', fir + '/' + sec);

                            next1 = false;
                            next2 = false;
                            next3 = false;
                            form.render();
                            if (fir == 'aimockdb') {
                                $('.currentName .server').html('模拟');
                            } else if (fir == 'aidevdb') {
                                $('.currentName .server').html('测试');
                            } else {
                                $('.currentName .server').html('生产');
                            }
                            $('.currentName .secName').html(secName);
                        } else {
                            toAjax(num, 'aimockdb/Default');
                        }
                    });
                    form.render();
                }
            }
        });
        toAjax(1, 'aimockdb/Default');
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: '/strategy/stra_plate',
            data: {},
            success: function (data) {
                //console.log(data);
                var index_plate = '';
                var concept_plate = '';
                for (var i = 0; i < data.index_plate.length; i++) {
                    index_plate += '<option value="' + data.index_plate[i].value + '">' + data.index_plate[i].name + '</option>'
                }
                for (var i = 0; i < data.concept_plate.length; i++) {
                    concept_plate += '<option value="' + data.concept_plate[i].value + '">' + data.concept_plate[i].name + '</option>'
                }
                $('.index_plate').html(index_plate);
                $('.concept_plate').html(concept_plate);
                form.render();
            }
        });

        $(".strategyLoad .dropdown").click(function () {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                $(this).children().css('display', "hidden");
            } else {
                $(this).addClass("open");
                $(this).children().css('display', "block");
            }
        });
        $('body').on('click', function (e) {
            if (e.target.className != 'changeStrategy' && e.target.className != 'loadName' && e.target.nodeName != 'A') {
                $(".strategyLoad .dropdown").removeClass("open");
                $(".strategyLoad .dropdown").children().css('display', "hidden");
            } else if (e.target.className == 'changeStrategy') {
                $(".strategyLoad .dropdown").children().css('display', "hidden");
            }
        });
        $(".strategyLoad .sendAjax>a").click(function () {
            setTimeout('$(this).parent().addClass("open");', 1);
        });
    });
});