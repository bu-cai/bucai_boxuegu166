define(['jquery', 'common', 'nprogress', 'util', 'template', 'ckeditor'], function($, undefined, nprogress, util, template, ckeditor) {

    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    var cs_id =util.getQueryString('cs_id');

    //渲染页面
    $.get('/v6/course/basic',{ cs_id:cs_id }, function (data) {
        if(data.code == 200){
            $('.steps').html(template('text-tpl',data.result));
        }


        //配置富文本编辑器
        var  cke = ckeditor.replace('brief-textarea');


        //选择顶级课程分类,更新子集分类
        //change事件:就是当值变化了
        $('#category-top-select').on('change', function () {
            //获得顶级分类的每一个cg_id的val值
            var topld = $(this).val();
            $.get('/v6/category/child',{ cg_id:topld },function (data) {
                //动态生成option课程分类子集，添加到对应的select元素中
                var optionHTML =
                '{{ each list }}\
                    <option value="{{ $value.cg_id }}">{{ $value.cg_name }}</option>\
                {{ /each }}';
                var render = template.compile(optionHTML);
                //添加到对应的select元素中
                $('#category-child-select').html(render({list:data.result}));


                $('#step-form').on('submit', function () {
                    //更新编辑器文本到textarea中
                    cke.updateElement();
                    $.ajax({
                        url:'/v6/course/basic',
                        type:'get',
                        data:$(this).serialize() + '&cs_id=' + cs_id,
                        success: function (data) {
                            if(data.code == 200){
                                location.href = '/html/course/add_step2.html?cs_id=' + cs_id;
                            }
                        }
                    })
                    //阻止默认跳转
                    return false;
                })
            })
        })








    })










})