// 1. 入口函数
$(function() {
    // 调用获取头像
    getUserInfo();

    // 4. 退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        // alert(11)
        // 询问框
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })

});



// 2. 获取用户头像
function getUserInfo() {
    // 2.1 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            // 判断验证码
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染头像信息
            renderAvactar(res.data);
        },
    })
}


// 3.渲染用户头像
function renderAvactar(user) {
    // 3.1 用户名
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.2 用户头像
    if (user.user_pic !== null) {
        // 有头像  隐藏文字头像
        $('.portrait').hide();
        $('.layui-nav-img').show().attr('src', user.user_pic)
    } else {
        // 没有头像 显示文字头像
        // 文字头像第一个字是大写
        var text = name[0].toUpperCase();
        $('.portrait').show().html(text);
        $('.layui-nav-img').hide()
    }
}