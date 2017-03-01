define(['jquery','common','nprogress','template'], function ($,undefined,nprogress,template) {


    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    $.get('/v6/teacher', function (data) {
        if(data.code == 200){
            var html = template('teacher-list-tpl',{list:data.result});
            $('#teacher-list-tbody').html(html);
        }
    })

    //通过事件委托的方式个动态生成的a标签绑定点击事件
    //然后获取讲师详细信息并展示。
    //找一个固定，不是动态生成的#teacher-list-tbody标签，找一个稳定的事件委托，
    $('#teacher-list-tbody').on('click', '.teacher-view', function() {
        $.get('/v6/teacher/view', {
            tc_id: $(this).parent().attr('data-id')
        }, function(data) {
            if(data.code == 200) {
                var html = template('teacher-view-tpl', data.result);
                $('#teacherModal').html(html);
            }
        });
    });





})