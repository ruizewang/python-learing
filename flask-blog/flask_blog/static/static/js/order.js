$(document).ready(function () {
    //layui组件
    layui.use(['element', 'layer'], function () {
        function CompareDate(t1, t2, t3) {
            var date = new Date();
            var a = t1.split(":");
            var b = t2.split(":");
            var c = t3.split(":");
            if (date.setHours(a[0], a[1]) < date.setHours(b[0], b[1]) && date.setHours(b[0], b[1]) < date.setHours(c[0], c[1])) {
                return 'ok';
            }

        }

        function getUrlParms(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        }

        var strategy = getUrlParms("strategy");
        var env = getUrlParms("env");
        console.log(env);
        console.log(strategy);
        document.onkeydown = function (e) {
            var ev = window.event || e;
            var code = ev.keyCode || ev.which;
            if (code == 116) {
                ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
                cancelBubble = true;

                if (e && e.preventDefault) e.preventDefault();
                else window.event.returnValue = false;

                return false;
            }
        };
        //禁止鼠标右键菜单
        document.oncontextmenu = function (e) {
            return false;
        };
        $.ajax({
            type: "GET",
            async: false,
            url: '/strategy/getIp/' + env +'/'+ strategy,
            data: {},
            success: function (data) {
                console.log(data);
                $('.current>a').attr('href', 'https://' + data.ip);
            }
        });

        toAjax();
        self.setInterval(toAjax, 30000);

        function toAjax() {
            if (CompareDate("9:25", new Date().getHours() + ":" + new Date().getMinutes(), "20:10") == 'ok') {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: '/strategy/lookLog/',
                    data: {'env': env, 'strategy': strategy},
                    success: function (data) {
                        $('.log>div').html('<p>' + data.log + '</p>');
                    }
                });
            } else {
                $('.log>div').html('<p>请在当日09:25至20:10再次查看</p>');
            }
        }
    });
});