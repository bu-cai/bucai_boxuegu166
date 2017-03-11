define(['jquery','common','nprogress','util','template','uploadify'], function ($,undefined,nprogress,util,template,uploadify) {


    //该页面所有的js加载完毕，进度条结束
    nprogress.done();

    var cs_id = util.getQueryString('cs_id');

    $.get('/v6/course/picture',{ cs_id:cs_id }, function (data) {
       if(data.code == 200){
           $('.steps').html(template('step-tpl',data.result));


           //渲染上传头像文件
           $('#uploadify').uploadify({
               swf:'/lib/uploadify/uploadify.swf',
               uploader:'/v6/uploader/cover',
               buttonText:'选择图片',
               width:'100%',
               height:'100%',
               fileTypeExts: '*.gif; *.jpg; *.png',
               fileSizeLimit:'2MB',
               itemTemplate:'',
               fileObjName:'cs_cover_original',
               buttonClass:'btn btn-success btn-sm',
               formData:{ cs_id:cs_id },
               onUploadSuccess: function (file,data) {
                     data = JSON.parse(data);
                   $('.cover-img').attr('src',data.result.path);
               }
           });
       }
    });
});