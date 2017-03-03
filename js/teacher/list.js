define(['jquery','common','nprogress','template'], function ($,undefined,nprogress,template) {


    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    //添加讲师列表数据缓存
    var treacherListCache; // 涉及到页面刷新，变量一定是会没有的

    try{
        // 获取讲师列表
        //JSON.parse获取的时候，也需要获取的是字符串   getItem获取缓存数据
        treacherListCache = JSON.parse(localStorage.getItem('treacherListCache'))
    }catch(e){};

    /*
    * 判断如果存在缓存数据，优先使用缓存，
    * 否则发送ajax请求重新获取数据，然后进行缓存
    * */
    if(treacherListCache){
        //如果有数据，我就使用缓存的方式渲染模板
        var html = template('teacher-list-tpl',{list:treacherListCache});
        $('#teacher-list-tbody').html(html);
    }else {
        //如果没有数据的话，就发送get请求
        $.get('/v6/teacher', function (data) {
            if(data.code == 200){
                //将数据存到缓存里
                treacherListCache = data.result;
                //对应的是数据，数据要求是要字符串
                //JSON.stringify就是将数据转换为字符串    setItem设置缓存数据
                localStorage.setItem('treacherListCache',JSON.stringify(data.result));
                var html = template('teacher-list-tpl',{list:data.result});
                $('#teacher-list-tbody').html(html);
            }
        })
    }



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


    //讲师状态修改开启，注销状态
    $('#teacher-list-tbody').on('click','.teacher_status', function () {

        var self = $(this);
        $.ajax({
            url:'/v6/teacher/handle', // 请求注销/启用讲师接口
            type:'post',
            data:{
                tc_id:$(this).parent().attr('data-id'),
                tc_status:$(this).parent().attr('data-status')
            },
            success: function (data) {
                if(data.code == 200){ // 数据的状态 == 200 就会执行下面的代码
                    //得到修改后的状态，使用该状态修改按钮名称&父元素的data-status属性值
                    //台数据如果 == 注销 ? 那就让它开启 : 否则注销
                    self.html(data.result.tc_status == 0? '开启': '注销');
                    self.parent().attr('data-status',data.result.tc_status);
                }
            }
        })
    })





})