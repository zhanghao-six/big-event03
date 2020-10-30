//接口文档根路径
var baseURL = 'http://ajax.frontend.itheima.net';

//调用jquery一个封装函数 可以拦截ajax请求并且添加路径
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;



    //  设置头部 token  可以直接访问带有密码的网页
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 3. 身份认证 
    params.complete = function(res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
        }
    }

});