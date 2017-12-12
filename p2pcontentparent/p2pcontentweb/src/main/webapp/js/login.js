/*
(function($, undefined) {
    $(document).ready(function() {
        var namepartten=/^[a-zA-Z][a-zA-Z0-9_]{6,24}$/;
        var passwordpattern = /^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,24}$/;
        var regPartton = /^1[3-9]\d{9}$/;
        var flag4 = 1;
        var _t = 60; // 倒计时时间
        var subFlag = "1";
        var flag = 0;
        var wait = 300;
        var verify1 = "";
        var verify2 = "";
        var flag1 = true;
        var flaghave = 0;
        var flag3 = 1;
        var $invist = $("._invist");
        var $invist_msg = $("._invist_msg");
        var $getKey = $("._getkey");
        var $phoneyanzhengma = $("._yanzhengma");
        var $yanzhengma = $("#jpgVerify");
        var $yanzhengmatishi = $('#jpgVerifys');
        var invist_flag = true;
        var $changeCapcherButton = $("._changeCapcherButton");
        var $phoneMsg = $('#phoneJy');
        var login = {
            init: function() {
                login._bind();
            },
            _bind: function() {
                $invist.on('blur', function(event) {
                    event.preventDefault();
                    login.validateInvist();
                    return false;
                });
                /!*$getKey.on('click', function(event) {
                    event.preventDefault();
                    if (flag3 != 0) {
                        $("#phoneJy").text("");
                        $("#phoneJy").append("<span style=color:#ff7800>请先输入正确的验证码</span>");
                        return false;
                    }
                    if (flag4 == 1) {
                        flag4 = 0;
                        login._ya($(this));
                    }
                    return false;
                });*!/
                $("._phoneNum").on('blur keyup', function(event) {
                    event.preventDefault();
                    login.phoneYz();
                    return false;
                });
                $("._phonVerify").on('blur', function(event) {
                    event.preventDefault();
                    login.checkSecurity($(this));
                    return false;
                });
                $("._userName").on('blur', function(event) {
                    event.preventDefault();
                    login.strVerify($(this));
                    return false;
                });
                $("._password").on('blur', function(event) {
                    event.preventDefault();
                    login.strVerify($(this));
                    return false;
                });
                $("._repeatPassword").on('blur', function(event) {
                    event.preventDefault();
                    login.strVerify($(this));
                    return false;
                });
               /!* $phoneyanzhengma.on('blur', function(event) {
                    event.preventDefault();
                    login.verify($(this));
                    return false;
                });*!/
                $("._ajaxSubmit").on('click', function(event) {
                    event.preventDefault();
                    login.ajaxSubmit();
                    return false;
                });
            },
            _ya: function(o) {
                if (login.phoneSend(o)) {
                    if (flaghave != "1") {
                        login._daojishi();
                    }
                } else {
                    flag4 = 1;
                }
            },
            phoneYz: function() { // 手机号验证
                var utel = $("#phone");
                var str = utel.val();
                var regPartton = /^1[3-9]\d{9}$/;
                if (str.length > 11) {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:#ff7800>手机号格式不正确</span>");
                    flag = 1;
                    return false;
                }
                if (!str || str == null) {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:#ff7800>手机号不可为空</span>");
                    flag = 1;
                    return false;
                } else if (!regPartton.test(str)) {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:#ff7800>手机号格式不正确</span>");
                    flag = 1;
                    return false;
                } else {
                    $("#phoneJy").text("");
                    $("#phoneJy").append("<span style=color:green>手机号格式正确</span>");
                    flag = 0;
                    return true;
                }
            },
            phoneSend: function(o) {
                if (!login.phoneYz()) {
                    return false;
                }
                if (flag == "1") {
                    return false;
                }
                var isSuccess = false;
                $.ajax({
                    type: "post", //请求方式
                    dataType: "json",
                    url: path.base + "/user!phoneVerify.action", //发送请求地址
                    async: false,
                    data: { //发送给数据库的数据
                        phone: $("#phone").val(),
                        userName: $("#userName").val(),
                    },
                    //请求成功后的回调函数有两个参数
                    success: function(data) {
                        flag4 = 1;
                        if (data['code'] == "1") { //新号码
                            wait = 300;
                            flaghave = 1;
                            $phoneMsg.text("");
                            $phoneMsg.html("<span style=color:#ff7800>该手机号码已经注册</span>");
                        } else if (data['msg'] == "3") {
                            wait = 300;
                            flaghave = 1;
                            $phoneMsg.text("");
                            $phoneMsg.html("<span style=color:#ff7800>发送手机号发生错误,请刷新重试</span>");
                        } else if (data['msg'] == "4") {
                            wait = 300;
                            flaghave = 1;
                            $phoneMsg.text("");
                            $phoneMsg.html("<span style=color:#ff7800>一分钟之内只能发送一次验证码</span>");
                        } else {
                            flag4 = 0;
                            isSuccess = true;
                        }
                    },
                    error: function(data, textStatus) {
                        flag4 = 1;
                    }
                });
                if (isSuccess) {
                    login._changetCapther();
                    o.val("重新发送(" + wait + ")");
                    wait--;
                    return true;
                } else {
                    return false;
                }
            },
            checkSecurity: function(vr) {
                var byName = vr.data('_id');
                var ids = '#' + byName;
                $.ajax({
                    type: "post", //请求方式
                    dataType: "json",
                    url:  "/user!verify.action", //发送请求地址
                    data: { //发送给数据库的数据
                        verifyCode: vr.val(),
                        byName: byName
                    },
                    //请求成功后的回调函数有两个参数
                    success: function(data) {
                        $(ids + "s").text("");
                        if (data.code == "1") {
                            $(ids + "s").html("<span style=color:green>验证成功</span>");
                            flag1 = true;
                            if (byName == "phonVerify") {
                                verify1 = "1";
                            } else {
                                verify2 = "1";
                            }
                        } else {
                            $(ids + "s").html("<span style=color:#ff7800>验证失败</span>");
                           // flag1 = false;
                            flag1=true;//为了方便注册,修改为true
                            if (byName == "phonVerify") {
                                verify1 = "2";
                            } else {
                                verify2 = "2";
                            }
                        }
                    },
                    error: function(data, textStatus) {}
                });
            },
            strVerify: function(event) {
                var strName = event.attr('id');
                var strVal = event.val();
                var ids = '#' + strName + 'Alt';
                //验证用户名
                if (strName == 'userName') {
                    if (strVal == null || strVal == '') {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>用户名不能为空</span>");
                        return false;
                    }
                    if (!namepartten.test(strVal)) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>用户名只能为以字母开头,字母、数字下划线组成</span>");
                        return false;
                    } else if (strVal.length < 6 || strVal.length > 24) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>用户名小于6位或者大于24位</span>");
                        return false;
                    } else {
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            url: "/account/usernameverify.action", //发送请求地址
                            data: {
                                verifyStr: strName,
                                verifyVal: strVal
                            },
                            //请求成功后的回调函数有两个参数
                            success: function(data) {
                                var msg1 = data['message']
                                if ("1" == data.code) {
                                    $(ids).text("");
                                    $(ids).append("<span style=color:green>填入信息可用</span>")
                                } else {
                                    $(ids).text("");
                                    $(ids).append("<span style=color:#ff7800>" + msg1 + "</span>")
                                }
                            }
                        });
                    }
                } else
                //验证密码
                if (strName == 'password') {
                    if (strVal == null || strVal == '') {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>密码不能为空</span>");
                    }
                    if (strVal.length < 6 || strVal.length >24) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>密码小于6位或者大于24位</span>");
                    }
                    if (!passwordpattern.test(strVal)) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>密码必须是数字和字符组合</span>");
                    } else {
                        $(ids).text("");
                        $(ids).append("<span style=color:green>填入信息可用</span>");
                    }
                }
                //重复密码
                if (strName == 'repeatPassword') {
                    if ($("#repeatPassword").val() != $("#password").val()) {
                        $(ids).text("");
                        $(ids).append("<span style=color:#ff7800>两次输入密码不一样</span>");
                    } else {
                        $(ids).text("");
                        $(ids).append("<span style=color:green>密码输入一致</span>");
                    }
                }
                //结束
            },
            verify: function(vr) {
                var byName = vr.attr("id");
                var ids = '#' + byName;
                $.ajax({
                    type: "post", //请求方式
                    dataType: "json",
                    cache: false,
                    async: false,
                    url:  "/user!verify.action", //发送请求地址
                    data: { //发送给数据库的数据
                        verifyCode: $(ids).val(),
                        byName: byName
                    },
                    //请求成功后的回调函数有两个参数
                    success: function(data) {
                        $(ids + "s").text("");
                        if (data.code == "1") {
                            $(ids + "s").append("<span style=color:green>验证成功</span>");
                            flag3 = 0;
                            if (byName == "phonVerify") {
                                verify1 = "1";
                            } else {
                                verify2 = "1";
                            }
                        } else {
                            $(ids + "s").append("<span style=color:#ff7800>验证失败</span>");
                            flag3 = 1;
                            if (byName == "phonVerify") {
                                verify1 = "2";
                            } else {
                                verify2 = "2";
                            }
                        }
                    },
                    error: function(data, textStatus) {
                        alert(textStatus);
                    }
                });
            },
            ajaxSubmit: function() {
                var selectedItems = new Array();
                $("input[name='protocol']:checked").each(function() {
                    selectedItems.push($(this).val());
                });

                if ($('#userName').val() == null || $('#userName').val() == '') {
                    $('#userNameAlt').text("");
                    $('#userNameAlt').append("<span style=color:#ff7800>用户名不能为空</span>");
                    return false;
                } else if (!namepartten.test($('#userName').val())) {
                    $('#userNameAlt').text("");
                    $('#userNameAlt').append("<span style=color:#ff7800>用户名只能为数字和字母</span>");
                    return false;
                } else if ($('#password').val() == null || $('#password').val() == '') {
                    $('#passwordAlt').text("");
                    $('#passwordAlt').append("<span style=color:#ff7800>密码不能为空</span>");
                    return false;
                } else if ($('#password').val().length < 6 || $('#password').val().length > 24) {
                    $('#passwordAlt').text("");
                    return false;
                } else if (!passwordpattern.test($('#password').val())) {
                    $('#passwordAlt').text("");
                    $('#passwordAlt').append("<span style=color:#ff7800>密码必须是数字和字符组合</span>");
                    return false;
                } else if ($("#repeatPassword").val() != $("#password").val()) {
                    $('#repeatPasswordAlt').text("");
                    $('#repeatPasswordAlt').append("<span style=color:#ff7800>两次密码输入不一致</span>");
                    return false;
                } else if (selectedItems.length == 0) {
                    $('#protocolAlt').text("");
                    $('#protocolAlt').append("<span style=color:#ff7800>请点击投贷宝注册协议</span>");
                    return false;
                } else if (!flag1) {
                    $("#phonVerifys").html("<span style=color:#ff7800>验证失败</span>");
                    return false;
                } else if (!invist_flag && $invist.val() != "") {
                    $invist_msg.css("color", "#ff7800");
                    $invist_msg.html("推荐人不存在!");
                    return false;
                } else {
                    if (subFlag == "1") {
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            async: false,
                            cache: false,
                            url:  "/account/regist.action", //发送请求地址
                            data: {
                                "username": $('#userName').val(),
                                "password": $('#password').val(),
                                "phonenumber": $("#phone").val(),
                                "phoneCode":$("#phonVerify").val(),
                                "invite": $invist.val(),
                                "imgCode":$("#imgCode").val(),
                                "confimPassword":$("#repeatPassword").val()
                            },
                            //请求成功后的回调函数有两个参数
                            success: function(data) {
                                if (data.code == '1') {
                                    alert("注册成功,点击进入登录页面");
                                    window.location.href="/login.html"
                                }else {
                                    alert(data.message);
                                }
                            }
                        });
                        subFlag = "2";
                    }
                }
            },
            _daojishi: function() {
                login._setti(_t);
            },
            _setti: function(i) {
                setTimeout(function() {
                    if (i == 0) {
                        $getKey.html("获取验证码");
                        flag4 = 1;
                    } else {
                        $getKey.html("重新发送(" + i + ")");
                        login._setti(parseInt(i - 1));
                    }
                }, 1000);
            },
            validateInvist: function() {
                $.ajax({
                    url:  '/user!checkInvistUser.action',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        i_n: $invist.val()
                    },
                    success:function(result) {
                        if (result) {
                            $invist_msg.css("color", "green");
                            $invist_msg.html("推荐人正确");
                            invist_flag = true;
                        } else {
                            $invist_msg.css("color", "#ff7800");
                            $invist_msg.html("推荐人不存在!");
                            invist_flag = false;
                        }
                    },
                    error: function() {
                        alert("fail");
                    }
                });
            },
            _changetCapther: function() {
                $changeCapcherButton.trigger('click');
                flag3 = 1;
                return false;
            }
        };
        login.init();
    });
})(jQuery)*/
$(function () {

    $("#userName").blur(function () {
        return QIANFENG.checkName();
    });
    $("#password").blur(function () {
        return QIANFENG.checkPasword();
    });
    $("#repeatPassword").blur(function () {
        return QIANFENG.repeatPassword();
    });
    $("#jpgVerify").blur(function () {
        return QIANFENG.checkPicCode();
    });
    $("#phone").blur(function () {
        return QIANFENG.checkPhoneNum();
    });
    $("#phonVerify").blur(function () {
        return QIANFENG.checkPhoneCode();
    });
    $("#regist").click(function () {//注册
        QIANFENG.checkCheckBox();

        if (QIANFENG.checkName()&&QIANFENG.checkPasword()&&QIANFENG.repeatPassword()&&QIANFENG.checkPicCode()&&QIANFENG.checkPhoneNum()&&QIANFENG.checkPhoneCode()) {
            //发起异步请求
            var inputs = $("#registerCont input[type!='checkbox']");
            var data = "";
            for (var i =0;i<inputs.length;i++) {
                if (i!=inputs.length-1) {
                    data += $(inputs[i]).attr("name") + "=" + $(inputs[i]).val()+"&";
                }else{
                    data += $(inputs[i]).attr("name") + "=" + $(inputs[i]).val();
                }
            }
            $.ajax({
                "url":"/account/regist.action",
                "type":"POST",
                "data":data,
                "dataType":"json",
                "success":function (data) {
                    if (data.code==1) {
                        alert("注册成功,即将跳转");
                        location.href = "/index.html";
                    }else if (data.code==0) {
                        alert("注册失败,请检查信息");
                    }else if (data.code==2) {
                        alert("用户名不合法");
                    }else if (data.code==4) {
                        alert("两次密码不一致");
                    }else if (data.code==5) {
                        alert("图片验证码错误");
                    }else if (data.code==6) {
                        alert("手机验证码错误");
                    }
                }
            })
        }

    });
    if ($("#submitBtn")) {//登录操作
        $("#submitBtn").click(function () {
           /* this.toggle("submit");*/
          $.ajax({
              url:"/account/login.action",
              data:$("#LonginForm").serialize(),
              type:"post",
              dataType:"json",
              success:function (data) {
                 // alert(data);
                  if (data.code==1) {
                      location.href="/index.html";
                  }else if (data.code==0) {
                      alert("登录失败");
                  } else if (data.code==5) {
                      alert("验证码错误")
                  }

              }
              
          })
          return false;
        });
        
    }
})

