define(['jquery'], function ($) {
    //左侧导航栏下来列表
    $('.navs a').on('click', function () {
        $(this).next().slideToggle();
    });

    $.ajax({
        url: '/v6/login',
        type: 'post',
        data: {
            tc_name: 123456,
            tc_pass: 123456
        },
        success: function() {
            console.log('成了')
        },
        error: function() {
            console.log('败了')
        }
    });
});





