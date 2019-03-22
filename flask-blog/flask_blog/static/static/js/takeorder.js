$(document).ready(function () {
    layui.use(['form', 'element', 'layer'], function () {
        var form = layui.form;
        var element = layui.element;
        var a = $('#nav-name').html();
        var b = a.indexOf('，');
        var oaNo = a.substring(0, b);
        var option = '';
        var checkarr = [];
        var selectarr = [];
        var isExpant = [];
        var isAll = false;

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
            if (CompareDate("9:30", new Date().getHours() + ":" + new Date().getMinutes(), "15:10") != 'ok') {
                $('.startOrder').show();
                $('.restartOrder').hide();
            } else {
                $('.startOrder').hide();
                $('.restartOrder').show();
            }
            $.ajax({
                type: "POST",
                async: false,
                // url: '/strategy/order_stra/',
                url: '/strategy/order_stra_new/',
                data: {oaNo: oaNo},
                success: function (data) {
                    console.log(data);

                    option = '';
                    // var remake = eval('(' + data.data + ')');
                    // console.log(remake);
                    if (data.result == 'ok') {
                        var db = data.order_strategy;
                        console.log(db);
                        for (var i = 0; i < db.length; i++) {
                            $.each(db[i], function (key, value) {
                                var envName = key;
                                if (envName == 'aimockdb') {
                                    envName = '模拟环境'
                                } else if (envName == 'aidevdb') {
                                    envName = '测试环境'
                                } else {
                                    envName = '生产环境'
                                }
                                if (option.indexOf('<h3>' + envName + '</h3>') == -1) {
                                    option += '<div class="orderName"><h3>' + envName + '</h3>';
                                }
                                for (var j = 0; j < value.length; j++) {
                                    $.each(value[j], function (x, y) {
                                        option += '<div class="orderControl open"><div class="person clearfix"><div class="expand fl expand1"></div><p class="fl">' + x + '</p><p class="fl">已选<span class="already">0</span>/<span>' + y.length + '</span></p><div class="warningTip">异常!!!</div></div><ul class="orderTitle clearfix"><li class="fl">选择</li><li class="fl">策略名称</li><li class="fl">状态</li><li class="fr">操作</li></ul><ul class="orderList">';
                                        for (var z = 0; z < y.length; z++) {
                                            if (y[z].order_status == 1 && y[z].check_status == 1) {
                                                option += '<li class="done clearfix cancelThis cannotStart" data-env="' + key + '"><input lay-skin="primary" class="layui-input fl" type="checkbox" name="orderName" lay-filter="order"><p class="fl" data-name="' + y[z].strategy_id + '">' + y[z].name + '</p><div class="celarfix fl status"><div class="cute fl"></div><h4 class="fl">已启动(正在发单）</h4></div><div class="other fr"><a target="_blank" href="/strategy/order?strategy=' + y[z].log_name + '&env=' + key + '">查看log和terminal</a></div></li>';
                                            } else if (y[z].order_status == 0 && y[z].check_status == 1) {
                                                option += '<li class="yet clearfix cancelThis restartThis cannotStart" data-env="' + key + '"><input lay-skin="primary" class="layui-input fl" type="checkbox" name="orderName" lay-filter="order"><p class="fl" data-name="' + y[z].strategy_id + '">' + y[z].name + '</p><div class="celarfix fl status"><div class="cute fl"></div><h4 class="fl">已启动(盘前等待)</h4></div><div class="other fr"><a target="_blank" href="/strategy/order?strategy=' + y[z].log_name + '&env=' + key + '">查看log和terminal</a></div></li>';
                                            } else if (y[z].order_status == 0 && y[z].check_status == 0) {
                                                option += '<li class="before clearfix startThis" data-env="' + key + '"><input lay-skin="primary" class="layui-input fl" type="checkbox" name="orderName" lay-filter="order"><p class="fl" data-name="' + y[z].strategy_id + '">' + y[z].name + '</p><div class="celarfix fl status"><div class="cute fl"></div><h4 class="fl">未启动</h4></div><div class="other fr"><a target="_blank" href="/strategy/order?strategy=' + y[z].log_name + '&env=' + key + '">查看log和terminal</a></div></li>';
                                            } else if (y[z].order_status == 3 && y[z].check_status == 1) {
                                                option += '<li class="stop clearfix startThis restartThis" data-env="' + key + '"><input lay-skin="primary" class="layui-input fl" type="checkbox" name="orderName" lay-filter="order"><p class="fl" data-name="' + y[z].strategy_id + '">' + y[z].name + '</p><div class="celarfix fl status"><div class="cute fl"></div><h4 class="fl">已停止</h4></div><div class="other fr"><a target="_blank" href="/strategy/order?strategy=' + y[z].log_name + '&env=' + key + '">查看log和terminal</a></div></li>';
                                            } else if (y[z].order_status == 4 && y[z].check_status == 1) {
                                                option += '<li class="stop clearfix startThis restartThis" data-env="' + key + '"><input lay-skin="primary" class="layui-input fl" type="checkbox" name="orderName" lay-filter="order"><p class="fl" data-name="' + y[z].strategy_id + '">' + y[z].name + '</p><div class="celarfix fl status"><div class="cute fl"></div><h4 class="fl">已停止(没有订单)</h4></div><div class="other fr"><a target="_blank" href="/strategy/order?strategy=' + y[z].log_name + '&env=' + key + '">查看log和terminal</a></div></li>';
                                            } else {
                                                option += '<li class="warning clearfix cancelThis restartThis cannotStart" data-env="' + key + '"><input lay-skin="primary" class="layui-input fl" type="checkbox" name="orderName" lay-filter="order"><p class="fl" data-name="' + y[z].strategy_id + '">' + y[z].name + '</p><div class="celarfix fl status"><div class="cute fl"></div><h4 class="fl">异常!!!</h4></div><div class="other fr"><a target="_blank" href="/strategy/order?strategy=' + y[z].log_name + '&env=' + key + '">查看log和terminal</a></div></li>';
                                            }
                                        }
                                    });
                                    option += '</ul></div>';
                                }
                                option += '</div>';
                            });
                        }
                        $('.straList').html(option);
                        for (var i = 0; i < $('.orderList li').length; i++) {
                            if ($('.orderList li').eq(i).hasClass('warning')) {
                            }
                        }
                        if (isAll == true) {
                            isAll = false;
                            $('input[name=selectAll]').prop('checked', true);
                            $('.orderList .layui-input').prop('checked', true);
                            for (var i = 0; i < $('.straList input[type=checkbox]').length; i++) {
                                checkarr.push(i)
                            }
                            $('.orderControl').addClass('open');
                            $('.expand').removeClass('expand2').addClass('expand1');
                            for (var i = 0; i < db.length; i++) {
                                $.each(db[i], function (key, value) {
                                    for (var j = 0; j < value.length; j++) {
                                        $.each(value[j], function (x, y) {
                                            selectarr.push(y.length);
                                        });
                                    }
                                });
                            }
                            for (var i = 0; i < $('.orderControl').length; i++) {
                                if ($('.orderControl').eq(i).hasClass('open')) {
                                    isExpant.push('1');
                                } else {
                                    isExpant.push('0');
                                }
                            }
                        } else {
                            if (checkarr.length > 0) {
                                for (var i = 0; i < checkarr.length; i++) {
                                    $('.straList .layui-input').eq(checkarr[i]).prop('checked', true);
                                }
                            }
                            for (var i = 0; i < isExpant.length; i++) {
                                if (isExpant[i] == 1) {
                                    $('.orderControl').eq(i).addClass('open');
                                    $('.orderControl').eq(i).find('.orderTitle').show();
                                    $('.orderControl').eq(i).find('.orderList').show();
                                    $('.expand').eq(i).removeClass('expand2').addClass('expand1');
                                } else {
                                    $('.orderControl').eq(i).removeClass('open');
                                    $('.orderControl').eq(i).find('.orderTitle').hide();
                                    $('.orderControl').eq(i).find('.orderList').hide();
                                    $('.expand').eq(i).removeClass('expand1').addClass('expand2');
                                }
                            }
                        }
                        for (var i = 0; i < selectarr.length; i++) {
                            $('.already').eq(i).html(selectarr[i]);
                        }
                        $('.expand').on('click', function () {
                            isExpant = [];
                            if ($(this).parents('.orderControl').hasClass('open')) {
                                $(this).parents('.orderControl').removeClass('open');
                                $(this).removeClass('expand1').addClass('expand2');
                                $(this).parents('.orderControl').find('.orderTitle').slideUp();
                                $(this).parents('.orderControl').find('.orderList').slideUp();
                            } else {
                                $(this).parents('.orderControl').addClass('open');
                                $(this).removeClass('expand2').addClass('expand1');
                                $(this).parents('.orderControl').find('.orderTitle').slideDown();
                                $(this).parents('.orderControl').find('.orderList').slideDown();
                            }
                            for (var i = 0; i < $('.orderControl').length; i++) {
                                if ($('.orderControl').eq(i).hasClass('open')) {
                                    isExpant.push('1');
                                } else {
                                    isExpant.push('0');
                                }
                            }
                        });
                        form.on('checkbox(selectAll)', function (data) {
                            selectarr = [];
                            checkarr = [];
                            if (data.elem.checked == true) {
                                for (var i = 0; i < $('.straList .layui-form-checkbox').length; i++) {
                                    checkarr.push(i)
                                }
                                $('.orderList .layui-input').prop('checked', true);
                                for (var i = 0; i < db.length; i++) {
                                    $.each(db[i], function (key, value) {
                                        for (var j = 0; j < value.length; j++) {
                                            $.each(value[j], function (x, y) {
                                                selectarr.push(y.length);
                                            });
                                        }
                                    });
                                }
                            } else {
                                $('.orderList .layui-input').prop('checked', false);
                                for (var i = 0; i < db.length; i++) {
                                    $.each(db[i], function (key, value) {
                                        for (var j = 0; j < value.length; j++) {
                                            $.each(value[j], function (x, y) {
                                                selectarr.push(0);
                                            });
                                        }
                                    });
                                }
                            }
                            for (var i = 0; i < selectarr.length; i++) {
                                $('.already').eq(i).html(selectarr[i]);
                            }
                            form.render();
                        });
                        form.on('checkbox(order)', function (data) {
                            checkarr = [];
                            selectarr = [];
                            if ($('.straList .layui-input').length == $('.straList .layui-form-checked').length) {
                                $('input[name=selectAll]').prop('checked', true);
                            } else {
                                $('input[name=selectAll]').prop('checked', false);
                            }
                            for (var i = 0; i < $('.straList .layui-form-checkbox').length; i++) {
                                if ($('.straList .layui-form-checkbox').eq(i).hasClass('layui-form-checked')) {
                                    checkarr.push(i)
                                }
                            }
                            for (var i = 0; i < $('.orderList').length; i++) {
                                selectarr.push($('.orderList').eq(i).find('.layui-form-checked').length)
                            }
                            $(data.elem).parents('.orderControl').find('.already').html($(data.elem).parents('.orderControl').find('.orderList .layui-form-checked').length);
                            form.render();
                        });
                        form.render();
                        $('.waiting').hide();
                        $('.layui-tab').show();
                        $('.totalControl').show();
                    }


                }
            });
        }

        toAjax();
        setInterval(function () {
            toAjax();
        }, 60000);

        $('.startOrder').on('click', function () {
            if ($('.startThis .layui-form-checked').length > 0 && $('.cannotStart .layui-form-checked').length == 0) {
                layer.open({
                    title: 'oa下单'
                    ,
                    content: '是否下单?',
                    cancel: function (index) {
                        layer.close(index);
                        return false;
                    },
                    yes: function (index) {
                        var yesData = [];
                        for (var i = 0; i < $('.startThis .layui-form-checked').length; i++) {
                            var env = $('.startThis .layui-form-checked').eq(i).parents('.startThis').attr('data-env');
                            var strategy = $('.startThis .layui-form-checked').eq(i).parents('.startThis').find('p').attr('data-name');
                            var single = {
                                "env": env,
                                "strategy": strategy
                            };
                            yesData.push(single);
                        }
                        var alldata = {
                            "oa": oaNo,
                            "straList": yesData
                        };
                        console.log(alldata);
                        if (yesData.length > 0) {
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                data: JSON.stringify(alldata),
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
                                        setTimeout(function () {
                                            window.location.reload()
                                        }, 1000)
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
                            });
                        }
                        layer.close(index);
                        return false;
                    }
                });
            } else {
                layer.open({
                    title: '警告'
                    ,
                    content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择策略</p>'
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
        $('.restartOrder').on('click', function () {
            if ($('.restartThis .layui-form-checked').length > 0 && $('.done .layui-form-checked').length == 0 && $('.before .layui-form-checked').length == 0) {
                layer.open({
                    title: 'oa下单'
                    ,
                    content: '是否重新下单?',
                    cancel: function (index) {
                        layer.close(index);
                        return false;
                    },
                    yes: function (index) {
                        var yesData = [];
                        for (var i = 0; i < $('.restartThis .layui-form-checked').length; i++) {
                            var env = $('.restartThis .layui-form-checked').eq(i).parents('.restartThis').attr('data-env');
                            var strategy = $('.restartThis .layui-form-checked').eq(i).parents('.restartThis').find('p').attr('data-name');
                            var single = {
                                "env": env,
                                "strategy": strategy
                            };
                            yesData.push(single);
                        }
                        var alldata = {
                            "oa": oaNo,
                            "straList": yesData
                        };
                        console.log(alldata);
                        if (yesData.length > 0) {
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                data: JSON.stringify(alldata),
                                // url: '/strategy/restartOrder/',
                                url: '/strategy/restartOrder_new/',
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
                                        setTimeout(function () {
                                            window.location.reload()
                                        }, 1000)
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
                            });
                        }
                        layer.close(index);
                        return false;
                    }
                });
            } else {
                if ($('.before .layui-form-checked').length > 0) {
                    layer.open({
                        title: '警告'
                        ,
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 14px; color: #101010;">今日未启动策略不能重启,请于开盘前启动</p>'
                        ,
                        btn: ''
                        ,
                        time: 2000
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
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择策略</p>'
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
        });
        $('.cancelOrder').on('click', function () {
            if ($('.cancelThis .layui-form-checked').length > 0 && $('.before .layui-form-checked').length == 0 && $('.stop .layui-form-checked').length == 0) {
                layer.open({
                    title: 'oa取消下单'
                    ,
                    content: '是否取消下单?',
                    cancel: function (index) {
                        layer.close(index);
                        return false;
                    },
                    yes: function (index) {
                        var yesData = [];
                        for (var i = 0; i < $('.cancelThis .layui-form-checked').length; i++) {
                            var env = $('.cancelThis .layui-form-checked').eq(i).parents('.cancelThis').attr('data-env');
                            var strategy = $('.cancelThis .layui-form-checked').eq(i).parents('.cancelThis').find('p').attr('data-name');
                            var single = {
                                "env": env,
                                "strategy": strategy
                            };
                            yesData.push(single);
                        }
                        var alldata = {
                            "oa": oaNo,
                            "straList": yesData
                        };
                        console.log(alldata);
                        if (yesData.length > 0) {
                            $.ajax({
                                type: "POST",
                                dataType: 'json',
                                data: JSON.stringify(alldata),
                                // url: '/strategy/stopOrder/',
                                url: '/strategy/stopOrder_new/',
                                success: function (data) {
                                    console.log(data);
                                    if (data.result == "ok") {
                                        layer.open({
                                            title: '通知'
                                            ,
                                            content: '<i class="fl layui-icon layui-icon-ok-circle" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">取消成功</p>'
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
                                            window.location.reload()
                                        }, 1000)
                                    } else {
                                        layer.open({
                                            title: '警告'
                                            ,
                                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">取消失败</p>'
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
                        }
                        layer.close(index);
                        return false;
                    }
                });
            } else {
                if ($('.before .layui-form-checked').length > 0) {
                    layer.open({
                        title: '警告'
                        ,
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 14px; color: #101010;">不能选择未启动策略</p>'
                        ,
                        btn: ''
                        ,
                        time: 2000
                        ,
                        closeBtn: 0
                        ,
                        anim: 5
                        , resize: false
                    });
                } else if ($('.stop .layui-form-checked').length > 0) {
                    layer.open({
                        title: '警告'
                        ,
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 14px; color: #101010;">不能选择已停止策略</p>'
                        ,
                        btn: ''
                        ,
                        time: 2000
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
                        content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择策略</p>'
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
        });
    });
});
