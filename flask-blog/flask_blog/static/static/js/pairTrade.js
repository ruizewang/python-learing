$(document).ready(function () {
    layui.use(['layer'], function () {

        function CompareDate(t1, t2, t3) {
            var date = new Date();
            var a = t1.split(":");
            var b = t2.split(":");
            var c = t3.split(":");
            if (date.setHours(a[0], a[1]) < date.setHours(b[0], b[1]) && date.setHours(b[0], b[1]) < date.setHours(c[0], c[1])) {
                return 'ok';
            }

        }

        //line
        function lineOption(time, tradeValue, flag, a_price, a_vol, b_price, b_vol) {
            var buy = [];
            var sell = [];
            var base = [];
            var title = '配对名称: JMZC';
            var subText = '标的: JM.DCE , ZC.CZC';
            var tipColor = '';
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
            var option = {
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
                    top: '20'
                },
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
                        for (var i = 0; i < params.length; i++) {
                            if (params[i].seriesName == '组合价值') {
                                a = params[i].data;
                            } else if (params[i].seriesName == '标的A交易价格') {
                                b = params[i].data
                            } else if (params[i].seriesName == '标的A交易量') {
                                c = params[i].data
                            } else if (params[i].seriesName == '标的B交易价格') {
                                d = params[i].data;
                            } else if (params[i].seriesName == '标的B交易量') {
                                e = params[i].data
                            }
                        }
                        return '<div class="clearfix" style="width:280px;"><p class="fl" style="width: 100%; font-size: 14px;">时间: ' + params[0].axisValue + '</p><p class="fl" style="width: 100%; font-size: 14px;">组合价值: ' + a + '</p><p class="fl" style="width: 50%; font-size: 14px;">标的A: aaa</p><p class="fl" style="width: 50%; font-size: 14px;">标的B: bbb</p><p class="fl" style="width: 50%; font-size: 14px;">交易类型: <span style="color: #ff6701">买入</span></p><p class="fl" style="width: 50%; font-size: 14px;">交易类型: <span style="color: #75d086">卖出</span></p><p class="fl" style="width: 50%; font-size: 14px;">交易价格: ' + b + '</p><p class="fl" style="width: 50%; font-size: 14px;">交易价格: ' + d + '</p><p class="fl" style="width: 50%; font-size: 14px;">交易量: ' + c + '</p><p class="fl" style="width: 50%; font-size: 14px;">交易量: ' + e + '</p></div>';
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
                    data: ['组合价值', '标的A交易量', '标的B交易量']
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
                                if (flag[index] != 0 || index == 0 || index == flag.length - 1) {
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
                                if (index == 0 || index == flag.length - 1) {
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
                        name: '组合价值',
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
                        name: '标的A交易价格',
                        type: 'line',
                        lineStyle: {
                            color: 'transparent',
                            width: 4
                        },
                        itemStyle: {
                            color: 'transparent'
                        },
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        data: a_price
                    },
                    {
                        name: '标的B交易价格',
                        type: 'line',
                        lineStyle: {
                            color: 'transparent'
                        },
                        itemStyle: {
                            color: 'transparent'
                        },
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        data: b_price
                    }
                ]
            };
            return option;
        }

        var allData = [
            {
                "flag_line_data": [0, 0, 1, 0, -1, -1, 1, 1, 1, 0, 0, 1, 0, -1, -1, 1, 1, 1, 0],
                "value": [0.25, 1.25, 3.0, 2.25, 0.12, 0.22, 0.14, 0.36, 0.2, 0.02, 1.25, 3.0, 2.25, 0.12, 0.22, 0.14, 0.36, 0.2, 0.02],
                "time_data": ['9:00', '9:01', '9:02', '9:03', '9:04', '9:05', '9:06', '9:07', '9:08', '9:09', '9:10', '9:11', '9:12', '9:13', '9:14', '9:15', '9:16', '9:17', '9:18'],
                "A_price": [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
                "B_price": [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
                "A_vol": [200, 500, 150, 120, 560, 45, 141, 123, 236, 231, 111, 110, 1222, 1444, 142, 89, 632, 12, 147],
                "B_vol": [200, 500, 150, 120, 560, 45, 141, 123, 236, 231, 111, 110, 1222, 1444, 142, 89, 632, 12, 147]
            }
        ];
        var tradeTime = allData[0].time_data;
        var tradeValue = allData[0].value;
        var flag = allData[0].flag_line_data;
        var A_price = allData[0].A_price;
        var A_vol = allData[0].A_vol;
        var B_price = allData[0].B_price;
        var B_vol = allData[0].B_vol;
        var lineOption = lineOption(tradeTime, tradeValue, flag, A_price, A_vol, B_price, B_vol);
        var trend = echarts.init(document.getElementById('trend'));
        trend.setOption(lineOption, true);

        // function toAjax() {
        //     $.ajax({
        //         type: "POST",
        //         dataType: "json",
        //         url: '/strategy/expert_advisor_ajax/',
        //         data: JSON.stringify({
        //             "code": code
        //         }),
        //         success: function (data) {
        //             console.log(data);
        //         }
        //     });
        // }
        // toAjax();
        // timer = setInterval(function () {
        //     if (new Date().getSeconds() == 5) {
        //         if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "15:00") == 'ok') {
        //             toAjax();
        //         }
        //     }
        // }, 1000);
    })
});