$(function(){
    // ########后台数据控制前台的选项##############
    function handleServiceCheck(){

        var tradinginterface_rn = $("#tradinginterface_rn").val();
        var tradinginterface_a6 = $("#tradinginterface_a6").val();
        var tradinginterface_hs = $("#tradinginterface_hs").val();
        var tradinginterface4 = $("#tradinginterface4").val();
        var tradinginterface_iv = $("#tradinginterface_IV").val();



        var regressiontestingval=$("#TegressionTestingyes").val();
        var paval=$("#PAyes").val();
        var riskcontrolval=$("#RiskControlyes").val();
        var realmarketval=$("#RrealMarketyes").val();
        var historicaldataval=$("#HistoricalDatayes").val();

        var substitutesdataval=$("#SubstitutesDatayes").val();

        var keyinstallval=$("#KeyInstallyes").val();
        var casestudyval=$("#CaseStudyyes").val();
        var env_test=$("#Environment1").val();
        var env_dev=$("#Environment2").val();
        var env_prod=$("#Environment3").val();

        var serviceArray = {
        "TegressionTestingyes":regressiontestingval,"PAyes":paval,
        "RiskControlyes":riskcontrolval, "RrealMarketyes":realmarketval,
        "HistoricalDatayes":historicaldataval,"SubstitutesDatayes":substitutesdataval,"KeyInstallyes":keyinstallval,
        "CaseStudyyes":casestudyval};

        var serviceArray2 = {
        'tradinginterface_rn':tradinginterface_rn, 'tradinginterface_a6':tradinginterface_a6,
        'tradinginterface4':tradinginterface4,'tradinginterface_hs':tradinginterface_hs,
        "Environment1":env_test, "Environment2":env_dev, "Environment3":env_prod,
        'tradinginterface_IV':tradinginterface_iv};

        $.each(serviceArray, function(i){
            if(serviceArray[i] == '1') {
                $('#'+i).prop('checked', true);
            }else{
                $('#'+i).siblings().prop('checked', true);
                $('#'+i).val('1');
            }
        });

        $.each(serviceArray2, function(i){
            if(serviceArray2[i] == '1') {
                $('#'+i).prop('checked', true);
            }
        })

    }
    handleServiceCheck();

    //
    function onTradingIntfChange(element)
    {
        if (element.checked){
            if (element.id == 'tradinginterface_hs'){
                $('#tradinginterface_a6').attr('checked', false);
                $('#tradinginterface_rn').attr('checked', false);
            }
            else if (element.id == 'tradinginterface_a6'){
                $('#tradinginterface_rn').attr('checked', false);
                $('#tradinginterface_hs').attr('checked', false);
            }
            else if (element.id == 'tradinginterface_rn'){
                $('#tradinginterface_a6').attr('checked', false);
                $('#tradinginterface_hs').attr('checked', false);
            }
        }
    }


        $.ajaxSetup({ data: {csrfmiddlewaretoken: '{{ csrf_token }}' } });
        var type = getUrlParam('type');


        $("#filInInformation :input").change(function (){
            var user=$('input:text[name="user"]').val();
            var phone=$('input:text[name="phone"]').val();
            var email=$('input:text[name="email"]').val();
            var password=$('input:password[name="password"]').val();
            var repassword=$('input:password[name="repassword"]').val();
            var specialplane=$('input:text[name="specialplane"]').val();
            var ipaddress=$('input:text[name="ipaddress"]').val();
            var company=$('input:text[name="company"]').val();

            var branch=$('input:text[name="branch"]').val();
            var jobnumber=$('input:text[name="jobnumber"]').val();

            /*增加用途选项*/
            var purposeval=$('#purpose').val();

            if(user == ''||phone == ''||email == ''||password == ''||repassword == ''||specialplane == ''||ipaddress == ''||company == ''||branch == ''||jobnumber == ''||purposeval == ''){
                $('#loginbtninfo').attr('disabled',true);
                  return false;
              }else{
                $('#loginbtninfo').attr('disabled',false);
              }
        });

        //自定义校验手机号
        $.validator.addMethod(
            'phone',
            function(value,element,param){
                var reg = /^(0|\+86)?(13\d|14[579]|15[0-35-9]|17[0135-8]|18\d)\d{8}$/;
                return reg.test(value);
            },'请输入正确的手机号码'
        );

        //自定义校验座机
        $.validator.addMethod(
            'specialplane',
            function(value,element,param){
                var reg = /^\d{3,4}-?\d{7,9}$/;
                return reg.test(value);
            },
            '请输入包含区号的座机号码。如:010-60838888'
        );

        //自定义IP
        $.validator.addMethod(
            'ipaddress',
            function(value,element,param){
                var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                return reg.test(value);
            },
            '请输入正确的IP'
        );

        $("#registForm").validate({
            rules:{
                user:{
                    required:true
                },
                phone:{
                    required:true,
                    phone:true
                },
                email:{
                    required:true,
                    email:true
                },
                password:{
                    required:true
                },
                repassword:{
                    required:true,
                    equalTo:"[name='password']"
                },
                specialplane:{
                    required:true,
                    specialplane:true
                },
                ipaddress:{
                    required:true,
                    ipaddress:true
                },
                company:{
                    required:true,
                },
                branch:{
                    required:true
                },
                jobnumber:{
                    required:true
                },
                purpose:{
                    required:true
                }
            },
            messages:{
                user:{
                    required:"姓名不能为空"
                },
                phone:{
                    required:"手机号不能为空"
                },
                email:{
                    required:"邮箱不能为空！",
                    email:"邮箱格式不正确！"
                },
                password:{
                    required:"密码不能为空！",
                    minlength:"密码不能少于6位！",
                },
                repassword:{
                    required:"确认密码不能为空！",
                    equalTo:"两次密码输入不一致！"
                },
                specialplane:{
                    required:"座机不能为空！"
                },
                ipaddress:{
                    required:"固定IP地址不能为空！"
                },
                company:{
                    required:"公司名称不能为空！"
                },
                branch:{
                    required:"部门不能为空"
                },
                jobnumber:{
                    required:"工号不能为空"
                },
                purpose:{
                    required:"用途不能为空"
                },
            },
            errorElement:"label",           //用来创建错误提示信息标签,validate插件默认的就是label
            success:function(label){        //验证成功后的执行的回调函数
                 //label指向上面那个错误提示信息标签label
                label.text("")              //清空错误提示信息
//	                .addClass("success");   // 加上自定义的success类
            },
        });


        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        };



        //注册提交
        $('#loginbtninfo').on('click',function(){
            // 用户信息资料
            var userval = $('#user').val();  //姓名
            var phoneval = $('#phone').val(); //手机
            var emailval = $('#email').val(); //邮箱
            var passwordval = $('#password').val(); //输入密码
            var repasswordval = $('#repassword').val(); //确认密码
            var specialplaneval = $('#specialplane').val(); //座机
            var ipaddressval = $('#ipaddress').val(); //固定IP地址
            var companyval = $('#company').val(); //公司名称
            var branchval = $('#branch').val(); //部门名称
            var jobnumberval = $('#jobnumber').val(); //员工工号
            var purposeval = $('#purpose').val();
            // 用户选择的服务
            var tradinginterface_rn = !!$('input:checkbox[name="tradinginterface_rn"]:checked').val();
            var tradinginterface_a6 = !!$('input:checkbox[name="tradinginterface_a6"]:checked').val();
            var tradinginterface_hs = !!$('input:checkbox[name="tradinginterface_hs"]:checked').val();
            var tradinginterface_cats = !!$('input:checkbox[name="tradinginterface_cats"]:checked').val();

            var tradinginterface_iv = !!$('input:checkbox[name="tradinginterface_IV"]:checked').val();

            //console.log(userval);

            var envtestval=!!$('input:checkbox[name="env_test"]:checked').val();
            var envdevval=!!$('input:checkbox[name="env_dev"]:checked').val();
            var envprodval=!!$('input:checkbox[name="env_prod"]:checked').val();

            var regressiontestingval = $('input[name="regressiontesting"]:checked ').val();
            var paval = $('input[name="pa"]:checked ').val();
            var riskcontrolval = $('input[name="riskcontrol"]:checked ').val();
            var realmarketval = $('input[name="realmarket"]:checked ').val();
            var historicaldataval = $('input[name="historicaldata"]:checked ').val();

            var substitutesdataval = $('input[name="substitutesdata"]:checked ').val();

            var keyinstallval=$('input:radio[name="keyinstall"]:checked').val();
            var casestudyval=$('input:radio[name="casestudy"]:checked').val();

            //TODO 提交填写资料
            $.ajax({
                type:"post", //真实接口是post
                url:"/modify_user",
                async:true,
                dataType:"json",
                data:{
                    user:userval,
                    phone:phoneval,
                    email:emailval,
                    password:passwordval,
                    repassword:repasswordval,
                    specialplane:specialplaneval,
                    ipaddress:ipaddressval,
                    company:companyval,
                    branch:branchval,
                    jobnumber:jobnumberval,
                    purpose:purposeval,

                    tradinginterface_rn:tradinginterface_rn,
                    tradinginterface_a6:tradinginterface_a6,
                    tradinginterface_hs:tradinginterface_hs,
                    tradinginterface_cats:tradinginterface_cats,

                    tradinginterface_iv:tradinginterface_iv,

                    regressiontesting:regressiontestingval,
                    pa:paval,
                    riskcontrol:riskcontrolval,
                    realmarket:realmarketval,
                    historicaldata:historicaldataval,

                    substitutesdata:substitutesdataval,

                    keyinstall:keyinstallval,
                    env_test:envtestval,
                    env_dev:envdevval,
                    env_prod:envprodval,
                    casestudy:casestudyval,
                },
                success:function(result){ //成功
                    if( result.result == 'ok' ) {
                        alert('已提交审核!!!!');
                        window.location.href="{% url 'account_mgr:page_index'%}"
                        // SubmitAuditshow();//提交成功
                        /*提交成功，向管理员发送通知*/
                        /*$.ajax({
                            type:"post", //真实接口是post
                            url:"{% url 'account_mgr:send_admin_email' %}",
                            async:true,
                            dataType:"json",
                            data:{
                                user:userval,
                                phone:phoneval,
                                email:emailval,
                                password:passwordval,
                                repassword:repasswordval,
                                specialplane:specialplaneval,
                                ipaddress:ipaddressval,
                                company:companyval,
                                branch:branchval,
                                jobnumber:jobnumberval,
                                purpose:purposeval,
                            },
                            success:function(result){ //成功
                                if(result.result == 'ok'){
                                    alert("已通知管理员您的注册信息，我们将会尽快为您审核！！！");
                                }else{
                                    alert(result.errmsg); //提交失败，弹出失败提示语
                                    console.log(result)
                                }
                            },
                            error:function(xhr,status,error){ //失败
                                alert("提交错误！");
                            }
                        });*/
                    }else{
                        var mes = result.errmsg;
                        alert(mes); //提交失败，弹出失败提示语
                    }
                },
                error:function(xhr,status,error){ //失败
                    alert("提交错误！");
                }
            });
        });
});