var QIANFENG = {
    /*
        校验用户名
     */
    checkName: function () {
        var namepartten = /^[a-zA-Z][a-zA-Z0-9_]{5,23}$/;
        var userName = $("#userName").val();
        //校验用户名是否为空
        if (!userName) {
            $("#userNameAlt").css("color", "red");
            $("#userNameAlt").text("用户名不能为空");
            return false;
        } else if (!namepartten.test(userName)) {//密码是否符合规则
            $("#userNameAlt").css("color", "red");
            $("#userNameAlt").text("用户名必须是字母开头的6-24字母加数字");
            return false;
        } else if (namepartten.test(userName)) {
            $("#userNameAlt").css("color", "green");
            $("#userNameAlt").text("用户名符合规则");
            //此处应该发起异步请求检查用户名
            return true;
        }
    },
    /*
        检查密码
     */
    checkPasword: function () {
        var passwordpattern = /^(?=.*\d.*)(?=.*[a-zA-Z].*).{6,24}$/;
        var password = $("#password").val();
        //判断密码是否为空
        if (!password) {
            $("#passwordAlt").css("color", "red");
            $("#passwordAlt").text("密码不能为空");
            return false;
        } else if (!passwordpattern.test(password)) {//密码是否符合规则
            $("#passwordAlt").css("color", "red");
            $("#passwordAlt").text("密码必须是6-24位的字母字符加数字");
            return false;
        } else if (passwordpattern.test(password)) {
            $("#passwordAlt").css("color", "green");
            $("#passwordAlt").text("密码正确");
            //此处应该发起异步请求检查用户名
            return true;
        }
    },
    /*
    重复密码校验
     */
    repeatPassword: function () {
        var password = $("#password").val();
        var repeatPassword = $("#repeatPassword").val();
        if (!repeatPassword) {
            $("#repeatPasswordAlt").css("color", "red");
            $("#repeatPasswordAlt").text("重复密码不能为空");
            return false;
        } else if (repeatPassword != password) {
            $("#repeatPasswordAlt").css("color", "red");
            $("#repeatPasswordAlt").text("两次密码不一致");
            return false;
        } else if (repeatPassword == password) {
            $("#repeatPasswordAlt").css("color", "green");
            $("#repeatPasswordAlt").text("两次密码一致");
            return true;
        }

    },
    /*
    校验验证码
     */
    checkPicCode: function () {
        var picCode = $("#jpgVerify").val();
        if (!picCode || picCode.length < 4) {
            $("#jpgVerifys").css("color", "red");
            $("#jpgVerifys").text("验证码输入错误");
            return false;
        } else {
            $("#jpgVerifys").text("");
            return true;
        }
    },
    /*
    检查手机号
     */
    checkPhoneNum: function () {
        var phoneNum = $("#phone").val();
        var phonePartton = /^1[3-9]\d{9}$/;
        if (!phoneNum) {
            $("#phoneJy").css("color", "red");
            $("#phoneJy").text("手机号不能为空");
            return false;
        } else if (!phonePartton.test(phoneNum)) {
            $("#phoneJy").css("color", "red");
            $("#phoneJy").text("手机号不符合规则");
            return false;
        } else if (phonePartton.test(phoneNum)) {
            $("#phoneJy").css("color", "green");
            $("#phoneJy").text("手机号输入正确");
            return true;
        }
    },
    checkPhoneCode: function () {
        var phoneCode = $("#phonVerify").val();
        if (!phoneCode || phoneCode.length != 4) {
            $("#phonVerifys").css("color", "red");
            $("#phonVerifys").text("验证码错误");
            return false;
        } else {
            return true;
        }
    },
    checkCheckBox: function () {
       if ($("#protocol").is(":checked")) {
           return true;

       }else {
           alert("尚未同意协议");
           return false;
       }
    }
};