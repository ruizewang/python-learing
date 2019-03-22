$(document).ready(function () {
    layui.use(['layer', 'code'], function () {
        var code = '600030.SH';
        var oldCode = '';
        layui.code();

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
                url: '/strategy/expert_advisor_ajax/',
                data: JSON.stringify({
                    "code": code
                }),
                success: function (data) {
                    console.log(data);
                    if (data.result == 'ok') {
                        oldCode = code;
                        $('.totalAsset').show();
                        $('.mainTitle').show();
                        $('.charts').show();
                        $('.waiting').hide();
                        $('.totalAsset').html('<span>总资金: </span><span>10000000</span>');

                        //line
                        function lineOption(time, lineData1, lineData2, barData, min, max, no, order_vol, trade_vol, trade_money, order_price, trade_price, trade_comp, slip, time_avg_price) {
                            var strongBuy = [];
                            var buy = [];
                            var sell = [];
                            var strongSell = [];
                            var base = [];
                            var tradeMoney = trade_money;
                            var trade = trade_vol;
                            var title = '';
                            var titleColor = '';
                            var tipColor = '';
                            var subColor = '';
                            var point = '';
                            var subText = '';
                            var mainTitle = data.date_data + ' ' + time[time.length - 1] + '  ';
                            if (no == 0) {
                                title = '买入操作';
                                subColor = '#bd4f5b';
                            } else {
                                title = '卖出操作';
                                subColor = '#4d945e';
                            }
                            for (var i = 0; i < barData.length; i++) {
                                if (barData[i] == 2) {
                                    titleColor = '#cc0009';
                                } else if (barData[i] == 1) {
                                    titleColor = '#bd4f5b';
                                } else if (barData[i] == 0) {
                                    titleColor = '#888888';
                                } else if (barData[i] == -1) {
                                    titleColor = '#4d945e';
                                } else if (barData[i] == -2) {
                                    titleColor = '#024205';
                                }
                                tipColor = titleColor;
                                if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "14:59") != 'ok') {
                                    tipColor = 'transparent'
                                }
                                if (barData[i] == 2) {
                                    strongBuy.push(lineData1[i]);
                                    buy.push('-');
                                    sell.push('-');
                                    strongSell.push('-');
                                    base.push('-');
                                } else if (barData[i] == 1) {
                                    buy.push(lineData1[i]);
                                    strongBuy.push('-');
                                    sell.push('-');
                                    strongSell.push('-');
                                    base.push('-');
                                } else if (barData[i] == -1) {
                                    sell.push(lineData1[i]);
                                    strongBuy.push('-');
                                    buy.push('-');
                                    strongSell.push('-');
                                    base.push('-');
                                } else if (barData[i] == -2) {
                                    strongSell.push(lineData1[i]);
                                    strongBuy.push('-');
                                    buy.push('-');
                                    sell.push('-');
                                    base.push('-');
                                } else {
                                    base.push(lineData1[i]);
                                    strongBuy.push('-');
                                    buy.push('-');
                                    sell.push('-');
                                    strongSell.push('-');
                                }
                            }
                            $('.mainTitle .first').html(mainTitle);
                            $('.mainTitle .second').html(data.security_name);
                            if (slip == '') {
                                subText = '完成度(%): ' + trade_comp
                            } else {
                                subText = '完成度(%): ' + trade_comp + ' 滑点(%): ' + slip + ''
                            }
                            var option = {
                                title: {
                                    show: true,
                                    id: 'quarticInOut',
                                    text: title,
                                    subtext: subText,
                                    textStyle: {
                                        color: subColor,
                                        fontSize: 20
                                    },
                                    subtextStyle: {
                                        color: '#101010',
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    },
                                    left: '20',
                                    top: '40'
                                },
                                // grid: {
                                //     left: '2%',
                                //     right: '2%',
                                //     top: '22%',
                                //     containLabel: true
                                // },
                                grid: [
                                    {x: '5%', y: '18%', width: '88%', height: '46%'},
                                    {x: '5%', y2: '4%', width: '88%', height: '30%'}
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
                                        var b = '--';
                                        var c = '--';
                                        var d = '--';
                                        var e = '--';
                                        var f = '--';
                                        var g = '--';
                                        var h = '--';
                                        for (var i = 0; i < params.length; i++) {
                                            if (params[i].seriesName == '现价曲线') {
                                                a = params[i].data;
                                            } else if (params[i].seriesName == '均值线') {
                                                b = params[i].data
                                            } else if (params[i].seriesName == '委托数量') {
                                                c = params[i].data
                                            } else if (params[i].seriesName == '成交数量') {
                                                d = params[i].data;
                                            } else if (params[i].seriesName == '成交金额') {
                                                e = params[i].data
                                            } else if (params[i].seriesName == '委托价格') {
                                                f = params[i].data
                                            } else if (params[i].seriesName == '成交价格') {
                                                g = params[i].data
                                            } else if (params[i].seriesName == '实时成交均价') {
                                                h = params[i].data
                                            }
                                        }
                                        return '&nbsp;&nbsp;&nbsp;时间:' + params[0].axisValue + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;现价曲线:' + a + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;均值线:' + b + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;委托数量:' + c + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;委托价格:' + f + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;成交数量:' + d + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;成交价格:' + g + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;成交金额:' + e + '&nbsp;&nbsp;&nbsp;</br>'
                                            + '&nbsp;&nbsp;&nbsp;实时成交均价:' + h + '&nbsp;&nbsp;&nbsp;</br>'
                                    }
                                },
                                toolbox: {
                                    top: 40,
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
                                    top: 80,
                                    data: ['委托价格', '委托数量', '成交价格', '成交数量']
                                },
                                xAxis: [
                                    {
                                        show: false,
                                        type: 'category',
                                        boundaryGap: true,
                                        axisTick: {
                                            alignWithLabel: false
                                        },
                                        axisLabel: {
                                            interval: function (index) {
                                                if (barData[index] != 0 || index == 0 || index == barData.length - 1) {
                                                    return true
                                                } else {
                                                    return false
                                                }
                                            }
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
                                        axisLabel: {
                                            interval: function (index) {
                                                if (index == 0 || index == barData.length - 1) {
                                                    return true
                                                } else {
                                                    return false
                                                }
                                            }
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
                                        min: min,
                                        max: max,
                                        splitLine: {
                                            show: false
                                        },
                                        // axisLabel: {
                                        //     color: function (value, index) {
                                        //         if (index == 0 || index == 1) {
                                        //             return 'transparent'
                                        //         } else {
                                        //             return '#000'
                                        //         }
                                        //     }
                                        // },
                                        axisTick: {
                                            interval: function (value, index) {
                                                console.log(value);
                                                return value
                                            }
                                        }
                                    },
                                    {
                                        type: 'value',
                                        min: ((min - data.close_price) * 100 / data.close_price).toFixed(2),
                                        max: ((max - data.close_price) * 100 / data.close_price).toFixed(2),
                                        axisLabel: {
                                            formatter: function (value) {
                                                return value + '%';
                                            }
                                        },
                                        splitNumber: 1,
                                        splitLine: {
                                            show: false
                                        }
                                    },
                                    {
                                        type: 'value',
                                        gridIndex: 1,
                                        min: 'dataMin',
                                        max: function (value) {
                                            return value.max;
                                        },
                                        boundaryGap: true,
                                        splitLine: {
                                            show: false
                                        }
                                    },
                                    {
                                        type: 'value',
                                        gridIndex: 1,
                                        position: 'right',
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
                                    // {
                                    //     name: '买点',
                                    //     type: 'line',
                                    //     lineStyle: {
                                    //         color: 'transparent',
                                    //         width: 4
                                    //     },
                                    //     itemStyle: {
                                    //         color: '#ff0000'
                                    //     },
                                    //     smooth: true,
                                    //     symbol: 'circle',
                                    //     symbolSize: 4,
                                    //     data: buy
                                    // },
                                    // {
                                    //     name: '卖点',
                                    //     type: 'line',
                                    //     lineStyle: {
                                    //         color: 'transparent',
                                    //         width: 4
                                    //     },
                                    //     itemStyle: {
                                    //         color: '#007100'
                                    //     },
                                    //     smooth: true,
                                    //     symbol: 'circle',
                                    //     symbolSize: 4,
                                    //     data: sell
                                    // },
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
                                    },
                                    {
                                        name: '委托数量',
                                        type: 'bar',
                                        xAxisIndex: 1,
                                        yAxisIndex: 2,
                                        data: order_vol
                                    },
                                    {
                                        name: '成交数量',
                                        type: 'bar',
                                        xAxisIndex: 1,
                                        yAxisIndex: 2,
                                        data: trade
                                    },
                                    {
                                        name: '成交金额',
                                        type: 'bar',
                                        itemStyle: {
                                            opacity: 0
                                        },
                                        data: tradeMoney
                                    },
                                    {
                                        name: '委托价格',
                                        type: 'line',
                                        lineStyle: {
                                            color: 'transparent',
                                            width: 4
                                        },
                                        itemStyle: {
                                            color: '#c23531'
                                        },
                                        smooth: true,
                                        symbol: 'circle',
                                        symbolSize: 6,
                                        data: order_price
                                    },
                                    {
                                        name: '成交价格',
                                        type: 'line',
                                        lineStyle: {
                                            color: 'transparent'
                                        },
                                        itemStyle: {
                                            color: '#2f4554'
                                        },
                                        smooth: true,
                                        symbol: 'circle',
                                        symbolSize: 6,
                                        data: trade_price
                                    },
                                    {
                                        name: '实时成交均价',
                                        type: 'bar',
                                        itemStyle: {
                                            opacity: 0
                                        },
                                        data: time_avg_price
                                    }
                                ]
                            };
                            return option;
                        }

                        var buyTime = data.buy_data.date;
                        var buySeries1 = data.buy_data.new_price;
                        var buySeries2 = data.buy_data.avg_price;
                        var buyFlag = data.buy_data.buy_flag;
                        var buy_order_vol = data.buy_data.buy_order_vol;
                        var buy_trade_vol = data.buy_data.buy_trade_vol;
                        var buy_trade_money = data.buy_data.buy_trade_money;
                        var buy_order_price = data.buy_data.buy_order_price;
                        var buy_trade_price = data.buy_data.buy_trade_price;
                        var b_trade_comp = data.b_trade_comp;
                        var b_slip = data.b_slip;
                        var b_time_avg_price = data.buy_data.b_time_avg_price;
                        var sellTime = data.sell_data.date;
                        var sellSeries1 = data.sell_data.new_price;
                        var sellSeries2 = data.sell_data.avg_price;
                        var sellFlag = data.sell_data.sell_flag;
                        var sell_order_vol = data.sell_data.sell_order_vol;
                        var sell_trade_vol = data.sell_data.sell_trade_vol;
                        var sell_trade_money = data.sell_data.sell_trade_money;
                        var sell_order_price = data.sell_data.sell_order_price;
                        var sell_trade_price = data.sell_data.sell_trade_price;
                        var s_trade_comp = data.s_trade_comp;
                        var s_slip = data.s_slip;
                        var s_time_avg_price = data.sell_data.s_time_avg_price;
                        var max = data.max_data;
                        var min = data.min_data;
                        var newBuyFlag = [];
                        var newSellFlag = [];
                        for (var i = 0; i < buyFlag.length; i++) {
                            if (buyFlag[i] == -1) {
                                newBuyFlag.push('0')
                            } else {
                                newBuyFlag.push(buyFlag[i])
                            }
                        }
                        for (var i = 0; i < sellFlag.length; i++) {
                            if (sellFlag[i] == 1) {
                                newSellFlag.push('0')
                            } else {
                                newSellFlag.push(sellFlag[i])
                            }
                        }
                        var lineOption1 = lineOption(buyTime, buySeries1, buySeries2, newBuyFlag, min, max, 0, buy_order_vol, buy_trade_vol, buy_trade_money, buy_order_price, buy_trade_price, b_trade_comp, b_slip, b_time_avg_price);
                        var lineOption2 = lineOption(sellTime, sellSeries1, sellSeries2, newSellFlag, min, max, 1, sell_order_vol, sell_trade_vol, sell_trade_money, sell_order_price, sell_trade_price, s_trade_comp, s_slip, s_time_avg_price);
                        var buy = echarts.init(document.getElementById('buy'));
                        var sell = echarts.init(document.getElementById('sell'));
                        buy.setOption(lineOption1, true);
                        sell.setOption(lineOption2, true);
                    } else if (data.result == 'not_exist') {
                        layer.open({
                            title: '警告'
                            ,
                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请输入正确的标的</p>'
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
                        if (oldCode == '') {
                            $('.waiting').hide();
                            $('#search1').val('');
                            clearInterval(timer);
                        } else {
                            code = oldCode;
                            $('#search1').val(code);
                            toAjax();
                        }
                    } else {
                        layer.open({
                            title: '警告'
                            ,
                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">当前标的没有数据</p>'
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
                        console.log(oldCode);
                        if (oldCode == '') {
                            $('.waiting').hide();
                            $('#search1').val('');
                            clearInterval(timer);
                        } else {
                            code = oldCode;
                            $('#search1').val(code);
                            toAjax();
                        }
                    }
                }
            });
        }

        toAjax();
        timer = setInterval(function () {
            if (new Date().getSeconds() == 5) {
                if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "15:00") == 'ok') {
                    toAjax();
                    layer.closeAll();
                } else if (CompareDate("9:28", new Date().getHours() + ":" + new Date().getMinutes(), "9:33") == 'ok') {
                    $('.totalAsset').hide();
                    $('.mainTitle').hide();
                    $('.charts').hide();
                    $('.waiting').hide();
                    layer.open({
                        title: '警告'
                        ,
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">正在生成数据,稍后请刷新</p>'
                        ,
                        btn: ''
                        ,
                        time: 10000000000
                        ,
                        closeBtn: 0
                        ,
                        anim: 5
                        , resize: false
                    });
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
                code = input_val;
                console.log(code);
                $('.totalAsset').hide();
                $('.mainTitle').hide();
                $('.charts').hide();
                $('.waiting').show();
                toAjax();
            } else {
                layer.open({
                    title: '警告'
                    ,
                    content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请输入万得代码</p>'
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
        });
        $('.desc').on('click', function () {
            layer.open({
                title: '算法交易说明'
                ,
                area: ['90%', '80%']
                ,
                content: '<div><h3>class TWAP(Algo)</h3><pre>    def __init__(self, trading, frequency=30, start=\'9:30:00\', end=\'15:00:00\', priceType=0, price_limit_type=0, mail=None,cancel_frequency=None, least_qty=100, send_flag=True, use_timeOptimization=True,**kwargs):\n' +
                '    """\n' +
                '    :param trading: trading的子类的实例 为必传参数\n' +
                '    :param frequency:订单发送间隔,(默认30)\n' +
                '    :param start:任务开始时间,(默认9:30:00)\n' +
                '    :param end:任务结束时间,(默认15:00:00)\n' +
                '    :param priceType :价格类型,0代表最新价,1,2,3,4,5,-1,-2,-3,-4,-5 ,买入时,分表代表盘口的买一到买五与卖一到卖五 ,卖出时,分别代表卖一至卖五与买一至买五,例 :买入时,2代表买价2 ,卖出时,2代表卖价2\n' +
                '    :param price_limit_type : 使用制定倍数的标准差来优化委托价格，区分正负，可为0。\n' +
                '    :param Handicap 选择作为撤单标准的盘口代号,(1,2,3,4,5分别代表买/卖价的1至五)\n' +
                '    :param cancel_frequency 重建检查委托价格的时间间隔与自定的盘口价格基准, 参数类型为元组(时间间隔(/min),盘口代号):\n' +
                '        时间间隔:每次重新检查委托价格是否合理的时间间隔,\n' +
                '        盘口代号:(1,2,3,4,5分别代表买/卖价的1至五)\n' +
                '    :param mail: 邮件服务类 默认None\n' +
                '    :param send_flag : 当超过基准线时,是否继续下单。 True：下到基准线,False ：取消本次委托\n' +
                '    :param use_timeOptimization : 使用时间优化选择买卖时间段(True 代表使用,False 代表不使用)\n' +
                '    """</pre><h3>逻辑说明</h3><pre>    利用apscheduler 定时器来定时发送子单委托，该定时器对任务的调度使用了线程池，每一个任务均使用单独线程处理。目前逻辑，一个标的对应一个唯一id的任务。\n' +
                '    接收母单，通过当前时刻，及所在时间段委托数量占比等计算出子单数量，再通过均价，盘口价，标准差等计算出最优价格，并通过其他条件来判断是否发单，最终完成本次下单任务。过程中要查询的信息有（本单对应标的的行情信息，本单对应账号的最新可用委托余额，单前剩余委托数量，下单返回信息）\n' +
                '\n' +
                '    除了下委托动作外，伴随的还有每5分钟（间隔时间可变），通过交易系统向本地同步净以委托数 。 每隔15分钟，检查已委托但未成交的挂单，撤回超出指定盘口的委托。每隔10分钟查询总资产，实时止损，当达到止损点，将会出发清仓动作。</pre><h3>过程</h3><pre>    1，查询本地缓存，计算未委托数量orderQty，若数量为0 代表本标的今日委托数已完成，从定时器任务列表中移除本标的的任务。\n' +
                '    2，通过algo_conf给定的参数，及行情信息，初次设定委托价格，orderPrice\n' +
                '    3，查询当前时刻标准差 std，通过 参数 price_limit_type 及均价设定新的价格基准线，new_price_line = price_limit_type* std，\n' +
                '        if 买单：\n' +
                '            if send_flag = True:\n' +
                '                如果初次委托价格大于 new_price_line ，设定新的委托价格为 new_price_line，如果价格合适，不做改变，保留初始设定价格。\n' +
                '            else：\n' +
                '                取消本次委托\n' +
                '        if 卖单：\n' +
                '            #买单价格宽松\n' +
                '            如果初始价格大于均价，不做改变，如果价格小于均价，设定新的委托价格为均线价格，即 orderPrice= avg_price\n' +
                '\n' +
                '\n' +
                '    4，设定子单委托数量\n' +
                '        1> 碎股处理，剩余数量小与100，有多少 卖多少\n' +
                '        2> 通过当前时刻，下单频率等计算出剩余下单次数 times，并计算出 本次委托的委托数量（整百处理）\n' +
                '        3> 如果是卖单，剩余总金额小与50000元，开启清空模式，通过 2**n * price >50000 模式对半处理剩余卖单，n次之内并且价格合适的点处理剩余卖单，以期不留小与50000的持仓\n' +
                '        4> 如果是卖单，当时间再10点之后，且卖单价格比较好，而且今日委托还未完成，则追加100手卖单\n' +
                '        5> 如果是买单， 查询当前可用余额， 本单下单所用金额不能大于可用余额。如果大于，将使用可用余额计算出的可下单量下委托\n' +
                '        6> 不论卖单还是买单，本次委托金额不能超过当前市场总交易额的20%\n' +
                '        7> 查询下单返回状态，下单成功，更新本地缓存</pre></div>'
            });
        });
    })
});