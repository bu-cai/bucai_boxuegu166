define(['jquery','jqueryCookie'], function ($) {
    //左侧导航栏下来列表
    $('.navs a').on('click', function () {
        $(this).next().slideToggle();
    });

    // ajax请求loading
    $(document).ajaxStart(function () {
        $('.overlay').show();
    }).ajaxStop(function () {
        $('.overlay').hide();
    })

    /*
    * 根据页面路径定位左侧导航
    * 1、获取当前页面的pathname
    * 2、然后获取所有的a，remove掉active class，
    * 然后在使用pathname获取到应该被选中的a，给它添加active class即可。
    * 3、然后使用pathname获取到应该被选中，让他们展示出来，如果不展示，我是看不着的。
    * filter：对当前的元素进行筛选
    * */
    var pathname = window.location.pathname;
    $('.navs a').removeClass('active').filter('[href="'+pathname+'"]').addClass('active').parents('ul').show();


    //退出功能
    /*
    * $.post：ajax请求里的post请求方法
    *
    * */
    $('#logout').on('click', function () {
        $.post('/v6/logout', function (data) {
            if(data.code == 200){
                location.href = '/html/home/login.html';
            }
        })
    })

    // 获取本地cookie用户信息，然后展示到左边导航
    var userInfo = null;
    try{
        //将本地cookie用户信息，转换一个对象，存储到变量中
       userInfo = JSON.parse($.cookie('userInfo')); //可能会出错
    }catch(e){
       userInfo = {};
    }
    //将登陆时输入的用户名，赋值到左边导航栏，如果有就赋值，如果没有就默认为bucai
    $('.aside .profile h4').html(userInfo.tc_name?userInfo.tc_name:'bucai');

    $('.aside .profile img').attr('src',userInfo.tc_avatar?userInfo.tc_avatar:'/img/default.png');



});





