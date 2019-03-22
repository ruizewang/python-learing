//ajax方法
var pairs;

function chartAjax(allResult, fir, sec, url, auth) {
    console.log(url);
    var positionType = '现货持仓占比';
    var constTime = '';
    var rateR = '';
    var rateRN = '';
    var data = allResult;
    var pairname = 'default';
    $('canvas').unbind('click');

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

    function pairsAjax() {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: '/strategy/pair_trade_data/' + fir + '/' + sec + '/' + pairname,
            data: {},
            success: function (data) {
                console.log(data);
                if (data.result == 'ok') {
                    //pairLineOption
                    function pairLineOption1(title, subtitle, time, tradeValue, flag, spec, new1, new2, new3, new4, new5) {
                        var a_price = [];
                        var a_vol = [];
                        var b_price = [];
                        var b_vol = [];
                        var buy = [];
                        var sell = [];
                        var base = [];
                        var title = '配对名称: ' + title;
                        var subText = '标的: ' + subtitle;
                        var tipColor = '';
                        for (var i = 0; i < spec.length; i++) {
                            spec[i].sort(compare('bsflag')).reverse();
                            for (var j = 0; j < spec[i].length; j++) {
                                if (spec[i][j].bsflag >= 0) {
                                    a_price.push(spec[i][j].A_price);
                                    a_vol.push(spec[i][j].A_vol);
                                    b_price.push(spec[i][j].B_price);
                                    b_vol.push(spec[i][j].B_vol);
                                }
                            }
                        }
                        for (var i = 0; i < flag.length; i++) {
                            if (flag[i] == 1) {
                                tipColor = '#bd4f5b';
                                buy.push(tradeValue[i]);
                                sell.push('-');
                                base.push('-');
                            } else if (flag[i] == -1) {
                                tipColor = '#4d945e';
                                sell.push(tradeValue[i]);
                                buy.push('-');
                                base.push('-');
                            } else {
                                tipColor = '#888888';
                                base.push(tradeValue[i]);
                                buy.push('-');
                                sell.push('-');
                            }
                        }
                        for (var i = 0; i < time.length; i++) {
                            if (new1.length <= time.length) {
                                new1.push(new1[0]);
                            }
                            if (new2.length <= time.length) {
                                new2.push(new2[0]);
                            }
                            if (new3.length <= time.length) {
                                new3.push(new3[0]);
                            }
                            if (new4.length <= time.length) {
                                new4.push(new4[0]);
                            }
                            if (new5.length <= time.length) {
                                new5.push(new5[0]);
                            }
                        }
                        if (CompareDate("9:00", new Date().getHours() + ":" + new Date().getMinutes(), "23:30") != 'ok') {
                            tipColor = 'transparent';
                        }
                        var option = {
                            animation: false,
                            title: {
                                show: true,
                                id: 'quarticInOut',
                                text: title,
                                subtext: subText,
                                textStyle: {
                                    color: '#101010',
                                    fontSize: 20
                                },
                                subtextStyle: {
                                    color: '#535353',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                },
                                left: '20',
                                top: '14'
                            },
                            grid: [
                                {x: '5%', y: '15%', width: '83%', height: '46%'},
                                {x: '5%', y2: '4%', width: '83%', height: '30%'}
                            ],
                            dataZoom: [
                                {
                                    type: 'inside',
                                    xAxisIndex: [0, 1],
                                    yAxisName: [0, 1, 2]
                                }
                            ],
                            axisPointer: {
                                link: {
                                    xAxisIndex: 'all',
                                    yAxisName: 'all'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                },
                                formatter: function (params) {
                                    var a = '--';
                                    var c = '';
                                    var b = spec[params[0].dataIndex];
                                    var ww = '280px;';
                                    if (b.length == 1) {
                                        ww = '140px;';
                                    }
                                    for (var j = 0; j < b.length; j++) {
                                        if (b[j].bsflag > 0) {
                                            c += '<div class="fl" style="margin: 0 15px;"><p style="font-size: 14px;">标的A: ' + b[j].codeA + '</p><p style="font-size: 14px;">标的B: ' + b[j].codeB + '</p><p style="font-size: 14px;">交易类型: <span style="color: #ff6701">买入</span></p><p style="font-size: 14px;">标的A价格: ' + b[j].A_price + '</p><p style="font-size: 14px;">标的A量: ' + b[j].A_vol + '</p><p style="font-size: 14px;">标的B价格: ' + b[j].B_price + '</p><p style="font-size: 14px;">标的B量: ' + b[j].B_vol + '</p></div>';
                                        } else if (b[j].bsflag < 0) {
                                            c += '<div class="fl" style="margin: 0 15px;"><p style="font-size: 14px;">标的A: ' + b[j].codeA + '</p><p style="font-size: 14px;">标的B: ' + b[j].codeB + '</p><p style="font-size: 14px;">交易类型: <span style="color: #75d086">卖出</span></p><p style="font-size: 14px;">标的A价格: ' + b[j].A_price + '</p><p style="font-size: 14px;">标的A量: ' + b[j].A_vol + '</p><p style="font-size: 14px;">标的B价格: ' + b[j].B_price + '</p><p style="font-size: 14px;">标的B量: ' + b[j].B_vol + '</p></div>';
                                        } else {
                                            c += '<div class="fl" style="display: flex; justify-content: center;"><p style="font-size: 14px;">无交易</p></div>';
                                        }
                                    }
                                    for (var i = 0; i < params.length; i++) {
                                        if (params[i].seriesName == '组合价差') {
                                            a = params[i].data;
                                        }
                                    }
                                    return '<div style="width: ' + ww + '">' +
                                        '<p style="font-size: 14px;">时间: ' + params[0].axisValue + '</p><p style="font-size: 14px;">组合价差: ' + a + '</p><div class="clearfix" style="margin: 0 auto">' + c + '</div></div>';
                                }
                            },
                            toolbox: {
                                top: 20,
                                left: 'center',
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            legend: {
                                top: 60,
                                right: '0',
                                orient: 'vertical',
                                padding: [10, 0],
                                data: ['上止损点(' + new1[0].toFixed(2) + ')', '上开仓点(' + new2[0].toFixed(2) + ')', '均值(' + new3[0].toFixed(2) + ')', '下开仓点(' + new4[0].toFixed(2) + ')', '下止损点(' + new5[0].toFixed(2) + ')', '组合价差', '标的A交易量', '标的B交易量']
                            },
                            xAxis: [
                                {
                                    show: false,
                                    type: 'category',
                                    boundaryGap: true,
                                    axisTick: {
                                        alignWithLabel: false
                                    },
                                    data: time
                                },
                                {
                                    type: 'category',
                                    gridIndex: 1,
                                    boundaryGap: true,
                                    axisTick: {
                                        alignWithLabel: false
                                    },
                                    data: time
                                },
                                {
                                    show: false,
                                    type: 'category',
                                    gridIndex: 1,
                                    boundaryGap: true,
                                    axisLine: {
                                        onZero: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    axisLabel: {
                                        show: false
                                    },
                                    axisPointer: {
                                        show: false
                                    },
                                    offset: 8,
                                    data: time
                                }],
                            yAxis: [
                                {
                                    type: 'value',
                                    scale: true,
                                    splitLine: {
                                        show: false
                                    }

                                },
                                // {
                                //     type: 'value',
                                //     splitNumber: 1,
                                //     splitLine: {
                                //         show: false
                                //     }
                                // },
                                {
                                    type: 'value',
                                    gridIndex: 1,
                                    boundaryGap: true,
                                    splitLine: {
                                        show: false
                                    }
                                },
                                {
                                    type: 'value',
                                    gridIndex: 1,
                                    position: 'left',
                                    splitLine: {
                                        show: false
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '组合价差',
                                    type: 'line',
                                    itemStyle: {
                                        // color: '#2279F9'
                                        color: '#4b80c1',
                                        opacity: 0
                                    },
                                    areaStyle: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#a5e7fd' // 0% 处的颜色
                                            }, {
                                                offset: 0.8, color: '#fff' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        },
                                        origin: 'start'
                                    },
                                    lineStyle: {
                                        color: '#4b80c1',
                                        width: 1
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: tradeValue
                                },
                                {
                                    name: '买点',
                                    type: 'line',
                                    lineStyle: {
                                        color: 'transparent',
                                        width: 4
                                    },
                                    itemStyle: {
                                        color: '#ff0000'
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 4,
                                    data: buy
                                },
                                {
                                    name: '卖点',
                                    type: 'line',
                                    lineStyle: {
                                        color: 'transparent',
                                        width: 4
                                    },
                                    itemStyle: {
                                        color: '#007100'
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 4,
                                    data: sell
                                },
                                {
                                    name: '无建议',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#ccc',
                                        width: 2,
                                        opacity: 0
                                    },
                                    itemStyle: {
                                        color: '#ccc',
                                        opacity: 0
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: base
                                },
                                {
                                    type: 'effectScatter',
                                    symbol: 'circle',
                                    symbolSize: 7,
                                    rippleEffect: {
                                        scale: 5
                                    },
                                    itemStyle: {
                                        color: tipColor

                                    },
                                    data: [[time[time.length - 1], tradeValue[tradeValue.length - 1]]]
                                },
                                {
                                    name: '标的A交易量',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 2,
                                    data: a_vol
                                },
                                {
                                    name: '标的B交易量',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 2,
                                    data: b_vol
                                },
                                {
                                    name: '上止损点(' + new1[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#777a20',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new1
                                },
                                {
                                    name: '上开仓点(' + new2[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#b30015',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new2
                                },
                                {
                                    name: '均值(' + new3[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#275b8c',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new3
                                },
                                {
                                    name: '下开仓点(' + new4[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#6a1da6',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new4
                                },
                                {
                                    name: '下止损点(' + new5[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#1dac34',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new5
                                }
                            ]
                        };
                        return option;
                    }

                    var online_trade_data = data.trade_data.pairs_name_data;
                    $('.changeTxt').html('交易时间:');
                    $('.end').html(online_trade_data.online_trade_date);
                    var tradeTime = online_trade_data.online_trade_minute;
                    var tradeValue = online_trade_data.online_trade_val;
                    var flag = online_trade_data.online_trade_bsflag;
                    var spec = online_trade_data.prices_vols;
                    var title = online_trade_data.pairs_name;
                    var subtitle = online_trade_data.codeA + ' , ' + online_trade_data.codeB;
                    var new1 = online_trade_data.base_line_data.high_stop_point;
                    var new2 = online_trade_data.base_line_data.high_open_point;
                    var new3 = online_trade_data.base_line_data.meanvalue;
                    var new4 = online_trade_data.base_line_data.low_open_point;
                    var new5 = online_trade_data.base_line_data.low_stop_point;
                    var pair = pairLineOption1(title, subtitle, tradeTime, tradeValue, flag, spec, new1, new2, new3, new4, new5);
                    var pairBox1 = '<div id="trend" style="width: 1140px; height: 500px;"></div>';
                    $('.showChart .pic1').html(pairBox1);
                    var trend = echarts.init(document.getElementById('trend'));
                    trend.setOption(pair, true);
                } else {
                    alert('无数据');
                    clearInterval(pairs);
                }
            }
        });
    }

    function hisPairsAjax() {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: '/strategy/pair_trade_data/' + fir + '/' + sec + '/' + pairname,
            data: {},
            success: function (data) {
                console.log(data);
                if (data.result == 'ok') {

                    //pairLineOption

                    function pairLineOption2(title, time, tradeValue, new1, new2, new3, new4, new5) {
                        var title = '配对名称: ' + title;
                        for (var i = 0; i < time.length; i++) {
                            if (new1.length <= time.length) {
                                new1.push(new1[0]);
                            }
                            if (new2.length <= time.length) {
                                new2.push(new2[0]);
                            }
                            if (new3.length <= time.length) {
                                new3.push(new3[0]);
                            }
                            if (new4.length <= time.length) {
                                new4.push(new4[0]);
                            }
                            if (new5.length <= time.length) {
                                new5.push(new5[0]);
                            }
                        }
                        var option = {
                            animation: false,
                            title: {
                                show: true,
                                id: 'quarticInOut',
                                text: title,
                                textStyle: {
                                    color: '#101010',
                                    fontSize: 20
                                },
                                subtextStyle: {
                                    color: '#535353',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                },
                                left: '20',
                                top: '14'
                            },
                            grid: [{x: '5%', y: '15%', width: '83%', height: '80%'},
                                {x: '5%', y2: '4%', width: '83%', height: '0'}],
                            dataZoom: [
                                {
                                    type: 'inside',
                                    xAxisIndex: [0, 1],
                                    yAxisName: [0, 1, 2]
                                }
                            ],
                            axisPointer: {
                                link: {
                                    xAxisIndex: 'all',
                                    yAxisName: 'all'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            toolbox: {
                                top: 20,
                                left: 'center',
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            legend: {
                                top: 60,
                                right: '0',
                                orient: 'vertical',
                                padding: [10, 0],
                                data: ['上止损点(' + new1[0].toFixed(2) + ')', '上开仓点(' + new2[0].toFixed(2) + ')', '均值(' + new3[0].toFixed(2) + ')', '下开仓点(' + new4[0].toFixed(2) + ')', '下止损点(' + new5[0].toFixed(2) + ')', '组合价差']
                            },
                            xAxis: [
                                {
                                    show: false,
                                    type: 'category',
                                    boundaryGap: true,
                                    axisTick: {
                                        alignWithLabel: false
                                    },
                                    data: time
                                },
                                {
                                    type: 'category',
                                    gridIndex: 1,
                                    boundaryGap: true,
                                    axisTick: {
                                        alignWithLabel: false
                                    },
                                    data: time
                                },
                                {
                                    show: false,
                                    type: 'category',
                                    gridIndex: 1,
                                    boundaryGap: true,
                                    axisLine: {
                                        onZero: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    axisLabel: {
                                        show: false
                                    },
                                    axisPointer: {
                                        show: false
                                    },
                                    offset: 8,
                                    data: time
                                }],
                            yAxis: [
                                {
                                    type: 'value',
                                    scale: true,
                                    splitLine: {
                                        show: false
                                    }

                                },
                                {
                                    type: 'value',
                                    gridIndex: 1,
                                    boundaryGap: true,
                                    splitLine: {
                                        show: false
                                    }
                                },
                                {
                                    type: 'value',
                                    gridIndex: 1,
                                    position: 'left',
                                    splitLine: {
                                        show: false
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '组合价差',
                                    type: 'line',
                                    itemStyle: {
                                        // color: '#2279F9'
                                        color: '#4b80c1',
                                        opacity: 0
                                    },
                                    areaStyle: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#a5e7fd' // 0% 处的颜色
                                            }, {
                                                offset: 0.8, color: '#fff' // 100% 处的颜色
                                            }],
                                            globalCoord: false // 缺省为 false
                                        },
                                        origin: 'start'
                                    },
                                    lineStyle: {
                                        color: '#4b80c1',
                                        width: 1
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: tradeValue
                                },
                                {
                                    name: '上止损点(' + new1[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#777a20',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new1
                                },
                                {
                                    name: '上开仓点(' + new2[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#b30015',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new2
                                },
                                {
                                    name: '均值(' + new3[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#275b8c',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new3
                                },
                                {
                                    name: '下开仓点(' + new4[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#6a1da6',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new4
                                },
                                {
                                    name: '下止损点(' + new5[0].toFixed(2) + ')',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#1dac34',
                                        width: 1,
                                        type: 'dashed',
                                        opacity: 0.5
                                    },
                                    itemStyle: {
                                        opacity: 0
                                    },
                                    data: new5
                                }
                            ]
                        };
                        return option;
                    }

                    var his_realtime_data = data.trade_data.pairs_name_data;
                    var tradeTime = his_realtime_data.his_realtime_data.date;
                    var tradeValue = his_realtime_data.his_realtime_data.value;
                    var title = his_realtime_data.his_realtime_data.pairs_name;
                    var new1 = his_realtime_data.base_line_data.high_stop_point;
                    var new2 = his_realtime_data.base_line_data.high_open_point;
                    var new3 = his_realtime_data.base_line_data.meanvalue;
                    var new4 = his_realtime_data.base_line_data.low_open_point;
                    var new5 = his_realtime_data.base_line_data.low_stop_point;
                    var pair = pairLineOption2(title, tradeTime, tradeValue, new1, new2, new3, new4, new5);
                    var pairBox2 = '<div id="his" style="width: 1140px; height: 500px;"></div>';
                    $('.showChart .pic2').html(pairBox2);
                    var his = echarts.init(document.getElementById('his'));
                    his.setOption(pair, true);
                    form.render();
                }
            }
        });
    }

    if (data.strategy_info.strategy_info[0].stra_type == "AI_PAIRS") {
        var form = layui.form;
        positionType = '期货持仓占比';
        $('.showChart').show();
        $('.tableBottom').eq(0).hide();
        var pairss;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: '/strategy/pair_trade_data/' + fir + '/' + sec + '/' + pairname,
            data: {},
            success: function (data) {
                console.log(data);
                if (data.result == 'ok') {

                    var option = '';
                    var pairList = data.trade_data.all_pairs_names;
                    pairname = pairList[0];
                    for (var i = 0; i < pairList.length; i++) {
                        option += '<option value="' + pairList[i] + '">' + pairList[i] + '</option>'
                    }
                    $('select[name=pairChange]').html(option);
                    form.render();
                }
            }
        });
        pairsAjax();
        hisPairsAjax();
        clearInterval(pairss);
        pairss = setInterval(function () {
            if (new Date().getSeconds() == 5) {
                if (CompareDate("9:00", new Date().getHours() + ":" + new Date().getMinutes(), "23:30") == 'ok') {
                    pairsAjax();
                }
            }
        }, 1000);
        form.on('select(pairChange)', function (data) {
            if (data.value != pairname) {
                pairname = data.value;
                pairsAjax();
                hisPairsAjax();
            }
        });
    } else {
        $('.showChart').hide();
        $('.tableBottom').eq(0).show();
        clearInterval(pairss);
    }
    $('.layui-tab').show();
    $('.current').show();
    $('.layui-icon-loading').hide();
    var part2 = data.command;
    var part3 = data.performance;
    var sopt_day_holding = part3.sopt_day_holding;
    var target_holding = part2.target_holding;
    var rate_return = part3.rate_return;
    //pie
    var piearr = [];
    var piename = [];
    var newholding = [];
    var other = 0;
    var color = ['#2f4554', '#c23531', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
    var HH = '40%';
    if ($('body').width() < 900) {
        HH = '56%';
    }

    function drawPie(name, arr) {
        var option = {
            title: {
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            legend: {
                //orient: 'vertical',
                bottom: 0,
                // left: '30%',
                // top: '33.3333%',
                data: name
            },
            series: [
                {
                    name: '现货日终持仓',
                    type: 'pie',
                    radius: '50%',
                    center: ['54%', HH],
                    startAngle: 200,
                    clockwise: false,
                    labelLine: {
                        length: 40,
                        smooth: true
                    },
                    data: arr
                }
            ]
        };
        return option
    }

    for (var i = 0; i < sopt_day_holding.length; i++) {
        if (i >= 0 && i < 20) {
            newholding.push(sopt_day_holding[i]);
        } else {
            other = other + Number(sopt_day_holding[i].position_ratio);
        }
    }
    if (sopt_day_holding.length > 20) {
        other = other.toFixed(2);
        piearr.push({
            name: '其他',
            value: other,
            itemStyle: {
                color: color[0]
            }
        });
        piename.push('其他');
    }
    $.each(newholding, function (i) {
        piearr.push({
            name: newholding[i].code_name,
            value: newholding[i].position_ratio,
            itemStyle: {
                color: color[i + 1]
            }
        });
    });
    for (var i = 0; i < newholding.length; i++) {
        $.each(newholding[i], function (key, val) {
            if (piename.indexOf(key) == '-1') {
                if (key == 'code_name') {
                    piename.push(val);
                }
            }
        });
    }
    var sopt_day_holding2 = echarts.init(document.getElementById('sopt_day_holding2'));

    var piearr1 = [];
    var piename1 = [];
    var newholding1 = [];
    var other1 = 0;
    for (var i = 0; i < target_holding.length; i++) {
        if (i >= 0 && i < 20) {
            newholding1.push(target_holding[i]);
        } else {
            other1 = other1 + Number(target_holding[i].target_ratio);
        }
    }
    if (target_holding.length > 20) {
        if (url != 'current_ajax') {
            other1 = other1.toFixed(2);
            piearr1.push({
                name: '其他',
                value: other1,
                itemStyle: {
                    color: color[0]
                }
            });
            piename1.push('其他');
        }
    }
    $.each(newholding1, function (i) {
        piearr1.push({
            name: newholding1[i].security_name,
            value: newholding1[i].target_ratio,
            itemStyle: {
                color: color[i + 1]
            }
        });
    });
    for (var i = 0; i < newholding1.length; i++) {
        $.each(newholding1[i], function (key, val) {
            if (piename1.indexOf(key) == '-1') {
                if (key == 'security_name') {
                    piename1.push(val);
                }
            }
        });
    }
    var target_holding2 = echarts.init(document.getElementById('target_holding2'));
    if (auth != 0) {
        if (sopt_day_holding.length == 0) {
            $('.sopt_day_holding2').hide();
        } else {
            sopt_day_holding2.setOption(drawPie(piename, piearr), true);
            $('.sopt_day_holding2').show();
        }
    } else {
        $('.sopt_day_holding2').hide();
    }
    if (target_holding.length == 0) {
        $('.target_holding2').hide();
        $('.target_holding').css('width', '100%');
    } else {
        target_holding2.setOption(drawPie(piename1, piearr1), true);
        $('.target_holding').css('width', 'unset');
        $('.target_holding2').show();
    }

    //line
    function lineOption(title, data, series) {
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    var option = '';
                    constTime = params[0].axisValue;
                    for (var i = 0; i < params.length; i++) {
                        option += '<p style="font-size: 14px; margin: 5px 0;">' + params[i].seriesName + ':' + params[i].value + '</p>'
                    }
                    return params[0].axisValue + '</br>' + option
                }
            },
            legend: {
                data: title
            },
            xAxis: {
                show: false,
                type: 'category',
                data: data
            },
            yAxis: {
                type: 'value',
                scale: true,
                name: "净值曲线",
                nameLocation: 'middle',
                nameGap: '40'
            },
            color: ['#1f76b4', '#d62828', '#8c564b', '#ff7f0e', '#9466bd', '#e47fc5', '#2ca02d'],
            series: series
        };
        return option;
    }

    if (rate_return.length == 0 || rate_return.pic_1.length == 0 && rate_return.pic_2.length == 0) {
        $('.rate_return').hide();
    } else {
        $('.rate_return').show();
        rateR = rate_return.pic_1.pic_date;
        var title1 = rate_return.pic_1.pic_names;
        var data1 = rate_return.pic_1.pic_date;
        var series1 = [];
        for (var i = 0; i < rate_return.pic_1.pic_data.length; i++) {
            series1.push({
                name: rate_return.pic_1.pic_names[i],
                type: 'line',
                data: rate_return.pic_1.pic_data[i]
            })
        }
        var title2 = rate_return.pic_2.pic_names;
        var data2 = rate_return.pic_2.pic_date;
        var series2 = [];
        for (var i = 0; i < rate_return.pic_2.pic_data.length; i++) {
            series2.push({
                name: rate_return.pic_2.pic_names[i],
                type: 'line',
                data: rate_return.pic_2.pic_data[i]
            })
        }
        var option2 = lineOption(title1, data1, series1);
        var option3 = lineOption(title2, data2, series2);
        for (var i = 0; i < rate_return.pic_1.position_pic_data.length; i++) {
            rate_return.pic_1.position_pic_data[i]['type'] = 'bar';
            rate_return.pic_1.position_pic_data[i]['stack'] = '总量';
            rate_return.pic_1.position_pic_data[i]['label'] = '{normal: {show: true}';
        }
        for (var i = 0; i < rate_return.pic_2.position_pic_data.length; i++) {
            rate_return.pic_2.position_pic_data[i]['type'] = 'bar';
            rate_return.pic_2.position_pic_data[i]['stack'] = '总量';
            rate_return.pic_2.position_pic_data[i]['label'] = '{normal: {show: true}';
        }
        var option4 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['权益', '固收', '商品', '现金'],
                bottom: 0
            },
            xAxis: {
                type: 'category',
                data: rate_return.pic_1.pic_date,
            },
            yAxis: {
                type: 'value',
                name: positionType,
                nameLocation: 'middle',
                nameGap: '40',
                max: 1,
                min: 0
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },
            color: ['#1f76b4', '#ff7f0e', '#2ca02d', '#d62828'],
            series: rate_return.pic_1.position_pic_data
        };
        var option5 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['权益', '固收', '商品', '现金'],
                bottom: 0
            },
            xAxis: {
                type: 'category',
                data: rate_return.pic_2.pic_date
            },
            yAxis: {
                type: 'value',
                name: positionType,
                nameLocation: 'middle',
                nameGap: '40',
                max: 1,
                min: 0
            },
            color: ['#1f76b4', '#ff7f0e', '#2ca02d', '#d62828'],
            series: rate_return.pic_2.position_pic_data
        };
        var rate_return1 = echarts.init(document.getElementById('rate_return1'));
        var rate_return2 = echarts.init(document.getElementById('rate_return2'));
        var barchart1 = echarts.init(document.getElementById('barchart1'));
        var barchart2 = echarts.init(document.getElementById('barchart2'));
        if (rate_return.pic_1.pic_data[0] != null || rate_return.pic_1.pic_data[1] != null) {
            rate_return1.setOption(option2, true);
        }
        rate_return2.setOption(option3, true);
        barchart1.setOption(option4, true);
        barchart2.setOption(option5, true);
    }
    if (data.portfolio_data) {
        var part4 = data.portfolio_data;
        var rate_return_new = part4;
        if (rate_return_new.pic_1 && rate_return_new.pic_2) {
            $('.rate_return_new').show();
            rateRN = rate_return_new.pic_1.pic_date;
            var title3 = rate_return_new.pic_1.pic_names;
            var data3 = rate_return_new.pic_1.pic_date;
            var series3 = [];
            for (var i = 0; i < rate_return_new.pic_1.pic_data.length; i++) {
                series3.push({
                    name: rate_return_new.pic_1.pic_names[i],
                    type: 'line',
                    data: rate_return_new.pic_1.pic_data[i]
                })
            }
            var title4 = rate_return_new.pic_2.pic_names;
            var data4 = rate_return_new.pic_2.pic_date;
            var series4 = [];
            for (var i = 0; i < rate_return_new.pic_2.pic_data.length; i++) {
                series4.push({
                    name: rate_return_new.pic_2.pic_names[i],
                    type: 'line',
                    data: rate_return_new.pic_2.pic_data[i]
                })
            }
            var option6 = lineOption(title3, data3, series3);
            var option7 = lineOption(title4, data4, series4);
            for (var i = 0; i < rate_return_new.pic_1.position_pic_data.length; i++) {
                rate_return_new.pic_1.position_pic_data[i]['type'] = 'bar';
                rate_return_new.pic_1.position_pic_data[i]['stack'] = '总量';
                rate_return_new.pic_1.position_pic_data[i]['label'] = '{normal: {show: true}';
            }
            for (var i = 0; i < rate_return_new.pic_2.position_pic_data.length; i++) {
                rate_return_new.pic_2.position_pic_data[i]['type'] = 'bar';
                rate_return_new.pic_2.position_pic_data[i]['stack'] = '总量';
                rate_return_new.pic_2.position_pic_data[i]['label'] = '{normal: {show: true}';
            }
            var option8 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['权益', '固收', '商品', '现金'],
                    bottom: 0
                },
                xAxis: {
                    type: 'category',
                    data: rate_return_new.pic_1.pic_date,
                },
                yAxis: {
                    type: 'value',
                    name: positionType,
                    nameLocation: 'middle',
                    nameGap: '40',
                    max: 1,
                    min: 0
                },
                color: ['#1f76b4', '#ff7f0e', '#2ca02d', '#d62828'],
                series: rate_return_new.pic_1.position_pic_data
            };
            var option9 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['权益', '固收', '商品', '现金'],
                    bottom: 0
                },
                xAxis: {
                    type: 'category',
                    data: rate_return_new.pic_2.pic_date
                },
                yAxis: {
                    type: 'value',
                    name: positionType,
                    nameLocation: 'middle',
                    nameGap: '40',
                    max: 1,
                    min: 0
                },
                color: ['#1f76b4', '#ff7f0e', '#2ca02d', '#d62828'],
                series: rate_return_new.pic_2.position_pic_data
            };
            var rate_return3 = echarts.init(document.getElementById('rate_return3'));
            var rate_return4 = echarts.init(document.getElementById('rate_return4'));
            var barchart3 = echarts.init(document.getElementById('barchart3'));
            var barchart4 = echarts.init(document.getElementById('barchart4'));
            if (rate_return_new.pic_1.pic_data[0] != null || rate_return_new.pic_1.pic_data[1] != null) {
                rate_return3.setOption(option6, true);
            }
            rate_return4.setOption(option7, true);
            barchart3.setOption(option8, true);
            barchart4.setOption(option9, true);
        } else {
            $('.rate_return_new').hide();
        }
    }
    var table = layui.table;
    $('canvas').on('click', function (e) {
        if ($(this).parent().parent().hasClass('rate_return1') || $(this).parent().parent().hasClass('rate_return2')) {
            var offsetX = e.pageX - $(this).offset().left;
            var offsetY = e.pageY - $(this).offset().top;
            if (offsetX >= 56 && offsetX <= 504 && offsetY >= 60 && offsetY <= 234) {
                console.log(offsetX, offsetY);
                var lastDate = '';
                var his = 0;
                var h4 = $(this).parent().parent().parent().parent().find('h4').html();
                var popH = '890px';
                var ww = 540;
                if (h4 == '净值曲线') {
                    his = 0;
                    var eq = rateR.indexOf(constTime);
                    if (eq == 0) {
                        lastDate = constTime;
                    } else {
                        lastDate = rateR[eq - 1];
                    }
                } else {
                    his = 1;
                    var eq = rateRN.indexOf(constTime);
                    if (eq == 0) {
                        lastDate = constTime;
                    } else {
                        lastDate = rateRN[eq - 1];
                    }
                }
                var alldata = {
                    "date": constTime,
                    "lastDate": lastDate,
                    "env": fir,
                    "strategy": sec,
                    "history": his
                };
                console.log(alldata);
                $('.pop').html('');
                layer.open({
                    title: alldata.date,
                    area: '1140px',
                    offset: '0',
                    fixed: false,
                    shadeClose: true,
                    content: '<div class="pop"><div class="popLoad"></div></div>',
                    success: function () {
                        $.ajax({
                            type: "POST",
                            url: '/strategy/pic_trade_data/',
                            data: JSON.stringify(alldata),
                            success: function (data) {
                                if (data.result == 'ok') {
                                    var resultData = data.data;
                                    console.log(resultData);
                                    var option = '<div class="tableBottom clearfix" style="margin-bottom: 20px;">\n' +
                                        '        <div class="fl" style="margin-bottom: 20px;">\n' +
                                        '            <h4>当日策略总览</h4>\n' +
                                        '            <table id="strategy_pandect" lay-filter="strategy_pandect"></table>\n' +
                                        '        </div>\n' +
                                        '        <div class="fr">\n' +
                                        '            <h4>当日各系统资产总览</h4>\n' +
                                        '            <table id="strategy_overview_pandect" lay-filter="strategy_overview_pandect"></table>\n' +
                                        '        </div>\n' +
                                        '    </div>\n' +
                                        '    <div class="tableBottom clearfix" style="margin-bottom: 20px;">\n' +
                                        '        <div class="fl">\n' +
                                        '            <h4>当日交易</h4>\n' +
                                        '            <table id="pic_trade_data" lay-filter="pic_trade_data"></table>\n' +
                                        '        </div>\n' +
                                        '    </div>\n' +
                                        '    <div class="tableBottom clearfix">\n' +
                                        '        <div class="fl">\n' +
                                        '            <h4>现货日终持仓</h4>\n' +
                                        '            <table id="sopt_day_holdingPOP" lay-filter="sopt_day_holdingPOP"></table>\n' +
                                        '        </div>\n' +
                                        '        <div class="fr">\n' +
                                        '            <h4>期货日终持仓</h4>\n' +
                                        '            <table id="future_day_holdingPOP" lay-filter="future_day_holdingPOP"></table>\n' +
                                        '        </div>\n' +
                                        '    </div>';
                                    $('.pop').html(option);
                                    if (resultData.today_position.cash.length > 0) {
                                        for (var i = 0; i < resultData.today_position.cash.length; i++) {
                                            if (resultData.today_position.cash[i]['code_name'] == '现金') {
                                                var totalCount1 = resultData.today_position.cash[i];
                                                resultData.today_position.cash.splice(i, 1);
                                                resultData.today_position.cash.push(totalCount1);
                                            }
                                        }
                                    }
                                    if (resultData.today_position.cash.length == 0 && resultData.today_position.future.length == 0) {
                                        $('#sopt_day_holdingPOP').parent('div').hide();
                                        $('#future_day_holdingPOP').parent('div').hide();
                                        ww = 1100
                                    } else if (resultData.today_position.future.length == 0 && resultData.today_position.cash.length != 0) {
                                        $('#sopt_day_holdingPOP').parent('div').show();
                                        $('#future_day_holdingPOP').parent('div').hide();
                                        ww = 1100
                                    } else if (resultData.today_position.future.length != 0 && resultData.today_position.cash.length == 0) {
                                        $('#sopt_day_holdingPOP').parent('div').hide();
                                        $('#future_day_holdingPOP').parent('div').show();
                                        ww = 1100
                                    } else {
                                        $('#sopt_day_holdingPOP').parent('div').show();
                                        $('#future_day_holdingPOP').parent('div').show();
                                        ww = 540;
                                    }
                                    table.render({
                                        elem: '#strategy_pandect',
                                        width: 600,
                                        skin: 'nob',
                                        even: true,
                                        size: 'lg',
                                        data: resultData.strategy_pandect,
                                        limit: resultData.strategy_pandect.length,
                                        cols: [[{field: 'pctchange', title: '账户盈亏(%)', align: 'center', unresize: true}
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
                                        elem: '#strategy_overview_pandect',
                                        width: 1100,
                                        skin: 'nob',
                                        even: true,
                                        size: 'lg',
                                        data: resultData.strategy_overview_pandect,
                                        limit: resultData.strategy_overview_pandect.length,
                                        cols: [[
                                            {field: 'trading_sys', title: '交易系统', align: 'center', unresize: true}
                                            , {field: 'pctchange', title: '系统盈亏(%)', align: 'center', unresize: true}
                                            , {field: 'account_earn', title: '系统盈亏', align: 'center', unresize: true}
                                            , {
                                                field: 'total_asset',
                                                title: '总资产',
                                                align: 'center',
                                                edit: 'text',
                                                unresize: true
                                            }
                                            , {
                                                field: 'position_asset',
                                                title: '持仓市值',
                                                align: 'center',
                                                edit: 'text',
                                                unresize: true
                                            }
                                            , {
                                                field: 'cash',
                                                title: '现金',
                                                align: 'center',
                                                edit: 'text',
                                                unresize: true
                                            }
                                            , {
                                                field: 'security_type',
                                                title: '标的类型',
                                                align: 'center',
                                                width: 120,
                                                unresize: true
                                            }
                                        ]]
                                    });
                                    table.render({
                                        elem: '#sopt_day_holdingPOP'
                                        , width: ww
                                        , skin: 'nob'
                                        , even: true
                                        , size: 'lg'
                                        , data: resultData.today_position.cash
                                        , limit: resultData.today_position.cash.length
                                        , cols: [[
                                            {field: 'code', title: '标的代码', align: 'center', unresize: true}
                                            , {
                                                field: 'code_name',
                                                title: '标的名称',
                                                align: 'center',
                                                unresize: true
                                            }
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
                                            , {
                                                field: 'position_ratio',
                                                title: '市值占比(%)',
                                                align: 'center',
                                                unresize: true
                                            }
                                        ]]
                                    });
                                    table.render({
                                        elem: '#future_day_holdingPOP'
                                        , width: ww
                                        , skin: 'nob'
                                        , even: true
                                        , size: 'lg'
                                        , data: resultData.today_position.future
                                        , limit: resultData.today_position.future.length
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
                                            , {
                                                field: 'future_ratio',
                                                title: '保证金占比(%)',
                                                align: 'center',
                                                unresize: true
                                            }
                                        ]]
                                    });
                                    table.render({
                                        elem: '#pic_trade_data',
                                        width: 1100,
                                        skin: 'nob',
                                        even: true,
                                        size: 'lg',
                                        data: resultData.trade_ep_data,
                                        limit: resultData.trade_ep_data.length,
                                        cols: [[{field: 'code', title: '标的代码', align: 'center', unresize: true}
                                            , {field: 'code_name', title: '标的名称', align: 'center', unresize: true}
                                            , {
                                                field: 'yesterday_ep_asset',
                                                title: '昨日持仓',
                                                align: 'center',
                                                unresize: true
                                            }
                                            , {
                                                field: 'yesterday_ep_nums',
                                                title: '昨日持仓数量',
                                                align: 'center',
                                                unresize: true
                                            }
                                            , {
                                                field: 'today_ep_asset',
                                                title: '今日持仓市值',
                                                align: 'center',
                                                unresize: true
                                            }
                                            , {
                                                field: 'today_ep_nums',
                                                title: '今日持仓数量',
                                                align: 'center',
                                                unresize: true
                                            }
                                            , {
                                                field: 'trade_type',
                                                title: '交易类型',
                                                align: 'center',
                                                unresize: true
                                            }
                                            , {
                                                field: 'today_trade_asset',
                                                title: '今日成交',
                                                align: 'center',
                                                unresize: true
                                            }
                                            , {
                                                field: 'today_trade_nums',
                                                title: '成交数量',
                                                align: 'center',
                                                unresize: true
                                            }
                                        ]]
                                    });
                                } else {
                                    $('.pop').html('没有数据');
                                }
                            }
                        });
                    }
                });
            }
        }
    });
}