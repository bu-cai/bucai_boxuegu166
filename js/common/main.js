requirejs.config({
    baseUrl:'/',
    paths:{
        //第三方库的路径配置
        jquery: 'node_modules/jquery/dist/jquery.min',
        bootstrap:'node_modules/bootstrap/dist/js/bootstrap.min',
        jqueryCookie:'lib/jquery-cookie/jquery.cookie',
        nprogress:'lib/nprogress/nprogress',
        template:'node_modules/art-template/dist/template', // 模板插件
        datepicker:'lib/bootstrap-datepicker/js/bootstrap-datepicker', // 日历插件
        datepickerLanguage:'lib/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min', //日历插件中间版
        region:'lib/region/jquery.region',//三级联动插件
        ckeditor:'lib/ckeditor/ckeditor',//富文本插件
        uploadify:'lib/uploadify/jquery.uploadify.min', //头像上传的插件
        // 自己写的路径配置
        index:'js/index',
        // course
        courseAdd:'js/course/add',
        courseAddStep1:'js/course/add_step1',
        courseAddStep2:'js/course/add_step2',
        courseAddStep3:'js/course/add_step3',
        courseCategory:'js/course/category',
        courseCategoryAdd:'js/course/category_add',
        courseList:'js/course/list',
        courseTopic:'js/course/topic',
        // home
        login:'js/home/login',
        repass:'js/home/repass',
        settings:'js/home/settings',
        // teacher
        teacherAdd:'js/teacher/add',
        teacherList:'js/teacher/list',
        // user
        userList:'js/user/list',
        userProfile: 'js/user/profile',
        // common
        common:'js/common/common',
        util:'js/common/util'

    },
    /*
    shim对于非模块化的第三方库，有一个shim配置项，专门用来配置这些库的依赖
    * deps：
    * exports：
    * */
    shim:{
        //bootstrap加载时，先把下面的jquery加载上   就是bootstrap要依赖与jquery
        bootstrap:{
            //deps依赖的意思
            deps:['jquery']
        },
        datepickerLanguage:{
            deps:['jquery','datepicker']
        },
        ckeditor:{
            exports:'CKEDITOR'
        },
        uploadify:{
            deps:['jquery']
        }
    }
});

//优先以最快的速度开启页面进度条，其他的js加载延后。
require(['nprogress'], function (nprogress) {
    nprogress.start()
})



//所有的页面都需要这两个js，先加载他们。
require(['jquery','bootstrap','common']);

(function(window){

    //先获取路径
    var pathname = window.location.pathname;

    /*
    * 判断登录状态：
    * 1、登录页
    * 1.1没有SESSID，不用管
    * 1.2有SESSID，跳转到首页
    *
    * 2、其他页
    * 2.1没有SESSID，跳转到登录页
    * 2.2有SESSID，不用管
    * */

    require(['jquery','jqueryCookie'], function ($,undefined) {
        //获取cookie的字符串
        var sessID = $.cookie('PHPSESSID');
        //判断在当前登录页有没有当前的sessID，有则跳到登页，没有就在当前页
        if(pathname === '/html/home/login.html' && sessID){
            location.href = '/';
            //判断在其他页有没有当前sessID，没有则跳到登录页
        }else if(pathname !== '/html/home/login.html' && !sessID){
            location.href = '/html/home/login.html';
        }

        //如果没有发生页面跳转，就加载对应的js模块
        // course
        if(pathname == '/html/course/add.html'){
            require(['courseAdd']);
        }else if(pathname == '/html/course/add_step1.html'){
            require(['courseAddStep1']);
        }else if(pathname == '/html/course/add_step2.html'){
            require(['courseAddStep2']);
        }else if(pathname == '/html/course/add_step3.html'){
            require(['courseAddStep3']);
        }else if(pathname == '/html/course/category.html'){
            require(['courseCategory']);
        }else if(pathname == '/html/course/category_add.html'){
            require(['courseCategoryAdd']);
        }else if(pathname == '/html/course/list.html'){
            require(['courseList']);
        }else if(pathname == '/html/course/topic.html'){
            require(['courseTopic']);
        }
        // home
        else if(pathname == '/html/home/login.html'){
            require(['login']);
        }else if(pathname == '/html/home/repass.html'){
            require(['repass']);
        }else if(pathname == '/html/home/settings.html'){
            require(['settings']);
        }
        //teacher
        else if(pathname == '/html/teacher/add.html'){
            require(['teacherAdd']);
        }else if(pathname == '/html/teacher/list.html'){
            require(['teacherList']);
        }
        //user
        else if(pathname == '/html/user/list.html'){
            require(['userList']);
        }else if(pathname == '/html/user/profile.html'){
            require(['userProfile']);
        }
        // index.html
        else if(pathname == '/'){
            require(['index']);
        }



    });

})(window);




