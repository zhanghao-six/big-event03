// 1.入口函数
$(function() {
    // 2. 点击注册账号 隐藏登录账号
    $('#link-reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    // 3. 点击登录账号 隐藏注册账号
    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 4. 校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 4.1  再次确认密码规则
        repwd: function(value) {
            var pwd = $('.reg-box input[name=password]').val();
            // 4.2 判断
            if (value !== pwd) {
                return '两次密码不一致';
            }
        }
    });
    // 5. 注册功能
    $('#form-reg').on('submit', function(e) {
        // 5.1 阻止默认跳转
        e.preventDefault();
        // 5.2 发送ajax 
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: function(res) {
                if (res.status != 0) {
                    console.log(res.message);
                }
                // 提交成功
                console.log(res.message);
            }
        })
    })
})