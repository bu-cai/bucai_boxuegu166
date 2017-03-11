define(['jquery','common','nprogress','template','region','datepicker','datepickerLanguage','ckeditor','uploadify'],
    function ($,undefined,nprogress,template,region,datepicker,undefined,ckeditor,uploadify) {


    //该页面所有的js加载完毕，进度条结束
    nprogress.done();


    $.get('/v6/teacher/profile', function (data) {
        var html = template('setting-form-tpl',data.result);
        $('.settings').html(html);

        //三级联动插件
        $('.hometown').region({
            url:'/lib/region/region.json'
        })


        //日历插件
        $('.datepicker').datepicker({
            language:'zh-CN',
            format:'yyyy-mm-dd',
            endDate:new Date()
        })

        //配置富文本编辑器
        var edit = ckeditor.replace('ckeditor');




        //ckeditor.replace('ckeditor', {
        //    toolbarGroups: [
        //        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        //        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        //        { name: 'insert' },
        //        { name: 'tools' },
        //        { name: 'styles' },
        //        { name: 'colors' },
        //    ]
        //});




        //配置头像上传的插件
        $('#upfile').uploadify({
            //flash插件的效果
            swf: '/lib/uploadify/uploadify.swf',
            // 请求后台服务器，用户上传自定义头像
            uploader: '/v6/uploader/avatar',
            fileObjName: 'tc_avatar',
            fileTypeExts:'*.gif;*.png;*.jpg',
            height:$('.preview').height(),
            buttonText:'',
            //头像上传成功后，解析字符串数据，然后把上传的地址设置到表单中，供提交；同时更新用户
            onUploadSuccess: function (file, data) {
                var data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
            }
        })


        //监听提交事件
        $('.form-horizontal').on('submit', function () {

            //生成一个tc_hometown参数，格式为：省|市|县
            var hometown = $('.hometown select').map(function () {
                return $(this).find('option:selected').text();
            }).toArray().join('|');

            //设置文本框的内容为富文本编辑器内容
            edit.updateElement();


            $.ajax({
                url:'/v6/teacher/modify',
                type:'post',
                data:$(this).serialize() + '&tc_hometown=' + hometown,
                success: function (data) {
                    if(data.code == 200){
                        location.reload();
                    }
                }
            })
            return false;
        })
    })



})