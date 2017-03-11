define(['jquery','common','nprogress','template'], function ($,undefined,nprogress,template) {


    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    $.ajax({
        url:'/v6/category',
        type:'get',
        data:$(this).serialize(),
        success: function (data) {
            var html = template('category-list-tpl',{list:data.result});
            $('#category-list-table').append(html);

        }
    })


})