$(document).ready(function () {
    //layui组件
    layui.use(['form', 'element', 'table', 'layer', 'laydate'], function () {
        var element = layui.element;
        var form = layui.form;
        var table = layui.table;

        //下拉框相关
        $.ajax({
            type: "GET",
            url: '/strategy/section1/aimockdb/Default',
            data: {},//数据，这里使用的是Json格式进行传输
            success: function (data) {//返回数据根据结果进行相应的处理
                console.log(data);
                if (data.status == 200) {
                    var db = data.db;
                    var option = '';
                    if (db.length != 0 && db != null && db != undefined) {
                        $.each(db, function (i) {
                            if (i == 'aimockdb') {
                                option += '<li class="dropdown sendAjax"><a data-toggle="dropdown" data-stoppropagation="true" style="">' + i.replace('ai', '').replace('db', '') + '</a><ul class="dropdown-menu R_aside last" role="menu" aria-labelledby="dLabel" style="">';
                                for (var k = 0; k < db[i].length; k++) {
                                    option += '<li class="changeStrategy" data-value="' + i + '/' + db[i][k] + '">' + db[i][k] + '</li>'
                                }
                                option += '</ul></li>'

                            }
                        });
                    } else {
                        option = '<li>空</li>'
                    }
                    $('.current .dropdown-menu').html(option);
                    form.render();
                    $('.current .changeStrategy').on('click', function () {
                        var value = $(this).attr('data-value');
                        var index = value.indexOf('/');
                        var sec = value.substring(index + 1);
                        var fir = value.substring(0, index);
                        $('.noshow').show();
                        if (fir == 'aimockdb') {
                            $('.nowStrategy .server').html('模拟');
                        } else if (fir == 'aidevdb') {
                            $('.nowStrategy .server').html('测试');
                        } else {
                            $('.nowStrategy .server').html('生产');
                        }
                        $('.nowStrategy .server').attr('data-server', fir);
                        $('.nowStrategy .strName').html(sec);
                    });
                    $('.openStra').on('click', function () {
                        var fir = $('.server').attr('data-server');
                        var sec = $('.strName').html();
                        if (sec == '' || sec == null || sec == undefined) {
                            layer.open({
                                title: '警告'
                                ,
                                type: 1
                                ,
                                area: ['260px', '162px']
                                ,
                                content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px; margin-left: 30px;"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择策略</p>'
                                ,
                                tipsMore: true
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
                                title: '策略详情',
                                closeBtn: 1,
                                area: ['1200px', '600px'],
                                btn: [],
                                scrollbar: false,
                                content: '<div class="preview" style="display: none">' +
                                '                <div class="part1 clearfix">' +
                                '                    <h2 class="fl verticalTxt">策略基本信息</h2>' +
                                '                    <div class="strategy_info fl basic">' +
                                '                        <h3>策略基本信息</h3>' +
                                '                        <table id="strategy_info" class="strategy_info" lay-filter="strategy_info"></table>' +
                                '                    </div>' +
                                '                    <div class="security_pool fl basic">' +
                                '                        <h3>标的池</h3>' +
                                '                        <table id="security_pool" class="security_pool" lay-filter="security_pool"></table>' +
                                '                    </div>' +
                                '                </div>' +
                                '                <div class="part2 clearfix">' +
                                '                    <h2 class="fl verticalTxt">模型训练配置</h2>' +
                                '                    <div class="training_configs fl basic">' +
                                '                        <h3>训练参数</h3>' +
                                '                        <div class="trainingLimit">' +
                                '                            <div class="training_configs1">' +
                                '                                <table id="training_configs1"' +
                                '                                       lay-filter="training_configs1"></table>' +
                                '                            </div>' +
                                '                            <div class="training_configs2">' +
                                '                                <table id="training_configs2"' +
                                '                                       lay-filter="training_configs2"></table>' +
                                '                            </div>' +
                                '                            <div class="training_configs3">' +
                                '                                <table id="training_configs3"' +
                                '                                       lay-filter="training_configs3"></table>' +
                                '                            </div>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                    <div class="training_index fl basic">' +
                                '                        <h3>标的因子</h3>' +
                                '                        <table id="training_index"' +
                                '                               lay-filter="training_index"></table>' +
                                '                    </div>' +
                                '                    <div class="training_common_index fl basic">' +
                                '                        <h3>市场因子</h3>' +
                                '                        <table id="training_common_index"' +
                                '                               lay-filter="training_common_index"></table>' +
                                '                    </div>' +
                                '                    <div class="order_router fl basic">' +
                                '                        <h3>订单路由</h3>' +
                                '                        <table id="order_router" class="order_router" lay-filter="order_router"></table>' +
                                '                    </div>' +
                                '                </div>' +
                                '                <div class="part3 clearfix">' +
                                '                    <h2 class="fl verticalTxt">交易执行设置</h2>' +
                                '                    <div class="account fl basic">' +
                                '                        <h3>账户信息</h3>' +
                                '                        <table id="account" class="account" lay-filter="account"></table>' +
                                '                    </div>' +
                                '                    <div class="accountLimit">' +
                                '                        <input type="radio" lay-filter="accountLimit" name="accountType" value="rootNet" title="rootNet"' +
                                '                               checked>' +
                                '                        <input type="radio" lay-filter="accountLimit" name="accountType" value="A6" title="A6">' +
                                '                        <input type="radio" lay-filter="accountLimit" name="accountType" value="HS" title="HS">' +
                                '                        <div class="rootNet fl basic">' +
                                '                            <h3>自营系统账户信息</h3>' +
                                '                            <table id="rootNet" lay-filter="rootNet"></table>' +
                                '                        </div>' +
                                '                        <div class="A6 fl basic">' +
                                '                            <h3>资管系统账户信息</h3>' +
                                '                            <table id="A6" lay-filter="A6"></table>' +
                                '                        </div>' +
                                '                        <div class="HS fl basic">' +
                                '                            <h3>经纪系统账户信息</h3>' +
                                '                            <table id="HS" lay-filter="HS"></table>' +
                                '                        </div>' +
                                '                        <div class="CATS fl basic">' +
                                '                            <h3>CATS系统账户信息</h3>' +
                                '                            <table id="CATS" lay-filter="CATS"></table>' +
                                '                        </div>' +
                                '                    </div>' +
                                '                    <div class="algo_conf fl basic">' +
                                '                        <h3>算法参数</h3>' +
                                '                        <table id="algo_conf" lay-filter="algo_conf"></table>' +
                                '                    </div>' +
                                '                </div>' +
                                '                <div class="part4 clearfix">' +
                                '                    <h2 class="fl verticalTxt">绩效评价</h2>' +
                                '                    <div class="performance_index fl basic">' +
                                '                        <h3>绩效指标</h3>' +
                                '                        <table id="performance_index" class="performance_index"' +
                                '                               lay-filter="performance_index"></table>' +
                                '                    </div>' +
                                '                    <div class="security_pool_index fl basic">' +
                                '                        <h3>自定义基准指标</h3>' +
                                '                        <table id="security_pool_index"' +
                                '                               lay-filter="security_pool_index"></table>' +
                                '                    </div>' +
                                '                    <div class="benchmark fl basic">' +
                                '                        <h3>绩效基准指标</h3>' +
                                '                        <table id="benchmark" lay-filter="benchmark"></table>' +
                                '                    </div>' +
                                '                    <div class="mail_receivers fl basic">' +
                                '                        <h3>邮件接收者</h3>' +
                                '                        <table id="mail_receivers"' +
                                '                               lay-filter="mail_receivers"></table>' +
                                '                    </div>' +
                                '                </div>' +
                                '            </div>',
                                success: function () {
                                    toAjax(fir, sec);
                                    $('.preview').show();
                                }
                            });
                        }
                    });
                    $('.startTraining').on('click', function () {
                        var fir = $('.server').attr('data-server');
                        var sec = $('.strName').html();
                        if (sec == '' || sec == null || sec == undefined) {
                            layer.open({
                                title: '警告'
                                ,
                                type: 1
                                ,
                                area: ['260px', '162px']
                                ,
                                content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px; margin-left: 30px;"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择策略</p>'
                                ,
                                tipsMore: true
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
                        } else if ($('.comList .select p').html() == '点击增加新的电脑') {
                            layer.open({
                                title: '警告'
                                ,
                                type: 1
                                ,
                                area: ['260px', '162px']
                                ,
                                content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px; margin-left: 30px;"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请选择一台电脑</p>'
                                ,
                                tipsMore: true
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
                                title: '训练策略'
                                ,
                                content: '是否训练策略?',
                                yes: function (index) {
                                    var trainingData = {
                                        "env": fir,
                                        "strategy": sec,
                                        "ip": $('.comList .select p span').html()
                                    };
                                    console.log(trainingData);
                                    $.ajax({
                                        type: "POST",
                                        dataType: 'json',
                                        url: 'getStartTrain/',
                                        data: JSON.stringify(trainingData),
                                        success: function (data) {
                                            console.log(data);
                                            if (data.result == 'ok') {
                                                layer.open({
                                                    title: '通知'
                                                    ,
                                                    content: '<i class="fl layui-icon layui-icon-ok-circle" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">训练成功</p>'
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
                                                    content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">训练失败</p>'
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
                                    layer.close(index);
                                    return false;
                                }
                            });
                        }
                    });
                }
            }
        });
        getList();

        function getList() {
            $.ajax({
                type: "GET",
                async: false,
                url: '/strategy/getRation',
                data: {},
                success: function (data) {
                    console.log(data);
                    if (data.status != 400) {
                        var comList = '';
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] != null) {
                                comList += '<li class="fl">\n' +
                                    '                        <div class="computer">\n' +
                                    '                            <table>\n' +
                                    '                                <tr>\n' +
                                    '                                    <td>CPU:</td>\n' +
                                    '                                    <td>' + data[i].cpu + '</td>\n' +
                                    '                                </tr>\n' +
                                    '                                <tr>\n' +
                                    '                                    <td>GPU:</td>\n' +
                                    '                                    <td>' + data[i].gpu + '</td>\n' +
                                    '                                </tr>\n' +
                                    '                                <tr>\n' +
                                    '                                    <td>硬盘:</td>\n' +
                                    '                                    <td>' + data[i].disk + '</td>\n' +
                                    '                                </tr>\n' +
                                    '                            </table>\n' +
                                    '                        </div>\n' +
                                    '                        <p>IP: <span>' + data[i].ip + '</span></p>\n' +
                                    '                        <div class="comSelect"></div>\n' +
                                    '                        <div class="comCover"></div>\n' +
                                    '                        <div class="comControl">\n' +
                                    '                            <a class="checkLog" href="javascript:;">查看log</a>\n' +
                                    '                            <a class="deleteIp" href="javascript:;">删除</a>\n' +
                                    '                        </div>\n' +
                                    '                    </li>';
                            }
                        }
                        comList += '\n' +
                            '                    <li class="createNew fl">\n' +
                            '                        <a href="javascript:;">\n' +
                            '                            <div>+</div>\n' +
                            '                            <p>点击增加新的电脑</p>\n' +
                            '                        </a>\n' +
                            '                    </li>';
                        $('.comList ul').html(comList);
                        var oLi = $('.comList li');
                        if (oLi.length < 3) {
                            oLi.css('borderRight', '1px dashed transparent');
                        }
                        if (oLi.length % 3 > 0) {
                            oLi.eq(oLi.length - oLi.length % 3).css('borderBottom', '1px dashed transparent');
                            oLi.eq(oLi.length - oLi.length % 3 + 1).css('borderBottom', '1px dashed transparent');
                        } else {
                            oLi.eq(oLi.length - 1).css('borderBottom', '1px dashed transparent');
                            oLi.eq(oLi.length - 2).css('borderBottom', '1px dashed transparent');
                            oLi.eq(oLi.length - 3).css('borderBottom', '1px dashed transparent');
                        }
                        $('.comList ul li').eq(0).addClass('primary');
                        $('.comList ul li').eq(0).addClass('select');
                        $('.showall').show();
                        $('.comList').show();
                        $('.startTraining').css('display', 'block');
                        $('.waiting').hide();
                        $('.comList li').on('click', function () {
                            $('.comList li').removeClass('select');
                            $(this).addClass('select');
                        });
                        $('.comControl a').on('click', function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                        });
                        $('.refresh').on('click', function () {
                            $('.showall').hide();
                            $('.comList').hide();
                            $('.startTraining').hide();
                            $('.waiting').show();
                            getList();
                        });
                        $('.createNew').on('click', function () {
                            layer.open({
                                title: '添加新的电脑'
                                ,
                                resize: false
                                ,
                                content: '<div class="clearfix"><p class="fl" style="line-height: 30px;font-size: 16px;">ip地址：</p><input value="" style="height: 31px; line-height: 31px; border: 1px solid #ccc; padding: 0 5px;width: 240px;" class="fl" name="ipAddress" type="text" placeholder="请输入ip地址"></div>',
                                yes: function (index) {
                                    var ip = $('input[name=ipAddress]').val();
                                    console.log(ip);
                                    if (ip == '' || ip == null || ip == undefined) {
                                        layer.open({
                                            title: '警告'
                                            ,
                                            type: 1
                                            ,
                                            area: ['260px', '162px']
                                            ,
                                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px; margin-left: 30px;"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">请填写ip地址</p>'
                                            ,
                                            tipsMore: true
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
                                        $.ajax({
                                            type: "POST",
                                            dataType: 'json',
                                            url: 'getRation',
                                            data: JSON.stringify({
                                                "action": "create",
                                                "ip": ip
                                            }),
                                            success: function (data) {
                                                console.log(data);
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
                                                        window.location.reload();
                                                    }, 1500)
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
                                                    layer.close(index);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        });
                        $('.deleteIp').on('click', function () {
                            var ip = $(this).parents('li').find('span').html();
                            console.log(ip);
                            layer.open({
                                title: '删除电脑'
                                ,
                                resize: false
                                ,
                                content: '确定删除电脑吗?',
                                yes: function (index) {
                                    $.ajax({
                                        type: "POST",
                                        dataType: 'json',
                                        url: 'getRation',
                                        data: JSON.stringify({
                                            "action": "delete",
                                            "ip": ip
                                        }),
                                        success: function (data) {
                                            console.log(data);
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
                                                    window.location.reload();
                                                }, 1500)
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
                                                layer.close(index);
                                            }
                                        }
                                    });
                                }
                            });
                        });
                    } else {
                        layer.open({
                            title: '警告'
                            ,
                            type: 1
                            ,
                            area: ['260px', '162px']
                            ,
                            content: '<i class="fl layui-icon layui-icon-close-fill" style="height: 80px; text-align: center; line-height: 80px; font-size: 36px; color: #f60; margin-right:14px; margin-left: 30px;"></i><p class="fl" style="height: 80px; text-align: center; line-height: 72px; font-size: 16px; color: #101010;">数据加载有误</p>'
                            ,
                            tipsMore: true
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
                    }
                }
            });
        }

        //ajax方法
        function toAjax(fir, sec) {
            $.ajax({
                type: "GET",
                async: false,
                url: '/strategy/current_ajax/' + fir + '/' + sec,
                data: {},
                success: function (data) {
                    console.log(data);
                    var part1 = data.strategy_info;
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
                            , {field: 'stra_type', title: '策略类型', align: 'center', templet: '#straType', unresize: true}
                            , {field: 'business', title: '业务类型', align: 'center', templet: '#business', unresize: true}
                            , {field: 'rrr', title: '最低日回报率', align: 'center', unresize: true}
                            , {field: 'rfr', title: '无风险利率', align: 'center', unresize: true}
                            , {field: 'mmf', title: '货币基金', align: 'center', unresize: true}
                            , {field: 'disable', title: '禁用标识', align: 'center', templet: '#disable1', unresize: true}
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
                                templet: '#start',
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
                        , limit: security_pool.length - 1
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
                        , limit: trading_configs.length - 1
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
                        , limit: trading_configs.length - 1
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
                        , limit: trading_configs.length - 1
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
                        , limit: order_router.length - 1
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
                        , limit: training_index.length - 1
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
                        , limit: training_common_index.length - 1
                        , cols: [[
                            {field: 'parent', title: '父节点', align: 'center', unresize: true}
                            , {field: 'windcode', title: '万得代码', align: 'center', unresize: true}
                            , {field: 'training_index', title: '训练因子', align: 'center', unresize: true}
                            , {field: 'priority', title: '顺序', align: 'center', unresize: true}
                        ]]
                    });
                    table.render({
                        elem: '#account'
                        , width: 1040

                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: account
                        , limit: account.length - 1
                        , cols: [[
                            {field: 'sys_id', title: '系统代码', align: 'center', unresize: true}
                            , {field: 'security_type', title: '证券类型', align: 'center', unresize: true}
                            , {field: 'quota', title: '额度', align: 'center', unresize: true}
                            , {field: 'ccy', title: '币种', align: 'center', unresize: true}
                            , {field: 'cost_type', title: '成本计算方法', align: 'center', unresize: true}
                        ]]
                    });
                    if (fir == 'aimockdb') {
                        $('.accountLimit').hide();
                    } else {
                        $('.accountLimit').show();
                        table.render({
                            elem: '#CATS'
                            , width: 1040

                            , skin: 'nob'
                            , even: true
                            , size: 'lg'
                            , data: CATS
                            , limit: CATS.length - 1
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
                                $('.layui-form-radio').hide();
                                $('.rootNet').show();
                                table.render({
                                    elem: '#rootNet'
                                    , width: 1040

                                    , skin: 'nob'
                                    , even: true
                                    , size: 'lg'
                                    , data: rootNet
                                    , limit: rootNet.length - 1
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
                                break;
                            case 'A6':
                                $('.rootNet').hide();
                                $('.HS').hide();
                                $('.layui-form-radio').hide();
                                $('.A6').show();
                                table.render({
                                    elem: '#A6'
                                    , width: 1040

                                    , skin: 'nob'
                                    , even: true
                                    , size: 'lg'
                                    , data: A6
                                    , limit: A6.length - 1
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
                                break;
                            case 'HS':
                                $('.A6').hide();
                                $('.rootNet').hide();
                                $('.layui-form-radio').hide();
                                $('.HS').show();
                                table.render({
                                    elem: '#HS'
                                    , width: 1040

                                    , skin: 'nob'
                                    , even: true
                                    , size: 'lg'
                                    , data: HS
                                    , limit: HS.length - 1
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
                                break;
                        }
                    }
                    table.render({
                        elem: '#algo_conf'
                        , width: 1040
                        , skin: 'nob'
                        , even: true
                        , size: 'lg'
                        , data: algo_conf
                        , limit: algo_conf.length - 1
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
                        , limit: performance_index.length - 1
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
                        , limit: security_pool_index.length - 1
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
                        , limit: benchmark.length - 1
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
                        , limit: mail_receivers.length - 1
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
                    if (trading_configs.length == 0) {
                        $('.training_configs').hide();
                    } else {
                        $('.training_configs').show();
                    }
                }
            });
        }

        $(".current .dropdown").mouseover(function () {
            $(this).addClass("open");
            $(this).children().css('display', "block");
        }).mouseleave(function () {
            $(this).removeClass("open");
            $(this).children().css('display', "hidden");
        });
        $(".current .sendAjax>a").click(function () {
            setTimeout('$(this).parent().addClass("open");', 1);
        });
    });
});