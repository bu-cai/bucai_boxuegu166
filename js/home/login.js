define(['jquery','jqueryCookie','nprogress'], function ($,undefined,nprogress) {


    /*
    * 展示用户的历史登陆头像：
    * 1、获取userInfo这个cookie值
    * 2、把cookie字符串转换为对象
    * 3、设置登陆页的img-src为对象中的tc_avatar属性值，如果没有给一个默认头像的地址
    * */
    var userInfo = null;
    try{
        userInfo = JSON.parse($.cookie('userInfo'));
    }catch(e) {
        userInfo = {};
    }

    $('.login .avatar img').attr('src',userInfo.tc_avatar?userInfo.tc_avatar :'/img/default.png');

    /*
    * 1、先监听form表单的提交事件，
    * 2、事件回调中return false阻止默认的提交
    * 3、事件回调通过ajax的方式发送表单数据
    * 4、如果返回结果中的code为200，证明登录成功，跳转到首页
    * */
    $('#form-login').on('submit', function () {
        $.ajax({
            url:'/v6/login',
            type:'post',
            data: $(this).serialize(),
            success: function (data) {
                console.log(data);
                //如果登录成功，使用cookie的方式保存用户信息，
                // 注意：cookie值必须为字符串，我们得到的是js对象，需要使用JSON.stringify转化为字符串
                if( data.code == 200){
                    //用userInfo存储cookie的数据
                    $.cookie('userInfo',JSON.stringify(data.result),{path:'/'}); // 把{path:'/'}指为根所有的地方就可以获取的
                    location.href = '/';
                }
            }
        });
        return false;
    })
    nprogress.done();
});