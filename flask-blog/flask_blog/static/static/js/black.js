$(document).ready(function () {
    //layui组件
    layui.use(['table', 'layer', 'flow'], function () {
        var table = layui.table;
        var reverse = 0;
        loadNore(1, 1);
        setInterval(function () {
            if (new Date().getSeconds() == 15) {
                if (CompareDate("9:31", new Date().getHours() + ":" + new Date().getMinutes(), "15:05") == 'ok') {
                    console.log('get');
                    var type = $('.nav_new .on').attr('data_value');
                    loadNore(type, reverse);
                }
            }
        }, 1000);

        function compare(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }

        function compareDate(property) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return Date.parse(value1) - Date.parse(value2);
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

        function compareStock(property) {

            return function (a, b) {
                var value1 = parseFloat(a[property]);
                var value2 = parseFloat(b[property]);
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

        function loadNore(type, reverse) {

            function stockColor(num) {
                if (num == 'NaN' || num == 'null' || num == '' || num == undefined) {
                    return '<span style="color: #333; display: inline-block; width: 100px;">--</span>'
                } else {
                    if (parseFloat(num) > 0) {
                        return '<span style="color: #c00; display: inline-block; width: 100px;">' + parseFloat(num).toFixed(2) + '%</span>'
                    } else if (parseFloat(num) < 0) {
                        return '<span style="color: #3DA642; display: inline-block; width: 100px;">' + parseFloat(num).toFixed(2) + '%</span>'
                    } else {
                        return '<span style="color: #333; display: inline-block; width: 100px;">0%</span>'
                    }
                }
            }

            var resultAll = '';
            $.ajax({
                type: "GET",
                url: '/strategy/black_list_data/',
                data: {},
                success: function (data) {
                    var option = '';
                    $('.waiting').hide();
                    $('.mainTable').show();
                    resultAll = data.pub_sent_data;
                    console.log(resultAll);
                    if (resultAll.length == 0) {
                        $('.current h3').hide();
                        $('.current h4').hide();
                        option += '<li style="text-align: center; color: #444; font-size: 18px; background: #eee;">无数据</li>';
                        $('.tableList').html(option);
                    } else {
                        $('.current h3').show();
                        $('.current h4').show();
                        if (type == 1) {
                            if (reverse == 0) {
                                resultAll.sort(compareCode('windcode'));
                            } else {
                                resultAll.sort(compareCode('windcode')).reverse();
                            }
                        } else if (type == 2) {
                            if (reverse == 0) {
                                resultAll.sort(compareStock('stock_drop'));
                            } else {
                                resultAll.sort(compareStock('stock_drop')).reverse();
                            }
                        } else if (type == 3) {
                            for (var i = 0; i < resultAll.length; i++) {
                                resultAll[i].event.sort(compareDate('datetime'));
                                resultAll[i]['datetime'] = resultAll[i].event[0].datetime;
                            }
                            if (reverse == 0) {
                                resultAll.sort(compareDate('datetime'));
                            } else {
                                resultAll.sort(compareDate('datetime')).reverse();
                            }
                        } else if (type == 4) {
                            for (var i = 0; i < resultAll.length; i++) {
                                resultAll[i].event.sort(compare('corr'));
                                resultAll[i]['corr'] = resultAll[i].event[0].corr;
                            }
                            if (reverse == 0) {
                                resultAll.sort(compare('corr'));
                            } else {
                                resultAll.sort(compare('corr')).reverse();
                            }
                        }
                        for (var i = 0; i < resultAll.length; i++) {
                            if (type == 2) {
                                if (resultAll[i].stock_drop == 'NaN' || resultAll[i].stock_drop == 'null' || resultAll[i].stock_drop == '' || resultAll[i].stock_drop == undefined) {
                                    var add = resultAll[i];
                                    resultAll.splice(i, 1);
                                    resultAll.push(add);
                                }
                            }
                            option += '<li class="clearfix">\n' +
                                '<div class="expand expand1"></div>\n' +
                                '<div class="clearfix eventTitle">\n' +
                                '    <p class="fl"><span>' + resultAll[i].windcode + '</span></p>\n' +
                                '    <p class="fl"><span>' + resultAll[i].security_name + '</span></p>\n' +
                                '    <p class="fl">跌幅: ' + stockColor(resultAll[i].stock_drop) + '</p>\n' +
                                '    <p class="fl">事件个数: <span>' + resultAll[i].event.length + '</span></p>\n' +
                                '</div>\n' +
                                '<table id="black' + i + '" lay-filter="black">\n' +
                                '    <tbody>';
                            for (var j = 0; j < resultAll[i].event.length; j++) {
                                option += '<tr>\n' +
                                    '        <td>' + resultAll[i].event[j].datetime + '</td>\n' +
                                    '        <td style="text-align: left"><span class="negative">负</span><span>' + resultAll[i].event[j].event_type + '</span></td>\n' +
                                    '        <td><div title="' + resultAll[i].event[j].info_origin + '" class="ellipsis1">' + resultAll[i].event[j].info_origin + '</div></td>\n' +
                                    '    </tr>';
                            }
                            option += '</tbody></table></li>';
                        }
                        $('.tableList').html(option);
                    }
                    $('.current h3 span').html(data.new_time);
                    $('.current h4 span').html(resultAll.length);

                    $('.expand').on('click', function () {
                        if ($(this).hasClass('expand1')) {
                            $(this).removeClass('expand1').addClass('expand2');
                            $(this).parent().find('table').hide();
                        } else {
                            $(this).removeClass('expand2').addClass('expand1');
                            $(this).parent().find('table').show();
                        }
                    });

                    $('.allClose').on('click', function () {
                        $('.expand').removeClass('expand1').addClass('expand2');
                        $('table').hide();
                    });

                    $('.allOpen').on('click', function () {
                        $('.expand').removeClass('expand2').addClass('expand1');
                        $('table').show();
                    });
                }
            });
        }

        $('.nav_new li').on('click', function () {
            var value = $(this).attr('data_value');
            if (!$(this).hasClass('on')) {
                $('.nav_new li').removeClass('on');
                $('.nav_new li .direct').removeClass('up');
                $(this).addClass('on');
                if ($(this).find('.direct').hasClass('up')) {
                    $(this).find('.direct').removeClass('up');
                    reverse = 1;
                } else {
                    $(this).find('.direct').addClass('up');
                    reverse = 0;
                }
            } else {
                if ($(this).find('.direct').hasClass('up')) {
                    $(this).find('.direct').removeClass('up');
                    reverse = 1;
                } else {
                    $(this).find('.direct').addClass('up');
                    reverse = 0;
                }
            }
            console.log(reverse);
            loadNore(value, reverse);
        });
    });
});