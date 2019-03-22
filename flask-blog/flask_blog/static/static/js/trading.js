$(document).ready(function () {
    layui.use(['layer'], function () {
        var code = '600030.SH';
        var oldCode = '';

        function CompareDate(t1, t2, t3) {
            var date = new Date();
            var a = t1.split(":");
            var b = t2.split(":");
            var c = t3.split(":");
            if (date.setHours(a[0], a[1]) < date.setHours(b[0], b[1]) && date.setHours(b[0], b[1]) < date.setHours(c[0], c[1])) {
                return 'ok';
            }

        }

        function toAjax() {
            $.ajax({
                type: "POST",
                dataType: "json",
                url: '/strategy/ai_trading_data/',
                data: JSON.stringify({
                    "code": code
                }),
                success: function (data) {
                    console.log(data);
                    $('.charts').show();
                    $('.waiting').hide();

                    //buy & sell
                    function share(title, color, data) {
                        var option = {
                            title: {
                                text: title,
                                textStyle: {
                                    color: color,
                                    align: 'left'
                                },
                                left: '20',
                                top: '10'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            xAxis: {
                                type: 'category',
                                data: ['10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00']
                            },
                            yAxis: {
                                type: 'value',
                                nameLocation: 'middle',
                                nameGap: '40'
                            },
                            series: [
                                {
                                    type: 'bar',
                                    itemStyle: {
                                        color: color
                                    },
                                    name: title,
                                    data: data
                                }
                            ]
                        };
                        return option
                    }

                    //line
                    function lineOption(time, lineData1, lineData2, barData, min, max) {
                        var strongBuy = [];
                        var buy = [];
                        var sell = [];
                        var strongSell = [];
                        var base = [];
                        var title = '';
                        var titleColor = '';
                        var tipColor = '';
                        for (var i = 0; i < barData.length; i++) {
                            if (barData[i] == 2) {
                                title = '强力推荐买入';
                                titleColor = '#cc0009';
                            } else if (barData[i] == 1) {
                                title = '买点';
                                titleColor = '#bd4f5b';
                            } else if (barData[i] == 0) {
                                title = '无建议';
                                titleColor = '#888888';
                            } else if (barData[i] == -1) {
                                title = '卖点';
                                titleColor = '#4d945e';
                            } else if (barData[i] == -2) {
                                title = '强力推荐卖出';
                                titleColor = '#024205';
                            }
                            tipColor = titleColor;
                            if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "14:59") != 'ok') {
                                tipColor = 'transparent'
                            }
                            if (barData[i] == 2) {
                                if (barData[i] != barData[i - 1] && barData[i - 1] != barData[i + 1] && i - 1 >= 0) {
                                    strongBuy.push(lineData1[i]);
                                    if (barData[i - 1] == 1) {
                                        buy.push(lineData1[i]);
                                        sell.push('-');
                                        strongSell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == -1) {
                                        sell.push(lineData1[i]);
                                        buy.push('-');
                                        strongSell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == -2) {
                                        strongSell.push(lineData1[i]);
                                        buy.push('-');
                                        sell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == 0) {
                                        base.push(lineData1[i]);
                                        buy.push('-');
                                        sell.push('-');
                                        strongSell.push('-');
                                    }
                                } else {
                                    strongBuy.push(lineData1[i]);
                                    buy.push('-');
                                    sell.push('-');
                                    strongSell.push('-');
                                    base.push('-');
                                }
                            } else if (barData[i] == 1) {
                                if (barData[i] != barData[i - 1] && barData[i - 1] != barData[i + 1] && i - 1 >= 0) {
                                    buy.push(lineData1[i]);
                                    if (barData[i - 1] == 2) {
                                        strongBuy.push(lineData1[i]);
                                        sell.push('-');
                                        strongSell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == -1) {
                                        sell.push(lineData1[i]);
                                        strongBuy.push('-');
                                        strongSell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == -2) {
                                        strongSell.push(lineData1[i]);
                                        strongBuy.push('-');
                                        sell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == 0) {
                                        base.push(lineData1[i]);
                                        strongBuy.push('-');
                                        sell.push('-');
                                        strongSell.push('-');
                                    }
                                } else {
                                    buy.push(lineData1[i]);
                                    strongBuy.push('-');
                                    sell.push('-');
                                    strongSell.push('-');
                                    base.push('-');
                                }
                            } else if (barData[i] == -1) {
                                if (barData[i] != barData[i - 1] && barData[i - 1] != barData[i + 1] && i - 1 >= 0) {
                                    sell.push(lineData1[i]);
                                    if (barData[i - 1] == 2) {
                                        strongBuy.push(lineData1[i]);
                                        buy.push('-');
                                        strongSell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == 1) {
                                        buy.push(lineData1[i]);
                                        strongBuy.push('-');
                                        strongSell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == -2) {
                                        strongSell.push(lineData1[i]);
                                        strongBuy.push('-');
                                        buy.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == 0) {
                                        base.push(lineData1[i]);
                                        strongBuy.push('-');
                                        buy.push('-');
                                        strongSell.push('-');
                                    }
                                } else {
                                    sell.push(lineData1[i]);
                                    strongBuy.push('-');
                                    buy.push('-');
                                    strongSell.push('-');
                                    base.push('-');
                                }
                            } else if (barData[i] == -2) {
                                if (barData[i] != barData[i - 1] && barData[i - 1] != barData[i + 1] && i - 1 >= 0) {
                                    strongSell.push(lineData1[i]);
                                    if (barData[i - 1] == 1) {
                                        buy.push(lineData1[i]);
                                        strongBuy.push('-');
                                        sell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == -1) {
                                        sell.push(lineData1[i]);
                                        strongBuy.push('-');
                                        buy.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == 2) {
                                        strongBuy.push(lineData1[i]);
                                        buy.push('-');
                                        sell.push('-');
                                        base.push('-');
                                    } else if (barData[i - 1] == 0) {
                                        base.push(lineData1[i]);
                                        strongBuy.push('-');
                                        buy.push('-');
                                        sell.push('-');
                                    }
                                } else {
                                    strongSell.push(lineData1[i]);
                                    strongBuy.push('-');
                                    buy.push('-');
                                    sell.push('-');
                                    base.push('-');
                                }
                            } else {
                                if (barData[i] != barData[i - 1] && barData[i - 1] != barData[i + 1] && i - 1 >= 0) {
                                    base.push(lineData1[i]);
                                    if (barData[i - 1] == 1) {
                                        buy.push(lineData1[i]);
                                        strongBuy.push('-');
                                        sell.push('-');
                                        strongSell.push('-');
                                    } else if (barData[i - 1] == -1) {
                                        sell.push(lineData1[i]);
                                        strongBuy.push('-');
                                        buy.push('-');
                                        strongSell.push('-');
                                    } else if (barData[i - 1] == 2) {
                                        strongBuy.push(lineData1[i]);
                                        buy.push('-');
                                        sell.push('-');
                                        strongSell.push('-');
                                    } else if (barData[i - 1] == -2) {
                                        strongSell.push(lineData1[i]);
                                        strongBuy.push('-');
                                        buy.push('-');
                                        sell.push('-');
                                    }
                                } else {
                                    base.push(lineData1[i]);
                                    strongBuy.push('-');
                                    buy.push('-');
                                    sell.push('-');
                                    strongSell.push('-');
                                }
                            }
                        }
                        var option = {
                            title: {
                                show: true,
                                id: 'quarticInOut',
                                text: data.date_data + ' ' + time[time.length - 1] + '  ' + data.security_name,
                                subtext: title,
                                textStyle: {
                                    color: '#101010',
                                    fontSize: 20
                                },
                                subtextStyle: {
                                    color: titleColor,
                                    fontWeight: 'bold',
                                    fontSize: 24
                                },
                                left: '20',
                                top: '40'
                            },
                            grid: {
                                left: '2%',
                                right: '2%',
                                top: '33%',
                                containLabel: true
                            },
                            dataZoom: [
                                {
                                    type: 'slider'
                                },
                                {
                                    type: 'inside'
                                }
                            ],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                },
                                formatter: function (params) {
                                    var a = '--';
                                    var b = '--';
                                    var c = '--';
                                    for (var i = 0; i < params.length; i++) {
                                        if (params[i].seriesName == '现价曲线') {
                                            a = params[i].data;
                                        } else if (params[i].seriesName == '均值线') {
                                            b = params[i].data
                                        } else if (barData[params[i].dataIndex] == 2) {
                                            c = '强力推荐买入'
                                        } else if (barData[params[i].dataIndex] == 1) {
                                            c = '买点'
                                        } else if (barData[params[i].dataIndex] == 0) {
                                            c = '无建议'
                                        } else if (barData[params[i].dataIndex] == -1) {
                                            c = '卖点'
                                        } else if (barData[params[i].dataIndex] == -2) {
                                            c = '强力推荐卖出'
                                        }
                                    }
                                    return '时间:' + params[0].axisValue + '</br>'
                                        + '现价曲线:' + a + '</br>'
                                        + '均值线:' + b + '</br>'
                                        + '涨跌预测:' + c + '</br>'
                                }
                            },
                            toolbox: {
                                top: 70,
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
                                top: 110,
                                data: ['现价曲线', '均值线', '买点', '卖点']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    axisLine: {
                                        onZero: false
                                    },
                                    axisTick: {
                                        alignWithLabel: false
                                    },
                                    data: time
                                }],
                            yAxis: [
                                {
                                    type: 'value',
                                    min: (min - min / 100 * 0.01).toFixed(2),
                                    max: (max + max / 100 * 0.01).toFixed(2),
                                    splitLine: {
                                        show: false
                                    }
                                },
                                {
                                    type: 'value',
                                    min: ((data.max_data - data.close_price) * 100 / data.close_price).toFixed(2),
                                    max: ((data.min_data - data.close_price) * 100 / data.close_price).toFixed(2),
                                    axisLabel: {
                                        formatter: function (value) {
                                            return value + '%';
                                        }
                                    },
                                    splitNumber: 1,
                                    splitLine: {
                                        show: false
                                    }
                                }],
                            series: [
                                {
                                    name: '现价曲线',
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
                                    data: lineData1
                                },
                                {
                                    name: '均值线',
                                    type: 'line',
                                    itemStyle: {
                                        color: '#f7c54f',
                                        opacity: 0
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: lineData2
                                },
                                {
                                    name: '强力推荐买入',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#ff0000',
                                        width: 8
                                    },
                                    itemStyle: {
                                        color: '#ff0000'
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: strongBuy
                                },
                                {
                                    name: '买点',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#ff0000',
                                        width: 4
                                    },
                                    itemStyle: {
                                        color: '#ff0000'
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: buy
                                },
                                {
                                    name: '卖点',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#007100',
                                        width: 4
                                    },
                                    itemStyle: {
                                        color: '#007100'
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: sell
                                },
                                {
                                    name: '强力推荐卖出',
                                    type: 'line',
                                    lineStyle: {
                                        color: '#007100',
                                        width: 8
                                    },
                                    itemStyle: {
                                        color: '#007100'
                                    },
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 8,
                                    data: strongSell
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
                                    data: [[time[time.length - 1], lineData1[lineData1.length - 1]]]
                                }
                            ]
                        };
                        return option;
                    }

                    if (data.avg_line_data.length == 0 || data.b_share_ratio.length == 0 || data.flag_line_data.length == 0 || data.max_data.length == 0 || data.min_data.length == 0 || data.new_line_data.length == 0 || data.s_share_ratio.length == 0 || data.time_data.length == 0) {
                        layer.open({
                            title: '警告'
                            ,
                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">没有数据</p>'
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
                        code = oldCode;
                        $('#search1').val(code);
                    } else {

                        var buyTitle = '买入份额占比', buyColor = '#bd1f00',
                            buyData = data.b_share_ratio;
                        var sellTitle = '卖出份额占比', sellColor = '#31642b',
                            sellData = data.s_share_ratio;
                        var buy = echarts.init(document.getElementById('buy'));
                        var sell = echarts.init(document.getElementById('sell'));
                        var lineTime = data.time_data;
                        var lineSeries1 = data.new_line_data;
                        var lineSeries2 = data.avg_line_data;
                        var barSeries = data.flag_line_data;
                        var lineOption = lineOption(lineTime, lineSeries1, lineSeries2, barSeries, data.min_data, data.max_data);
                        var trend = echarts.init(document.getElementById('trend'));
                        //buy.setOption(share(buyTitle, buyColor, buyData), true);
                        //sell.setOption(share(sellTitle, sellColor, sellData), true);
                        trend.setOption(lineOption, true);
                    }
                }
            });
        }

        toAjax();
        setInterval(function () {
            if (new Date().getSeconds() == 5) {
                if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "15:00") == 'ok') {
                    toAjax();
                }
            }
        }, 1000);
        $(".input-bar").keypress(function (event) {
            if (event.keyCode == 13) {
                $('#search_btn').click();
                return false
            }
        });
        $('#search_btn').on('click', function () {
            var input_val = $('#search1').val();
            $('#search_btn').attr('id', 'search_btn1');
            if (input_val != '') {
                oldCode = code;
                code = input_val;
                console.log(code);
                $('.charts').hide();
                $('.waiting').show();
                toAjax();
            } else {
                layer.open({
                    title: '警告'
                    ,
                    content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">输入有误</p>'
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
            setTimeout(function () {
                $('#search_btn1').attr('id', 'search_btn');
            }, 2000)
        })
    })
});