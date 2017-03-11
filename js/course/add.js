define(['jquery','common','nprogress'], function ($,undefined,nprogress) {


    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    $('#create-form').on('submit', function () {


        $.ajax({
            url:'/v6/course/create',
            type:'post',
            data:$(this).serialize(),
            success: function (data) {
                if(data.code == 200){
                    location.href = '/html/course/add_step1.html?cs_id=' + data.result.cs_id;

                }
            }
        })
        return false;
    })

})